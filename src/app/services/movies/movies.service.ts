import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, take } from 'rxjs/operators';
import { Movie, MoviesListResponse } from '../../contracts';
import { objectToQueryParam } from '../../utils/object-to-query-param';
import { ConfigurationService } from '../configuration/configuration.service';

/**
 * Note: all queries are cached via shareReplay.
 */
@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	private readonly apiKey;
	private readonly baseUrl;

	constructor(private readonly http: HttpClient, private readonly configurationService: ConfigurationService) {
		this.apiKey = this.configurationService.apiKey();
		this.baseUrl = this.addTrailingSlash(this.configurationService.apiUrl());
	}

	/**
	 * Given a movie id, return it's details from the-movie-db API.
	 * No need to unsubscribe to this subscription as `take` will finish it as soon as the request is returned.
	 * @param id - of the movie.
	 */
	getMovie(id: number): Observable<Movie> {
		return this.http.get<Movie>(`${this.baseUrl}movie/${id}`).pipe(
			take(1),
			shareReplay(1)
		);
	}

	/**
	 * Get summary level information on  most popular movies from the-movie-db API.
	 * No need to unsubscribe to this subscription as `take` will finish it as soon as the request is returned.
	 * @param page - number to query
	 * @param sortBy - specify the data you wish to sort by - more info at @see https://www.themoviedb.org/documentation/api/discover
	 */
	getMostPopular(page: number = 1, sortBy = 'popularity.desc'): Observable<MoviesListResponse> {
		const queryParameters = {
			page,
			sort_by: sortBy
		};

		return this.http
			.get<MoviesListResponse>(`${this.baseUrl}discover/movie?${objectToQueryParam(queryParameters)}`)
			.pipe(
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
			query: searchTerm
		};
		return this.http.get<MoviesListResponse>(`${this.baseUrl}search/movie?${objectToQueryParam(queryParameters)}`).pipe(
			take(1),
			shareReplay(1)
		);
	}

	/**
	 * If the url does not end with a trailing slash, add it.
	 * @param url to check has trailing slash.
	 */
	private addTrailingSlash(url: string): string {
		if (!url.endsWith('/')) {
			return `${url}/`;
		}
	}
}
