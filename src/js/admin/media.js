(function( $, opts, o ) {

	var pdfRenderer = {
			view: {}
		},
		l10n = opts.l10n,
		imageInfos = {},
		PageItem,
		pdfAllowed = _wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(',').indexOf('pdf') !== -1;

	// temporaily add pdf type to plupload settings,
	// so the uploader doesn't cancel too early.
	// File types are checked server-side too, so
	// there should be no security implications.
	if ( ! pdfAllowed ) {
		_wpPluploadSettings.defaults.filters.mime_types[0].extensions += ',pdf';
	}

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
		template: wp.template('pdf-modal'),
		regions: [ 'title','content','instructions','buttons', 'pagenav' ],
		events: {
			'click [data-page]' : 'clickPage',
			'click .media-modal-close' : function() {
				this.trigger('cancel-upload');
				this.close();
			}
		},
		initialize: function() {

			var self = this;

			_.defaults( this.options, {
				uploader:	false,
				title:		l10n.pdfUpload,
			});

			wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments);

			this._pdf = this._canvas = null;
			this._current_page = 0;

			this._uploadBtn = new wp.media.view.Button({
				text: l10n.UploadImages,
				className: 'button-primary',
				click:function() {
					self.trigger('cancel-upload');
					self.uploadImages();
				}
			});
			if ( pdfAllowed ) {
				this._skipBtn = new wp.media.view.Button({
					text: l10n.UploadPDF,
					className: 'upload-pdf',
					click:function() {
						self.trigger('continue-upload');
						self.close();
						// dismiss, continue with wp default behaviour
					}
				});
			}
			this._cancelBtn = new wp.media.view.Button({
				text: l10n.CancelUpload,
				className: 'cancel-upload',
				click:function() {
					self.trigger('cancel-upload');
					self.close();
				}
			});

			this._pages = new Backbone.Collection();
			this.listenTo(this._pages,'change:selected',function(e){
				// disable img upload btn if no pages selected
				this._uploadBtn.$el.prop('disabled', this._pages.where({selected:true}).length === 0 )
			})

			this.createTitle();
			this.createButtons();

			this.on('escape',function(){
				self.trigger('cancel-upload');
			})

			return this;

		},
		escape:function() {
			console.log(this);
			this.trigger('cancel-upload');
			return wp.media.view.MediaFrame.prototype.escape.apply(this,arguments);
		},
		createTitle: function( ) {
			this._title = new wp.media.View({
				tagName: 'h1'
			});
			this._title.$el.text( this.options.title );
			this.title.set( [ this._title ] );
		},
		createButtons: function() {
			var self = this,
				btns = [];
			btns.push( this._cancelBtn );
			if ( pdfAllowed ) {
				btns.push( this._skipBtn );
			}
			btns.push( this._uploadBtn );
			this.buttons.set( btns );
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

			while ( this._pages.length ) {
				this._pages.pop();
			}

			for (i;i<=numPages;i++) {
				m = new Backbone.Model({
					id:i,
					selected:true,
				});
				this._pages.add( m );

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
					var img = new o.Image(),
						m = this;
					img.onload = function() {
						img.name = name;
						img.type = type;
						self.options.uploader.addFile( img.getAsBlob(), name );

						self._pages.remove(m.id);

						if ( ! self._pages.length ) {
							self.close();
						}
					}

					img.load( this.get('canvas').toDataURL(type) );
					//
					$('body').append(img);
				};

			// create e new media model from blob data URL thingy

			_.each( this._pages.where( { selected: true } ), function( pg, i ){

				var name = self.file.file.name.replace(/\.[a-z0-9]+$/,'') + '-p' + i + '.png';

				if ( ! pg.get('canvas') ) {
					// needs rendering
					self.renderPage( pg.get('id'), upload,[name]);
					console.log('render:',pg.get('id'))
				} else {
					upload.apply(pg,[name])
					console.log('direct:',pg.get('id'))
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

			function pdfPopup( uploader, fileItem ) {

				if ( pdfModal ) {
					pdfModal.close().dispose();
				}

				pdfModal = new pdfRenderer.view.PDFFrame( {
					controller: $(this),
					uploader:uploader,
					title: l10n.Upload + ': ' + fileItem.file.name.replace(/\.[a-z0-9]+$/,''),
				} );
				pdfModal.on('proceed',function() {
					// next
					pdfPopup( uploader );

				}).on('cancel-upload',function() {
					uploader.removeFile( fileItem.file ); // !!
					fileItem.file.attachment.destroy();
				}).on('continue-upload',function(){
					uploader.start();
				});
				pdfModal.setFile( fileItem );
				pdfModal.open();
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

			// send cropdata
			this.uploader.uploader.bind('BeforeUpload',function( up, file ) {
				console.log('BEFORE UPLOAD')
				if ( file.type == 'application/pdf') {

					fileData = resolveFile( file );
					if ( fileData.blob instanceof Blob ) {
						up.stop();
						up.refresh();
						pdfPopup( up, fileData ); // will ask for focus or start uploader
					}
				}

				if ( pdfs.length ) {
				}
			});
			return ret;
		}
	});

})( jQuery, pdf_renderer, mOxie );
