import { Component, OnInit } from '@angular/core';
import { Movies } from '../../contracts';
import { merge, Observable, of, Subject } from 'rxjs';
import { filter, flatMap, map, take } from 'rxjs/operators';
import { SearchBarForm } from '../../contracts/search-bar-form';
import { MoviesService } from '../../services/movies/movies.service';
import { StoreService } from '../../services/store/store.service';

@Component({
	selector: 'app-popular-movies',
	templateUrl: './popular-movies.component.html',
	styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {
	currentSearchTerm: string;
	popularMovies$: Observable<Movies> = of();
	searchedMovies$: Observable<Movies> = of();
	movies$: Observable<Movies>;
	searchSubject$: Subject<string> = new Subject<string>();
	refreshSubject$: Subject<void> = new Subject<void>();
	store$: Observable<string>;

	constructor(private readonly moviesService: MoviesService, private readonly storeService: StoreService) {
		this.store$ = this.storeService.getObservable();
	}

	ngOnInit() {
		this.movies$ = merge(
			this.refreshSubject$.pipe(flatMap(_ => this.getMostPopularMovies())),
			this.getMostPopularMovies(),
			this.store$.pipe(
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

		if (!searchText) {
			this.refreshSubject$.next();
		}
	}

	private getMostPopularMovies(): Observable<Movies> {
		return this.moviesService.getMostPopular().pipe(map(moviesListResponse => moviesListResponse.results));
	}
}
