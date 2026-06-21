import { SearchResult, SearchMovie } from "../models/SearchResult";
import { createMovieCard } from "./MovieCard";

export class SearchView {
    private movieListEl: HTMLElement;
    private focusedIndex: number = -1;
    private movieCards: HTMLElement[] = [];

    constructor(movieListEl: HTMLElement) {
        this.movieListEl = movieListEl;
    }

    showLoading(): void {
        this.movieListEl.empty();
        this.movieListEl.createEl('span', { text: "Loading..." });
        this.movieCards = [];
        this.focusedIndex = -1;
    }

    showResults(
        result: SearchResult,
        genresMap: Record<number, string>,
        onMovieClick: (movieId: number) => void
    ): void {
        this.movieListEl.empty();
        if (result.results.length === 0) {
            this.movieListEl.createDiv({ text: "Nothing found(" });
            return;
        }
        result.results.forEach((movie: SearchMovie) => {
            const card = createMovieCard(movie, genresMap);
            card.setAttribute('tabindex', '0');
            card.addEventListener('click', () => {
                onMovieClick(movie.id);
            });
            this.movieListEl.appendChild(card);
            this.movieCards.push(card);
        });
    }

    showError(): void {
        this.movieListEl.empty();
        this.movieListEl.createDiv({ text: "Oops, something went wrong. Please try again." });
        this.movieCards = [];
        this.focusedIndex = -1;
    }

    focusNext(): void {
        if (this.movieCards.length === 0) {
            return;
        };

        this.clearFocus();
        this.focusedIndex = Math.min(this.focusedIndex + 1, this.movieCards.length - 1);
        this.applyFocus();
    }

    focusPrevious(): void {
        if (this.movieCards.length === 0) {
            return;
        };

        this.clearFocus();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        this.applyFocus();
    }

    getFocusedMovieId(): number | null {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.movieCards.length) {
            const id = this.movieCards[this.focusedIndex]?.id;
            return id ? parseInt(id) : null;
        }
        return null;
    }

    private clearFocus(): void {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.movieCards.length){
            this.movieCards[this.focusedIndex]?.classList.remove('fucused');
        }
    }

    private applyFocus(): void {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.movieCards.length){
            this.movieCards[this.focusedIndex]?.classList.add('fucused');
            this.movieCards[this.focusedIndex]?.focus();
            this.movieCards[this.focusedIndex]?.scrollIntoView({ 
                block: 'center',
                behavior: 'smooth'
            });
        }
    }
}
