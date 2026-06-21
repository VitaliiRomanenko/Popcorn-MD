import { App, Modal, TFile, Notice } from "obsidian";
import { PopcornMDSettings } from "../settings/settings";
import PopcornMD from "../main";
import { SearchController } from "../controllers/SearchController";
import { SearchView } from "./SearchView";

export class SearchModal extends Modal {
    private controller: SearchController;
    private view!: SearchView;
    private input!: HTMLInputElement;

    constructor(app: App, settings: PopcornMDSettings, plugin: PopcornMD) {
        super(app);
        this.controller = new SearchController(app, settings, plugin);
    }

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
        this.view = new SearchView(movieList);
        this.input.focus();
        // Key handler for navigation (listen on the whole container)
        container.addEventListener("keydown", (event: KeyboardEvent) => {
                switch (event.key){
                case "ArrowDown":
                        event.preventDefault();
                    this.view.focusNext();  // Fix typo here
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

        // Separate handler for the search input
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

    onClose(): void {
        this.contentEl.empty();
    }

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
    
    private handleKeyboardSelection(): void{
        const movieId = this.view.getFocusedMovieId();
        if (movieId !== null) {
            void this.handleMovieSelection(movieId);
        }
    }

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

