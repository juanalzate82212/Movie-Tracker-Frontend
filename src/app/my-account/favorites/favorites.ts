import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { MoviesService } from '../../movies/movies.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  favoritesIds: number[] = [];
  favoriteSlots: (any | null)[] = [];
  movies: any[] = [];
  loading = true;

  constructor(
    private favoritesService: FavoritesService,
    private movieService: MoviesService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;

    this.favoritesService.getFavorites().subscribe(ids => {
      this.favoritesIds = ids;

      Promise.all(
        ids.map(id => this.movieService.getMovieDetail(id).toPromise())
      ).then(movies => {
        this.movies = movies;
        this.buildSlots();
        this.loading = false;
        this.cdr.detectChanges();
      });
    });
  }

  buildSlots() {
    this.favoriteSlots = Array(5).fill(null);
    this.movies.forEach((movie, index) => {
      if (index < 5) {
        this.favoriteSlots[index] = movie;
      }
    });
  }

  remove(tmdbId: number) {
    this.favoritesService.removeFavorite(tmdbId).subscribe(() => {
      this.loadFavorites();
    });
  }
}
