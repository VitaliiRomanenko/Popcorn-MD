import { Movie } from "../models/Movie";
import { SearchResult, SearchMovie, FindResponce } from "../models/SearchResult";
import { TMDbAPIService, PluginsSettings } from "./tmdbAPIService";


export class TMDbMovieService extends TMDbAPIService {

    constructor(settings: PluginsSettings) {
        super(settings);
    }

    public async searchMovie (query: string): Promise<SearchResult>{
        const imdbPattern = /^tt\d{7,}$/; //tt0133093 IMDb_id format

        if (imdbPattern.test(query)) {
            return await this.getMovieByIMDbId(query)
        } else {
            return await this.searchMovieByName(query);
        }
    }

    public async getMovieById(id: number): Promise<Movie | null>{
        try {
            return await this.fetchFromTMDb<Movie>(`/movie/${id.toString()}`);
        } catch (error){
            if (error instanceof Error && error.message.includes("404")){
                return null;
            }
            throw error;
        }
    }

    private async getMovieByIMDbId(query: string): Promise<SearchResult>{
        let data: FindResponce;
        let movies: SearchMovie[];
        try {
            data = await this.fetchFromTMDb<FindResponce>(`/find/${query}`, {
                external_source: "imdb_id"
            });
            movies = (data.movie_results ?? []).map((raw: SearchMovie) => raw);
            return {
                page: 1,
                results: movies,
                total_pages: 1,
                total_results: movies.length,
            };  
        } catch (error){
            if (error instanceof Error && error.message.includes("404")){
                return {
                    page: 1,
                    results: [],
                    total_pages: 1,
                    total_results: 0,
                };  
            }
            throw error;
        }
    }

    private async searchMovieByName(query: string): Promise<SearchResult>{
        const data = await this.fetchFromTMDb<SearchResult>('/search/movie', {
            query: query
        });
        return data;
    }
}