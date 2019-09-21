import { AbstractBuilder } from '../abstract-builder';
import { MoviesListResponse } from '../../contracts';
import { MovieBuilder } from './movie.builder';

export class MovieListResponseBuilder extends AbstractBuilder<MoviesListResponse> {
	constructor() {
		super({
			page: 1,
			results: [new MovieBuilder().build()],
			total_pages: 1,
			total_results: 1
		});
	}
}
