'use strict';

var startSnippet = "console.log('Hello World!');";

var snippets = {
	'Flow': {
		'if': "if (true) {\n};",
		'for': "for (var i = 0; i < array.length; i++) {\n	array[i]\n};",
		'for2': "for (var key in collection) {\n	\n};",
		'function': "var f = function() {\n};",
		'prompt': "var name = prompt('What’s your name?');",
	},
	'Numbers': {
		'parseFloat': "parseFloat(StringOrNum)",
		'random': "Math.floor(Math.random() * MAX_VALUE)",
	},
	'Strings': {
		'upUntilString': "var upUntilString = bigString.substring(0, bigString.indexOf('_'));",
	},
	'Collections': {
		'sortArray': "array.sort(function (a, b) { return a > b });",
		'lodashMap': "_.map(users, function (user) { return user.name });",
	},
	'Graphics': {
		'rect': "draw.rect('100%', '100%').fill('DeepPink');",
		'line': "draw.line(0, 0, '50%', '50%').stroke({ width: 5, color: 'DeepPink' });",
		'circle': "draw.circle(100).fill('DeepPink').center('50%', '50%');",
		'ellipse': "draw.ellipse(200, 100).attr({ fill: 'DeepPink' });",
		'polyline': "draw.polyline('0,0 100,50 50,100').fill('none').stroke({ width: 5 });",
		'polygon': "draw.polygon('50,50 150,150 50,100').fill('DeepPink');",
		'path': "draw.path('M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 L50,0 L50,0 Z').fill('greenyellow');",
	},
	'DOM': {
		'getBody': "var element = document.getElementById('previewBody');",
		'eventPure': "element.addEventListener('click', function () { alert('Hello!'); });",
		'appendPure': "element.appendChild(document.createElement('p'));",
		'appendJQuery': "var $newElement = $('<p>Hello</p>').appendTo('#previewBody');",
	},
	'Debug': {
		'log': "log(param1, param2)",
		'dir': "dir(object)",
	},
};

var insertSnippet = function (cat, cont) {
	document.getElementById('scriptInput').value += '\n\n' + snippets[cat][cont];
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
	for (var cont in snippets[cat]) {
		var newButton = document.createElement('button');
		newButton.innerHTML = snippets[cat][cont];
		newButton.addEventListener('click', insertSnippet.bind(this, cat, cont));
		insertContent.appendChild(newButton);
	}
};

var initInsertMenu = function () {
	var insertCategories = document.getElementById('insertCategories');
	for (var cat in snippets) {
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
var initSVG = function () {
	draw = SVG('previewGraphicsBody').size('100%', '100%');
};

var initCodeWindow = function () {
	try {
		document.getElementById('scriptInput').value = localStorage.project1 || startSnippet;
	}
	catch (err) {
		console.error(err);
	}
};

// http://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
var removeAllEventListeners = function (elementId) {
	var old_element = document.getElementById(elementId);
	var new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
};

var executeScript = function (scr) {

	// console.log
	function log(str) {
		if (arguments.length > 1) {
			var clonedArguments = Array.prototype.slice.call(arguments);
			str = clonedArguments.join(' ');
		}
		document.getElementById('previewTextBody').innerHTML += str + '<br>';
	};

	// console.dir
	function dir(obj) {
		var str = '';
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				str += key + ': ' + obj[key] + ',\n';
			}
		}
		document.getElementById('previewTextBody').innerHTML += str + '<br>';
	};

	// Save script to localStorage
	try {
		localStorage.setItem('project1', scr);
	}
	catch (err) {
		console.error(err);
	}

	// Clear content and event listeners
	document.getElementById('previewTextBody').innerHTML = '';
	draw.clear();
	removeAllEventListeners('previewBody');
	// Replace console.log
	scr = scr.replace(/console.log/g, 'log');
	scr = scr.replace(/console.dir/g, 'dir');

	// Run script
	try {
		eval(scr);
	}
	catch (err) {
		document.getElementById('previewTextBody').innerHTML = err.toString();
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
		initCodeWindow();
		initSVG();
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
		setTimeout(executeScript.bind(this, document.getElementById('scriptInput').value), 200);
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