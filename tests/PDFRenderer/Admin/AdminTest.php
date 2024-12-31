<?php

use PDFRenderer\Admin;

class AdminTest extends SingletonTestCase {

	protected static function wpSetUpBeforeClass() {
	}

	protected static function wpTearDownAfterClass() {
	}

	/**
	 * @covers PDFRenderer\Admin\Admin::__construct
	 */
	public function test_construct() {

		$admin = Admin\Admin::instance();

		$this->assertInstanceOf(Admin\Admin::class,$admin);
		$this->assertHasAction( 'print_media_templates', [ $admin, 'print_media_templates' ] );
		$this->assertHasAction( 'wp_enqueue_media', [ $admin, 'enqueue_assets' ] );

	}

	/**
	 * @covers PDFRenderer\Admin\Admin::print_media_templates
	 */
	public function test_print_media_templates() {

		$admin = Admin\Admin::instance();
		ob_start();
		$admin->print_media_templates();
		$result = ob_get_clean();
		$t1 = '<script type="text/html" id="tmpl-pdf-modal">';
		$t2 = '<script type="text/html" id="tmpl-pdf-page-item">';
		$this->assertNotFalse( strpos($result, $t1 ) );
		$this->assertNotFalse( strpos($result, $t2 ) );
	}
}
