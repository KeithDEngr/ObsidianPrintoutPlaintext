import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface EditorPlaintextCalloutAppendSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: EditorPlaintextCalloutAppendSettings = {
	mySetting: 'default'
}

const filetype: Record<string, string> = {
	"sh": "bash",
	"py": "python",
};

const reject_filetypes = ["md","png","jpg","jpeg","gif","bmp","svg","mp3","webm","wav","m4a","ogg","3gp","flac","mp4","webm","ogv","pdf"];

export default class EditorPlaintextCalloutAppend extends Plugin {
	settings: EditorPlaintextCalloutAppendSettings;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		await this.loadSettings();


		this.registerInterval( // TODO: is this the best process to do this? Is there a better way to register this (view change or something like that?)
			window.setInterval(() => this.embedPlaintextFiles(this.app,this.app.vault), 10000)
		);


		// This was an attempt at revising the markdown to embed a plaintext file by registering a post processor
	    // Problem: in the markdown post processor I can't do delays or wait for async operations on an external function so it just receives a pending promise not the string itself. I can even log to the console the string I receive in the function but the markdown itself will just get the Promise not yet resolving the file contents for me.
	    // ref: https://docs.obsidian.md/Plugins/Editor/Markdown+post+processing
		//this.registerMarkdownPostProcessor((element, context) => {
		//	const codeblocks = element.findAll("code");

		//	for (let codeblock of codeblocks) {
		//		const {  vault  } = this.app;
		//		vault.process.

		//		//console.log(codeblock.innerText.trim());

		//		//const fileContents: string[] = await Promise.all(
		//		//	vault.getMarkdownFiles().map((codeblock.innerText.trim()) => vault.cachedRead())
		//		//);

		//		//console.log(vault.cachedRead(codeblock.innerText.trim()));
		//	    //const myFile = "obsidian://open?vault=test_vault&file=create_plugin%2FProcess";
		//	    const myFile = "create_plugin/test.sh";
		//	    const myFiles = vault.getMarkdownFiles();
		//	    //console.log(myFiles);
		//		//console.log(codeblock.getText());
		//		//console.log(myFile);
		//	    //codeblock.replaceWith(vault.cachedRead(codeblock.innerText.trim()));
		//		const myFile1 = vault.getFileByPath("obsidian://open?vault=test_vault&file=create_plugin%2FProcess");

		//		const myVar =this.obsidianUrl2FileContents(myFile,vault);
		//		console.log("before");
		//		sleep(5000);
		//		console.log("after");
		//		console.log(myVar);
		//		codeblock.replaceWith(vault.read(vault.getFileByPath(myFile)));
		//		//codeblock.replaceWith("Hello");
		//			//this.obsidianUrl2FileContents(myFile,vault));
		//		//codeblock.replaceWith(vault.cachedRead(codeblock.innerText.trim()));
		//		//codeblock.replaceWith("hello");

		//		//const text = codeblock.innerText.trim();
		//		//new Notice(text);
		//		//if (text[0] === ":" && text[text.length - 1] === ":") {
		//		//	const emojiEl = codeblock.createSpan({
		//		//		text: ALL_EMOJIS[text] ?? text,

		//		//	});
		//		//	codeblock.replaceWith(emojiEl);
		//		//}
		//	}
		//});



		/**
		 * After this in the onload method is the default example code retained for ref
		 */

		//// Add ribbon icon that generates notice
		//this.addRibbonIcon('dice',
		//		'Greet', () => {
		//		new Notice('Hello World!');
		//});

		//// This creates an icon in the left ribbon. Clicking it will pop up a notice
		//const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
		//	// Called when the user clicks the icon.
		//	new Notice('This is a notice!');
		//});



		//// Perform additional things with the ribbon
		//ribbonIconEl.addClass('my-plugin-ribbon-class');

		//// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		//const statusBarItemEl = this.addStatusBarItem();
		//statusBarItemEl.setText('Status Bar Text');

		//// This adds a simple command that can be triggered anywhere
		//this.addCommand({
		//	id: 'open-sample-modal-simple',
		//	name: 'Open sample modal (simple)',
		//	callback: () => {
		//		new SampleModal(this.app).open();
		//	}
		//});
		//// This adds an editor command that can perform some operation on the current editor instance
		//this.addCommand({
		//	id: 'sample-editor-command',
		//	name: 'Sample editor command',
		//	editorCallback: (editor: Editor, view: MarkdownView) => {
		//		console.log(editor.getSelection());
		//		editor.replaceSelection('Sample Editor Command');
		//	}
		//});
		//// This adds a complex command that can check whether the current state of the app allows execution of the command
		//this.addCommand({
		//	id: 'open-sample-modal-complex',
		//	name: 'Open sample modal (complex)',
		//	checkCallback: (checking: boolean) => {
		//		// Conditions to check
		//		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		//		if (markdownView) {
		//			// If checking is true, we're simply "checking" if the command can be run.
		//			// If checking is false, then we want to actually perform the operation.
		//			if (!checking) {
		//				new SampleModal(this.app).open();
		//			}

