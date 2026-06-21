import PopcornMD from "../../main";
import { FileSuggest } from "../suggester/FileSuggest";
import { Setting } from "obsidian";

/**
 * Creates a search setting for selecting a template file used when creating movie notes.
 * @param containerEl - The container element where the setting will be added.
 * @param plugin - The main plugin instance, used to read/write settings.
 */
export function createTemplateFileSetting(containerEl: HTMLElement, plugin: PopcornMD) {
        const templateFileDesc = activeDocument.createDocumentFragment();
        templateFileDesc.createDiv({ text: 'Files will be available as templates.' });
        templateFileDesc.createEl('p', {
            text: "You can use variables like {{title}} and {{year}} in the template.",
        });

        new Setting(containerEl)
        .setName('Template file')
        .setDesc(templateFileDesc)
        .addSearch(cb => {
            new FileSuggest(plugin.app, cb.inputEl);
            cb.setPlaceholder('Example: templates/template-file')
            .setValue(plugin.settings.templateFile)
            .onChange(async newTemplateFile => {
                plugin.settings.templateFile = newTemplateFile;
                await plugin.saveSettings();
            });
            cb.inputEl.addClass("popcorn-md-input");
        });
    }
