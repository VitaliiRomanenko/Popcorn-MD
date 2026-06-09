import { App, Modal, TFile } from "obsidian";
import { SearchResult } from "../models/SearchResult";
import { createMovieCard } from "./MovieCard"
import { TMDbGanreService } from "../api/tmdbGenreService";
import { PopcornMDSettings } from "../settings/settings";
import { TMDbMovieService } from "../api/tmdbMovieService";
import { createMovieNote } from "../commands/createMovieNote";
import PopcornMD from "../main";

export class SearchModal extends Modal {
    private genreService: TMDbGanreService;
    private movieService: TMDbMovieService;
    private plugin: PopcornMD;
    private tamplatePath: string;
    constructor(app: App, settings: PopcornMDSettings, _plugin: PopcornMD) {
        super(app);
        this.genreService = new TMDbGanreService({ apiKey: settings.APIKey, language: settings.language });
        this.movieService = new TMDbMovieService({ apiKey: settings.APIKey, language: settings.language });
        this.plugin = _plugin;
        this.tamplatePath = settings.templateFile;
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
                let result: SearchResult;
                movieList.empty();
                try {
                    movieList.createEl('span', {text: "Loading..."});
                    result = await this.movieService.searchMovie(query);
                    movieList.empty();
                    if (result.results.length !== 0) {
                        result.results.forEach(movie => {
                            const card = createMovieCard(movie, this.buildGenresMap(movie));
                            card.addEventListener('click', async() => {
                                const movie = await this.movieService.getMovieById(Number(card.id));
                                
                                if(!movie){
                                    return;
                                }
                                const note = await createMovieNote(movie, this.plugin.app.vault, this.tamplatePath);
                                if (note instanceof TFile) {
                                    this.app.workspace.openLinkText(note.path, "", true);
                                }
                                this.close();
                            });
                            movieList.appendChild(card);
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