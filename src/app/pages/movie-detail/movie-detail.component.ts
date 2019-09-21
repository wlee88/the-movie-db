import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Breakpoint, ResponsiveImage, RetinaImage } from '@thisissoon/angular-image-loader';

import {
	BREAKPOINTS,
	IMAGE_LOADING_PLACEHOLDER_URL,
	IMAGE_MISSING_PLACEHOLDER_URL,
	ImageQuality,
	prepareResponsiveImages,
	resolveFullImagePath
} from '../../utils/resolve-full-image-path';
import { Movie } from '../../contracts';
import { MoviesService } from '../../services';

@Component({
	selector: 'app-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
	movie$: Observable<Movie>;

	sizes: Breakpoint[] = BREAKPOINTS;
	image: ResponsiveImage;
	originalImageQuality = ImageQuality.ORIGINAL;

	constructor(
		private readonly location: Location,
		private readonly moviesService: MoviesService,
		private readonly route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const movieId = this.route.snapshot.params.id;

		this.movie$ = this.moviesService.getMovie(movieId);
		this.movie$.subscribe(movie => {
			this.image = {
				placeholder: IMAGE_LOADING_PLACEHOLDER_URL,
				fallback: IMAGE_MISSING_PLACEHOLDER_URL,
				images: prepareResponsiveImages(movie)
			};
		});
	}

	resolveFullImagePath(movieImageUrl: string, imageQuality: ImageQuality): string {
		return resolveFullImagePath(movieImageUrl, imageQuality);
	}

	goBack() {
		this.location.back();
	}
}
