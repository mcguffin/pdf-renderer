<?php

if ( ! defined('ABSPATH') )
	die();

?>
<script type="text/html" id="tmpl-pdf-modal">
	<div class="media-modal pdf-modal wp-core-ui">
		<button type="button" class="media-modal-close"><span class="media-modal-icon"><span class="screen-reader-text"><?php _e('Close'); ?></span></span></button>
		<div class="media-modal-content">
			<div class="media-frame-title">
				<h1><?php _e( 'Attachment Details', 'wp-robocrop' ) ?></h1>
			</div>
			<div class="media-frame-content">
			</div>
			<div class="media-frame-pagenav"></div>
			<div class="media-frame-toolbar">
				<div class="media-frame-buttons"></div>
			</div>
		</div>
	</div>
</script>
