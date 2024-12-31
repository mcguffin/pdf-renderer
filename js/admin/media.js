!function(){"use strict";var e={n:function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,{a:i}),i},d:function(t,i){for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=jQuery,i=e.n(t);mOxie;const n=wp.media.View.extend({template:wp.template("pdf-page-item"),className:"pdf-page-item",events:{}}),a=-1!==_wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(",").indexOf("pdf"),{l10n:s,options:o}=pdf_renderer;pdfjsLib.GlobalWorkerOptions.workerSrc=o.worker_url;const c=wp.media.view.MediaFrame.extend({template:wp.template("pdf-modal"),regions:["title","content","instructions","buttons","pagenav"],events:{"click [data-page]":"clickPage","click .media-modal-close":function(){this.trigger("cancel-upload"),this.reset().close()},'click [data-action="select-all"]':"selectAll",'click [data-action="unselect-all"]':"unselectAll"},_state:"pdf-frame",initialize:function(){const e=this;return _.defaults(this.options,{uploader:!1}),wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments),this._pdf=this._canvas=null,this._current_page=0,this._uploadBtn=new wp.media.view.Button({text:s.UploadImages,className:"button-primary",click:function(){e.trigger("cancel-upload"),e.uploadImages()}}),a&&(this._skipBtn=new wp.media.view.Button({text:s.UploadPDF,className:"upload-pdf",click:function(){e.trigger("continue-upload"),e.reset().close()}})),this._cancelBtn=new wp.media.view.Button({text:s.CancelUpload,className:"cancel-upload",click:function(){e.trigger("cancel-upload"),e.reset().close()}}),this._pages=new Backbone.Collection,this.listenTo(this._pages,"change:selected",(function(e){this._uploadBtn.$el.prop("disabled",!this._pages.where({selected:!0}).length)})),this.createTitle(),this.createButtons(),this.on("escape",(()=>{e.reset(),e.trigger("cancel-upload")})),this},render:function(){const e=wp.media.view.MediaFrame.prototype.render.apply(this,arguments);return this.$(`[name="pdf-renderer-fileformat"][value="${o.image_type}"]`).prop("checked",!0),e},getImageType:function(){return this.$('[name="pdf-renderer-fileformat"]:checked').val()},reset:function(){return this.actionBtn.forEach((e=>e.$el.prop("disabled",!1))),this.title.set([]),this.content.set([]),this.pagenav.set([]),this._pages.reset([]),this._pdf=this._canvas=null,this._current_page=0,this},createTitle:function(){let e;return this._title=new wp.media.View({tagName:"h1"}),e=this.file?s.Upload+": "+this.file.file.name.replace(/\.[a-z0-9]+$/,""):s.pdfUpload,this._title.$el.text(e),this.title.set([this._title]),this},createButtons:function(){return this.actionBtn=[],this.actionBtn.push(this._cancelBtn),this._skipBtn&&this.actionBtn.push(this._skipBtn),this.actionBtn.push(this._uploadBtn),this.buttons.set(this.actionBtn),this},setFile:function(e){const t=this,i=new FileReader;return this.file=e,i.onload=function(e){t.parsePDF(e.target.result)},i.readAsArrayBuffer(e.blob),this.createTitle()},clickPage:function(e){this.showPage(i()(e.target).attr("data-page"))},renderPageNav:function(e){const t=this,i=[];let a,s,o=1;for(;this._pages.length;)this._pages.pop();for(;o<=e;o++)a=new Backbone.Model({id:o,selected:!0}),this._pages.add(a),s=new n({pagenum:o,selected:!0,model:a,events:{'change [type="radio"]':function(){this.$('[type="radio"]').prop("checked")&&t.showPage(this.options.pagenum)},'change [type="checkbox"]':function(){this.model.set("selected",this.$('[type="checkbox"]').prop("checked"))}}}),a.set("pageItem",s),i.push(s);this.pagenav.set(i)},selectAll:function(){this.$('.pdf-page-item > [type="checkbox"]').each(((e,t)=>{i()(t).prop("checked",!0).trigger("change")}))},unselectAll:function(){this.$('.pdf-page-item > [type="checkbox"]').each(((e,t)=>{i()(t).prop("checked",!1).trigger("change")}))},parsePDF:function(e){const t=this;pdfjsLib.getDocument(e).promise.then((e=>{t._pdf=e,t.renderPageNav(e.numPages),t.showPage(1)}),console.error)},showPage:function(e){const t=this,i=this._pages.get(e);i.get("canvas")?this.content.set([new wp.media.View({el:i.get("canvas")})]):(this.content.set([new Backbone.View]),this.renderPage(e,(function(){t.showPage(e)})))},renderPage:function(e,t,n){const a=this,s=this._pages.get(e);(async()=>{const c=await a._pdf.getPage(e),l=i()("<canvas></canvas>").get(0),p=l.getContext("2d");let r=c.getViewport({scale:1});r=c.getViewport({scale:o.image_width/r.width}),l.width=r.width,l.height=r.height,c.render({canvasContext:p,viewport:r}).promise.then((()=>{s.set("page",c),s.set("canvas",l),t&&t.apply(s,n||[])}))})()},uploadImages:function(){const e=this,t=e.getImageType(),i=function(i){const n=this;this.get("canvas").toBlob((function(a){const s=new File([a],i,{type:t});e.options.uploader.addFile(s),n.set("selected",!1)}),t,.01*o.jpeg_quality)};this.actionBtn.forEach((e=>e.$el.prop("disabled",!0))),_.each(this._pages.where({selected:!0}),((n,a)=>{const s=e.file.file.name.replace(/\.[a-z0-9]+$/,"")+"-p"+a+"."+("image/png"===t?"png":"jpg");n.get("canvas")?i.apply(n,[s]):e.renderPage(n.get("id"),i,[s])})),this.reset().close()}});a||(_wpPluploadSettings.defaults.filters.mime_types[0].extensions+=",pdf"),_.extend(wp.media.view.UploaderWindow.prototype,{_parentReady:wp.media.view.UploaderWindow.prototype.ready,didReady:!1,ready:function(){let e,t;return this.didReady?this._parentReady.apply(this,arguments):(this.didReady=!0,t=this._parentReady.apply(this,arguments),this.uploader.uploader.bind("BeforeUpload",(function(t,n){if("application/pdf"==n.type){const a=function(e){const t={file:e,blob:e.getNative()};return t.blob||(t.blob=e.getSource()),t}(n);a.blob instanceof Blob&&(t.stop(),t.refresh(),function(t,n){e?e.reset().close().dispose():(e=new c({controller:i()(this),uploader:t}),e.on("cancel-upload",(()=>{t.removeFile(e.file.file),e.file.file.attachment.destroy()})).on("continue-upload",(()=>{t.start()}))),e.setFile(n),e.open()}(t,a))}})),t)}})}();
//# sourceMappingURL=media.js.map