import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Favorites } from './favorites/favorites';

interface UserProfile {
  id: string;
  email: string;
  profileImage: string;
  createdAt: string;
}

interface UserStats {
  totalMovies: number;
  watched: number;
  pending: number;
  averageRating: number | null;
  mostAddedTmdbId: number | null;
  mostAddedCount: number;
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, Favorites],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit{
  user?: UserProfile;
  stats?: UserStats;
  mostWatchedTitle?: string;
  loading = true;
  error = '';

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.http.get<UserProfile>(`${this.apiUrl}/users/me`).subscribe({
      next: (user) => {
        this.user = user;
        this.loading =  false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error cargando perfil';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.http.get<UserStats>(`${this.apiUrl}/users/me/stats`).subscribe({
      next: (stats) => {
        console.log('STATS BACKEND', stats);
        this.stats = stats;
        if(stats.mostAddedTmdbId) {
          this.fetchMostWatchedTitle(stats.mostAddedTmdbId);
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error cargando estadisticas';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get profileImageUrl(): string {
    if (!this.user?.profileImage || this.user.profileImage === 'default') {
      return 'thumbs2.png';
    }
    return this.user.profileImage;
  }

  fetchMostWatchedTitle(tmdbId: number) {
    this.http.get<any>(`${this.apiUrl}/tmdb/movie/${tmdbId}`).subscribe(
      (movie) => {
        this.mostWatchedTitle = movie.title;
        this.cdr.detectChanges();
      });
  }
}
