import { Movie } from "../models/Movie";
import { SearchResult, SearchMovie } from "../models/SearchResult";
import { TMDbAPIService, PluginsSettings } from "./tmdbAPIService";


export class TMDbMovieService extends TMDbAPIService {

    constructor(settings: PluginsSettings) {
        super(settings);
    }

    public async searchMovie (query: string): Promise<SearchResult>{
        const imdbPattern = /^tt\d{7,}$/; //tt0133093 IMDb_id format

        if (imdbPattern.test(query)) {
            return this.getMovieByIMDbId(query)
        } else {
            return this.searchMovieByName(query);
        }
    }

    public async getMovieById(id: number): Promise<Movie | null>{
        const data = await this.fetchFromTMDb(`/movie/${id.toString()}`);
        if (data.success === false){
            return null;
        }
        return data as Movie;
    }

    private async getMovieByIMDbId(query: string): Promise<SearchResult>{
        const data = await this.fetchFromTMDb(`/find/${query}`, {
            external_source: "imdb_id"
        });
        const movies: SearchMovie[] = (data.movie_results ?? []).map((raw: any) => ({
            adult: raw.adult,
            backdrop_path: raw.backdrop_path,
            id: raw.id,
            title: raw.title,
            original_title: raw.original_title,
            overview: raw.overview,
            poster_path: raw.poster_path,
            original_language: raw.original_language,
            genre_ids: raw.genre_ids,
            popularity: raw.popularity,
            release_date: raw.release_date,
            softcore: raw.softcore,
            video: raw.video,
            vote_average: raw.vote_average,
            vote_count: raw.vote_count,
        }));
        return {
            page: 1,
            results: movies,
            total_pages: 1,
            total_results: movies.length,
        };
    }

    private async searchMovieByName(query: string): Promise<SearchResult>{
        const data = await this.fetchFromTMDb('/search/movie', {
            query: query
        });
        return data as SearchResult;
    }

    
}