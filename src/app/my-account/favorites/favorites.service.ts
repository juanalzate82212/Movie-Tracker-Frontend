import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFavorites() {
    return this.http.get<number[]>(`${this.apiUrl}/users/me/favorites`);
  }

  updateFavorites(favorites: number[]) {
    return this.http.put<number[]>(
      `${this.apiUrl}/users/me/favorites`,
      { favorites }
    );
  }

  removeFavorite(tmdbId: number) {
    return this.http.delete<number[]>(
      `${this.apiUrl}/users/me/favorites/${tmdbId}`
    );
  }
}
