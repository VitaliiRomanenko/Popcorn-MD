import {TAbstractFile, TFile} from 'obsidian';
import {TextInputSuggest} from './suggest';

export class FileSuggest extends TextInputSuggest<TFile> {
    getSuggestions(inputStr: string): TFile[] {
        const abstractFiles = this.app.vault.getAllLoadedFiles();
        const files: TFile[] = [];
        const lowerCaseInputStr = inputStr.toLowerCase();

        abstractFiles.forEach((file: TAbstractFile) => {
            if (file instanceof TFile && file.path.toLowerCase().contains(lowerCaseInputStr) && file.extension === 'md') {
                files.push(file);
            }
        });
        return files;
    }
    renderSuggestion(item: TFile, el: HTMLElement): void {
        el.setText(item.path);
    }
    selectSuggestion(item: TFile): void {
        this.inputEl.value = item.path;
        this.inputEl.trigger('input');
        this.close();
    }
}