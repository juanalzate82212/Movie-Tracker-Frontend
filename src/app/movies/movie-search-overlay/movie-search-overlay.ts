import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-search-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-search-overlay.html',
  styleUrl: './movie-search-overlay.css',
})
export class MovieSearchOverlay implements OnInit {
  constructor(
    private moviesService: MoviesService,
    //private cdr: ChangeDetectorRef,
    //private zone: NgZone,
  ) { }
  @Output() close = new EventEmitter<void>();

  searchControl = new FormControl('');
  results: any[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query || query.length < 2) {
            return of([]);
          }
          return this.moviesService.searchMovies(query);
        }),
        takeUntil(this.destroy$)
      ).subscribe((movies: any[]) => {
        this.results = [...movies];
        console.log('Buscando:', movies);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeOverlay() {
    this.close.emit();
  }
}
