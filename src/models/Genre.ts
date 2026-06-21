/**
 * Represents a movie genre.
 */
export interface Genre {
  /** The TMDb ID of the genre. */
  id: number;
  /** The display name of the genre (e.g., "Action", "Comedy"). */
  name: string;
}

/**
 * Represents the response from the TMDb genre list endpoint.
 */
export interface GenreResponse {
  /** The list of genres returned by the API. */
  genres: Genre[];
}
