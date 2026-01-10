import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register';
import { MyMoviesComponent } from './movies/my-movies/my-movies.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'movies',
    canActivate: [authGuard],
    children: [
      { path: '', component: MyMoviesComponent },
      { path: 'search', component: MovieSearchComponent },
      { path: ':id', component: MovieDetailComponent },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
