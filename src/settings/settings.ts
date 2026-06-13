import { App, PluginSettingTab } from 'obsidian';
import PopcornMD from '../main';
import { LANGUAGES } from './language/languages';
import { createTemplateFileSetting } from './TemplateFileSetting';
import { createAPIKeySetting } from './APIKeySetting';
import { createLanguageSetting } from './LangugeSetting';
import { createDefaultFolderSetting } from './DefaultFolder';

export interface PopcornMDSettings {
	APIKey: string;
	templateFile: string;
	language: string;
	defaultFoder: string;
}

export const DEFAULT_SETTINGS: PopcornMDSettings = {
	APIKey: '',
	templateFile: '',
	language: 'en',
	defaultFoder: ''
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
		createTemplateFileSetting(containerEl, this.plugin);
		createDefaultFolderSetting(containerEl, this.plugin);
		createAPIKeySetting(containerEl, this.plugin);
		createLanguageSetting(containerEl, this.plugin);
	}
}
