!function(p,l,s){var o,d={view:{}},c=l.l10n,t=-1!==_wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(",").indexOf("pdf");t||(_wpPluploadSettings.defaults.filters.mime_types[0].extensions+=",pdf"),o=wp.media.View.extend({template:wp.template("pdf-page-item"),className:"pdf-page-item",initialize:function(){return wp.media.View.prototype.initialize.apply(this,arguments)},render:function(){return wp.media.View.prototype.render.apply(this,arguments)}}),d.view.PDFFrame=wp.media.view.MediaFrame.extend({template:wp.template("pdf-modal"),regions:["title","content","instructions","buttons","pagenav"],events:{"click [data-page]":"clickPage","click .media-modal-close":function(){this.trigger("cancel-upload"),this.close()}},initialize:function(){var e=this;return _.defaults(this.options,{uploader:!1,title:c.pdfUpload}),wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments),this._pdf=this._canvas=null,this._current_page=0,this._uploadBtn=new wp.media.view.Button({text:c.UploadImages,className:"button-primary",click:function(){e.trigger("cancel-upload"),e.uploadImages()}}),t&&(this._skipBtn=new wp.media.view.Button({text:c.UploadPDF,className:"upload-pdf",click:function(){e.trigger("continue-upload"),e.close()}})),this._cancelBtn=new wp.media.view.Button({text:c.CancelUpload,className:"cancel-upload",click:function(){e.trigger("cancel-upload"),e.close()}}),this._pages=new Backbone.Collection,this._uploadPages=new Backbone.Collection,this.listenTo(this._pages,"change:selected",function(e){this._uploadBtn.$el.prop("disabled",0===this._pages.where({selected:!0}).length)}),this.createTitle(),this.createButtons(),this.on("escape",function(){e.trigger("cancel-upload")}),this},escape:function(){return this.trigger("cancel-upload"),wp.media.view.MediaFrame.prototype.escape.apply(this,arguments)},createTitle:function(){this._title=new wp.media.View({tagName:"h1"}),this._title.$el.text(this.options.title),this.title.set([this._title])},createButtons:function(){this.actionBtn=[],this.actionBtn.push(this._cancelBtn),t&&this.actionBtn.push(this._skipBtn),this.actionBtn.push(this._uploadBtn),this.buttons.set(this.actionBtn)},setFile:function(e){var t=this,i=new FileReader;return this.file=e,i.onload=function(e){t.parsePDF(e.target.result)},i.readAsArrayBuffer(e.blob),this},clickPage:function(e){this.showPage(p(e.target).attr("data-page"))},renderPageNav:function(e){for(var t,i=this,a=1,n=[];this._pages.length;)this._pages.pop();for(;a<=e;a++)t=new Backbone.Model({id:a,selected:!0}),this._pages.add(t),n.push(new o({pagenum:a,selected:!0,model:t,events:{'change [type="radio"]':function(){this.$('[type="radio"]').prop("checked")&&i.showPage(this.options.pagenum)},'change [type="checkbox"]':function(){this.model.set("selected",this.$('[type="checkbox"]').prop("checked"))}}}));this.pagenav.set(n)},parsePDF:function(e){var t=this;pdfjsLib.getDocument(e).then(function(e){t._pdf=e,t.renderPageNav(e.numPages),t.showPage(1)})},showPage:function(e){var t=this,i=this._pages.get(e);i.get("canvas")?this.content.set([new wp.media.View({el:i.get("canvas")})]):(this.content.set([new Backbone.View]),this.renderPage(e,function(){t.showPage(e)}))},renderPage:function(e,n,o){var s=this._pages.get(e);this._pdf.getPage(e).then(function(e){var t=e.getViewport(1),i=p("<canvas></canvas>").get(0),a=i.getContext("2d");t=e.getViewport(l.options.image_width/t.width),i.width=t.width,i.height=t.height,e.render({canvasContext:a,viewport:t}).then(function(){s.set("page",e),s.set("canvas",i),n&&n.apply(s,o||[])})})},uploadImages:function(){var a=this,n=l.options.image_type,o=function(e){var t=new s.Image,i=this;t.onload=function(){t.name=e,t.type=n,t._fromPDF=!0,a.options.uploader.addFile(t.getAsBlob(),e),a._pages.remove(i.id),i.set("image",t),a._uploadPages.add(i),a._uploadPages.length===a._pages.where({selected:!0}).length&&(a.trigger("complete"),a.close())},t.load(this.get("canvas").toDataURL(l.options.image_type,.01*l.options.jpeg_quality)),p("body").append(t)};_.each(this.actionBtn,function(e){e.$el.prop("disabled",!0)}),_.each(this._pages.where({selected:!0}),function(e,t){var i=a.file.file.name.replace(/\.[a-z0-9]+$/,"")+"-p"+t+".png";e.get("canvas")?o.apply(e,[i]):a.renderPage(e.get("id"),o,[i])})}}),_.extend(wp.media.view.UploaderWindow.prototype,{_parentReady:wp.media.view.UploaderWindow.prototype.ready,didReady:!1,ready:function(){var n;if(this.didReady)return this._parentReady.apply(this,arguments);return this.didReady=!0,ret=this._parentReady.apply(this,arguments),this.uploader.uploader.bind("BeforeUpload",function(e,t){var i,a;"application/pdf"==t.type&&(fileData=((a={file:i=t,blob:i.getNative()}).blob||(a.blob=i.getSource()),a),fileData.blob instanceof Blob&&(e.stop(),e.refresh(),function(e,t){n&&n.close().dispose(),(n=new d.view.PDFFrame({controller:p(this),uploader:e,title:c.Upload+": "+t.file.name.replace(/\.[a-z0-9]+$/,"")})).on("cancel-upload",function(){e.removeFile(t.file),t.file.attachment.destroy()}).on("continue-upload",function(){e.start()}),n.setFile(t),n.open()}(e,fileData)))}),ret}}),_.extend(pdf_renderer,d)}(jQuery,pdf_renderer,mOxie);