module.exports = {
	pdfAllowed: _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',').indexOf('pdf') !== -1,
	l10n: pdf_renderer.l10n,
	options: pdf_renderer.options
}
