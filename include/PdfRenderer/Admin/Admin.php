<?php
/**
 *	@package PDFRenderer\Admin
 *	@version 1.0.0
 *	2018-09-22
 */

namespace PDFRenderer\Admin;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}

use PDFRenderer\Core;


class Admin extends Core\Singleton {

	private $core;

	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		$this->core = Core\Core::instance();

//		add_action( 'admin_init', [ $this, 'admin_init' ] );

		add_action( 'print_media_templates', [ $this, 'print_media_templates' ] );

		add_action( 'wp_enqueue_media', [ $this, 'enqueue_assets' ] );

	}


	/**
	 *	@action 'print_media_templates'
	 */
	function print_media_templates() {
		// cropping tool
		$rp = $this->core->get_plugin_dir() . 'include' . DIRECTORY_SEPARATOR . '/template/{,*/,*/*/,*/*/*/}*.php';
		foreach ( glob( $rp, GLOB_BRACE ) as $template_file ) {
			include $template_file;
		}
	}

	/**
	 *	Admin init
	 *	@action admin_init
	 */
	public function admin_init() {
	}

	/**
	 *	Enqueue options Assets
	 *	@action admin_print_scripts
	 */
	public function enqueue_assets() {

		wp_enqueue_style( 'pdf-renderer-admin', $this->core->get_asset_url( '/css/admin/media.css' ) );

		wp_register_script( 'pdfjs', $this->core->get_asset_url( 'js/pdf/pdf.min.js' ) );
		wp_enqueue_script( 'pdf-renderer', $this->core->get_asset_url( 'js/admin/media.js' ), [ 'jquery', 'media-grid', 'pdfjs' ] );
		wp_localize_script('pdf-renderer', 'pdf_renderer', [
			'l10n'	=> [
				'pdfInstructions'	=> __( 'Blah blah … and click Proceed to continue','pdf-renderer' ),
				'pdfUpload'			=> __( 'PDF Upload', 'pdf-renderer' ),
				'CancelUpload'		=> __( 'Cancel Upload', 'pdf-renderer' ),
				'UploadPDF'			=> __( 'Upload as PDF', 'pdf-renderer' ),
				'UploadImages'		=> __( 'Upload Images', 'pdf-renderer' ),
				'Page'				=> __( 'Page', 'pdf-renderer' ),
			],
		] );
	}

}
