<?php

/*
Plugin Name: PDF-Renderer
Description: WordPress plugin to convert PDFs to Images before uploading them
Plugin URI: https://github.com/mcguffin/pdf-renderer
Github Plugin URI: https://github.com/mcguffin/pdf-renderer
Author: Jörn Lund
Version: 0.1.0
Author URI: https://github.com/mcguffin
License: GPL3
GitHub Plugin URI: mcguffin/pdf-renderer
Requires WP: 5.0
Requires PHP: 7.0
Text Domain: pdf-renderer
Domain Path: /languages/
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

/*
Plugin was generated with Jörn Lund's WP Skelton
https://github.com/mcguffin/wp-skeleton
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
