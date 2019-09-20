import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ScoreAsPercentagePipe } from '../../pipes/score-as-percentage/score-as-percentage.pipe';
import { DurationToHoursPipe } from '../../pipes/duration-to-hours/duration-to-hours.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { MovieBuilder } from '../../testing/builders/movie.builder';
import { Movie } from '../../contracts';
import { By } from '@angular/platform-browser';

describe('MovieDetailComponent', () => {
	let sut: MovieDetailComponent;
	let fixture: ComponentFixture<MovieDetailComponent>;
	let location: Location;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, HttpClientTestingModule],
			declarations: [MovieDetailComponent, ScoreAsPercentagePipe, DurationToHoursPipe],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MovieDetailComponent);
		sut = fixture.componentInstance;
		location = TestBed.get<Location>(Location);
		fixture.detectChanges();
	});

	describe('when the page is loaded', () => {
		let movie: Movie;
		beforeEach(() => {
			// Overriding the mock movie so we can estimate the duration without having to inject the helper function.
			movie = new MovieBuilder().with({ runtime: 135 }).build();
			sut.movie$ = of(movie);
			fixture.detectChanges();
		});

		it('should show the header-overlay', () => {
			const HEADER_OVERLAY_CSS_SELECTOR = 'header-overlay';
			const headerOverlayElement: DebugElement = fixture.debugElement.query(By.css(HEADER_OVERLAY_CSS_SELECTOR));
			expect(headerOverlayElement).toBeTruthy();
		});

		it('should show the image poster', () => {
			const IMAGE_POSTER_CSS_SELECTOR = 'sn-image-loader';
			const imagePosterElement: DebugElement = fixture.debugElement.query(By.css(IMAGE_POSTER_CSS_SELECTOR));
			expect(imagePosterElement).toBeTruthy();
		});

		it('should show the movie title', () => {
			const MOVIE_TITLE_CSS_SELECTOR = '.movie-detail__title';
			const movieTitleElement: HTMLElement = fixture.debugElement.query(By.css(MOVIE_TITLE_CSS_SELECTOR)).nativeElement;
			expect(movieTitleElement.textContent).toContain(movie.title);
		});

		it('should show the release year', () => {
			const MOVIE_RELEASE_YEAR_CSS_SELECTOR = '.movie-detail__year';
			const movieReleaseYearElement: HTMLElement = fixture.debugElement.query(By.css(MOVIE_RELEASE_YEAR_CSS_SELECTOR))
				.nativeElement;
			const expected = new Date(movie.release_date).getFullYear();
			expect(movieReleaseYearElement.textContent).toContain(expected);
		});

		it('should show the user score', () => {
			const MOVIE_USER_SCORE_CSS_SELECTOR = '.movie-detail__user-score';
			const movieUserScoreElement: HTMLElement = fixture.debugElement.query(By.css(MOVIE_USER_SCORE_CSS_SELECTOR))
				.nativeElement;
			const expected = `${movie.vote_average * 10}% User Score`;
			expect(movieUserScoreElement.textContent).toContain(expected);
		});

		it('should show the duration', () => {
			const MOVIE_DURATION_CSS_SELECTOR = '.movie-detail__duration';
			const movieDurationElement: HTMLElement = fixture.debugElement.query(By.css(MOVIE_DURATION_CSS_SELECTOR))
				.nativeElement;
			const expected = `2h 15min`;
			expect(movieDurationElement.textContent).toContain(expected);
		});

		it('should show the overview', () => {
			const MOVIE_OVERVIEW_CSS_SELECTOR = '.movie-detail__overview';
			const movieOverviewElement: HTMLElement = fixture.debugElement.query(By.css(MOVIE_OVERVIEW_CSS_SELECTOR))
				.nativeElement;
			expect(movieOverviewElement.textContent).toContain(movie.overview);
		});

		describe('and when the back button is pressed', () => {
			beforeEach(() => {
				spyOn(location, 'back');
				sut.backButtonSelected();
			});
			it('should call location.back', () => {
				expect(location.back).toHaveBeenCalledTimes(1);
			});
		});
	});
});
