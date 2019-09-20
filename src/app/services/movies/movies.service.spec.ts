import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { IMock, Mock, Times } from 'typemoq';
import { of } from 'rxjs';
import { Movie, MoviesListResponse } from '../../contracts';
import { MovieListResponseBuilder } from '../../testing/builders/movie-list-response.builder';
import { objectToQueryParam } from '../../utils/object-to-query-param';
import { MovieBuilder } from '../../testing/builders/movie.builder';
import { ConfigurationService } from '../configuration/configuration.service';
import * as uuid from 'uuid';

describe('MoviesService', () => {
	let sut: MoviesService;
	let http: IMock<HttpClient>;
	let configurationService: IMock<ConfigurationService>;
	let apiUrl: string;

	beforeEach(() => {
		apiUrl = uuid();
		http = Mock.ofType<HttpClient>();
		configurationService = Mock.ofType<ConfigurationService>();
		configurationService
			.setup(x => x.apiUrl())
			.returns(() => apiUrl)
			.verifiable(Times.once());
		sut = new MoviesService(http.object, configurationService.object);
	});

	afterEach(() => {
		http.reset();
		configurationService.reset();
	});

	describe('when fetching a movie via its id', () => {
		let actual: Movie;
		let movie: Movie;

		beforeEach(() => {
			movie = new MovieBuilder().build();
			const expectedUrl = `${apiUrl}/movie/${movie.id}`;
			http
				.setup(x => x.get<Movie>(expectedUrl))
				.returns(() => of(movie))
				.verifiable(Times.once());
			sut.getMovie(movie.id).subscribe(response => (actual = response));
		});

		it('should call the service', () => {
			http.verifyAll();
			configurationService.verifyAll();
		});

		it('should return the right data', () => {
			expect(actual).toMatchObject<Movie>(movie);
		});
	});

	describe('when fetching the most popular movies', () => {
		let actual: MoviesListResponse;

		describe('with no page specified or sort by parameters specified', () => {
			let mockMovieListResponse: MoviesListResponse;
			beforeEach(() => {
				const defaultParameters = {
					page: 1,
					sort_by: 'popularity.desc'
				};
				const expectedUrl = `${apiUrl}/discover/movie?${objectToQueryParam(defaultParameters)}`;
				mockMovieListResponse = {
					page: 1,
					results: [new MovieBuilder().build()],
					total_pages: 1,
					total_results: 1
				};
				http
					.setup(x => x.get<MoviesListResponse>(expectedUrl))
					.returns(() => of(mockMovieListResponse))
					.verifiable(Times.once());

				sut.getMostPopular().subscribe(mediaListResponse => (actual = mediaListResponse));
			});

			it('should call the http client with the expected defaults', () => {
				http.verifyAll();
				configurationService.verifyAll();
			});

			it('should return the right data', () => {
				expect(actual).toEqual(mockMovieListResponse);
			});
		});
	});

	describe('when searching for movies', () => {
		let actual: MoviesListResponse;
		let mockMovieListResponse: MoviesListResponse;

		beforeEach(() => {
			const expectedParameters = {
				page: 1,
				query: uuid()
			};

			mockMovieListResponse = new MovieListResponseBuilder().build();
			const expectedUrl = `${apiUrl}/search/movie?${objectToQueryParam(expectedParameters)}`;
			http
				.setup(x => x.get<MoviesListResponse>(expectedUrl))
				.returns(() => of(mockMovieListResponse))
				.verifiable(Times.once());

			sut
				.searchMovies(expectedParameters.query, expectedParameters.page)
				.subscribe(mediaListResponse => (actual = mediaListResponse));
		});

		it('should call the http client with the expected defaults', () => {
			http.verifyAll();
		});

		it('should return the right data', () => {
			expect(actual).toEqual(mockMovieListResponse);
		});
	});
});
