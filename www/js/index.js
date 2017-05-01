'use strict';

var draw;

var app = {

	// Application Constructor
	start: function() {
		document.addEventListener('deviceready', this.initApp.bind(this), false);
	},

	// deviceready Event Handler
	// Bind any cordova events here, e.g: 'pause', 'resume', etc.
	initApp: function() {
		//console.log('My App: deviceready', document.getElementsByClassName('previewBody'));
		ScriptRunner.init();
		PocketCoderUI.init();
		draw = ScriptRunner.getSVG();
	},

};

app.start();
