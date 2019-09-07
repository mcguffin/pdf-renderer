<?php

namespace PDFRenderer;

class PluginTest {

	private $current_json_save_path = null;

	public function __construct() {

		add_filter( 'upload_mimes', function( $mime ) {
			unset( $mime['pdf'] );
			return $mime;
		});

	}



}

new PluginTest();