		//			// This command will only show up in Command Palette when the check function returns true
		//			return true;
		//		}
		//	}
		//});

		//// This adds a settings tab so the user can configure various aspects of the plugin
		//this.addSettingTab(new SampleSettingTab(this.app, this));

		//// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		//// Using this function will automatically remove the event listener when this plugin is disabled.
		//this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		//	console.log('click', evt);
		//});

		//// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		//// Using this function will automatically remove the event listener when this plugin is disabled.
		//this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		//	console.log('click', evt);
		//});

		//// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		//this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		//// Make a periodic notice
		//this.registerInterval(window.setInterval(() => new Notice('Hello World!')));
	}

	onunload() {

	}



	async obsidianUrl2FileContents(fileUrl: string, vault: Vault): string{
		const fileTFile = await vault.getFileByPath(fileUrl);
		const fileContents = await vault.cachedRead(fileTFile);
		//console.log(fileContents);
		return fileContents;
	}

	async embedPlaintextFiles(app: App, vault: Vault) {
		/**
		 #![[filename]]
		 ---
		 ```filetype
		 content
		 ```
		 ---

		 */
		//console.log("\n\n\n\nstarting");
		let currentFile = app.workspace.getActiveFile()
		const currentFileContents = await vault.read(currentFile); // had this cachedRead but revised to hopefully improve not overriding file changes.
		//console.log("\ncurrent contents:");
		//console.log(currentFileContents);
		let currentFileContents_split = currentFileContents.split("#![[");
		let finalFileContents = currentFileContents_split[0];
		for (const item of currentFileContents_split.slice(1)){
			//console.log("item: \n"+item);
			let currentContent = item.split("]]\n");
			let skip = false;
			//console.log(currentContent[0]);

			try{
				let otherFileContents = await this.obsidianUrl2FileContents(currentContent[0],vault);

				if ((otherFileContents.contains("```")) | (reject_filetypes.contains(currentContent[0].split('.')[1])) ){
					console.log("file ("+currentContent[0]+") contains ``` or is a rejected filetype. Ignoring");
					finalFileContents+="#![["+currentContent[0]+"]]\n"+currentContent[1];
				} else{

					// check if there is a file printout after. if so, remove it
					//console.log("current content: ");
					//console.log(currentContent[1].slice(0,10));
					if (currentContent[1].slice(0,8) == "\n---\n```"){
						let filePrintout = currentContent[1].split("\n---\n```");
						filePrintout = filePrintout[1].split("\n```\n---\n");
						currentContent[1] =filePrintout[1];
					}


					// add the contents back
					if (!reject_filetypes.contains(currentContent[0].split('.')[1])){
						console.log("file ("+currentContent[0]+") is being added.")
						if (Object.keys(filetype).includes(currentContent[0].split('.')[1])){
							finalFileContents+="#![["+currentContent[0]+"]]\n\n---\n```"+filetype[currentContent[0].split('.')[1]]+"\n"+otherFileContents+"\n```\n---\n"+currentContent[1];
						} else {
							finalFileContents+="#![["+currentContent[0]+"]]\n\n---\n```"+currentContent[0].split('.')[1]+"\n"+otherFileContents+"\n```\n---\n"+currentContent[1];
						}

						//finalFileContents+=currentContent[0]+currentContent[1]+"\n---\n```"+currentContent[0].split('.')[1]+"\n```\n---\n";

						//console.log("contents: \n"+otherFileContents);
					}else{
						console.log("skipping .md file"+currentContent[0]);
						finalFileContents+="#![["+currentContent[0]+"]]\n\n"+currentContent[1];
					}
				}
			} catch {
				console.log("failed to add file ("+currentContent[0]+"). Not found.");
				finalFileContents+="#![["+currentContent[0]+"]]\n"+currentContent[1];
			}
		}
		console.log("\nfinal contents:");
		console.log(finalFileContents);


		app.vault.modify(currentFile,finalFileContents);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: EditorPlaintextCalloutAppend;

	constructor(app: App, plugin: EditorPlaintextCalloutAppend) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
