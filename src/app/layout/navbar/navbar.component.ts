import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MovieSearchOverlay } from "../../movies/movie-search-overlay/movie-search-overlay";
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MovieSearchOverlay, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showNavBar = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.showNavBar =
        this.authService.isLoggedIn() &&
        !['/login', '/register'].includes(event.urlAfterRedirects);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  //isLoggedIn() {
  //  return this.authService.isLoggedIn();
  //}

  searchOpen = false;

  openSearch() {
    this.searchOpen = true;
  }

  closeSearch() {
    this.searchOpen = false;
  }
}
