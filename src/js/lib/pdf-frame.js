import $ from 'jquery';
import o from 'moxie';
import { PageItem } from 'page-item.js';
import { pdfAllowed, l10n, options } from 'misc.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = options.worker_url;

const PDFFrame = wp.media.view.MediaFrame.extend({
	template: wp.template('pdf-modal'),
	regions: [ 'title','content','instructions','buttons', 'pagenav' ],
	events: {
		'click [data-page]' : 'clickPage',
		'click .media-modal-close' : function() {
			this.trigger('cancel-upload');
			this.reset().close();
		},
		'click [data-action="select-all"]' : 'selectAll',
		'click [data-action="unselect-all"]' : 'unselectAll'
	},
	_state: 'pdf-frame',
	initialize: function() {

		const self = this;

		_.defaults( this.options, {
			uploader:	false,
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
					self.reset().close();
					// dismiss, continue with wp default behaviour
				}
			});
		}
		this._cancelBtn = new wp.media.view.Button({
			text: l10n.CancelUpload,
			className: 'cancel-upload',
			click:function() {
				self.trigger('cancel-upload');
				self.reset().close();
			}
		});

		this._pages = new Backbone.Collection();
		this.listenTo(this._pages,'change:selected',function(e){
			// disable img upload btn if no pages selected
			this._uploadBtn.$el.prop('disabled', ! this._pages.where( { selected: true } ).length )
		})

		this.createTitle();
		this.createButtons();

		this.on( 'escape', () => {
			self.reset();
			self.trigger('cancel-upload');
		});

		return this;

	},
	render:function() {
		const ret = wp.media.view.MediaFrame.prototype.render.apply(this,arguments);
		this.$(`[name="pdf-renderer-fileformat"][value="${options.image_type}"]`).prop('checked',true)
		return ret;
	},
	getImageType:function() {
		return this.$('[name="pdf-renderer-fileformat"]:checked').val();
	},
	reset: function() {
		this.actionBtn.forEach( btn => btn.$el.prop( 'disabled', false ) )
		this.title.set([]);
		this.content.set([]);
		this.pagenav.set([]);
		this._pages.reset([]);
		this._pdf = this._canvas = null;
		this._current_page = 0;
		return this;
	},
	createTitle: function( ) {
		let title;
		this._title = new wp.media.View({
			tagName: 'h1'
		});
		if ( this.file ) {
			title = l10n.Upload + ': ' + this.file.file.name.replace(/\.[a-z0-9]+$/,'');
		} else {
			title =	l10n.pdfUpload;
		}
		this._title.$el.text( title );
		this.title.set( [ this._title ] );
		return this;
	},
	createButtons: function() {
		this.actionBtn = [];

		this.actionBtn.push( this._cancelBtn );
		if ( !! this._skipBtn ) {
			this.actionBtn.push( this._skipBtn );
		}
		this.actionBtn.push( this._uploadBtn );

		this.buttons.set( this.actionBtn );
		return this;
	},
	setFile:function( file ) {
		const self = this,
			fileReader = new FileReader();
		this.file = file;
		fileReader.onload = function(event) {
//			    arrayBuffer = event.target.result;
			self.parsePDF( event.target.result );
		};
		fileReader.readAsArrayBuffer( file.blob );
		return this.createTitle();
	},
	clickPage:function(e) {
		this.showPage($(e.target).attr('data-page'));
	},
	renderPageNav:function(numPages) {
		const self = this, btns = [];
		let m, i = 1, pgItem;

		while ( this._pages.length ) {
			this._pages.pop();
		}

		for (i;i<=numPages;i++) {
			m = new Backbone.Model({
				id:i,
				selected:true,
			});
			this._pages.add( m );
			pgItem = new PageItem({
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
			});
			m.set( 'pageItem', pgItem );
			btns.push( pgItem );
		}
		this.pagenav.set( btns );
	},
	selectAll:function() {
		this.$('.pdf-page-item > [type="checkbox"]').each((i,el) => {
			$(el).prop('checked',true).trigger('change')
		})
	},
	unselectAll:function() {
		this.$('.pdf-page-item > [type="checkbox"]').each((i,el) => {
			$(el).prop('checked',false).trigger('change')
		})
	},
	parsePDF: function( arr ) {
		const self = this;
		pdfjsLib.getDocument(arr).promise.then(
			pdf => {
				self._pdf = pdf;
				self.renderPageNav(pdf.numPages)

				self.showPage(1);
			},
			console.error
		)
	},
	showPage:function(idx) {
		const self = this,
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
		const self = this,
			m = this._pages.get(idx);
		(async () => {
			const page = await self._pdf.getPage(idx),
				canvas = $('<canvas></canvas>').get(0),
				ctx = canvas.getContext('2d');

			let vp = page.getViewport({scale:1});

			vp = page.getViewport( { scale: options.image_width / vp.width } );

			canvas.width = vp.width;
			canvas.height = vp.height;

			page.render({
				canvasContext: ctx,
				viewport: vp,
			}).promise.then(() => {
				m.set( 'page', page );
				m.set( 'canvas', canvas );
				!!cb && cb.apply(m,cb_args||[]);
			});


		})();
	},

	uploadImages:function() {
		const self = this,
			type = self.getImageType(),
			upload = function( name ) {
				const m = this;

				this.get('canvas').toBlob( function(blob) {

					const file = new File( [blob], name, { type } );

					self.options.uploader.addFile( file );
					m.set( 'selected', false );

				}, type, options.jpeg_quality * 0.01 )

			};

		this.actionBtn.forEach( btn => btn.$el.prop('disabled',true) )

		// create e new media model from blob data URL thingy
		_.each( this._pages.where( { selected: true } ), ( pg, i ) => {

			const name = self.file.file.name.replace(/\.[a-z0-9]+$/,'') + '-p' + i + '.' + ( 'image/png'  === type ? 'png' : 'jpg' );

			if ( ! pg.get('canvas') ) {
				// needs rendering
				self.renderPage( pg.get('id'), upload,[name]);
			} else {
				upload.apply(pg,[name])
			}
		});
		this.reset().close()
	}
});

export { PDFFrame }
