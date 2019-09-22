import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject, Subscription } from 'rxjs';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { filter, flatMap, map, tap } from 'rxjs/operators';

import { Movies } from '../../contracts';
import { MoviesService, StoreService } from '../../services';
import { SearchBarForm } from '../../contracts/search-bar-form';

@Component({
	selector: 'movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
	currentPageNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	currentSearchTerm: string;
	faSpinner = faSpinner;
	isFetchingData = false;
	movies$: Observable<Movies>;
	moviesCache: Movies = [];
	refreshPopularMovies$: Subject<void> = new Subject<void>();
	refreshSearchResults$: Subject<void> = new Subject<void>();
	storedSearchValue$: Observable<string>;
	subscriptions: Subscription[] = [];

	constructor(private readonly moviesService: MoviesService, private readonly storeService: StoreService) {
		this.storedSearchValue$ = this.storeService.getObservable();
	}

	ngOnInit() {
		/**
		 * - Call getMostPopularMovies to get the initial page load data (i.e the most popular movies). This does not
		 * emit if there is a storedValue.
		 * - If a search term is emitted, retrieve the movies via the search term.
		 * - When any of the observables has completed and emitted we set `isFetchingData` to false.
		 */
		this.movies$ = merge(
			this.getMostPopularMovies(1), // Will not emit if there is a search value in the store.
			this.retrieveMoviesFromSearchTerm(1), // Will only emit if there is a search value in the store.
			this.refreshSearchResults$.pipe(flatMap(() => this.retrieveMoviesFromSearchTerm())),
			this.refreshPopularMovies$.pipe(flatMap(() => this.getMostPopularMovies()))
		).pipe(tap(() => (this.isFetchingData = false)));

		const updateMoviesCacheSubscription = this.movies$.subscribe(movies => {
			this.moviesCache = this.moviesCache.concat(movies);
		});

		// The search value changed - so we need to reset the movies cache and the page number back to 1.
		const storedSearchValueSubscription = this.storedSearchValue$.subscribe(() => {
			this.isFetchingData = true;
			this.currentPageNumber$.next(1);
			this.resetMoviesCache();
		});

		// Fetch the next set of results by calling the relevant refresh observable as the page number has changed.
		const currentPageNumberSubscription = this.currentPageNumber$
			.pipe(filter(pageNumber => pageNumber > 1))
			.subscribe(() => {
				this.emitRefresh();
			});

		// Keep track of the subscriptions so we may unsubscribe to them on ngOnDestroy lifecycle hook.
		this.subscriptions.push(
			updateMoviesCacheSubscription,
			storedSearchValueSubscription,
			currentPageNumberSubscription
		);
	}

	private emitRefresh() {
		if (this.storeService.getValue()) {
			this.refreshSearchResults$.next();
		} else {
			this.refreshPopularMovies$.next();
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	get existsSearchValue(): boolean {
		return !!this.storeService.getValue();
	}

	/**
	 * When the user reaches the bottom of the page, update the current page number.
	 */
	@HostListener('window:scroll', ['$event'])
	incrementCurrentPageNumber() {
		// Scroll to bottom behaviour on mac has quirks - @see https://stackoverflow.com/a/40370876
		const userScrollToBottomOfThePage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (userScrollToBottomOfThePage) {
			const currentPageNumber = this.currentPageNumber$.getValue();
			this.currentPageNumber$.next(currentPageNumber + 1);
		}
	}

	/**
	 * This will only emit/retrieve the most popular movies
	 * if there is no store value.
	 * @param pageNumber of results to retrieve.
	 */
	private getMostPopularMovies(pageNumber?: number): Observable<Movies> {
		if (pageNumber) {
			pageNumber = this.currentPageNumber$.getValue();
		}
		this.isFetchingData = true;
		const storeHasValue = this.storeService.getValue();

		return this.moviesService.getMostPopular(pageNumber).pipe(
			filter(_ => !storeHasValue),
			map(moviesListResponse => moviesListResponse.results)
		);
	}

	private resetMoviesCache() {
		this.moviesCache = [];
	}

	private retrieveMoviesFromSearchTerm(pageNumber?: number) {
		if (!pageNumber) {
			pageNumber = this.currentPageNumber$.getValue();
		}
		this.isFetchingData = true;

		return this.storedSearchValue$.pipe(
			filter(value => !!value),
			flatMap(searchText =>
				this.moviesService
					.searchMovies(searchText, pageNumber)
					.pipe(map(moviesListResponse => moviesListResponse.results))
			)
		);
	}

	/**
	 * A search has been made so search for movies that match the term.
	 * @param searchBarFormChange the form change object emitted from search-bar.
	 */
	searchAndUpdateMovies(searchBarFormChange: SearchBarForm) {
		const { searchText } = searchBarFormChange;
		this.currentSearchTerm = searchText;
		this.storeService.setValue(searchText);

		// The search term is empty so show the list of popular movies.
		if (!searchText) {
			this.refreshPopularMovies$.next();
		}
	}
}
