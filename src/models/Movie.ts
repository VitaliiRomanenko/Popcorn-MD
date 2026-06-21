import { Collection } from "./Collection";
import { Genre } from "./Genre";
import { Companie } from "./Companie";
import { Countrie } from "./Countrie";
import { Language } from "./Language";

/**
 * Represents a movie as returned by the TMDb API.
 */
export interface Movie {
  /** Whether the movie is for adults only. */
  adult: boolean;
  /** The collection (franchise) the movie belongs to, if any. */
  belongs_to_collection?: Collection;
  /** The budget of the movie in USD. */
  budget: number;
  /** The genres associated with the movie. */
  genres: Genre[];
  /** The movie's official homepage URL. */
  homepage?: string;
  /** The TMDb ID of the movie. */
  id: number;
  /** The IMDb ID of the movie (e.g., "tt0133093"). */
  imdb_id: string;
  /** The countries of origin. */
  origin_country: string[];
  /** The ISO 639‑1 code of the original language. */
  original_language: string;
  /** The original title of the movie. */
  original_title: string;
  /** A short overview or synopsis of the movie. */
  overview: string;
  /** The popularity score as computed by TMDb. */
  popularity: number;
  /** Optional path to the poster image. */
  poster_path?: string;
  /** The production companies involved. */
  production_companies: Companie[];
  /** The production countries involved. */
  production_countries: Countrie[];
  /** The release date in ISO 8601 format (e.g., "2024-01-15"). */
  release_date: string;
  /** The revenue of the movie in USD. */
  revenue: number;
  /** The runtime in minutes. */
  runtime: number;
  /** Whether the movie is considered softcore adult content. */
  softcore?: boolean;
  /** The spoken languages in the movie. */
  spoken_languages: Language[];
  /** The current status of the movie (e.g., "Released", "Post Production"). */
  status: string;
  /** The tagline of the movie. */
  tagline?: string;
  /** The display title of the movie. */
  title: string;
  /** The average vote score (0‑10). */
  vote_average: number;
  /** The number of votes received. */
  vote_count: number;
}
