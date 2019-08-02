PDF Renderer
============

Client-Side conversion of PDF Files to images when dropped into the media library.

![Upload Dialog](.wporg/screenshot-1.png)
PDF-Contents: cc-by [Creative Commons](https://creativecommons.org/)

Installation
------------

### Production (using Github Updater – recommended for Multisite)
 - Install [Andy Fragen's GitHub Updater](https://github.com/afragen/github-updater) first.
 - In WP Admin go to Settings / GitHub Updater / Install Plugin. Enter `mcguffin/pdf-renderer` as a Plugin-URI.

### Development
 - cd into your plugin directory
 - $ `git clone git@github.com:mcguffin/pdf-renderer.git`
 - $ `cd pdf-renderer`
 - $ `npm install`
 - $ `gulp`

Plugin API
----------

### Filter `pdf_renderer_image_width`

Use this to overrule width of generated images. Uses the largest image width known to WP by default. (e.g. the Large size from Settings > Media).

#### Example:
```php
add_filter( 'pdf_renderer_image_width', function( $width ) {
	// never underestimate a good integer.
	return 12345;
});
```

### Filter `pdf_renderer_image_type`

Type of generated images. Possible values are `image/png` and `image/jpeg`. default is `image/png`.  
To override the JPEG-Quality you can use the WP Core filter `jpeg_quality`. The string `pdf_renderer` is passed as a second argument to `apply_filters()`.

#### Example:
```php
// we want jpeg ...
add_filter( 'pdf_renderer_image_type', function( $type ) {
	return 'image/jpeg';
});
// ... and a specific treatment for PDFs.
add_filter( 'jpeg_quality', function( $quality, $context = '' ) {
	if ( 'pdf_renderer' === $context ) {
		// Everybody loves artifacts.
		return 1;
	}
	return $quality;
}, 10, 2);
```
