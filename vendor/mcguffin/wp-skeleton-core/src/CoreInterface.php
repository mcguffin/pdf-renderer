<?php
/**
 *	@package PDFRenderer\Core
 *	@version 1.0.0
 *	2018-09-22
 */

namespace McGuffin\Core;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}


interface CoreInterface {

	/**
	 *	@return string current Plugin version
	 */
	public function version();

	/**
	 *	@return string package slug
	 */
	public function get_slug();

	/**
	 *	Return locations where to look for assets and map them to URLs.
	 *
	 *	@return array array(
	 * 		'absolute_path'	=> 'absolute_url',
	 * )
	 */
	public function get_asset_roots();

	/**
	 *	Load text domain
	 *
	 *  @action plugins_loaded
	 */
	public function load_textdomain();

	/**
	 *	Get the package directory
	 *
	 *  @return String package directory
	 */
	public function get_package_dir();
}
