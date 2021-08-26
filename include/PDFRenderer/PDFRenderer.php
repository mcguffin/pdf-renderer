<?php
/**
 *	@package PDFRenderer\Core
 *	@version 1.0.1
 *	2018-09-22
 */

namespace PDFRenderer;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}

use McGuffin\Core;
use McGuffin\Plugin;

class PDFRenderer extends Plugin\Plugin implements Core\CoreInterface {

	/**
	 *	@inheritdoc
	 */
	public function activate() {}

	/**
	 *	@inheritdoc
	 */
	public function upgrade( $new_version, $old_version ) {}

	/**
	 *	@inheritdoc
	 */
	public function deactivate() {}

}
