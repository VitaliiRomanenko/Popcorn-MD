import {AbstractInputSuggest, App } from 'obsidian';
import { LANGUAGES, type Language} from '../language/languages';

/**
 * A suggestion provider that filters languages based on user input.
 * Extends Obsidian's AbstractInputSuggest to provide language autocompletion.
 */
export class LanguageSuggest extends AbstractInputSuggest<Language> {
    private inputEl: HTMLInputElement;

    /**
     * @param app - The Obsidian App instance.
     * @param inputEl - The HTML input element to attach suggestions to.
     */
    constructor(app: App, inputEl: HTMLInputElement) {
        super(app, inputEl);
        this.inputEl = inputEl;
    }

    /**
     * Returns an array of Language objects matching the input string.
     * Matches against the language name, English name, or ISO 639‑1 code (case‑insensitive).
     * @param inputStr - The current user input.
     * @returns An array of matching Language objects (up to 50).
     */
    getSuggestions(inputStr: string): Language[] {
        const lower = inputStr.toLowerCase();
        if (!lower) return LANGUAGES.slice(0, 50);

        return LANGUAGES.filter(lang => 
            (lang.name || lang.english_name || '').toLowerCase().contains(lower)
            || lang.iso_639_1.toLowerCase().contains(lower)
        ).slice(0, 50);
    }

    /**
     * Renders a suggestion item in the dropdown.
     * @param item - The language to display.
     * @param el - The HTML element to populate.
     */
    renderSuggestion(item: Language, el: HTMLElement): void {
        el.createDiv({
            text: item.name || item.english_name
        });

        el.createDiv({
            cls: "suggestion-sub", 
            text: item.english_name
        });
    }

    /**
     * Handles selection of a suggestion: sets the input value to the language name,
     * stores the ISO code in a data attribute, and triggers an input event.
     * @param item - The selected language.
     */
    selectSuggestion(item: Language): void {
        this.inputEl.value = item.name || item.english_name;
        this.inputEl.dataset['iso'] = item.iso_639_1;
        this.inputEl.trigger('input');
    }
}
