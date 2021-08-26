<?php
/**
 *	@package PDFRenderer\Core
 *	@version 1.0.0
 *	2018-09-22
 */

namespace McGuffin\Plugin;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}

use McGuffin\Core;

abstract class Plugin extends Core\Core implements Core\ComponentInterface,Core\CoreInterface {

	/** @var string plugin main file */
	private $plugin_file;

	/** @var array metadata from plugin file */
	private $plugin_meta;

	/** @var string plugin components which might need upgrade */
	private static $components = [];

	/**
	 *	@inheritdoc
	 */
	public final function bootstrap( $file ) {


		$this->plugin_file = $file;

		register_activation_hook( $this->get_plugin_file(), [ $this , 'activate' ] );
		register_deactivation_hook( $this->get_plugin_file(), [ $this , 'deactivate' ] );
		register_uninstall_hook( $this->get_plugin_file(), [ __CLASS__, 'uninstall' ] );

		add_action( 'plugins_loaded', [ $this, 'load_textdomain' ] );

		Core\Core::set( $this );

		parent::__construct();

	}

	/**
	 *	@return string full plugin file path
	 */
	public function get_plugin_file() {
		return $this->plugin_file;
	}

	/**
	 *	@return string full plugin file path
	 */
	public function get_package_dir() {
		return plugin_dir_path( $this->get_plugin_file() );
	}

	/**
	 *	@return string full plugin url path
	 */
	public function get_plugin_url() {
		return plugin_dir_url( $this->get_plugin_file() );
	}

	/**
	 *	Activation hook
	 */
	public function activate() {

	}

	/**
	 *	Deactivation hook
	 */
	public function deactivate() {

	}

	/**
	 *	Deactivation hook
	 */
	public function uninstall() {

	}

	/**
	 *	@inheritdoc
	 */
	public function get_asset_roots() {
		return [
			$this->get_package_dir() => $this->get_plugin_url(),
		];
	}

	/**
	 *	@return string plugin slug
	 */
	public function get_slug() {
		return basename( $this->get_package_dir() );
	}

	/**
	 *	@return string Path to the main plugin file from plugins directory
	 */
	public function get_wp_plugin() {
		return plugin_basename( $this->get_plugin_file() );
	}

	/**
	 *	@param string $which Which plugin meta to get. NUll
	 *	@return string|array plugin meta
	 */
	public function get_plugin_meta( $which = null ) {
		if ( ! isset( $this->plugin_meta ) ) {
			$this->plugin_meta = get_plugin_data( $this->get_plugin_file() );
		}
		if ( isset( $this->plugin_meta[ $which ] ) ) {
			return $this->plugin_meta[ $which ];
		}
		return $this->plugin_meta;
	}


	/**
	 *	@action plugins_loaded
	 */
	public function maybe_upgrade() {
		// trigger upgrade
		$new_version = $this->version();
		$old_version = get_site_option( $this->get_prefix() . '_version' );

		// call upgrade
		if ( version_compare($new_version, $old_version, '>' ) ) {

			$this->upgrade( $new_version, $old_version );

			update_site_option( $this->get_prefix() . '_version', $new_version );

		}
	}

	/**
	 *  @inheritdoc
	 */
	public function load_textdomain() {
		$path = pathinfo( $this->get_wp_plugin(), PATHINFO_DIRNAME );
		load_plugin_textdomain( $this->get_slug(), false, $path . '/languages' );
	}

}
