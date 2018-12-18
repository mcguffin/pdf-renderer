<?php

if ( ! defined('ABSPATH') )
	die();

?>
<script type="text/html" id="tmpl-pdf-page-item">
	<input name="current-page" type="radio" id="show-{{{ data.pagenum }}}" <# if (data.pagenum===1) { #>checked<# } #> />
	<input type="checkbox" id="sel-{{{ data.pagenum }}}" <# if (data.selected) { #>checked<# } #> />
	<label for="sel-{{{ data.pagenum }}}">
		<span class="dashicons dashicons-minus"></span>
	</label>
	<label for="show-{{{ data.pagenum }}}">
		<?php printf(__('Page %s', 'pdf-renderer' ),'{{{ data.pagenum }}}'); ?>
	</label>
</script>
