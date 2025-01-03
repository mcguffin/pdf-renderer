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

use PDFRenderer\PDFRenderer;
use McGuffin\Asset;
use McGuffin\Core;


class Admin extends Core\Singleton {

	/** @var PDFRenderer\PDFRenderer */
	private $core;

	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		$this->core = PDFRenderer::instance();

		add_action( 'print_media_templates', [ $this, 'print_media_templates' ] );

		add_action( 'wp_enqueue_media', [ $this, 'enqueue_assets' ] );
	}


	/**
	 *	@action 'print_media_templates'
	 */
	function print_media_templates() {
		// cropping tool
		$rp = $this->core->get_package_dir() . 'include/template/*.php';
		foreach ( glob( $rp ) as $template_file ) {
			include $template_file;
		}
	}

	/**
	 *	Enqueue options Assets
	 *	@action admin_print_scripts
	 */
	public function enqueue_assets() {

		$factory = Asset\Factory::get( $this->core );

		$factory->asset('css/admin/media.css' )
			->enqueue();

		$factory->asset('js/admin/media.js' )
			->deps( [
				'jquery',
				'media-grid',
				$factory->asset('js/pdf/pdf.min.js' )->register()->handle
			] )
			->localize( [
				'l10n'	=> [
					'pdfInstructions'	=> __( 'Blah blah … and click Proceed to continue','pdf-renderer' ),
					'Upload'			=> __( 'Upload', 'pdf-renderer' ),
					'pdfUpload'			=> __( 'PDF Upload', 'pdf-renderer' ),
					'CancelUpload'		=> __( 'Cancel Upload', 'pdf-renderer' ),
					'UploadPDF'			=> __( 'Upload as PDF', 'pdf-renderer' ),
					'UploadImages'		=> __( 'Upload Images', 'pdf-renderer' ),
					'Page'				=> __( 'Page', 'pdf-renderer' ),
				],
				'options'	=> [
					'image_width'	=> apply_filters( 'pdf_renderer_image_width', $this->get_max_image_width() ),
					'image_type'	=> apply_filters( 'pdf_renderer_image_type', 'image/png' ),
					'jpeg_quality'	=> apply_filters( 'jpeg_quality', 82, 'pdf_renderer' ),
					'worker_url'	=> $factory->asset('js/pdf/pdf.worker.min.js' )->url,
				],
			], 'pdf_renderer' )
			->enqueue();
	}

	/**
	 *	Get all image sizes
	 *
	 *	@return int
	 */
	public function get_max_image_width( ) {

		global $_wp_additional_image_sizes;
		$max_w = 0;

		$intermediate_image_sizes = get_intermediate_image_sizes();

		// Create the full array with sizes and crop info
		foreach( $intermediate_image_sizes as $_size ) {

			if ( in_array( $_size, [ 'thumbnail', 'medium', 'large' ] ) ) {
				$w    = intval( get_option( $_size . '_size_w' ) );
			} elseif ( isset( $_wp_additional_image_sizes[ $_size ] ) ) {
				$w    = intval( $_wp_additional_image_sizes[ $_size ]['width'] );
			} else {
				continue;
			}

			$max_w = max($w,$max_w);
		}
		return $max_w;
	}


}
