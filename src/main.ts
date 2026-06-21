import {
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	PopcornMDSettings,
	PopcornMDSettingTab,
} from './settings/settings';
import { SearchModal } from './views/searchModal';

/**
 * The main plugin class for Popcorn‑MD.
 *
 * Provides a ribbon icon and a command to open the movie search modal,
 * and manages plugin settings persistence.
 */
export default class PopcornMD extends Plugin {
	/** The current plugin settings, loaded from disk on startup. */
	settings!: PopcornMDSettings;

	/**
	 * Called when the plugin is loaded.
	 * Loads settings, registers the ribbon icon, the search command,
	 * and the settings tab.
	 */
	async onload() {
		await this.loadSettings();
		this.addRibbonIcon('popcorn', 'Create new movie note', (_evt: MouseEvent) => {
			new SearchModal(this.app, this.settings, this).open();
		});

		this.addCommand({
			id: 'open-modal-search',
			name: 'Create new movie note',
			callback: () => {
				new SearchModal(this.app, this.settings, this).open();
			},
		});

		this.addSettingTab(new PopcornMDSettingTab(this.app, this));
	}

	/**
	 * Called when the plugin is unloaded.
	 * Currently does nothing.
	 */
	onunload() {}

	/**
	 * Loads the plugin settings from disk, merging them with the defaults.
	 */
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<PopcornMDSettings>,
		);
	}

	/**
	 * Persists the current plugin settings to disk.
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
