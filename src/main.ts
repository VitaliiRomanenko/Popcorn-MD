import {
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	PopcornMDSettings,
	PopcornMDSettingTab,
} from './settings/settings';
import { SearchModal } from './views/searchModal';

export default class PopcornMD extends Plugin {
	settings!: PopcornMDSettings;

	async onload() {
		await this.loadSettings();
		this.addRibbonIcon('popcorn', 'Create new movie note', (_evt: MouseEvent) => {
			new SearchModal(this.app, this.settings).open();
		});

		this.addCommand({
			id: 'open-modal-simple',
			name: 'Open modal (simple)',
			callback: () => {
				throw new Error("Method not implemented.");
			},
		});

		this.addSettingTab(new PopcornMDSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<PopcornMDSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
