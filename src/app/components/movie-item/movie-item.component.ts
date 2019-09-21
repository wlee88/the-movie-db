import { Breakpoint, ResponsiveImage } from '@thisissoon/angular-image-loader';
import { Component, Input, OnInit } from '@angular/core';

import {
	BREAKPOINTS,
	IMAGE_LOADING_PLACEHOLDER_URL,
	IMAGE_MISSING_PLACEHOLDER_URL,
	ImageQuality,
	prepareResponsiveImages,
	resolveFullImagePath
} from '../../utils/resolve-full-image-path';
import { Movie } from '../../contracts';

@Component({
	selector: 'movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: Movie;

	image: ResponsiveImage;
	sizes: Breakpoint[] = BREAKPOINTS;

	ngOnInit() {
		this.image = {
			placeholder: IMAGE_LOADING_PLACEHOLDER_URL,
			fallback: IMAGE_MISSING_PLACEHOLDER_URL,
			images: prepareResponsiveImages(this.movie)
		};
	}

	resolveFullImagePath(imageQuality: ImageQuality) {
		return resolveFullImagePath(this.movie.poster_path, imageQuality);
	}
}
