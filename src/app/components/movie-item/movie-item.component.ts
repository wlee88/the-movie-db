import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../contracts';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
@Component({
	selector: 'movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: Movie;

	constructor() {}

	ngOnInit() {}

	get fullImagePath() {
		return `${BASE_IMAGE_URL}${this.movie.poster_path}`;
	}
}
