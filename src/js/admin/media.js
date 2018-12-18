(function( $, opts, o ) {

	var pdfRenderer = {
			view: {}
		},
		l10n = opts.l10n,
		imageInfos = {};


	pdfRenderer.view.PDFFrame = wp.media.view.MediaFrame.extend({
		template:  wp.template('pdf-modal'),
		regions:   [ 'title','content','instructions','buttons', 'pagenav' ],
		events:{
			'click [data-page]' : 'clickPage'
		},
		initialize: function( ) {


			_.defaults( this.options, {
				uploader:	false,
				title:		l10n.pdfUpload,
			});

			wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments);

			this._pdf = this._canvas = null;
			this._current_page = 0;
			this._pages = {};

			this.createTitle();
			this.createButtons();

			return this;

		},
		createTitle: function( ) {
			this._title = new wp.media.View({
				tagName: 'h1'
			});
			this._title.$el.text( this.options.title );
			this.title.set( [ this._title ] );
		},
		createButtons: function() {
			var self = this;
			this.buttons.set( [
				new wp.media.view.Button({
					text: l10n.CancelUpload,
					className: 'cancel-upload',
					click:function() {
						self.trigger('cancel-upload');
						self.close();
					}
				}),
				new wp.media.view.Button({
					text: l10n.UploadPDF,
					className: 'upload-pdf',
					click:function() {
						// dismiss, continue with wp defualt behaviour
					}
				}),
				new wp.media.view.Button({
					text: l10n.UploadImages,
					className: 'button-primary',
					click:function() {
						self.trigger('cancel-upload');
						self.uploadImages();
						self.close();
					}
				})
			] );
		},
		setFile:function( file ) {
			var self = this,
				fileReader = new FileReader();
			this.file = file;
			fileReader.onload = function(event) {
//			    arrayBuffer = event.target.result;
				self.parsePDF( event.target.result );
			};
			fileReader.readAsArrayBuffer( file.blob );
			return this;
		},
		clickPage:function(e) {
			this.showPage($(e.target).attr('data-page'));
		},
		renderPageNav:function(numPages) {
			console.log()
			var self = this,
				i = 1, btns = [], bgrp;
			this._pages = {};
			for (i;i<=numPages;i++) {
				this._pages[i] = {
					page:false,
					canvas:false,
					selected:true,
				}
				/*
				btns.push( $('<button>'+i+'</button>').get(0) );
				/*/
				btns.push(
					new wp.media.view.Button({
						text: '',
						className: 'button-primary dashicons-yes dashicons',
						_page:i,
						click:function() {
							self.togglePage(this.options._page);
							this.$el.toggleClass('button-primary').next('button').toggleClass('button-primary');

						}
					}).render()
				);

				btns.push(
					new wp.media.view.Button({
						text: i.toString(),
						className: 'button-primary',
						_page:i,
						click:function() {
							self.showPage(this.options._page);
						}
					}).render()
				);

				//*/
			}
			bgrp = new wp.media.view.ButtonGroup({
				buttons:btns,
			});
			this.pagenav.set([ bgrp.render() ]);
		},
		parsePDF:function( arr ) {
			var self = this;
			pdfjsLib.getDocument(arr).then(function(pdf) {
				// build pages selector
				self._pdf = pdf;
				self.renderPageNav(pdf.numPages)

				self.showPage(1);
			});
		},
		togglePage:function(idx) {
			this._pages[idx].selected = ! this._pages[idx].selected;
			_.each(this._pages, function(el,i){
				console.log(i,el);
			})
		},
		showPage:function(idx) {
			var self = this;
			if ( !! this._pages[idx].canvas ) {
				this.content.set( [
					new wp.media.View({
						el: this._pages[idx].canvas,
					})
				] );
			} else {
				this.renderPage( idx, function(){
					self.showPage(idx);
				} );
			}

		},
		renderPage:function(idx,cb,cb_args) {
			var self = this;

			self._pdf.getPage(idx).then(function(page){
				var vp = page.getViewport(1),
					canvas = $('<canvas></canvas>').get(0),
					ctx = canvas.getContext('2d');

				vp = page.getViewport( opts.options.image_width / vp.width );

				canvas.width = vp.width;
				canvas.height = vp.height;

				page.render({
					canvasContext: ctx,
					viewport: vp,
				}).then(function(){
					self._pages[idx].page = page;
					self._pages[idx].canvas = canvas;

					!!cb && cb.apply(self._pages[idx],cb_args||[]);
//					self.showPage(idx);
				});
			});
		},


		uploadImages:function() {
			var self = this,
				type = 'image/png',
				upload = function(name){
					/*
					this.canvas.toBlob(function(blob){
						blob.name = name;
						blob.type = type;
						console.log(blob.name)
						console.log(self.options.uploader,blob)
						self.options.uploader.addFile( blob, name );
					},type);
					/*/
					var img = new o.Image();
					img.onload = function() {
						img.name = name;
						img.type = type;
						self.options.uploader.addFile( img.getAsBlob(), name );
					}
					img.load( this.canvas.toDataURL(type) );
					//
					$('body').append(img);
				};

			// create e new media model from blob data URL thingy
			_.each(this._pages,function( pg, i ){
				var name = self.file.file.name.replace(/\.[a-z0-9]+$/,'') + '-p' + i + '.png';
				if ( ! pg.canvas ) {
					// needs rendering
					self.renderPage(i*1, upload,[name]);
				} else {
					upload.apply(pg)
				}
			});


			//
		}
	});


	_.extend( wp.media.view.UploaderWindow.prototype, {
		_parentReady: wp.media.view.UploaderWindow.prototype.ready,
		didReady:false,

		ready:function() {
			var pdfs = [],
				pdfModal, self = this;

			// prevent double init
			if ( this.didReady ) {
				return this._parentReady.apply( this , arguments );
			}
			this.didReady = true;

			ret = this._parentReady.apply( this , arguments );

			function pdfPopup( uploader ) {
				var fileItem, src;
				if ( pdfModal ) {
					pdfModal.close().dispose();
				}
				if ( !! pdfs.length ) {
					fileItem = pdfs.shift();
					pdfModal = new pdfRenderer.view.PDFFrame( {
						controller: $(this),
						uploader:uploader,
						title: l10n.Upload + ': ' + fileItem.file.name.replace(/\.[a-z0-9]+$/,''),
					} );
					pdfModal.on('proceed',function() {
						// next
						pdfPopup( uploader );

					}).on('cancel-upload',function() {
						fileItem.file.attachment.destroy();
					});
					pdfModal.setFile( fileItem );
					pdfModal.open();
				} else {
					uploader.start();
				}
			}

			function addPDF( fileData, uploader ) {

			}

			/**
			 *	@return native file object or blob
			 */
			function resolveFile( file ) {
				var _ret = {
					file: file,
					blob:file.getNative()
				}, _ret2, bytes, i;
				if ( ! _ret.blob ) {
					_ret.blob = file.getSource();
				}
				return _ret;
			}

			// stop uploader and generate cropdata
			this.uploader.uploader.bind('FilesAdded',function( up, files ) {
				var fileData;
				// put modal
				for (var i=0;i<files.length;i++) {
					if ( files[i].type == 'application/pdf') {
						fileData = resolveFile( files[i] );
						if ( fileData.blob instanceof Blob ) {
							pdfs.push( fileData );
						}
					}
				}
				if ( pdfs.length ) {
					up.stop();
					up.refresh();
					pdfPopup( up ); // will ask for focus or start uploader
				}
			});
			// send cropdata
			this.uploader.uploader.bind('BeforeUpload',function( up, file ) {
				var s, cropdata, focuspoint;
				// do something with files before upload...
			});
			return ret;
		}
	});

})( jQuery, pdf_renderer, mOxie );
