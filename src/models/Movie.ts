import { Collection } from "./Collection";
import { Genre } from "./Genre";
import { Companie } from "./Companie";
import { Countrie } from "./Countrie";
import { Language } from "./Language";

export interface Movie {
  adult: boolean;
  belongs_to_collection?: Collection;
  budget: number;
  genres: Genre[];
  homepage?: string;
  TMDbID: number;
  IMDbID: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: Companie[];
  production_countries: Countrie[];
  release_date: string; // ISO date string
  revenue: number;
  runtime: number;
  softcore?: boolean;
  spoken_languages: Language[];
  status: string;
  tagline?: string;
  title: string;
  vote_average: number;
  vote_count: number;
}