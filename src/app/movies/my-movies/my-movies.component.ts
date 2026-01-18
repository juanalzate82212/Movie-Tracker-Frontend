import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/movie.model';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.css'],
})
export class MyMoviesComponent implements OnInit {
  movies: Movie[] = [];
  loading = true;

  constructor(
    private moviesService: MoviesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.moviesService.getMyMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Películas cargadas', movies);
      },
      error: (err) => {
        console.error('Error cargando películas', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
