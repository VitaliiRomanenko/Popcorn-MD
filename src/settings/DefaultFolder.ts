import PopcornMD from "../main";
import { FolderSuggest } from "./suggester/FolderSuggest"
import { Setting } from "obsidian";

export function createDefaultFolderSetting(containerEl: HTMLElement, plugin: PopcornMD) {
        new Setting(containerEl)
        .setName('Default folder')
        .setDesc('Specify the folder where all movie notes will be stored')
        .addSearch(cb => {
            try {
            new FolderSuggest(plugin.app, cb.inputEl);
            } catch {};

            cb.setPlaceholder('Example: Movies/')
            .setValue(plugin.settings.defaultFoder)
            .onChange(async newDefaultFolder => {
                plugin.settings.defaultFoder = newDefaultFolder;
                await plugin.saveSettings();
            });
            cb.inputEl.addClass("popcorn-md-input");
        });
    }