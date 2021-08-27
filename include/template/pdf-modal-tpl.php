<?php

if ( ! defined('ABSPATH') )
	die();

?>
<script type="text/html" id="tmpl-pdf-modal">
	<div class="media-modal pdf-modal wp-core-ui">
		<button type="button" class="media-modal-close"><span class="media-modal-icon"><span class="screen-reader-text"><?php esc_html_e( 'Close', 'pdf-renderer' ); ?></span></span></button>
		<div class="media-modal-content">
			<div class="media-frame-title">
				<h1><?php esc_html_e( 'Attachment Details', 'pdf-renderer' ) ?></h1>
			</div>
			<div class="media-frame-content">
			</div>
			<div class="media-frame-pagenav"></div>
			<div class="media-frame-toolbar">
				<div class="media-frame-options">
					<div class="select-tools tools">
						<a href="#" data-action="select-all"><?php esc_html_e('Select all','pdf-renderer'); ?></a>
						<a href="#" data-action="unselect-all"><?php esc_html_e('Unselect all','pdf-renderer'); ?></a>
					</div>
					<div class="fileformat-tools tools">
						<span class="title"><?php esc_html_e('File Format','pdf-renderer'); ?></span>
						<label><input type="radio" name="pdf-renderer-fileformat" value="image/png" /><?php esc_html_e('PNG','pdf-renderer'); ?></label>
						<label><input type="radio" name="pdf-renderer-fileformat" value="image/jpeg" /><?php esc_html_e('JPEG','pdf-renderer'); ?></label>
					</div>
				</div>
				<div class="media-frame-buttons"></div>
			</div>
		</div>
	</div>
</script>
