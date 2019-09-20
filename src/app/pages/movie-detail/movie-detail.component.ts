import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../../contracts';
import { Observable } from 'rxjs';
import {
	IMAGE_LOADING_PLACEHOLDER_URL,
	IMAGE_MISSING_PLACEHOLDER_URL,
	ImageQuality,
	resolveFullImagePath
} from '../../utils/resolve-full-image-path/resolve-full-image-path';
import { MoviesService } from '../../services';
import { Breakpoint, ResponsiveImage } from '@thisissoon/angular-image-loader';

@Component({
	selector: 'app-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
	movie$: Observable<Movie>;

	sizes: Breakpoint[] = [{ size: 'xs', width: 0 }, { size: 'md', width: 768 }, { size: 'lg', width: 992 }];
	image: ResponsiveImage;
	originalImageQuality = ImageQuality.ORIGINAL;

	constructor(
		private readonly location: Location,
		private readonly route: ActivatedRoute,
		private readonly moviesService: MoviesService
	) {}

	ngOnInit(): void {
		const movieId = this.route.snapshot.params.id;
		this.movie$ = this.moviesService.getMovie(movieId);
		this.movie$.subscribe(movie => {
			this.image = {
				placeholder: IMAGE_LOADING_PLACEHOLDER_URL,
				fallback: IMAGE_MISSING_PLACEHOLDER_URL,
				images: [
					{
						size: 'xs',
						x1: this.resolveFullImagePath(movie.poster_path, ImageQuality.LOW),
						x2: this.resolveFullImagePath(movie.poster_path, ImageQuality.LOW)
					},
					{
						size: 'md',
						x1: this.resolveFullImagePath(movie.poster_path, ImageQuality.MEDIUM),
						x2: this.resolveFullImagePath(movie.poster_path, ImageQuality.MEDIUM)
					},
					{
						size: 'lg',
						x1: this.resolveFullImagePath(movie.poster_path, ImageQuality.HIGH),
						x2: this.resolveFullImagePath(movie.poster_path, ImageQuality.HIGH)
					}
				]
			};
		});
	}

	resolveFullImagePath(movieImageUrl: string, imageQuality: ImageQuality): string {
		return resolveFullImagePath(movieImageUrl, imageQuality);
	}

	backButtonSelected() {
		this.location.back();
	}
}
