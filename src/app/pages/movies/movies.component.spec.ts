import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as uuid from 'uuid';

import { ConfigurationService } from '../../services/configuration/configuration.service';
import { MovieBuilder } from '../../testing/builders/movie.builder';
import { MoviesComponent } from './movies.component';
import { MoviesService, StoreService } from '../../services';

describe('MoviesComponent', () => {
	let sut: MoviesComponent;
	let fixture: ComponentFixture<MoviesComponent>;
	let storeService: StoreService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			declarations: [MoviesComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [MoviesService, ConfigurationService, StoreService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MoviesComponent);
		sut = fixture.componentInstance;
		storeService = TestBed.get<StoreService>(StoreService);
	});

	describe('when the page is loaded', () => {
		it('should show the search bar', () => {
			const SEARCH_BAR_CSS_SELECTOR = 'search-bar';
			const searchBarElement: DebugElement = fixture.debugElement.query(By.css(SEARCH_BAR_CSS_SELECTOR));
			expect(searchBarElement).toBeTruthy();
		});

		it('should show the header overlay', () => {
			const HEADER_OVERLAY_CSS_SELECTOR = 'header-overlay';
			const headerOverlayElement: DebugElement = fixture.debugElement.query(By.css(HEADER_OVERLAY_CSS_SELECTOR));
			expect(headerOverlayElement).toBeTruthy();
		});
		describe('and the list of most popular movies is returned', () => {
			beforeEach(() => {
				// Emulating popular movies being emitted.
				sut.movies$ = of([new MovieBuilder().build()]);
				fixture.detectChanges();
			});

			it('should display the right heading', () => {
				const POPULAR_MOVIES_HEADING_CSS_SELECTOR = '.movies__heading';
				const popularMoviesHeadingElement: HTMLElement = fixture.debugElement.query(
					By.css(POPULAR_MOVIES_HEADING_CSS_SELECTOR)
				).nativeElement;
				const expected = 'Popular Movies';

				expect(popularMoviesHeadingElement.textContent).toBe(expected);
			});
		});

		describe('and the user searches for a movie', () => {
			let searchValue: string;
			beforeEach(async () => {
				searchValue = uuid();
				storeService.setValue(searchValue);
				fixture.detectChanges();
			});

			describe('and the results set is empty and data is not being fetched', () => {
				beforeEach(() => {
					sut.movies$ = of([]);
					sut.isFetchingData = false;
					fixture.detectChanges();
				});

				it('should display no results found', () => {
					const MOVIES_EMPTY_CSS_SELECTOR = '.movies__items-empty';
					const moviesEmptyElement: HTMLElement = fixture.debugElement.query(By.css(MOVIES_EMPTY_CSS_SELECTOR))
						.nativeElement;
					const expected = `No results found for: ${searchValue}`;
					expect(moviesEmptyElement.textContent).toContain(expected);
				});
			});
		});

		describe('and the user searches with an empty query', () => {
			beforeEach(async () => {
				storeService.setValue('');
				fixture.detectChanges();
			});

			it('should display the popular movies heading', () => {
				const POPULAR_MOVIES_HEADING_CSS_SELECTOR = '.movies__heading';
				const popularMoviesHeadingElement: HTMLElement = fixture.debugElement.query(
					By.css(POPULAR_MOVIES_HEADING_CSS_SELECTOR)
				).nativeElement;
				const expected = 'Popular Movies';
				expect(popularMoviesHeadingElement.textContent).toBe(expected);
			});
		});
	});
});
