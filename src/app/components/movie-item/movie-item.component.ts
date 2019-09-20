import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../contracts';
import { ImageQuality, resolveFullImagePath } from '../../utils/resolve-full-image-path/resolve-full-image-path';
import { Breakpoint, ResponsiveImage } from '@thisissoon/angular-image-loader';

@Component({
	selector: 'movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: Movie;
	sizes: Breakpoint[] = [{ size: 'xs', width: 0 }, { size: 'md', width: 768 }, { size: 'lg', width: 992 }];
	image: ResponsiveImage;
	constructor() {}

	ngOnInit() {
		this.image = {
			placeholder: 'http://via.placeholder.com/300x600?text=Image+Loading',
			fallback: 'http://via.placeholder.com/300x600?text=Missing+Image',
			images: [
				{
					size: 'xs',
					x1: this.resolveFullImagePath(ImageQuality.LOW),
					x2: this.resolveFullImagePath(ImageQuality.LOW)
				},
				{
					size: 'md',
					x1: this.resolveFullImagePath(ImageQuality.MEDIUM),
					x2: this.resolveFullImagePath(ImageQuality.MEDIUM)
				},
				{
					size: 'lg',
					x1: this.resolveFullImagePath(ImageQuality.HIGH),
					x2: this.resolveFullImagePath(ImageQuality.HIGH)
				}
			]
		};
	}

	resolveFullImagePath(imageQuality: ImageQuality) {
		return resolveFullImagePath(this.movie.poster_path, imageQuality);
	}
}
