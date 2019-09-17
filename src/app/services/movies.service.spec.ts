import { API_BASE_URL, API_KEY, MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { IMock, Mock, Times } from 'typemoq';
import { of } from 'rxjs';
import { Movie, MoviesListResponse } from '../contracts';
import { MOCK_MEDIA_LIST_RESPONSE, MOCK_MOVIE } from './test-data';
import { objectToQueryParam } from '../utils/object-to-query-param';

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
		let movieId: number;
		let actual: Movie;

		beforeEach(() => {
			movieId = MOCK_MOVIE.id;
			const expectedUrl = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
			http
				.setup(x => x.get<Movie>(expectedUrl))
				.returns(() => of(MOCK_MOVIE))
				.verifiable(Times.once());
			sut.getMovie(movieId).subscribe(movie => (actual = movie));
		});

		it('should call the http client with the right parameters', () => {
			http.verifyAll();
		});

		it('should return the right data', () => {
			expect(actual).toMatchObject<Movie>(MOCK_MOVIE);
		});
	});

	describe('when fetching the most popular movies', () => {
		let actual: MoviesListResponse;

		describe('with no page specified or sort by parameters specified', () => {
			beforeEach(() => {
				const defaultParameters = {
					page: 1,
					sort_by: 'popularity.desc',
					api_key: API_KEY
				};
				const expectedUrl = `${API_BASE_URL}/discover/movie?${objectToQueryParam(defaultParameters)}`;
				http
					.setup(x => x.get<MoviesListResponse>(expectedUrl))
					.returns(() => of(MOCK_MEDIA_LIST_RESPONSE))
					.verifiable(Times.once());

				sut.getMostPopular().subscribe(mediaListResponse => (actual = mediaListResponse));
			});

			it('should call the http client with the expected defaults', () => {
				http.verifyAll();
			});

			it('should return the right data', () => {
				expect(actual).toEqual(MOCK_MEDIA_LIST_RESPONSE);
			});
		});
	});

	describe('when searching for movies', () => {
		let actual: MoviesListResponse;

		beforeEach(() => {
			const expectedParameters = {
				page: 1,
				query: 'iron man',
				apiKey: API_KEY
			};
			const expectedUrl = `${API_BASE_URL}/search/movie?${objectToQueryParam(expectedParameters)}`;
			http
				.setup(x => x.get<MoviesListResponse>(expectedUrl))
				.returns(() => of(MOCK_MEDIA_LIST_RESPONSE))
				.verifiable(Times.once());

			sut
				.searchMovies(expectedParameters.query, expectedParameters.page)
				.subscribe(mediaListResponse => (actual = mediaListResponse));
		});

		it('should call the http client with the expected defaults', () => {
			http.verifyAll();
		});

		it('should return the right data', () => {
			expect(actual).toEqual(MOCK_MEDIA_LIST_RESPONSE);
		});
	});
});
