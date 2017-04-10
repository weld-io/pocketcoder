# Pocket Coder

Write and run JavaScript code on your phone. Made using Cordova.


## How to build & run

Just build:

	cordova build [ios/android/browser]

Release build signed .apk(Android) or .ipa(IOS):

	cordova build android --device --release --buildConfig=build-release.json
	cordova build ios --device --release --buildConfig=build-release.json

Run in emulator:

	cordova emulate [ios/android/browser]

Run on device:

	cordova run [ios/android/browser] --device


## Important folders and files

* `config.xml` - main Cordova config.
* `www/` - HTML/CSS/JavaScript files.
* `res/` - Icon, splash screen and other image assets.
