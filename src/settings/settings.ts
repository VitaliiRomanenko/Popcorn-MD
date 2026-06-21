import { App, PluginSettingTab } from 'obsidian';
import PopcornMD from '../main';
import { createTemplateFileSetting } from './components/TemplateFileSetting';
import { createAPIKeySetting } from './components/APIKeySetting';
import { createLanguageSetting } from './components/LangugeSetting';
import { createDefaultFolderSetting } from './components/DefaultFolder';
import { createAdultSetting } from './components/AdultSetting';

/**
 * Plugin settings interface.
 */
export interface PopcornMDSettings {
	/** TMDb API key. */
	APIKey: string;
	/** Path to the template file used for creating movie notes. */
	templateFile: string;
	/** ISO 639‑1 language code (e.g., "en", "uk"). */
	language: string;
	/** Default folder path where movie notes will be stored. */
	defaultFolder: string;
	/** Whether to include adult content in search results. */
	adult_content: boolean;
}

/**
 * Default values for plugin settings.
 */
export const DEFAULT_SETTINGS: PopcornMDSettings = {
	APIKey: '',
	templateFile: '',
	language: 'en',
	defaultFolder: '',
	adult_content: false
};

/**
 * The settings tab displayed in Obsidian's settings window.
 */
export class PopcornMDSettingTab extends PluginSettingTab {
	plugin: PopcornMD;

	/**
	 * @param app - The Obsidian App instance.
	 * @param plugin - The main plugin instance.
	 */
	constructor(app: App, plugin: PopcornMD) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * Renders all plugin settings in the settings tab.
	 */
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
