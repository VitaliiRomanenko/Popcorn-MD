import { Setting } from 'obsidian';
import PopcornMD from '../../main';

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