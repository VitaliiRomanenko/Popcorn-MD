import { AbstractInputSuggest, TFolder, App} from 'obsidian';

/**
 * A suggestion provider that filters folders based on user input.
 * Extends Obsidian's AbstractInputSuggest to provide folder path autocompletion.
 */
export class FolderSuggest extends AbstractInputSuggest<TFolder> {
    private inputEl: HTMLInputElement;

    /**
     * @param app - The Obsidian App instance.
     * @param inputEl - The HTML input element to attach suggestions to.
     */
    constructor(app: App, inputEl: HTMLInputElement){
        super(app, inputEl);
        this.inputEl = inputEl;
    }

    /**
     * Returns an array of TFolder objects whose path contains the input string (case‑insensitive).
     * @param inputStr - The current user input.
     * @returns An array of matching TFolder objects.
     */
    getSuggestions(inputStr: string): TFolder[] {
        const folders = this.app.vault.getAllLoadedFiles()
            .filter((f): f is TFolder => f instanceof TFolder);
        
        const lowerInput = inputStr.toLowerCase();

        return folders.filter(folder => 
            folder.path.toLowerCase().includes(lowerInput)
        );
    }

    /**
     * Renders a suggestion item in the dropdown.
     * @param item - The folder to display.
     * @param el - The HTML element to populate.
     */
    renderSuggestion(item: TFolder, el: HTMLElement): void {
        el.setText(item.path);
    }

    /**
     * Handles selection of a suggestion: sets the input value to the folder path and triggers an input event.
     * @param item - The selected folder.
     */
    selectSuggestion(item: TFolder): void {
        this.inputEl.value = item.path;
        this.inputEl.trigger("input");
    }
}
