import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../contracts';
import {
	IMAGE_MISSING_PLACEHOLDER_URL,
	IMAGE_LOADING_PLACEHOLDER_URL,
	ImageQuality,
	resolveFullImagePath,
	BREAKPOINTS
} from '../../utils/resolve-full-image-path/resolve-full-image-path';
import { Breakpoint, ResponsiveImage } from '@thisissoon/angular-image-loader';

@Component({
	selector: 'movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: Movie;
	sizes: Breakpoint[] = BREAKPOINTS;
	image: ResponsiveImage;

	ngOnInit() {
		this.image = {
			placeholder: IMAGE_LOADING_PLACEHOLDER_URL,
			fallback: IMAGE_MISSING_PLACEHOLDER_URL,
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
