!function s(o,r,l){function p(t,e){if(!r[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}var a=r[t]={exports:{}};o[t][0].call(a.exports,function(e){return p(o[t][1][e]||e)},a,a.exports,s,o,r,l)}return r[t].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)p(l[e]);return p}({1:[function(n,e,t){(function(e){"use strict";var a=t("undefined"!=typeof window?window.jQuery:void 0!==e?e.jQuery:null),s=t(n("pdf-frame.js"));function t(e){return e&&e.__esModule?e:{default:e}}n("misc.js").pdfAllowed||(_wpPluploadSettings.defaults.filters.mime_types[0].extensions+=",pdf"),_.extend(wp.media.view.UploaderWindow.prototype,{_parentReady:wp.media.view.UploaderWindow.prototype.ready,didReady:!1,ready:function(){var i,e;if(this.didReady)return this._parentReady.apply(this,arguments);return this.didReady=!0,e=this._parentReady.apply(this,arguments),this.uploader.uploader.bind("BeforeUpload",function(e,t){if("application/pdf"==t.type){var n=function(e){var t={file:e,blob:e.getNative()};return t.blob||(t.blob=e.getSource()),t}(t);n.blob instanceof Blob&&(e.stop(),e.refresh(),function(e,t){i?i.reset().close().dispose():(i=new s.default({controller:(0,a.default)(this),uploader:e})).on("cancel-upload",function(){e.removeFile(i.file.file),i.file.file.attachment.destroy()}).on("continue-upload",function(){e.start()}),i.setFile(t),i.open()}(e,n))}}),e}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"misc.js":2,"pdf-frame.js":4}],2:[function(e,t,n){"use strict";t.exports={pdfAllowed:-1!==_wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(",").indexOf("pdf"),l10n:pdf_renderer.l10n,options:pdf_renderer.options}},{}],3:[function(e,t,n){"use strict";t.exports=wp.media.View.extend({template:wp.template("pdf-page-item"),className:"pdf-page-item",events:{}})},{}],4:[function(i,a,e){(function(e){"use strict";var c=t("undefined"!=typeof window?window.jQuery:void 0!==e?e.jQuery:null),o=t("undefined"!=typeof window?window.mOxie:void 0!==e?e.mOxie:null),s=t(i("page-item.js")),d=i("misc.js");function t(e){return e&&e.__esModule?e:{default:e}}function l(e,t,n,i,a,s,o){try{var r=e[s](o),l=r.value}catch(e){return void n(e)}r.done?t(l):Promise.resolve(l).then(i,a)}function n(r){return function(){var e=this,o=arguments;return new Promise(function(t,n){var i=r.apply(e,o);function a(e){l(i,t,n,a,s,"next",e)}function s(e){l(i,t,n,a,s,"throw",e)}a(void 0)})}}a.exports=wp.media.view.MediaFrame.extend({template:wp.template("pdf-modal"),regions:["title","content","instructions","buttons","pagenav"],events:{"click [data-page]":"clickPage","click .media-modal-close":function(){this.trigger("cancel-upload"),this.reset().close()}},initialize:function(){var e=this;return _.defaults(this.options,{uploader:!1}),wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments),this._pdf=this._canvas=null,this._current_page=0,this._uploadBtn=new wp.media.view.Button({text:d.l10n.UploadImages,className:"button-primary",click:function(){e.trigger("cancel-upload"),e.uploadImages()}}),d.pdfAllowed&&(this._skipBtn=new wp.media.view.Button({text:d.l10n.UploadPDF,className:"upload-pdf",click:function(){e.trigger("continue-upload"),e.reset().close()}})),this._cancelBtn=new wp.media.view.Button({text:d.l10n.CancelUpload,className:"cancel-upload",click:function(){e.trigger("cancel-upload"),e.reset().close()}}),this._pages=new Backbone.Collection,this.listenTo(this._pages,"change:selected",function(e){this._uploadBtn.$el.prop("disabled",!this._pages.where({selected:!0}).length)}),this.createTitle(),this.createButtons(),this.on("escape",function(){e.reset(),e.trigger("cancel-upload")}),this},reset:function(){return this.actionBtn.forEach(function(e){return e.$el.prop("disabled",!1)}),this.title.set([]),this.content.set([]),this.pagenav.set([]),this._pages.reset([]),this._pdf=this._canvas=null,this._current_page=0,this},createTitle:function(){var e;return this._title=new wp.media.View({tagName:"h1"}),e=this.file?d.l10n.Upload+": "+this.file.file.name.replace(/\.[a-z0-9]+$/,""):d.l10n.pdfUpload,this._title.$el.text(e),this.title.set([this._title]),this},createButtons:function(){return this.actionBtn=[],this.actionBtn.push(this._cancelBtn),this._skipBtn&&this.actionBtn.push(this._skipBtn),this.actionBtn.push(this._uploadBtn),this.buttons.set(this.actionBtn),this},setFile:function(e){var t=this,n=new FileReader;return this.file=e,n.onload=function(e){t.parsePDF(e.target.result)},n.readAsArrayBuffer(e.blob),this.createTitle()},clickPage:function(e){this.showPage((0,c.default)(e.target).attr("data-page"))},renderPageNav:function(e){for(var t,n=this,i=[],a=1;this._pages.length;)this._pages.pop();for(;a<=e;a++)t=new Backbone.Model({id:a,selected:!0}),this._pages.add(t),i.push(new s.default({pagenum:a,selected:!0,model:t,events:{'change [type="radio"]':function(){this.$('[type="radio"]').prop("checked")&&n.showPage(this.options.pagenum)},'change [type="checkbox"]':function(){this.model.set("selected",this.$('[type="checkbox"]').prop("checked"))}}}));this.pagenav.set(i)},parsePDF:function(e){var t,i=this;t=n(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,pdfjsLib.getDocument(t);case 2:n=e.sent,i._pdf=n,i.renderPageNav(n.numPages),i.showPage(1);case 6:case"end":return e.stop()}},e)})),function(e){t.apply(this,arguments)}(e)},showPage:function(e){var t=this,n=this._pages.get(e);n.get("canvas")?this.content.set([new wp.media.View({el:n.get("canvas")})]):(this.content.set([new Backbone.View]),this.renderPage(e,function(){t.showPage(e)}))},renderPage:function(s,o,r){var l=this,p=this._pages.get(s);n(regeneratorRuntime.mark(function e(){var t,n,i,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l._pdf.getPage(s);case 2:return t=e.sent,n=(0,c.default)("<canvas></canvas>").get(0),i=n.getContext("2d"),a=t.getViewport({scale:1}),a=t.getViewport({scale:d.options.image_width/a.width}),n.width=a.width,n.height=a.height,e.next=11,t.render({canvasContext:i,viewport:a});case 11:p.set("page",t),p.set("canvas",n),o&&o.apply(p,r||[]);case 14:case"end":return e.stop()}},e)}))()},uploadImages:function(){function i(e){var t=new o.default.Image,n=this;t.onload=function(){t.name=e,t.type=s,a.options.uploader.addFile(t.getAsBlob(),e),n.set("selected",!1),a._pages.where({selected:!0}).length||(a.trigger("complete"),a.reset().close())},t.load(this.get("canvas").toDataURL(d.options.image_type,.01*d.options.jpeg_quality)),(0,c.default)("body").append(t)}var a=this,s=d.options.image_type;this.actionBtn.forEach(function(e){return e.$el.prop("disabled",!0)}),_.each(),_.each(this._pages.where({selected:!0}),function(e,t){var n=a.file.file.name.replace(/\.[a-z0-9]+$/,"")+"-p"+t+".png";e.get("canvas")?i.apply(e,[n]):a.renderPage(e.get("id"),i,[n])})}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"misc.js":2,"page-item.js":3}]},{},[1]);