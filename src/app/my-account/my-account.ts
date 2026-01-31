import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

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
  imports: [CommonModule],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit{
  user?: UserProfile;
  stats?: UserStats;
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
}
