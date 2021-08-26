<?php
/**
 *	@package PDFRenderer\Asset
 *	@version 1.0.1
 *	2018-09-22
 */

namespace McGuffin\Asset;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}

use McGuffin\Core;

/**
 *	Asset factory Class
 *
 *	Usage
 *	-----
 *	<?php
 *
 *	// will throw exception if 'js/some-js-file.js' is not there!
 *	$some_asset = Asset\Asset::get( 'js/some-js-file.js' )
 *		// wrapper to wp_localize_script()
 *		->localize( [
 *			'some_option'	=> 'some_value',
 *			'l10n'			=> [
 *				'hello'	=> __('World','pdf-renderer')
 *			],
 *		], 'l10n_varname' )
 *		->deps( 'jquery' ) // or ->deps( [ 'jquery','wp-backbone' ] )
 *		->footer( true ) // enqueue in footer
 *		->enqueue(); // actually enqueue script
 *
 */
class Factory {
	/**
	 *	@var Core\CoreInterface
	 */
	private $core = null;

	public static function get( $core ) {
		return new self( $core );
	}

	/**
	 *	@param CoreInterface $core
	 */
	 private function __construct( Core\CoreInterface $core ) {

 		$this->core = $core;

	}
	/**
	 *	@param String $asset
	 */
	public function asset( $asset ) : Asset {
		return Asset::get( $asset, $this->core );
	}

}
