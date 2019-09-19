import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../../contracts';
import { Observable } from 'rxjs';
import { resolveFullImagePath } from '../../utils/resolve-full-image-path/resolve-full-image-path';
import { MoviesService } from '../../services/movies/movies.service';

@Component({
	selector: 'app-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
	movie$: Observable<Movie>;
	constructor(
		private readonly location: Location,
		private readonly route: ActivatedRoute,
		private readonly moviesService: MoviesService
	) {}

	ngOnInit(): void {
		const movieId = this.route.snapshot.params.id;
		this.movie$ = this.moviesService.getMovie(movieId);
	}

	resolveFullImagePath(movieImageUrl: string): string {
		return resolveFullImagePath(movieImageUrl);
	}

	backButtonSelected() {
		this.location.back();
	}
}
