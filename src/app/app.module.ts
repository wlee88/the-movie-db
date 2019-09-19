import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PopularMoviesComponent } from './pages/popular-movies/popular-movies.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BadgeComponent } from './components/badge/badge.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DurationToHoursPipe } from './pipes/duration-to-hours/duration-to-hours.pipe';
import { ScoreAsPercentagePipe } from './pipes/score-as-percentage/score-as-percentage.pipe';

const PAGES = [PopularMoviesComponent, MovieDetailComponent, NotFoundComponent];
const APP_COMPONENTS = [AppComponent, HeaderComponent];

@NgModule({
	declarations: [
		...APP_COMPONENTS,
		...PAGES,
		SearchBarComponent,
		MovieItemComponent,
		BadgeComponent,
		DurationToHoursPipe,
		ScoreAsPercentagePipe
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
