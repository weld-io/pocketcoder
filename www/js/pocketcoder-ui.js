//
// Name:    PocketCoderUI
// Purpose: UI functions
// Creator: Tom Söderlund
//

'use strict';

// Only instantiate PocketCoderUI once
var PocketCoderUI = PocketCoderUI || {};

;(function (PocketCoderUI) {

	PocketCoderUI.toggleClass = function (elementId, classStr, enforce) {
		var element = document.getElementById(elementId);
		if (element.className.indexOf(classStr) === -1 || enforce === true) {
			// Add class
			element.className += ' ' + classStr;
		}
		else {
			// Remove class
			element.className = element.className.replace(new RegExp(classStr, 'g'), '');
		}
		element.className = element.className.trim();
	};

	PocketCoderUI.toggleInsertMenu = function (forceHide) {
		PocketCoderUI.toggleClass('insertMenu', 'hidden', forceHide);
	};

	PocketCoderUI.switchToRunMode = function () {
		//console.log('previewBody', document.getElementById('buttonRunMode'));
		PocketCoderUI.toggleClass('buttonInsert', 'hidden');
		PocketCoderUI.toggleClass('buttonRunMode', 'hidden');
		PocketCoderUI.toggleClass('buttonEditMode', 'hidden');
		PocketCoderUI.toggleClass('editor', 'hidden');
		PocketCoderUI.toggleClass('previewBody', 'hidden');
		PocketCoderUI.toggleClass('insertMenu', 'hidden', true);
		setTimeout(ScriptRunner.executeScript.bind(this, document.getElementById('scriptInput').value), 200);
	};

	PocketCoderUI.switchToEditMode = function () {
		//console.log('edit');
		PocketCoderUI.toggleClass('buttonInsert', 'hidden');
		PocketCoderUI.toggleClass('buttonRunMode', 'hidden');
		PocketCoderUI.toggleClass('buttonEditMode', 'hidden');
		PocketCoderUI.toggleClass('editor', 'hidden');
		PocketCoderUI.toggleClass('previewBody', 'hidden');
	};

	var insertSnippet = function (cat, cont) {
		document.getElementById('scriptInput').value += '\n\n' + ScriptRunner.snippets[cat][cont];
		PocketCoderUI.toggleClass('insertMenu', 'hidden', true);
	};

	var currentCategoryButton;

	var showInsertCategory = function (cat) {
		// Toggle category button
		if (currentCategoryButton) {
			currentCategoryButton.className = '';
		}
		currentCategoryButton = document.getElementById('category' + cat);
		currentCategoryButton.className = 'selected';
		// Create snippet buttons
		var insertContent = document.getElementById('insertContent');
		insertContent.innerHTML = '';
		for (var cont in ScriptRunner.snippets[cat]) {
			var newButton = document.createElement('button');
			newButton.innerHTML = ScriptRunner.snippets[cat][cont];
			newButton.addEventListener('click', insertSnippet.bind(this, cat, cont));
			insertContent.appendChild(newButton);
		}
	};

	var initMainButtons = function () {
		document.getElementById('buttonInsert').addEventListener('click', PocketCoderUI.toggleInsertMenu);
		document.getElementById('buttonRunMode').addEventListener('click', PocketCoderUI.switchToRunMode);
		document.getElementById('buttonEditMode').addEventListener('click', PocketCoderUI.switchToEditMode);
		document.getElementById('scriptInput').addEventListener('focus', PocketCoderUI.toggleInsertMenu.bind(this, true));
	};

	var initInsertMenu = function () {

		var makeButton = function (id, label, className, onClickFunction) {
			var insertCategories = document.getElementById('insertCategories');
			var newButton = document.createElement('button');
			newButton.id = id;
			newButton.innerHTML = label;
			if (className)
				newButton.className = className;
			newButton.addEventListener('click', onClickFunction);
			insertCategories.appendChild(newButton);
		};

		// Category buttons
		for (var cat in ScriptRunner.snippets) {
			makeButton('category' + cat, cat, undefined, showInsertCategory.bind(this, cat));
		}
		// Show first category
		showInsertCategory('Flow');
		// Clear button
		makeButton('clearButton', 'Clear', 'clearButton', clearCodeWindow);
	};

	var clearCodeWindow = function () {
		document.getElementById('scriptInput').value = '';
		PocketCoderUI.toggleClass('insertMenu', 'hidden', true);
	};

	var initCodeWindow = function () {
		try {
			document.getElementById('scriptInput').value = localStorage.project1 || ScriptRunner.startSnippet;
		}
		catch (err) {
			console.error(err);
		}
	};

	PocketCoderUI.init = function () {
		initMainButtons();
		initCodeWindow();
		initInsertMenu();
	};

}(PocketCoderUI));