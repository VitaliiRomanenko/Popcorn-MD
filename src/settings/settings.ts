import { App, PluginSettingTab } from 'obsidian';
import PopcornMD from '../main';
import { createTemplateFileSetting } from './components/TemplateFileSetting';
import { createAPIKeySetting } from './components/APIKeySetting';
import { createLanguageSetting } from './components/LangugeSetting';
import { createDefaultFolderSetting } from './components/DefaultFolder';
import { createAdultSetting } from './components/AdultSetting';

export interface PopcornMDSettings {
	APIKey: string;
	templateFile: string;
	language: string;
	defaultFoder: string;
	adult_content: boolean;
}

export const DEFAULT_SETTINGS: PopcornMDSettings = {
	APIKey: '',
	templateFile: '',
	language: 'en',
	defaultFoder: '',
	adult_content: false
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
		createAdultSetting(containerEl, this.plugin);
	}
}
