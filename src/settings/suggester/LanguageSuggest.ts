import {AbstractInputSuggest, App } from 'obsidian';
import { LANGUAGES, type Language} from '../language/languages';

export class LanguageSuggest extends AbstractInputSuggest<Language> {
    private inputEl: HTMLInputElement;

    constructor(app: App, inputEl: HTMLInputElement) {
        super(app, inputEl);
        this.inputEl = inputEl;
    }

    getSuggestions(inputStr: string): Language[] {
        const lower = inputStr.toLowerCase();
        if (!lower) return LANGUAGES.slice(0, 50);

        return LANGUAGES.filter(lang => 
            (lang.name || lang.english_name || '').toLowerCase().contains(lower)
            || lang.iso_639_1.toLowerCase().contains(lower)
        ).slice(0, 50);
    }
    renderSuggestion(item: Language, el: HTMLElement): void {
        el.createDiv({
            text: item.name || item.english_name
        });

        el.createDiv({
            cls: "suggestion-sub", 
            text: item.english_name
        });
    }
    selectSuggestion(item: Language): void {
        this.inputEl.value = item.name || item.english_name;
        this.inputEl.dataset['iso'] = item.iso_639_1;
        this.inputEl.trigger('input');
    }
}