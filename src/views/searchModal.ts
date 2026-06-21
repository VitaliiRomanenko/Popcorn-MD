import { App, Modal, TFile, Notice } from "obsidian";
import { PopcornMDSettings } from "../settings/settings";
import PopcornMD from "../main";
import { SearchController } from "../controllers/SearchController";
import { SearchView } from "./SearchView";

/**
 * Modal that allows the user to search for movies and create notes from the results.
 */
export class SearchModal extends Modal {
    /** Handles search logic and movie data retrieval. */
    private controller: SearchController;
    /** Renders and manages the movie results list. */
    private view!: SearchView;
    /** The search input field element. */
    private input!: HTMLInputElement;

    /**
     * @param app     - The Obsidian App instance.
     * @param settings - Plugin settings (API key, language, etc.).
     * @param plugin   - The main plugin instance.
     */
    constructor(app: App, settings: PopcornMDSettings, plugin: PopcornMD) {
        super(app);
        this.controller = new SearchController(app, settings, plugin);
    }

    /**
     * Called when the modal opens. Initialises the controller, builds the UI,
     * and attaches keyboard event listeners.
     */
    async onOpen(): Promise<void> {
        await this.controller.init();

        const { contentEl } = this;
        const container = contentEl.createDiv('searchModal-container');

        container.createEl('h1', { text: "Popcorn-MD" });
        this.input = container.createEl("input", {
            type: "search",
            placeholder: "Enter movie name or IMDb id"
        });
        const movieList = container.createDiv("movie-list");

        // Initialise the SearchView to render and manage the movie results list within the provided container element
        this.view = new SearchView(movieList);

        this.input.focus(); // set search input focused

        container.addEventListener("keydown", (event: KeyboardEvent) => {
                switch (event.key){
                case "ArrowDown":
                    event.preventDefault();
                    this.view.focusNext();
                    break;
                case "ArrowUp":
                        event.preventDefault();
                    this.view.focusPrevious();
                        break;

                case "Escape":
                    this.close();
                        break;

                case "Enter":
                    this.handleKeyboardSelection()
                    break;
                }
        });

        this.input.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                void this.handleSearch(event);
        }
            // Let arrow keys propagate to container
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.stopPropagation();  // Don't let container handle it here
                // Trigger the container's event listener manually
                container.dispatchEvent(new KeyboardEvent('keydown', { key: event.key }));
            }
        });
    }

    /** Clears the modal content when it is closed. */
    onClose(): void {
        this.contentEl.empty();
    }

    /**
     * Handles a search request triggered by pressing Enter in the input field.
     *
     * @param event - The keyboard event that triggered the search.
     */
    private async handleSearch(event: KeyboardEvent) {
        event.preventDefault();
        const query = (event.target as HTMLInputElement).value.trim();
        if (query.length === 0) {
            return;
        }
        this.view.showLoading();
        try {
            const result = await this.controller.search(query);
            const genresMap = this.controller.buildGenresMap(
                result.results.flatMap(m => m.genre_ids)
            );
            this.view.showResults(result, genresMap, (movieId: number) => {
                void this.handleMovieSelection(movieId);
            });
            this.view.focusNext();
        } catch (error) {
            console.error("Search error:", error);
            this.view.showError();
        }
    }
    
    /**
     * Handles the Enter key press when a movie card is focused.
     * Retrieves the currently focused movie ID and triggers note creation.
     */
    private handleKeyboardSelection(): void{
        const movieId = this.view.getFocusedMovieId();
        if (movieId !== null) {
            void this.handleMovieSelection(movieId);
        }
    }

    /**
     * Creates a note for the selected movie and opens it in the editor.
     *
     * @param movieId - The TMDb ID of the movie to create a note for.
     */
    private async handleMovieSelection(movieId: number) {
        let note: TFile | null = null;
        try {
            note = await this.controller.createNote(movieId);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            new Notice(message);
            return;
        }
        if (note) {
            await this.app.workspace.openLinkText(note.path, "", true);
        }
        this.close();
    }
}

