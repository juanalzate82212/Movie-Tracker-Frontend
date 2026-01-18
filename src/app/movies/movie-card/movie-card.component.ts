import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: any;

  get posterUrl(): string {
    if (!this.movie.movie.posterPath) {
      return 'assets/no-poster.png';
    }
    /*
    if (this.movie.posterPath.startsWith('http')) {
      return this.movie.movie.posterPath;
    }
    */
    return `https://image.tmdb.org/t/p/w500${this.movie.movie.posterPath}`;
  }

}
