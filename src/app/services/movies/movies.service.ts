import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, take } from 'rxjs/operators';
import { Movie, MoviesListResponse } from '../../contracts';
import { objectToQueryParam } from '../../utils/object-to-query-param';

// TODO move to injectable app config.
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = '6ed12e064b90ae1290fa326ce9e790ff';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	private readonly apiKey = API_KEY;
	private readonly baseUrl = API_BASE_URL;

	constructor(private http: HttpClient) {}

	/**
	 * Given a movie id, return it's details from the-movie-db API.
	 * @param id - of the movie.
	 */
	getMovie(id: number): Observable<Movie> {
		return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`).pipe(
			take(1),
			shareReplay(1)
		);
	}

	/**
	 *  Get summary level information on  most popular movies from the-movie-db API.
	 * @param page - number to query
	 * @param sortBy - specify the data you wish to sort by - more info at @see https://www.themoviedb.org/documentation/api/discover
	 */
	getMostPopular(page: number = 1, sortBy = 'popularity.desc'): Observable<MoviesListResponse> {
		const queryParameters = {
			page,
			sort_by: sortBy,
			api_key: API_KEY
		};

		// TODO: api_key to intercepter and append.
		return this.http
			.get<MoviesListResponse>(`${this.baseUrl}/discover/movie?${objectToQueryParam(queryParameters)}`)
			.pipe(
				distinctUntilChanged(),
				take(1),
				shareReplay(1)
			);
	}

	/**
	 * Free text search the-movie-db API.
	 * Searching by text takes into account all original, translated, alternative names and titles.
	 * @param page - number to query
	 * @param searchTerm - the searchTerm to query.
	 */
	searchMovies(searchTerm: string, page: number = 1): Observable<MoviesListResponse> {
		const queryParameters = {
			page,
			query: searchTerm,
			api_key: API_KEY
		};
		return this.http
			.get<MoviesListResponse>(`${this.baseUrl}/search/movie?${objectToQueryParam(queryParameters)}`)
			.pipe(
				distinctUntilChanged(),
				take(1),
				shareReplay(1)
			);
	}
}
