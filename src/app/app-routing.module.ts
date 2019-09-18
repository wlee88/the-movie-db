import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularMoviesComponent } from './pages/popular-movies/popular-movies.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'most-popular' },
	{ path: 'most-popular', component: PopularMoviesComponent },
	{ path: 'movies/:id', component: MovieDetailComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
