WP Skeleton Asset
=================

Asset factory
-------------

Usage:

```php
namespace SomeFancyPlugin;

use McGuffin\Asset\Factory as AssetFactory;

$factory = AssetFactory::get( SomeFancyPlugin\SomeFancyPlugin::instance() );
// will throw exception if 'js/some-js-file.js' is not there!
$some_asset = $factory->asset( 'js/some-js-file.js' )
	// wrapper to wp_localize_script()
	->localize( [
		'some_option'	=> 'some_value',
		'l10n'			=> [
			'hello'	=> __( 'World', 'mcguffin' )
		],
	], 'l10n_varname' )
	->deps( 'jquery' ) // or ->deps( [ 'jquery','wp-backbone' ] )
	->add_dep( [ 'wp-backbone', 'wp-media' ] )
	->footer( true ) // enqueue in footer
	->enqueue(); // actually enqueue script
	
$asset_url = $factory->asset( 'js/some-js-file.js' )->url;
```
