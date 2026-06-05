import { App, PluginSettingTab, Setting } from 'obsidian';
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

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		// 
		new Setting(containerEl)
			.setName('TMDb API Key')
			.setDesc("Your TMDb API Key. You can get one for free at https://www.themoviedb.org/documentation/api")
			.addText((text) =>
				text
					.setPlaceholder('Enter your key')
					.setValue(this.plugin.settings.APIKey)
					.onChange(async (value) => {
						this.plugin.settings.APIKey = value;
						await this.plugin.saveSettings();
					}),
			);
		
		new Setting(containerEl)
			.setName('Template')
			.setDesc(this.plugin.settings.templateFile == "" 
							? "The template used to generate the movie note" 
							: `Current template: ${this.plugin.settings.templateFile}`
						)
			.addButton((button) => {
				button.setButtonText("Chose a template file")
				.onClick(() => {
					const input = document.createElement('input');
					input.type = 'file';
					input.accept = '.md';
					input.onchange = async () => {
						const file = input.files?.[0];
						if (file) {
							this.plugin.settings.templateFile = file.name;
							await this.plugin.saveSettings();
							this.display();
						}
					};
					input.click();
				});
			});
			
	}
}
