import { SearchResult, SearchMovie } from "../models/SearchResult";
import { createMovieCard } from "./MovieCard";

export class SearchView {
    private movieListEl: HTMLElement;

    constructor(movieListEl: HTMLElement) {
        this.movieListEl = movieListEl;
    }

    showLoading(): void {
        this.movieListEl.empty();
        this.movieListEl.createEl('span', { text: "Loading..." });
    }

    showResults(result: SearchResult, genresMap: Record<number, string>, onMovieClick: (movieId: number) => void): void {
        this.movieListEl.empty();
        if (result.results.length === 0) {
            this.movieListEl.createDiv({ text: "Nothing found(" });
            return;
        }
        result.results.forEach((movie: SearchMovie) => {
            const card = createMovieCard(movie, genresMap);
            card.addEventListener('click', () => {
                onMovieClick(movie.id);
            });
            this.movieListEl.appendChild(card);
        });
    }

    showError(): void {
        this.movieListEl.empty();
        this.movieListEl.createDiv({ text: "Oops, something went wrong. Please try again." });
    }
}
