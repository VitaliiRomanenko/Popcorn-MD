/**
 * Represents the result of a movie search.
 */
export interface SearchResult {
    /** The current page of results. */
    page: number;
    /** The list of movies on this page. */
    results: SearchMovie[];
    /** The total number of pages available. */
    total_pages: number;
    /** The total number of results across all pages. */
    total_results: number;
}

/**
 * Represents a movie as returned in search results (a subset of the full Movie interface).
 */
export interface SearchMovie {
  /** Whether the movie is for adults only. */
  adult: boolean;
  /** Optional path to the backdrop image. */
  backdrop_path?: string;
  /** The TMDb ID of the movie. */
  id: number;
  /** The display title of the movie. */
  title: string;
  /** The original title of the movie. */
  original_title: string;
  /** A short overview or synopsis of the movie. */
  overview: string;
  /** Optional path to the poster image. */
  poster_path?: string;
  /** The ISO 639‑1 code of the original language. */
  original_language: string;
  /** The genre IDs associated with the movie. */
  genre_ids: number[];
  /** The popularity score as computed by TMDb. */
  popularity: number;
  /** The release date in ISO 8601 format (e.g., "2024-01-15"). */
  release_date: string;
  /** Whether the movie is considered softcore adult content. */
  softcore: boolean;
  /** Whether the movie has a video. */
  video: boolean;
  /** The average vote score (0‑10). */
  vote_average: number;
  /** The number of votes received. */
  vote_count: number;
}

/**
 * Represents the response from the TMDb find endpoint (external ID lookup).
 */
export interface FindResponse {
   /** The movie results found for the external ID. */
   movie_results: SearchMovie[];
}
