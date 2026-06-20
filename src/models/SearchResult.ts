export interface SearchResult {
    page: number;
    results: SearchMovie[];
    total_pages: number;
    total_results: number
}

export interface SearchMovie {
  adult: boolean;
  backdrop_path?: string;
  id: number; // TMDb ID
  title: string;
  original_title: string;
  overview: string;
  poster_path?: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FindResponse {
   movie_results: SearchMovie[];
}