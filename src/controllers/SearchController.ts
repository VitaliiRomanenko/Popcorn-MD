import { App, TFile } from "obsidian";
import { SearchResult } from "../models/SearchResult";
import { TMDbGanreService } from "../api/tmdbGenreService";
import { TMDbMovieService } from "../api/tmdbMovieService";
import { createMovieNote } from "../commands/createMovieNote";
import { PopcornMDSettings } from "../settings/settings";
import PopcornMD from "../main";

export class SearchController {
    private genreService: TMDbGanreService;
    private movieService: TMDbMovieService;
    private plugin: PopcornMD;
    private templatePath: string;

    constructor(app: App, settings: PopcornMDSettings, plugin: PopcornMD) {
        this.genreService = new TMDbGanreService({ apiKey: settings.APIKey, language: settings.language });
        this.movieService = new TMDbMovieService({ apiKey: settings.APIKey, language: settings.language });
        this.plugin = plugin;
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
        const note = await createMovieNote(movie, this.plugin.app.vault, this.templatePath);
        if (note instanceof TFile) {
            return note;
        }
        return null;
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
