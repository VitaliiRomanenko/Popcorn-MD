import { AbstractInputSuggest, TFile, App} from 'obsidian';

/**
 * A suggestion provider that filters Markdown files based on user input.
 * Extends Obsidian's AbstractInputSuggest to provide file path autocompletion.
 */
export class FileSuggest extends AbstractInputSuggest<TFile> {
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
     * Returns an array of TFile objects whose path contains the input string (case‑insensitive)
     * and whose extension is ".md".
     * @param inputStr - The current user input.
     * @returns An array of matching TFile objects.
     */
    getSuggestions(inputStr: string): TFile[] {
        const files = this.app.vault.getFiles();
        const lowerInput = inputStr.toLowerCase();

        return files.filter(file => 
            file.extension === "md" 
            && file.path.toLocaleLowerCase().includes(lowerInput)
        );

    }

    /**
     * Renders a suggestion item in the dropdown.
     * @param item - The file to display.
     * @param el - The HTML element to populate.
     */
    renderSuggestion(item: TFile, el: HTMLElement): void {
        el.setText(item.path);
    }

    /**
     * Handles selection of a suggestion: sets the input value to the file path and triggers an input event.
     * @param item - The selected file.
     */
    selectSuggestion(item: TFile): void {
        this.inputEl.value = item.path;
        this.inputEl.trigger("input");
    }
}
