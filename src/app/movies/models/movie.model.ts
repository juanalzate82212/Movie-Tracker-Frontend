export interface Movie {
  id: string;
  tmdbId: number;
  status: 'watched' | 'pending';
  rating?: number;

  movie: {
    tmdbId: number;
    title: string;
    overview: string;
    releaseDate: string;
    runtime: number;
    genres: string[];
    posterPath?: string;
  };
}

