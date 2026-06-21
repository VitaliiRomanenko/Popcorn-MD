import { Setting } from 'obsidian';
import PopcornMD from '../../main';

/**
 * Creates a text input setting for the TMDb API key.
 * @param containerEl - The container element where the setting will be added.
 * @param plugin - The main plugin instance, used to read/write settings.
 */
export function  createAPIKeySetting(containerEl: HTMLElement, plugin: PopcornMD) {
    const APIKeyDesc = activeDocument.createDocumentFragment();

    APIKeyDesc.createEl('span');
    APIKeyDesc.appendText("Your TMDb API Key. ");
    APIKeyDesc.createEl('a', {
    text: "You can get one here",
        href: 'https://www.themoviedb.org/settings/api'
    });

    new Setting(containerEl)
        .setName('TMDb API Key')
        .setDesc(APIKeyDesc)
        .addText((text) => {
            text
                .setPlaceholder('Enter your key')
                .setValue(plugin.settings.APIKey)
                .onChange(async (value) => {
                    plugin.settings.APIKey = value;
                    await plugin.saveSettings();
                });
            text.inputEl.addClass("popcorn-md-input");
        });
};
