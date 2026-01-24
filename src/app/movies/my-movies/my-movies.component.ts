import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/movie.model';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule],
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.css'],
})
export class MyMoviesComponent implements OnInit {
  movies: Movie[] = [];
  loading = true;

  constructor(
    private moviesService: MoviesService,
    private cdr: ChangeDetectorRef
  ) { }

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

  deleteMovie(movieId: string) {
    this.moviesService.deleteMovie(movieId).subscribe({
      next: () => {
        this.movies = this.movies.filter(movie => movie.id !== movieId);
        this.cdr.detectChanges();
        console.log('Película eliminada', movieId);
      },
      error: (err) => {
        console.error('Error eliminando película', err);
      },
    });
  }

  filterText = '';
  filterStatus: 'all' | 'pending' | 'watched' = 'all';
  sortBy: 'title' | 'releaseDate' | 'createdAt' | 'rating' = 'createdAt';

  get filteredMovies() {
    let movies = [...this.movies];

    //Por título
    if (this.filterText.trim()) {
      const text = this.filterText.toLowerCase();
      movies = movies.filter(m =>
        m.movie.title.toLowerCase().includes(text)
      );
    }

    //Por estado
    if (this.filterStatus !== 'all') {
      movies = movies.filter(m => m.status === this.filterStatus);
    }

    //Ordenar
    movies.sort((a, b) => {
      switch (this.sortBy) {

        case 'rating': {
          const ratingA = a.rating ?? -1;
          const ratingB = b.rating ?? -1;
          return ratingB - ratingA;
        }

        case 'title':
          return a.movie.title.localeCompare(b.movie.title);

        case 'createdAt':
        default:
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
      }
    });
    return movies;
  }
}
