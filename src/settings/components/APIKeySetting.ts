import { Setting } from 'obsidian';
import PopcornMD from '../../main';

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