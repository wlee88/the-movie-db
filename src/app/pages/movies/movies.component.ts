import { Component, OnInit } from '@angular/core';
import { Movies } from '../../contracts';
import { merge, Observable, Subject } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { SearchBarForm } from '../../contracts/search-bar-form';
import { MoviesService, StoreService } from '../../services';

@Component({
	selector: 'movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
	currentSearchTerm: string;
	movies$: Observable<Movies>;
	refreshSubject$: Subject<void> = new Subject<void>();
	storedSearchValue$: Observable<string>;

	constructor(private readonly moviesService: MoviesService, private readonly storeService: StoreService) {
		this.storedSearchValue$ = this.storeService.getObservable();
	}

	ngOnInit() {
		/**
		 * Needs refining, as still will get most popular movies when there exists a stored search value.
		 * Luckily the movies service caches results so no extra network call is needed.
		 * It shows the results from store (if there is a value) because this is the last observable emitted
		 */
		this.movies$ = merge(
			this.refreshSubject$.pipe(flatMap(_ => this.getMostPopularMovies())),
			this.getMostPopularMovies(),
			this.storedSearchValue$.pipe(
				filter(value => !!value),
				flatMap(searchText =>
					this.moviesService.searchMovies(searchText).pipe(map(moviesListResponse => moviesListResponse.results))
				)
			)
		);
	}

	get heading(): string {
		const POPULAR_MOVIES = 'Popular Movies';
		const RESULTS = 'Results';

		return this.storeService.getValue() ? RESULTS : POPULAR_MOVIES;
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
			this.refreshSubject$.next();
		}
	}

	private getMostPopularMovies(): Observable<Movies> {
		return this.moviesService.getMostPopular().pipe(map(moviesListResponse => moviesListResponse.results));
	}
}
