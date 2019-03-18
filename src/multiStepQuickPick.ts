import { window } from 'vscode';
import { Choice } from './choice';

/**
 * Shows a pick list using window.showQuickPick().
 */
export async function showQuickPickChoice(choices: Choice[], placeHolder: string) {
	// extract labels from choices
	var labels = choices.map(choice => ({ label: choice.label}));
	// show quickPick and get result
	var result = await window.showQuickPick(labels, {
		placeHolder: placeHolder
	});
	// extract 'value' from 'label' result
	if (result) {
		var filteredChoices = choices.filter(choice => choice.label === result!.label);
		if (filteredChoices && filteredChoices.length > 0) {
			return filteredChoices[0];
		}
	}
	return null;
}