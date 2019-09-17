import { randomNumber } from '../utils';
import { Movie, MoviesListResponse } from '../contracts';

export const MOCK_MOVIE: Movie = {
	vote_count: randomNumber(),
	id: randomNumber(),
	video: true,
	vote_average: randomNumber(),
	title: 'some-title',
	popularity: randomNumber(),
	poster_path: 'some-path',
	original_language: 'some-lang',
	original_title: 'some-title',
	genre_ids: [randomNumber(), randomNumber()],
	backdrop_path: 'some-backdrop',
	adult: true,
	runtime: randomNumber(),
	overview: 'some-overview',
	release_date: 'some-release-date'
};

export const MOCK_MEDIA_LIST_RESPONSE: MoviesListResponse = {
	page: 1,
	results: [MOCK_MOVIE],
	total_pages: 1,
	total_results: 1
};
