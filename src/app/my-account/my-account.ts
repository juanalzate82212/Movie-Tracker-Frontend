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

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit{
  user?: UserProfile;
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
    })
  }
}
