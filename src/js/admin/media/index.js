import $ from 'jquery';
import PDFFrame from 'pdf-frame.js';
import { pdfAllowed, l10n } from 'misc.js';



// temporaily add pdf type to plupload settings,
// so the uploader doesn't cancel too early.
// File types are checked server-side too, so
// there should be no security implications.
if ( ! pdfAllowed ) {
	_wpPluploadSettings.defaults.filters.mime_types[0].extensions += ',pdf';
}

// extend WP Uploader window
_.extend( wp.media.view.UploaderWindow.prototype, {
	_parentReady: wp.media.view.UploaderWindow.prototype.ready,
	didReady:false,

	ready:function() {
		const pdfs = [], 
			self = this;
		let pdfModal, ret;

		// prevent double init
		if ( this.didReady ) {
			return this._parentReady.apply( this , arguments );
		}
		this.didReady = true;

		ret = this._parentReady.apply( this , arguments );

		function pdfPopup( uploader, fileItem ) {

			if ( pdfModal ) {
				pdfModal.reset().close().dispose();
			} else {
				pdfModal = new PDFFrame( {
					controller: $(this),
					uploader:uploader
				} );
				pdfModal.on('cancel-upload', () => {
					// stop ecerything!
					uploader.removeFile( pdfModal.file.file );
					pdfModal.file.file.attachment.destroy();

				}).on('continue-upload',() => {
					// go ahead with a normal WP upload..
					uploader.start();
				});				
			}
			
			pdfModal.setFile( fileItem );
			pdfModal.open();
		}

		/**
		 *	@return native file object or blob
		 */
		function resolveFile( file ) {
			const _ret = {
				file: file,
				blob:file.getNative()
			};
			if ( ! _ret.blob ) {
				_ret.blob = file.getSource();
			}
			return _ret;
		}

		// send cropdata
		this.uploader.uploader.bind('BeforeUpload',function( up, file ) {

			if ( file.type == 'application/pdf') {

				const fileData = resolveFile( file );
				if ( fileData.blob instanceof Blob ) {
					up.stop();
					up.refresh();
					pdfPopup( up, fileData ); // will ask for focus or start uploader
				}
			}

		});
		return ret;
	}
});
