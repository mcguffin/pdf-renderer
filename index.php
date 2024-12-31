<?php

/*
Plugin Name: PDF-Renderer
Description: WordPress plugin to convert PDFs to Images before uploading them
Plugin URI: https://github.com/mcguffin/pdf-renderer
Github Plugin URI: https://github.com/mcguffin/pdf-renderer
Author: Jörn Lund
Version: 0.2.0
Author URI: https://github.com/mcguffin
License: GPL3
Requires WP: 5.0
Requires PHP: 7.4
Text Domain: pdf-renderer
Domain Path: /languages/
Update URI: https://github.com/mcguffin/pdf-renderer/raw/master/.wp-release-info.json
*/

/*  Copyright 2021 Jörn Lund

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

namespace PDFRenderer;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}
use McGuffin\Core;

require_once __DIR__ . DIRECTORY_SEPARATOR . 'include/autoload.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'vendor/autoload.php';


PDFRenderer::instance()->bootstrap( __FILE__ );


if ( is_admin() || defined( 'DOING_AJAX' ) ) {
	Admin\Admin::instance();
}

// Enable WP auto update
add_filter( 'update_plugins_github.com', function( $update, $plugin_data, $plugin_file, $locales ) {

	if ( ! preg_match( "@{$plugin_file}$@", __FILE__ ) ) { // not our plugin
		return $update;
	}

	$response = wp_remote_get( $plugin_data['UpdateURI'] );

	if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) > 200 ) { // response error
		return $update;
	}

	return json_decode( wp_remote_retrieve_body( $response ), true, 512 );
}, 10, 4 );
