'use strict';

var insertSnippet = function (cat, cont) {
	document.getElementById('scriptInput').value += '\n\n' + ScriptRunner.snippets[cat][cont];
	toggleClass('insertMenu', 'hidden', true);
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

var initInsertMenu = function () {
	var insertCategories = document.getElementById('insertCategories');
	for (var cat in ScriptRunner.snippets) {
		var newButton = document.createElement('button');
		newButton.id = 'category' + cat;
		newButton.innerHTML = cat;
		newButton.addEventListener('click', showInsertCategory.bind(this, cat));
		insertCategories.appendChild(newButton);
	}
	// Show first category
	showInsertCategory('Flow');
};

var draw;

var initCodeWindow = function () {
	try {
		document.getElementById('scriptInput').value = localStorage.project1 || ScriptRunner.startSnippet;
	}
	catch (err) {
		console.error(err);
	}
};

var toggleClass = function (elementId, classStr, enforce) {
	var element = document.getElementById(elementId);
	if (element.className.indexOf(classStr) === -1 || enforce === true) {
		// Add class
		element.className += ' ' + classStr;
	}
	else {
		// Remove class
		element.className = element.className.replace(new RegExp(classStr, 'g'), '');
	}
};


var app = {

	// Application Constructor
	start: function() {
		document.addEventListener('deviceready', this.initApp.bind(this), false);
	},

	// deviceready Event Handler
	// Bind any cordova events here, e.g: 'pause', 'resume', etc.
	initApp: function() {
		//console.log('My App: deviceready', document.getElementsByClassName('previewBody'));
		document.getElementById('buttonInsert').addEventListener('click', this.toggleInsertMenu);
		document.getElementById('buttonRunMode').addEventListener('click', this.runMode);
		document.getElementById('buttonEditMode').addEventListener('click', this.editMode);
		document.getElementById('scriptInput').addEventListener('focus', this.toggleInsertMenu.bind(this, true));
		draw = ScriptRunner.initSVG();
		initCodeWindow();
		initInsertMenu();
	},

	toggleInsertMenu: function (forceHide) {
		toggleClass('insertMenu', 'hidden', forceHide);
	},

	runMode: function () {
		//console.log('previewBody', document.getElementById('buttonRunMode'));
		toggleClass('buttonInsert', 'hidden');
		toggleClass('buttonRunMode', 'hidden');
		toggleClass('buttonEditMode', 'hidden');
		toggleClass('editor', 'hidden');
		toggleClass('previewBody', 'hidden');
		toggleClass('insertMenu', 'hidden', true);
		setTimeout(ScriptRunner.executeScript.bind(this, document.getElementById('scriptInput').value), 200);
	},

	editMode: function () {
		//console.log('edit');
		toggleClass('buttonInsert', 'hidden');
		toggleClass('buttonRunMode', 'hidden');
		toggleClass('buttonEditMode', 'hidden');
		toggleClass('editor', 'hidden');
		toggleClass('previewBody', 'hidden');
	},

};

app.start();