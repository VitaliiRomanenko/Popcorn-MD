import { AbstractInputSuggest, TFile, App} from 'obsidian';

export class FileSuggest extends AbstractInputSuggest<TFile> {
    private inputEl: HTMLInputElement;

    constructor(app: App, inputEl: HTMLInputElement){
        super(app, inputEl);
        this.inputEl = inputEl;
    }

    getSuggestions(inputStr: string): TFile[] {
        const files = this.app.vault.getFiles();
        const lowerInput = inputStr.toLowerCase();

        return files.filter(file => 
            file.extension === "md" 
            && file.path.toLocaleLowerCase().includes(lowerInput)
        );

    }
    renderSuggestion(item: TFile, el: HTMLElement): void {
        el.setText(item.path);
    }
    selectSuggestion(item: TFile): void {
        this.inputEl.value = item.path;
        this.inputEl.trigger("input");
    }
}