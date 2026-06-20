import { App, TFile } from "obsidian";
import { SearchResult } from "../models/SearchResult";
import { TMDbGenreService } from "../api/tmdbGenreService";
import { TMDbMovieService } from "../api/tmdbMovieService";
import { MovieNoteService } from "../commands/MovieNoteService";
import { PopcornMDSettings } from "../settings/settings";
import PopcornMD from "../main";

export class SearchController {
    private genreService: TMDbGenreService;
    private movieService: TMDbMovieService;
    private movieNoteService: MovieNoteService;
    private templatePath: string;

    constructor(app: App, settings: PopcornMDSettings, plugin: PopcornMD) {
        this.genreService = new TMDbGenreService(settings);
        this.movieService = new TMDbMovieService(settings);
        this.movieNoteService = new MovieNoteService(plugin.app.vault, settings.defaultFolder);
        this.templatePath = settings.templateFile;
    }

    async init(): Promise<void> {
        await this.genreService.init();
    }

    async search(query: string): Promise<SearchResult> {
        return await this.movieService.searchMovie(query);
    }

    async getMovieById(id: number) {
        return await this.movieService.getMovieById(id);
    }

    async createNote(movieId: number): Promise<TFile | null> {
        const movie = await this.movieService.getMovieById(movieId);
        if (!movie) {
            return null;
        }

        const note = await this.movieNoteService.createMovieNote(movie, this.templatePath);
        return note;
    }

    buildGenresMap(genreIds: number[]): Record<number, string> {
        const genres = this.genreService.mapGenreIds(genreIds);
        const genresMap: Record<number, string> = {};
        genres.forEach(g => {
            genresMap[g.id] = g.name;
        });
        return genresMap;
    }
}

