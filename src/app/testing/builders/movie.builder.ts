import { Movie } from '../../contracts';
import { AbstractBuilder } from '../abstract-builder';
import { randomNumber } from '../../utils/random-number';
import * as uuid from 'uuid';

export class MovieBuilder extends AbstractBuilder<Movie> {
	constructor() {
		super({
			vote_count: randomNumber(),
			id: randomNumber(),
			video: true,
			vote_average: randomNumber(),
			title: uuid(),
			popularity: randomNumber(),
			poster_path: uuid(),
			original_language: uuid(),
			original_title: uuid(),
			genre_ids: [randomNumber(), randomNumber()],
			backdrop_path: uuid(),
			adult: true,
			runtime: randomNumber(),
			overview: uuid(),
			release_date: new Date().toString()
		});
	}
}
