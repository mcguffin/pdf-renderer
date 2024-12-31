<?php
/**
 *	@package McGuffin\Core
 *	@version 1.0.0
 *	2018-09-22
 */

namespace McGuffin\Core;

abstract class Core extends Singleton implements ComponentInterface,CoreInterface {

	/** @var CoreInterface core (plugin or theme) */
	private static CoreInterface $core;

	/** @var String plugin components which might need upgrade */
	private static $components = [];

	/** @var String version number */
	private $_version = null;

	/**
	 *	@param CoreInterface $core
	 */
	protected static function set( CoreInterface $core ) {
		if ( isset( self::$core ) ) {
			throw new \Exception('Core already set');
		}
		self::$core = $core;
	}

	/**
	 *	@return CoreInterface
	 */
	public static function get() : CoreInterface {
		return self::$core;
	}

	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		add_action( 'admin_init', [ $this, 'maybe_upgrade' ] );

	}

	/**
	 *	@return string package prefix
	 */
	final public function get_prefix() {

		return str_replace( '-', '_', $this->get_slug() );

	}

	/**
	 *	@return string current plugin version
	 */
	final public function version() {
		if ( is_null( $this->_version ) ) {
			$this->_version = include_once $this->get_package_dir() . 'include/version.php';
		}
		return $this->_version;
	}

	/**
	 *	@action plugins_loaded
	 */
	public function maybe_upgrade() {
		// trigger upgrade
		$new_version = $this->version();
		$old_version = get_site_option( $this->get_prefix() . '_version' );

		// call upgrade
		if ( version_compare( $new_version, $old_version, '>' ) ) {

			$this->upgrade( $new_version, $old_version );

			update_site_option( $this->get_prefix() . '_version', $new_version );

		}

	}


	/**
	 *	Fired on plugin activation
	 */
	public function activate() {

		$this->maybe_upgrade();

		foreach ( self::$components as $component ) {
			$comp = $component::instance();
			$comp->activate();
		}
	}


	/**
	 *	Fired on plugin updgrade
	 *
	 *	@param string $nev_version
	 *	@param string $old_version
	 *	@return array(
	 *		'success' => bool,
	 *		'messages' => array,
	 * )
	 */
	public function upgrade( $new_version, $old_version ) {

		$result = array(
			'success'	=> true,
			'messages'	=> array(),
		);

		foreach ( self::$components as $component ) {
			$comp = $component::instance();
			$upgrade_result = $comp->upgrade( $new_version, $old_version );
			$result['success'] 		&= $upgrade_result['success'];
			$result['messages'][]	=  $upgrade_result['message'];
		}

		return $result;
	}

	/**
	 *	Fired on plugin deactivation
	 */
	public function deactivate() {
		foreach ( self::$components as $component ) {
			$comp = $component::instance();
			$comp->deactivate();
		}
	}

	/**
	 *	Fired on plugin deinstallation
	 */
	public function uninstall() {
		foreach ( self::$components as $component ) {
			$comp = $component::instance();
			$comp->uninstall();
		}
	}

}
