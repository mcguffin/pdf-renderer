<?php
/**
 *	@package PdfRenderer\Core
 *	@version 1.0.1
 *	2018-09-22
 */

namespace PdfRenderer\Core;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}


class Core extends Plugin {

	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		add_action( 'init' , array( $this , 'init' ) );

		add_action( 'wp_enqueue_scripts' , array( $this , 'wp_enqueue_style' ) );

		$args = func_get_args();
		parent::__construct( ...$args );
	}

	/**
	 *	Load frontend styles and scripts
	 *
	 *	@action wp_enqueue_scripts
	 */
	public function wp_enqueue_style() {
	}




	/**
	 *	Init hook.
	 *
	 *  @action init
	 */
	public function init() {
	}

	/**
	 *	Get asset url for this plugin
	 *
	 *	@param	string	$asset	URL part relative to plugin class
	 *	@return string URL
	 */
	public function get_asset_url( $asset ) {
		$pi = pathinfo($asset);
		if ( defined('SCRIPT_DEBUG') && SCRIPT_DEBUG && in_array( $pi['extension'], ['css','js']) ) {
			// add .dev suffix (files with sourcemaps)
			$asset = sprintf('%s/%s.dev.%s', $pi['dirname'], $pi['filename'], $pi['extension'] );
		}
		return plugins_url( $asset, $this->get_plugin_file() );
	}


	/**
	 *	Get asset url for this plugin
	 *
	 *	@param	string	$asset	URL part relative to plugin class
	 *	@return string URL
	 */
	public function get_asset_path( $asset ) {
		$pi = pathinfo($asset);
		if ( defined('SCRIPT_DEBUG') && SCRIPT_DEBUG && in_array( $pi['extension'], ['css','js']) ) {
			// add .dev suffix (files with sourcemaps)
			$asset = sprintf('%s/%s.dev.%s', $pi['dirname'], $pi['filename'], $pi['extension'] );
		}
		return $this->get_plugin_dir() . '/' . preg_replace( '/^(\/+)/', '', $asset );
		return plugins_url( $asset, $this->get_plugin_file() );
	}


}
