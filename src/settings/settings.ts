import { App, PluginSettingTab, Setting, Notice, TFile } from 'obsidian';
import { FileSuggest } from './suggester/FileSuggest';
import PopcornMD from '../main';

export interface PopcornMDSettings {
	APIKey: string;
	templateFile: string;
}

export const DEFAULT_SETTINGS: PopcornMDSettings = {
	APIKey: '',
	templateFile: '',
};

export class PopcornMDSettingTab extends PluginSettingTab {
	plugin: PopcornMD;

	constructor(app: App, plugin: PopcornMD) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private createTemplateFileSetting(containerEl: HTMLElement) {
    	const templateFileDesc = document.createDocumentFragment();
		templateFileDesc.createDiv({ text: 'Files will be available as templates.' });
		templateFileDesc.createEl('p', {
			text: "You can use variables like {{title}} and {{year}} in the template.",
		});

		new Setting(containerEl)
		.setName('Template file')
		.setDesc(templateFileDesc)
		.addSearch(cb => {
			try {
			new FileSuggest(this.app, cb.inputEl);
			} catch {
			// eslint-disable
			}
			cb.setPlaceholder('Example: templates/template-file')
			.setValue(this.plugin.settings.templateFile)
			.onChange(newTemplateFile => {
				this.plugin.settings.templateFile = newTemplateFile;
				this.plugin.saveSettings();
			});
			cb.inputEl.style.width = '100%';
		});
  	}

	private createAPIKeySetting(containerEl: HTMLElement) {
    	const APIKeyDesc = document.createDocumentFragment();

		APIKeyDesc.createEl('span');
		APIKeyDesc.appendText("Your TMDb API Key. ");
		APIKeyDesc.createEl('a', {
		text: "You can get one here",
		  href: 'https://www.themoviedb.org/documentation/api'
		});

		new Setting(containerEl)
			.setName('TMDb API Key')
			.setDesc(APIKeyDesc)
			.addText((text) => {
				text
					.setPlaceholder('Enter your key')
					.setValue(this.plugin.settings.APIKey)
					.onChange(async (value) => {
						this.plugin.settings.APIKey = value;
						await this.plugin.saveSettings();
					});
				text.inputEl.style.width = '100%';
			});
  	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		this.createTemplateFileSetting(containerEl);
		this.createAPIKeySetting(containerEl);
		// 
		
	}
}
