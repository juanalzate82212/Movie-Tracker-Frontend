import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../my-account/favorites/favorites.service';

@Component({
  selector: 'app-movie-detail-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail-page.html',
  styleUrl: './movie-detail-page.css',
})
export class MovieDetailPageComponent {
  tmdbId!: number;
  movie: any;
  loading = true;

  showAddForm = false;

  status: 'pending' | 'watched' = 'pending';
  rating?: number;

  successMessage = '';
  errorMessage = '';

  isFavorite = false;
  favorites: number[] = [];
  favoriteLoading = false;
  favoriteError = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tmdbId = Number(params.get('tmdbId'));
      this.resetState();
      this.loadMovie();
    });

    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.isFavorite = favorites.includes(this.tmdbId);
      }
    })
  }

  loadMovie(){
    this.loading = true;
    this.movieService.getMovieDetail(this.tmdbId).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  resetState() {
    this.showAddForm = false;
    this.status = 'pending';
    this.rating = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  get posterUrl(): string {
    if (!this.movie.posterPath) {
      return 'assets/no-poster.png';
    }
    return `https://image.tmdb.org/t/p/w500${this.movie.posterPath}`;
  }

  openAddModal() {
    this.showAddForm = true;
  }

  closeAddModal() {
    this.showAddForm = false;
  }

  addMovie() {
    if (this.status === 'watched' && (!this.rating || this.rating < 1 || this.rating > 10)) {
      this.errorMessage = 'La calificación debe estar entre 1 y 10.';
      this.cdr.detectChanges();
      return;
    }
    this.movieService.addMovie({
      tmdbId: this.tmdbId,
      status: this.status,
      rating: this.status === 'watched' ? this.rating : undefined,
    }).subscribe({
      next: () => {
        //alert('Película agregada a tu lista!');
        this.successMessage = '¡Película agregada a tu lista!';
        this.errorMessage = '';
        this.showAddForm = false;
        this.rating = undefined;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      },
      error: () => {
        alert('Error al agregar la película.');
        this.successMessage = '';
        this.errorMessage = 'Error al agregar la película.';
        this.cdr.detectChanges();
      }
    });
  }

  toggleFavorite() {
    this.favoriteError = '';
    this.favoriteLoading = true;

    let updatedFavorites: number[];

    if (this.isFavorite) {
      updatedFavorites = this.favorites.filter(id => id !== this.tmdbId);
    } else {
      if (this.favorites.length >= 5) {
        this.favoriteError = 'Solo puedes tener 5 favoritas';
        this.favoriteLoading = false;
        this.cdr.detectChanges();
        return;
      }
      updatedFavorites = [...this.favorites, this.tmdbId];
    }

    this.favoritesService.updateFavorites(updatedFavorites).subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.isFavorite = favorites.includes(this.tmdbId);
        this.favoriteLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.favoriteError = 'Error actualizando favoritas';
        this.favoriteLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
