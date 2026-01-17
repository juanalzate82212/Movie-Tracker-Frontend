import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-search-overlay.html',
  styleUrl: './movie-search-overlay.css',
})
export class MovieSearchOverlay {
  @Output() close = new EventEmitter<void>();

  searchControl = new FormControl('');
  results: any[] = [];
  loading = false;
  searched = false;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  search(): void {
    const query = this.searchControl.value?.trim();

    if (!query || query.length < 2) {
      this.results = [];
      this.searched = false;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.searched = true;

    this.moviesService.searchMovies(query).subscribe({
      next: (movies) => {
        console.log('RESPUESTA', movies);
        console.log('ANTES loading', this.loading);
        this.results = movies;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('DESPUES loading', this.loading);

      },
      error: (error) => {
        console.error('Error searching movies:', error);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
  
  selectMovie(movie: any) {
    this.close.emit();
    this.router.navigate(['/movies', movie.tmdbId]);
  }

  closeOverlay() {
    this.close.emit();
  }
}
