import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MovieSearchOverlay } from "../../movies/movie-search-overlay/movie-search-overlay";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MovieSearchOverlay],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  searchOpen = false;

  openSearch() {
    this.searchOpen = true;
  }

  closeSearch() {
    this.searchOpen = false;
  }
}
