(function( $, opts, o ) {

	var pdfRenderer = {
			view: {}
		},
		l10n = opts.l10n,
		imageInfos = {},
		PageItem;


	PageItem = wp.media.View.extend({
		template:  wp.template('pdf-page-item'),
		className:'pdf-page-item',
		initialize:function() {
			return wp.media.View.prototype.initialize.apply(this,arguments);
		},
		render:function() {
			return wp.media.View.prototype.render.apply(this,arguments);
		}
	});

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

			this._pages = new Backbone.Collection()

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
				i = 1, btns = [], m;

			this._pages = new Backbone.Collection()

			for (i;i<=numPages;i++) {
				m = new Backbone.Model({
					id:i,
					selected:true,
				});
				this._pages.add( m );
				console.log(this._pages.get(i))
				btns.push(
					new PageItem({
						pagenum:i,
						selected:true,
						model:m,
						events:{
							'change [type="radio"]' : function(){
								if ( this.$('[type="radio"]').prop('checked') ) {
									self.showPage( this.options.pagenum );
								}
							},
							'change [type="checkbox"]' : function(){
								this.model.set( 'selected', this.$('[type="checkbox"]').prop('checked') );
							}
						}
					})
				);

			}
			this.pagenav.set( btns );
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
		showPage:function(idx) {
			var self = this,
				m = this._pages.get(idx);

			if ( !! m.get('canvas') ) {
				this.content.set( [
					new wp.media.View({
						el: m.get('canvas'),
					})
				] );
			} else {
				this.content.set([new Backbone.View()])
				this.renderPage( idx, function(){
					self.showPage(idx);
				} );
			}

		},
		renderPage:function(idx,cb,cb_args) {
			var self = this,
				m = this._pages.get(idx);

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
					m.set( 'page', page );
					m.set( 'canvas', canvas );

					!!cb && cb.apply(m,cb_args||[]);
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
					img.load( this.get('canvas').toDataURL(type) );
					//
					$('body').append(img);
				};

			// create e new media model from blob data URL thingy
			this._pages.each(function( pg, i ){
				if ( ! pg.get('selected') ) {
					return;
				}
				var name = self.file.file.name.replace(/\.[a-z0-9]+$/,'') + '-p' + i + '.png';
				if ( ! pg.get('canvas') ) {
					// needs rendering
					self.renderPage(i*1, upload,[name]);
				} else {
					upload.apply(pg,[name])
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
