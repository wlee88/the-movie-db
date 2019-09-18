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

const PAGES = [PopularMoviesComponent, MovieDetailComponent, NotFoundComponent];

const APP_COMPONENTS = [AppComponent, HeaderComponent];
@NgModule({
	declarations: [...APP_COMPONENTS, ...PAGES, SearchBarComponent, MovieItemComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
