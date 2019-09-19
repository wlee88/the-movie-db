import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../contracts';
import { resolveFullImagePath } from '../../utils/resolve-full-image-path/resolve-full-image-path';

@Component({
	selector: 'movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: Movie;

	constructor() {}

	ngOnInit() {}

	get resolveFullImagePath() {
		return resolveFullImagePath(this.movie.poster_path);
	}
}
