import { Setting } from "obsidian";
import { LanguageSuggest } from "../suggester/LanguageSuggest";
import { LANGUAGES } from "../language/languages";
import PopcornMD from "../../main";

/**
 * Creates a search setting for selecting the language used for TMDb API responses.
 * @param containerEl - The container element where the setting will be added.
 * @param plugin - The main plugin instance, used to read/write settings.
 */
export function createLanguageSetting(containerEl: HTMLElement, plugin: PopcornMD) {
    const desc = activeDocument.createDocumentFragment();
    desc.createEl('span', {
        text: 'Note language (if not available in the database, English will be used).'
    })

    new Setting(containerEl)
        .setName('Language preference')
        .setDesc(desc)
        .addSearch(cb => {
            new LanguageSuggest(plugin.app, cb.inputEl)
            cb.setPlaceholder('For example: Ukrainian, Українська, uk')
                .setValue(getLanguageDisplayName(plugin.settings.language))
                .onChange(async (value) => {
                    const isoFromDataset = cb.inputEl.dataset['iso'];
                    if (isoFromDataset) {
                        plugin.settings.language = isoFromDataset;
                    } else {
                        const found = LANGUAGES.find(l => 
                            ((l.name || l.english_name) || '').toLowerCase() === value.toLowerCase() 
                            || l.iso_639_1.toLowerCase() === value.toLowerCase() 
                        );
                        plugin.settings.language = found ? found.iso_639_1 : 'en';
                    }
                    await plugin.saveSettings();
                    delete cb.inputEl.dataset['iso'];
                });
            cb.inputEl.addClass("popcorn-md-input");
        })
}

/**
 * Returns the display name (native or English) for a given ISO 639‑1 language code.
 * Falls back to 'English' if the code is not found.
 * @param iso - The ISO 639‑1 language code.
 * @returns The display name of the language.
 */
function getLanguageDisplayName(iso: string): string {
    const found = LANGUAGES.find(l => l.iso_639_1 === iso);
    return found ? (found.name || found.english_name) : 'English'
}
