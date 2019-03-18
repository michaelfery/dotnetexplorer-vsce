'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext } from 'vscode';
import { primaryOptions } from './primary-options';
import { secondaryOptions } from './secondary-options';
import { tertiaryOptions } from './tertiary-options';
import { showQuickPickChoice } from './multiStepQuickPick';
import { showUsage } from './output';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dotnet explorer" is now active!');

	context.subscriptions.push(commands.registerCommand('dotnetexplorer.search', async () => {

		var firstOption = await showQuickPickChoice(primaryOptions, `I want to:`);
		if (firstOption!.usage) {
			showUsage(context, firstOption!, new Array(firstOption!.label));
		}
		else {
			var secondaryChoices = secondaryOptions[firstOption!.value];
			var secondaryOption = await showQuickPickChoice(secondaryChoices, `${firstOption!.label}:`);
			if (secondaryOption!.usage) {
				showUsage(context, secondaryOption!, new Array(firstOption!.label, secondaryOption!.label));
			}
			else {
				var tertiaryChoices = tertiaryOptions[secondaryOption!.value];
				var tertiaryOption = await showQuickPickChoice(tertiaryChoices, `${firstOption!.label} ${secondaryOption!.label}:`);
				if (tertiaryOption!.usage) {
					showUsage(context, tertiaryOption!, new Array(firstOption!.label, secondaryOption!.label, tertiaryOption!.label));
				}
			}
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {
}