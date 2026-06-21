import { App, TFile } from "obsidian";
import { SearchResult } from "../models/SearchResult";
import { TMDbGenreService } from "../api/tmdbGenreService";
import { TMDbMovieService } from "../api/tmdbMovieService";
import { MovieNoteService } from "../commands/MovieNoteService";
import { PopcornMDSettings } from "../settings/settings";
import PopcornMD from "../main";

/**
 * Controller that orchestrates the search workflow.
 * It initialises the genre service, performs movie searches,
 * retrieves movie details, creates notes, and builds genre maps.
 */
export class SearchController {
    private genreService: TMDbGenreService;
    private movieService: TMDbMovieService;
    private movieNoteService: MovieNoteService;
    private templatePath: string;

    /**
     * @param app - The Obsidian App instance.
     * @param settings - The plugin settings (API key, language, etc.).
     * @param plugin - The main plugin instance, used to access the vault.
     */
    constructor(app: App, settings: PopcornMDSettings, plugin: PopcornMD) {
        this.genreService = new TMDbGenreService(settings);
        this.movieService = new TMDbMovieService(settings);
        this.movieNoteService = new MovieNoteService(plugin.app.vault, settings.defaultFolder);
        this.templatePath = settings.templateFile;
    }

    /**
     * Initialises the genre service by fetching the genre list from TMDb.
     * Must be called before any search operation.
     */
    async init(): Promise<void> {
        await this.genreService.init();
    }

    /**
     * Searches for movies by name or IMDb ID.
     *
     * @param query - The search query (movie title or IMDb ID).
     * @returns A promise that resolves to the search result.
     */
    async search(query: string): Promise<SearchResult> {
        return await this.movieService.searchMovie(query);
    }

    /**
     * Retrieves detailed information for a specific movie by its TMDb ID.
     *
     * @param id - The TMDb movie ID.
     * @returns A promise that resolves to the movie object, or null if not found.
     */
    async getMovieById(id: number) {
        return await this.movieService.getMovieById(id);
    }

    /**
     * Creates a movie note in the vault for the given TMDb movie ID.
     *
     * @param movieId - The TMDb movie ID.
     * @returns A promise that resolves to the created TFile, or null if the movie was not found.
     */
    async createNote(movieId: number): Promise<TFile | null> {
        const movie = await this.movieService.getMovieById(movieId);
        if (!movie) {
            return null;
        }

        const note = await this.movieNoteService.createMovieNote(movie, this.templatePath);
        return note;
    }

    /**
     * Builds a map from genre IDs to their display names using the cached genre data.
     *
     * @param genreIds - An array of TMDb genre IDs.
     * @returns A record mapping each genre ID to its name.
     */
    buildGenresMap(genreIds: number[]): Record<number, string> {
        const genres = this.genreService.mapGenreIds(genreIds);
        const genresMap: Record<number, string> = {};
        genres.forEach(g => {
            genresMap[g.id] = g.name;
        });
        return genresMap;
    }
}

