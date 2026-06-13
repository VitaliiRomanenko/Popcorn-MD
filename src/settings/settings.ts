import { App, PluginSettingTab, Setting } from 'obsidian';
import { FileSuggest } from './suggester/FileSuggest';
import { LanguageSuggest } from './suggester/LanguageSuggest';
import PopcornMD from '../main';
import { LANGUAGES } from './language/languages';

export interface PopcornMDSettings {
	APIKey: string;
	templateFile: string;
	language: string;
	test: string;
}

export const DEFAULT_SETTINGS: PopcornMDSettings = {
	APIKey: '',
	templateFile: '',
	language: 'en',
	test: ''
};

export class PopcornMDSettingTab extends PluginSettingTab {
	plugin: PopcornMD;

	constructor(app: App, plugin: PopcornMD) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private createTemplateFileSetting(containerEl: HTMLElement) {
    	const templateFileDesc = activeDocument.createDocumentFragment();
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
			.onChange(async newTemplateFile => {
				this.plugin.settings.templateFile = newTemplateFile;
				await this.plugin.saveSettings();
			});
			cb.inputEl.addClass("popcorn-md-input");
		});
  	}

	private createAPIKeySetting(containerEl: HTMLElement) {
    	const APIKeyDesc = activeDocument.createDocumentFragment();

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
				text.inputEl.addClass("popcorn-md-input");
			});
  	}

	private createLanguageSetting(containerEl: HTMLElement) {
		const desc = activeDocument.createDocumentFragment();
		desc.createEl('span', {
			text: 'Note language (if not available in the database, English will be used).'
		})

		new Setting(containerEl)
			.setName('Language preference')
			.setDesc(desc)
			.addSearch(cb => {
				try{
					new LanguageSuggest(this.app, cb.inputEl)
				} catch {
					// ignore
				}
				cb.setPlaceholder('For example: Ukrainian, Українська, uk')
					.setValue(this.getLanguageDisplayName(this.plugin.settings.language))
					.onChange(async (value) => {
						const isoFromDataset = cb.inputEl.dataset['iso'];
						if (isoFromDataset) {
							this.plugin.settings.language = isoFromDataset;
						} else {
							const found = LANGUAGES.find(l => 
								((l.name || l.english_name) || '').toLowerCase() === value.toLowerCase() 
								|| l.iso_639_1.toLowerCase() === value.toLowerCase() 
							);
							this.plugin.settings.language = found ? found.iso_639_1 : 'en';
						}
						await this.plugin.saveSettings();
						delete cb.inputEl.dataset['iso'];
					});
				cb.inputEl.addClass("popcorn-md-input");
			})
	}

	private getLanguageDisplayName(iso: string): string {
		const found = LANGUAGES.find(l => l.iso_639_1 === iso);
		return found ? (found.name || found.english_name) : 'English'
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		console.log(LANGUAGES.length);
		this.createTemplateFileSetting(containerEl);
		this.createAPIKeySetting(containerEl);
		this.createLanguageSetting(containerEl);
		
	}
}
