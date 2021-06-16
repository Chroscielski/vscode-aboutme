import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;
const defaultUrl = "https://www.chroscielski.pl";
const defaultTitle = "$(globe) " + defaultUrl;

export function activate({ subscriptions }: vscode.ExtensionContext): void {

	const myCommandId = "sample.showSelectionCount";
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		const url = getConfig().get("url") as string ?? defaultUrl;
		vscode.env.openExternal(vscode.Uri.parse(url));
	}));

	const location: string = getConfig().get("location") as string;
	const statusBarAlignment: vscode.StatusBarAlignment = location === "left" 
		? vscode.StatusBarAlignment.Left 
		: vscode.StatusBarAlignment.Right; 

	myStatusBarItem ??= vscode.window.createStatusBarItem(statusBarAlignment, 100);
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.show();

	subscriptions.push(myStatusBarItem);
	subscriptions.push(vscode.workspace.onDidChangeConfiguration(updateConfiguration));

	updateConfiguration();
}

function updateConfiguration(): void {
	// myStatusBarItem.dispose();
	myStatusBarItem.text = getConfig().get("title") ?? defaultTitle;
}

function getConfig(): vscode.WorkspaceConfiguration {
	return vscode.workspace.getConfiguration("aboutMe");
}
