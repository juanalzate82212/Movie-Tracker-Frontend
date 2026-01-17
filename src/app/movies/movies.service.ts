import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from './models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getMyMovies(): Observable<Movie[]> {
        console.log('SERVICE: getMyMovies ejecutado');
        return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
    }

    searchMovies(query: string): Observable<any[]> {
        return this.http.get<any[]>(
            `${this.apiUrl}/tmdb/search`,
            { params: { query } }
        );
    }

    getMovieDetail(tmdbId: number) {
        return this.http.get(`${this.apiUrl}/tmdb/movie/${tmdbId}`);
    }

    addMovie(data: { 
        tmdbId: number; 
        status: 'pending' | 'watched'; 
        rating?: number;
    }) {
        return this.http.post(`${this.apiUrl}/movies`, data);
    }
}
