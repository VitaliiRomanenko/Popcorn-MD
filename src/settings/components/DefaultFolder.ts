import PopcornMD from "../../main";
import { FolderSuggest } from "../suggester/FolderSuggest"
import { Setting } from "obsidian";

/**
 * Creates a search setting for selecting the default folder where movie notes will be stored.
 * @param containerEl - The container element where the setting will be added.
 * @param plugin - The main plugin instance, used to read/write settings.
 */
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
