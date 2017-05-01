//
// Name:    ScriptRunner
// Purpose: Crossplatform library for helper functions
// Creator: Tom Söderlund
//

'use strict';

// Only instantiate ScriptRunner once
var ScriptRunner = ScriptRunner || {};

;(function (ScriptRunner) {

	ScriptRunner.startSnippet = "console.log('Hello World!');";

	ScriptRunner.snippets = {
		'Flow': {
			'var': "var website = 'www.weld.io';",
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
			'sortArray': "array.sort(function (a, b) { return a > b; });",
			'lodashMap': "_.map(users, function (user) { return user.name; });",
			'lodashReduce': "_.reduce(values, function (total, value) { return total + value; });",
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
			'getBodyPure': "var element = document.getElementById('previewBody');",
			'eventPure': "element.addEventListener('click', function () { alert('Hello!'); });",
			'appendPure': "element.appendChild(document.createElement('p'));",
			'getBodyJQuery': "var $element = $('#previewBody');",
			'eventJQuery': "$element.on('click', function () { alert('Hello!'); });",
			'appendJQuery': "var $newElement = $('<p>Hello</p>').appendTo('#previewBody');",
		},
		'Debug': {
			'log': "log(param1, param2)",
			'dir': "dir(object)",
		},
	};


	ScriptRunner.executeScript = function (scr) {

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
		ScriptRunner.initPreviewBody();

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

	var draw;

	// http://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
	var removeAllEventListeners = function (elementId) {
		var old_element = document.getElementById(elementId);
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
	};

	// Reset previewBody - clear content and event listeners
	ScriptRunner.initPreviewBody = function () {
		removeAllEventListeners('previewBody');
		document.getElementById('previewBody').innerHTML = '<div id="previewGraphicsBody"></div><div id="previewTextBody"></div>';
		initSVG();
	};

	ScriptRunner.getSVG = function () {
		return draw;
	};

	var initSVG = function () {
		draw = SVG('previewGraphicsBody').size('100%', '100%');
	};

	ScriptRunner.init = function () {
	};

}(ScriptRunner));