import { Setting } from 'obsidian';
import PopcornMD from '../../main';

/**
 * Creates a toggle setting for including adult content in search results.
 * @param containerEl - The container element where the setting will be added.
 * @param plugin - The main plugin instance, used to read/write settings.
 */
export function  createAdultSetting(containerEl: HTMLElement, plugin: PopcornMD) {
    new Setting(containerEl)
        .setName('Adult titles')
        .setDesc("Include adult content?")
        .addToggle(toggle => {
            toggle
                .setValue(plugin.settings.adult_content)
                .onChange(async (value) => {
                    plugin.settings.adult_content = value;
                    await plugin.saveSettings();
                });
        });
};
