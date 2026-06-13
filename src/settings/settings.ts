import { App, PluginSettingTab } from 'obsidian';
import PopcornMD from '../main';
import { LANGUAGES } from './language/languages';
import { createTemplateFileSetting } from './TemplateFileSetting';
import { createAPIKeySetting } from './APIKeySetting';
import { createLanguageSetting } from './LangugeSetting';

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

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		console.log(LANGUAGES.length);
		createTemplateFileSetting(containerEl, this.plugin);
		createAPIKeySetting(containerEl, this.plugin);
		createLanguageSetting(containerEl, this.plugin);
	}
}
