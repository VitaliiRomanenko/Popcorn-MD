import { Movie } from "../models/Movie";
import { SearchResult, SearchMovie, FindResponse } from "../models/SearchResult";
import { PopcornMDSettings } from "../settings/settings";
import { TMDbAPIService } from "./tmdbAPIService";


/**
 * Service for searching and retrieving movie data from the TMDb API.
 * Supports both name‑based search and IMDb ID lookup.
 */
export class TMDbMovieService extends TMDbAPIService {
    /** Whether adult‑rated content should be included in search results. */
    private adultContent: boolean;

    /**
     * Creates a new TMDbMovieService instance.
     * @param settings - Plugin settings (API key, language, adult content flag, etc.).
     */
    constructor(settings: PopcornMDSettings) {
        super(settings);
        this.adultContent = settings.adult_content;
    }

    /**
     * Searches for a movie by name or by IMDb ID.
     *
     * If the query matches the IMDb ID pattern (`tt` followed by 7+ digits),
     * the method performs a lookup via the `/find/{imdb_id}` endpoint.
     * Otherwise it performs a standard text search via `/search/movie`.
     *
     * @param query - The search string (movie title or IMDb ID).
     * @returns A promise that resolves to a {@link SearchResult} containing matching movies.
     */
    public async searchMovie (query: string): Promise<SearchResult>{
        const imdbPattern = /^tt\d{7,}$/; //tt0133093 IMDb_id format

        if (imdbPattern.test(query)) {
            return await this.getMovieByIMDbId(query)
        } else {
            return await this.searchMovieByName(query);
        }
    }

    /**
     * Retrieves detailed information for a single movie by its TMDb ID.
     *
     * @param id - The TMDb movie ID.
     * @returns A promise that resolves to the {@link Movie} object, or `null` if the movie is not found (HTTP 404).
     * @throws Will throw an error for any non‑404 failure.
     */
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

    /**
     * Looks up a movie using its IMDb ID via the TMDb `/find/{imdb_id}` endpoint.
     *
     * @param query - The IMDb ID (e.g., "tt0133093").
     * @returns A promise that resolves to a {@link SearchResult} containing the matching movie(s).
     *          Returns an empty result set if the IMDb ID is not found (HTTP 404).
     */
    private async getMovieByIMDbId(query: string): Promise<SearchResult>{
        let data: FindResponse;
        let movies: SearchMovie[];
        try {
            data = await this.fetchFromTMDb<FindResponse>(`/find/${query}`, {
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

    /**
     * Performs a text‑based movie search via the TMDb `/search/movie` endpoint.
     *
     * @param query - The movie title to search for.
     * @returns A promise that resolves to a {@link SearchResult} containing matching movies.
     */
    private async searchMovieByName(query: string): Promise<SearchResult>{
        const data = await this.fetchFromTMDb<SearchResult>('/search/movie', {
            query: query,
            include_adult: String(this.adultContent)
        });
        return data;
    }
}
