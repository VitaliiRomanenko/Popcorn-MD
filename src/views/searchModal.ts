import { App, Modal, Plugin, RelativeDateValue } from "obsidian";
import { SearchMovie, SearchResult } from "../models/SearchResult";
import { createMovieCard } from "./MovieCard"
import { TMDbGanreService } from "../api/tmdbGenreService";
import { PopcornMDSettings } from "../settings/settings";
import { TMDbMovieService } from "../api/tmdbMovieService";

export class SearchModal extends Modal {
    private genreService: TMDbGanreService;
    private movieService: TMDbMovieService;
    constructor(app: App, settings: PopcornMDSettings) {
        super(app);
        this.genreService = new TMDbGanreService({ apiKey: settings.APIKey, language: settings.language });
        this.movieService = new TMDbMovieService({ apiKey: settings.APIKey, language: settings.language });
        this.genreService.init();
    }

    onOpen(): Promise<void> | void {
        const { contentEl } = this;
        const container = contentEl.createDiv('searchModal-container');

        container.createEl('h1', { text: "Popcorn-MD" });
        const input = container.createEl("input", {
            type: "search",
            placeholder: "Enter movie name or IMDb id"
        })
        const movieList = container.createDiv("movie-list");
        input.addEventListener("keydown", async (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const query = (event.target as HTMLInputElement).value.trim();
                if (query.length === 0) {
                    return;
                }
                movieList.empty();
                let result: SearchResult;
                movieList.empty();
                try {
                    result = await this.movieService.searchMovie(query);
                    if (result.results.length !== 0) {
                        result.results.forEach(movie => {
                            movieList.appendChild(
                                createMovieCard(movie, this.buildGenresMap(movie))
                            );
                        });
                    } else {
                        movieList.createDiv({ text: "Nothing found(" });
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    movieList.createDiv({ text: "Oops, something went wrong. Please try again." });
                }
            }
        })

    }

    onClose(): void {
        this.contentEl.empty();
    }

    private buildGenresMap(movie: { genre_ids: number[] }): Record<number, string> {
        const genres = this.genreService.mapGenreIds(movie.genre_ids);
        const genresMap: Record<number, string> = {};

        genres.forEach(g => {
            genresMap[g.id] = g.name;
        });

        return genresMap;
    }
}