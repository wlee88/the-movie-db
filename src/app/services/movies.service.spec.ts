import { API_BASE_URL, API_KEY, MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { IMock, Mock, Times } from 'typemoq';
import { of } from 'rxjs';
import { Movie, MoviesListResponse } from '../contracts';
import { objectToQueryParam } from '../utils/object-to-query-param';
import { MovieBuilder } from '../testing/builders/movie.builder';
import { MovieListResponseBuilder } from '../testing/builders/movie-list-response.builder';

describe('MediaService', () => {
	let sut: MoviesService;
	let http: IMock<HttpClient>;

	beforeEach(() => {
		http = Mock.ofType<HttpClient>();
		sut = new MoviesService(http.object);
	});

	afterEach(() => {
		http.reset();
	});

	describe('when fetching a movie via its id', () => {
		let actual: Movie;
		let movie: Movie;

		beforeEach(() => {
			movie = new MovieBuilder().build();
			const expectedUrl = `${API_BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`;
			http
				.setup(x => x.get<Movie>(expectedUrl))
				.returns(() => of(movie))
				.verifiable(Times.once());
			sut.getMovie(movie.id).subscribe(response => (actual = response));
		});

		it('should call the http client with the right parameters', () => {
			http.verifyAll();
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
					sort_by: 'popularity.desc',
					api_key: API_KEY
				};
				const expectedUrl = `${API_BASE_URL}/discover/movie?${objectToQueryParam(defaultParameters)}`;
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
				query: 'iron man',
				apiKey: API_KEY
			};

			mockMovieListResponse = new MovieListResponseBuilder().build();
			const expectedUrl = `${API_BASE_URL}/search/movie?${objectToQueryParam(expectedParameters)}`;
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
