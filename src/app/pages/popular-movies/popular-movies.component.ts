import { Component, OnInit } from '@angular/core';
import { Movies } from '../../contracts';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { map } from 'rxjs/operators';
import { SearchBarForm } from '../../contracts/search-bar-form';

@Component({
	selector: 'app-popular-movies',
	templateUrl: './popular-movies.component.html',
	styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {
	popularMovies$: Observable<Movies>;
	movies$: Observable<Movies>;

	constructor(private readonly moviesService: MoviesService) {}

	ngOnInit() {
		this.popularMovies$ = this.moviesService
			.getMostPopular()
			.pipe(map(moviesListResponse => moviesListResponse.results));
	}

	/**
	 * A search has been made so search for movies that match the term.
	 * @param searchBarFormChange the form change object emitted from search-bar.
	 */
	searchAndUpdateMovies(searchBarFormChange: SearchBarForm) {
		// TODO: MERGE THE INITIAL MOVIES OBSERVABLE WITH THIS.
		this.movies$ = this.moviesService
			.searchMovies(searchBarFormChange.searchText)
			.pipe(map(moviesListResponse => moviesListResponse.results));
	}
}
