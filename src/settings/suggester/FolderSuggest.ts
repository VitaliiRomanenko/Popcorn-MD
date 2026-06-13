import { AbstractInputSuggest, TFolder, App} from 'obsidian';

export class FolderSuggest extends AbstractInputSuggest<TFolder> {
    private inputEl: HTMLInputElement;

    constructor(app: App, inputEl: HTMLInputElement){
        super(app, inputEl);
        this.inputEl = inputEl;
    }

    getSuggestions(inputStr: string): TFolder[] {
        const folders = this.app.vault.getAllLoadedFiles()
            .filter((f): f is TFolder => f instanceof TFolder);
        
        const lowerInput = inputStr.toLowerCase();

        return folders.filter(folder => 
            folder.path.toLowerCase().includes(lowerInput)
        );
    }

    renderSuggestion(item: TFolder, el: HTMLElement): void {
        el.setText(item.path);
    }
    selectSuggestion(item: TFolder): void {
        this.inputEl.value = item.path;
        this.inputEl.trigger("input");
    }
}