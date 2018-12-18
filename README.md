PDF Renderer
===============

#### Developer info here. ####


Installation
------------

### Production (Stand-Alone)
 - Head over to [releases](../../releases)
 - Download 'pdf-renderer.zip'
 - Upload and activate it like any other WordPress plugin
 - AutoUpdate will run as long as the plugin is active

### Production (using Github Updater – recommended for Multisite)
 - Install [Andy Fragen's GitHub Updater](https://github.com/afragen/github-updater) first.
 - In WP Admin go to Settings / GitHub Updater / Install Plugin. Enter `mcguffin/pdf-renderer` as a Plugin-URI.

### Development
 - cd into your plugin directory
 - $ `git clone git@github.com:mcguffin/pdf-renderer.git`
 - $ `cd pdf-renderer`
 - $ `npm install`
 - $ `gulp`


TODO:
-----
 - [x] Use largest image width in settings as upload size
 - [ ] UI improvement
 - [ ] Hooks to control behaviour
	 - [ ] Actions offered after file drop (-Upload PDF +Create Gallery)
	 - [ ] Actions when the last file has been uploaded.
 - [ ] Don't load PDFjslib in FF
