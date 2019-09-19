import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'movies' },
	{ path: 'movies', component: MoviesComponent },
	{ path: 'movies/:id', component: MovieDetailComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
