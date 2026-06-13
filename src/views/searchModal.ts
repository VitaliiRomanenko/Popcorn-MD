import { App, Modal, TFile, Notice } from "obsidian";
import { PopcornMDSettings } from "../settings/settings";
import PopcornMD from "../main";
import { SearchController } from "../controllers/SearchController";
import { SearchView } from "./SearchView";

export class SearchModal extends Modal {
    private controller: SearchController;
    private view!: SearchView;

    constructor(app: App, settings: PopcornMDSettings, plugin: PopcornMD) {
        super(app);
        this.controller = new SearchController(app, settings, plugin);
    }

    async onOpen(): Promise<void> {
        await this.controller.init();

        const { contentEl } = this;
        const container = contentEl.createDiv('searchModal-container');

        container.createEl('h1', { text: "Popcorn-MD" });
        const input = container.createEl("input", {
            type: "search",
            placeholder: "Enter movie name or IMDb id"
        });
        const movieList = container.createDiv("movie-list");
        this.view = new SearchView(movieList);

        input.addEventListener("keydown", async (event: KeyboardEvent) => {
            if (event.key === "Enter") {
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
                    this.view.showResults(result, genresMap, async (movieId: number) => {
                        let note: TFile | null = null;
                        try{
                            note = await this.controller.createNote(movieId);
                        } catch (error: any){
                            new Notice(error.message)
                            return;
                        }
                        if (note) {
                            await this.app.workspace.openLinkText(note.path, "", true);
                        }
                        this.close();
                    });
                } catch (error) {
                    console.error("Search error:", error);
                    this.view.showError();
                }
            }
        });
    }

    onClose(): void {
        this.contentEl.empty();
    }
}
