const pdfAllowed = _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',').indexOf('pdf') !== -1
const { l10n, options } = pdf_renderer


export { pdfAllowed, l10n, options }
