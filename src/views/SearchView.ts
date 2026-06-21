import { SearchResult, SearchMovie } from "../models/SearchResult";
import { createMovieCard } from "./MovieCard";

/**
 * Manages the display and keyboard navigation of movie search results.
 */
export class SearchView {
    /** The container element where movie cards are rendered. */
    private movieListEl: HTMLElement;
    /** The index of the currently focused movie card (-1 if no card is focused). */
    private focusedIndex: number = -1;
    /** An array of movie card elements currently displayed. */
    private movieCards: HTMLElement[] = [];

    /**
     * @param movieListEl - The container element where movie cards will be rendered.
     */
    constructor(movieListEl: HTMLElement) {
        this.movieListEl = movieListEl;
    }

    /** Shows a loading indicator while a search is in progress. */
    showLoading(): void {
        this.movieListEl.empty();
        this.movieListEl.createEl('span', { text: "Loading..." });
        this.movieCards = []; // TODO: remove
        this.focusedIndex = -1; // TODO: remove
    }

    /**
     * Renders the search results as a list of movie cards.
     *
     * @param result       - The search result containing an array of movies.
     * @param genresMap    - A mapping of genre IDs to display names.
     * @param onMovieClick - Callback invoked when a movie card is clicked.
     */
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

    /** Shows an error message when the search fails. */
    showError(): void {
        this.movieListEl.empty();
        this.movieListEl.createDiv({ text: "Oops, something went wrong. Please try again." });
        this.movieCards = [];
        this.focusedIndex = -1;
    }

    /** Moves keyboard focus to the next movie card (if any). */
    focusNext(): void {
        if (this.movieCards.length === 0) {
            return;
        };

        this.clearFocus();
        this.focusedIndex = Math.min(this.focusedIndex + 1, this.movieCards.length - 1);
        this.applyFocus();
    }

    /** Moves keyboard focus to the previous movie card (if any). */
    focusPrevious(): void {
        if (this.movieCards.length === 0) {
            return;
        };

        this.clearFocus();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        this.applyFocus();
    }

    /**
     * Returns the TMDb ID of the currently focused movie card, or null if none is focused.
     *
     * @returns The movie ID or null.
     */
    getFocusedMovieId(): number | null {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.movieCards.length) {
            const id = this.movieCards[this.focusedIndex]?.id;
            return id ? parseInt(id) : null;
        }
        return null;
    }

    /** Removes the visual focus indicator from the currently focused card. */
    private clearFocus(): void {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.movieCards.length){
            this.movieCards[this.focusedIndex]?.classList.remove('focused');
        }
    }

    /** Applies the visual focus indicator to the currently focused card and scrolls it into view. */
    private applyFocus(): void {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.movieCards.length){
            this.movieCards[this.focusedIndex]?.classList.add('focused');
            this.movieCards[this.focusedIndex]?.focus();
            this.movieCards[this.focusedIndex]?.scrollIntoView({ 
                block: 'center',
                behavior: 'smooth'
            });
        }
    }
}
