import PopcornMD from "../../main";
import { FolderSuggest } from "../suggester/FolderSuggest"
import { Setting } from "obsidian";

export function createDefaultFolderSetting(containerEl: HTMLElement, plugin: PopcornMD) {
        new Setting(containerEl)
        .setName('Default folder')
        .setDesc('Specify the folder where all movie notes will be stored')
        .addSearch(cb => {
            new FolderSuggest(plugin.app, cb.inputEl);
            cb.setPlaceholder('Example: Movies/')
            .setValue(plugin.settings.defaultFolder)
            .onChange(async newDefaultFolder => {
                plugin.settings.defaultFolder = newDefaultFolder;
                await plugin.saveSettings();
            });
            cb.inputEl.addClass("popcorn-md-input");
        });
    }