import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.tmdbId = Number(this.route.snapshot.paramMap.get('tmdbId'));

    this.movieService.getMovieDetail(this.tmdbId).subscribe(movie => {
      this.movie = movie;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  get posterUrl(): string {
    if (!this.movie.posterPath) {
      return 'assets/no-poster.png';
    }
    return `https://image.tmdb.org/t/p/w500${this.movie.posterPath}`;
  }

  showAddForm = false;

  status: 'pending' | 'watched' = 'pending';
  rating?: number;

  openAddModal() {
    this.showAddForm = true;
  }

  closeAddModal() {
    this.showAddForm = false;
  }

  addMovie() {
    this.movieService.addMovie({
      tmdbId: this.tmdbId,
      status: this.status,
      rating: this.status === 'watched' ? this.rating : undefined,
    }).subscribe(() => {
      alert('Película agregada a tu lista!');
      this.showAddForm = false;
    });
  }
}
