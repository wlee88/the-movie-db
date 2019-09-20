import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderOverlayComponent } from './components/header-overlay/header-overlay.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BadgeComponent } from './components/badge/badge.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DurationToHoursPipe } from './pipes/duration-to-hours/duration-to-hours.pipe';
import { ScoreAsPercentagePipe } from './pipes/score-as-percentage/score-as-percentage.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { MoviesService, StoreService } from './services';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';

const PAGES = [MoviesComponent, MovieDetailComponent, NotFoundComponent];
const APP_COMPONENTS = [AppComponent, HeaderOverlayComponent];

@NgModule({
	declarations: [
		...APP_COMPONENTS,
		...PAGES,
		SearchBarComponent,
		MovieItemComponent,
		BadgeComponent,
		DurationToHoursPipe,
		ScoreAsPercentagePipe,
		LoadingComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule, ReactiveFormsModule],
	providers: [
		MoviesService,
		StoreService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
