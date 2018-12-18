!function(p,l,s){var o,d={view:{}},c=l.l10n,t=-1!==_wpPluploadSettings.defaults.filters.mime_types[0].extensions.split(",").indexOf("pdf");t||(_wpPluploadSettings.defaults.filters.mime_types[0].extensions+=",pdf"),o=wp.media.View.extend({template:wp.template("pdf-page-item"),className:"pdf-page-item",initialize:function(){return wp.media.View.prototype.initialize.apply(this,arguments)},render:function(){return wp.media.View.prototype.render.apply(this,arguments)}}),d.view.PDFFrame=wp.media.view.MediaFrame.extend({template:wp.template("pdf-modal"),regions:["title","content","instructions","buttons","pagenav"],events:{"click [data-page]":"clickPage","click .media-modal-close":function(){this.trigger("cancel-upload"),this.close()}},initialize:function(){var e=this;return _.defaults(this.options,{uploader:!1,title:c.pdfUpload}),wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments),this._pdf=this._canvas=null,this._current_page=0,this._uploadBtn=new wp.media.view.Button({text:c.UploadImages,className:"button-primary",click:function(){e.trigger("cancel-upload"),e.uploadImages()}}),t&&(this._skipBtn=new wp.media.view.Button({text:c.UploadPDF,className:"upload-pdf",click:function(){e.trigger("continue-upload"),e.close()}})),this._cancelBtn=new wp.media.view.Button({text:c.CancelUpload,className:"cancel-upload",click:function(){e.trigger("cancel-upload"),e.close()}}),this._pages=new Backbone.Collection,this._uploadPages=new Backbone.Collection,this.listenTo(this._pages,"change:selected",function(e){this._uploadBtn.$el.prop("disabled",0===this._pages.where({selected:!0}).length)}),this.createTitle(),this.createButtons(),this.on("escape",function(){e.trigger("cancel-upload")}),this},escape:function(){return this.trigger("cancel-upload"),wp.media.view.MediaFrame.prototype.escape.apply(this,arguments)},createTitle:function(){this._title=new wp.media.View({tagName:"h1"}),this._title.$el.text(this.options.title),this.title.set([this._title])},createButtons:function(){this.actionBtn=[],this.actionBtn.push(this._cancelBtn),this._skipBtn&&this.actionBtn.push(this._skipBtn),this.actionBtn.push(this._uploadBtn),this.buttons.set(this.actionBtn)},setFile:function(e){var t=this,i=new FileReader;return this.file=e,i.onload=function(e){t.parsePDF(e.target.result)},i.readAsArrayBuffer(e.blob),this},clickPage:function(e){this.showPage(p(e.target).attr("data-page"))},renderPageNav:function(e){for(var t,i=this,a=1,n=[];this._pages.length;)this._pages.pop();for(;a<=e;a++)t=new Backbone.Model({id:a,selected:!0}),this._pages.add(t),n.push(new o({pagenum:a,selected:!0,model:t,events:{'change [type="radio"]':function(){this.$('[type="radio"]').prop("checked")&&i.showPage(this.options.pagenum)},'change [type="checkbox"]':function(){this.model.set("selected",this.$('[type="checkbox"]').prop("checked"))}}}));this.pagenav.set(n)},parsePDF:function(e){var t=this;pdfjsLib.getDocument(e).then(function(e){t._pdf=e,t.renderPageNav(e.numPages),t.showPage(1)})},showPage:function(e){var t=this,i=this._pages.get(e);i.get("canvas")?this.content.set([new wp.media.View({el:i.get("canvas")})]):(this.content.set([new Backbone.View]),this.renderPage(e,function(){t.showPage(e)}))},renderPage:function(e,n,o){var s=this._pages.get(e);this._pdf.getPage(e).then(function(e){var t=e.getViewport(1),i=p("<canvas></canvas>").get(0),a=i.getContext("2d");t=e.getViewport(l.options.image_width/t.width),i.width=t.width,i.height=t.height,e.render({canvasContext:a,viewport:t}).then(function(){s.set("page",e),s.set("canvas",i),n&&n.apply(s,o||[])})})},uploadImages:function(){var a=this,n=l.options.image_type,o=function(e){var t=new s.Image,i=this;t.onload=function(){t.name=e,t.type=n,t._fromPDF=!0,a.options.uploader.addFile(t.getAsBlob(),e),a._pages.remove(i.id),a._uploadPages.add(i),a._uploadPages.length===a._pages.where({selected:!0}).length&&(a.trigger("complete"),a.close())},t.load(this.get("canvas").toDataURL(l.options.image_type,.01*l.options.jpeg_quality)),p("body").append(t)};_.each(this.actionBtn,function(e){e.$el.prop("disabled",!0)}),_.each(this._pages.where({selected:!0}),function(e,t){var i=a.file.file.name.replace(/\.[a-z0-9]+$/,"")+"-p"+t+".png";e.get("canvas")?o.apply(e,[i]):a.renderPage(e.get("id"),o,[i])})}}),_.extend(wp.media.view.UploaderWindow.prototype,{_parentReady:wp.media.view.UploaderWindow.prototype.ready,didReady:!1,ready:function(){var n;if(this.didReady)return this._parentReady.apply(this,arguments);return this.didReady=!0,ret=this._parentReady.apply(this,arguments),this.uploader.uploader.bind("BeforeUpload",function(e,t){var i,a;"application/pdf"==t.type&&(fileData=((a={file:i=t,blob:i.getNative()}).blob||(a.blob=i.getSource()),a),fileData.blob instanceof Blob&&(e.stop(),e.refresh(),function(e,t){n&&n.close().dispose(),(n=new d.view.PDFFrame({controller:p(this),uploader:e,title:c.Upload+": "+t.file.name.replace(/\.[a-z0-9]+$/,"")})).on("cancel-upload",function(){e.removeFile(t.file),t.file.attachment.destroy()}).on("continue-upload",function(){e.start()}),n.setFile(t),n.open()}(e,fileData)))}),ret}}),_.extend(pdf_renderer,d)}(jQuery,pdf_renderer,mOxie);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbIiQiLCJvcHRzIiwibyIsIlBhZ2VJdGVtIiwicGRmUmVuZGVyZXIiLCJ2aWV3IiwibDEwbiIsInBkZkFsbG93ZWQiLCJfd3BQbHVwbG9hZFNldHRpbmdzIiwiZGVmYXVsdHMiLCJmaWx0ZXJzIiwibWltZV90eXBlcyIsImV4dGVuc2lvbnMiLCJzcGxpdCIsImluZGV4T2YiLCJ3cCIsIm1lZGlhIiwiVmlldyIsImV4dGVuZCIsInRlbXBsYXRlIiwiY2xhc3NOYW1lIiwiaW5pdGlhbGl6ZSIsInByb3RvdHlwZSIsImFwcGx5IiwidGhpcyIsImFyZ3VtZW50cyIsInJlbmRlciIsIlBERkZyYW1lIiwiTWVkaWFGcmFtZSIsInJlZ2lvbnMiLCJldmVudHMiLCJjbGljayBbZGF0YS1wYWdlXSIsImNsaWNrIC5tZWRpYS1tb2RhbC1jbG9zZSIsInRyaWdnZXIiLCJjbG9zZSIsInNlbGYiLCJfIiwib3B0aW9ucyIsInVwbG9hZGVyIiwidGl0bGUiLCJwZGZVcGxvYWQiLCJfcGRmIiwiX2NhbnZhcyIsIl9jdXJyZW50X3BhZ2UiLCJfdXBsb2FkQnRuIiwiQnV0dG9uIiwidGV4dCIsIlVwbG9hZEltYWdlcyIsImNsaWNrIiwidXBsb2FkSW1hZ2VzIiwiX3NraXBCdG4iLCJVcGxvYWRQREYiLCJfY2FuY2VsQnRuIiwiQ2FuY2VsVXBsb2FkIiwiX3BhZ2VzIiwiQmFja2JvbmUiLCJDb2xsZWN0aW9uIiwiX3VwbG9hZFBhZ2VzIiwibGlzdGVuVG8iLCJlIiwiJGVsIiwicHJvcCIsIndoZXJlIiwic2VsZWN0ZWQiLCJsZW5ndGgiLCJjcmVhdGVUaXRsZSIsImNyZWF0ZUJ1dHRvbnMiLCJvbiIsImVzY2FwZSIsIl90aXRsZSIsInRhZ05hbWUiLCJzZXQiLCJhY3Rpb25CdG4iLCJwdXNoIiwiYnV0dG9ucyIsInNldEZpbGUiLCJmaWxlIiwiZmlsZVJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJldmVudCIsInBhcnNlUERGIiwidGFyZ2V0IiwicmVzdWx0IiwicmVhZEFzQXJyYXlCdWZmZXIiLCJibG9iIiwiY2xpY2tQYWdlIiwic2hvd1BhZ2UiLCJhdHRyIiwicmVuZGVyUGFnZU5hdiIsIm51bVBhZ2VzIiwibSIsImkiLCJidG5zIiwicG9wIiwiTW9kZWwiLCJpZCIsImFkZCIsInBhZ2VudW0iLCJtb2RlbCIsImNoYW5nZSBbdHlwZT1cInJhZGlvXCJdIiwiY2hhbmdlIFt0eXBlPVwiY2hlY2tib3hcIl0iLCJwYWdlbmF2IiwiYXJyIiwicGRmanNMaWIiLCJnZXREb2N1bWVudCIsInRoZW4iLCJwZGYiLCJpZHgiLCJnZXQiLCJjb250ZW50IiwiZWwiLCJyZW5kZXJQYWdlIiwiY2IiLCJjYl9hcmdzIiwiZ2V0UGFnZSIsInBhZ2UiLCJ2cCIsImdldFZpZXdwb3J0IiwiY2FudmFzIiwiY3R4IiwiZ2V0Q29udGV4dCIsImltYWdlX3dpZHRoIiwid2lkdGgiLCJoZWlnaHQiLCJjYW52YXNDb250ZXh0Iiwidmlld3BvcnQiLCJ0eXBlIiwiaW1hZ2VfdHlwZSIsInVwbG9hZCIsIm5hbWUiLCJpbWciLCJJbWFnZSIsIl9mcm9tUERGIiwiYWRkRmlsZSIsImdldEFzQmxvYiIsInJlbW92ZSIsImxvYWQiLCJ0b0RhdGFVUkwiLCJqcGVnX3F1YWxpdHkiLCJhcHBlbmQiLCJlYWNoIiwiYnRuIiwicGciLCJyZXBsYWNlIiwiVXBsb2FkZXJXaW5kb3ciLCJfcGFyZW50UmVhZHkiLCJyZWFkeSIsImRpZFJlYWR5IiwicGRmTW9kYWwiLCJyZXQiLCJiaW5kIiwidXAiLCJfcmV0IiwiZmlsZURhdGEiLCJnZXROYXRpdmUiLCJnZXRTb3VyY2UiLCJCbG9iIiwic3RvcCIsInJlZnJlc2giLCJmaWxlSXRlbSIsImRpc3Bvc2UiLCJjb250cm9sbGVyIiwiVXBsb2FkIiwicmVtb3ZlRmlsZSIsImF0dGFjaG1lbnQiLCJkZXN0cm95Iiwic3RhcnQiLCJvcGVuIiwicGRmUG9wdXAiLCJwZGZfcmVuZGVyZXIiLCJqUXVlcnkiLCJtT3hpZSJdLCJtYXBwaW5ncyI6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SzRILFVBQVcsRUFFaEJFLElBQU05SCxLQUFLMEgsYUFBYTNILE1BQU9DLEtBQU9DLFdBMEN0Q0QsS0FBS2MsU0FBU0EsU0FBU2lILEtBQUssZUFBZSxTQUFVQyxFQUFJNUUsR0FaekQsSUFBc0JBLEVBQ2pCNkUsRUFhYyxtQkFBYjdFLEVBQUttRCxPQUVUMkIsV0FmR0QsRUFBTyxDQUNWN0UsS0FGb0JBLEVBZ0JJQSxFQWJ4QlMsS0FBS1QsRUFBSytFLGNBRUN0RSxPQUNYb0UsRUFBS3BFLEtBQU9ULEVBQUtnRixhQUVYSCxHQVNEQyxTQUFTckUsZ0JBQWdCd0UsT0FDN0JMLEVBQUdNLE9BQ0hOLEVBQUdPLFVBL0NOLFNBQW1CekgsRUFBVTBILEdBRXZCWCxHQUNKQSxFQUFTbkgsUUFBUStILFdBR2xCWixFQUFXLElBQUlqSixFQUFZQyxLQUFLc0IsU0FBVSxDQUN6Q3VJLFdBQVlsSyxFQUFFd0IsTUFDZGMsU0FBU0EsRUFDVEMsTUFBT2pDLEVBQUs2SixPQUFTLEtBQU9ILEVBQVNwRixLQUFLc0QsS0FBS2MsUUFBUSxlQUFlLE9BRTlEN0UsR0FBRyxnQkFBZ0IsV0FFM0I3QixFQUFTOEgsV0FBWUosRUFBU3BGLE1BQzlCb0YsRUFBU3BGLEtBQUt5RixXQUFXQyxZQUV2Qm5HLEdBQUcsa0JBQWtCLFdBRXZCN0IsRUFBU2lJLFVBR1ZsQixFQUFTMUUsUUFBU3FGLEdBQ2xCWCxFQUFTbUIsT0EwQlBDLENBQVVqQixFQUFJRSxjQU9WSixPQUdUbEgsRUFBRWxCLE9BQVF3SixhQUFjdEssR0ExVnpCLENBMlZJdUssT0FBUUQsYUFBY0UiLCJmaWxlIjoiYWRtaW4vbWVkaWEuZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCAkLCBvcHRzLCBvICkge1xuXG5cdHZhciBwZGZSZW5kZXJlciA9IHtcblx0XHRcdHZpZXc6IHt9XG5cdFx0fSxcblx0XHRsMTBuID0gb3B0cy5sMTBuLFxuXHRcdGltYWdlSW5mb3MgPSB7fSxcblx0XHRQYWdlSXRlbSxcblx0XHRwZGZBbGxvd2VkID0gX3dwUGx1cGxvYWRTZXR0aW5ncy5kZWZhdWx0cy5maWx0ZXJzLm1pbWVfdHlwZXNbMF0uZXh0ZW5zaW9ucy5zcGxpdCgnLCcpLmluZGV4T2YoJ3BkZicpICE9PSAtMTtcblxuXHQvLyB0ZW1wb3JhaWx5IGFkZCBwZGYgdHlwZSB0byBwbHVwbG9hZCBzZXR0aW5ncyxcblx0Ly8gc28gdGhlIHVwbG9hZGVyIGRvZXNuJ3QgY2FuY2VsIHRvbyBlYXJseS5cblx0Ly8gRmlsZSB0eXBlcyBhcmUgY2hlY2tlZCBzZXJ2ZXItc2lkZSB0b28sIHNvXG5cdC8vIHRoZXJlIHNob3VsZCBiZSBubyBzZWN1cml0eSBpbXBsaWNhdGlvbnMuXG5cdGlmICggISBwZGZBbGxvd2VkICkge1xuXHRcdF93cFBsdXBsb2FkU2V0dGluZ3MuZGVmYXVsdHMuZmlsdGVycy5taW1lX3R5cGVzWzBdLmV4dGVuc2lvbnMgKz0gJyxwZGYnO1xuXHR9XG5cblx0UGFnZUl0ZW0gPSB3cC5tZWRpYS5WaWV3LmV4dGVuZCh7XG5cdFx0dGVtcGxhdGU6ICB3cC50ZW1wbGF0ZSgncGRmLXBhZ2UtaXRlbScpLFxuXHRcdGNsYXNzTmFtZToncGRmLXBhZ2UtaXRlbScsXG5cdFx0aW5pdGlhbGl6ZTpmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB3cC5tZWRpYS5WaWV3LnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcblx0XHR9LFxuXHRcdHJlbmRlcjpmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB3cC5tZWRpYS5WaWV3LnByb3RvdHlwZS5yZW5kZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuXHRcdH1cblx0fSk7XG5cblx0cGRmUmVuZGVyZXIudmlldy5QREZGcmFtZSA9IHdwLm1lZGlhLnZpZXcuTWVkaWFGcmFtZS5leHRlbmQoe1xuXHRcdHRlbXBsYXRlOiB3cC50ZW1wbGF0ZSgncGRmLW1vZGFsJyksXG5cdFx0cmVnaW9uczogWyAndGl0bGUnLCdjb250ZW50JywnaW5zdHJ1Y3Rpb25zJywnYnV0dG9ucycsICdwYWdlbmF2JyBdLFxuXHRcdGV2ZW50czoge1xuXHRcdFx0J2NsaWNrIFtkYXRhLXBhZ2VdJyA6ICdjbGlja1BhZ2UnLFxuXHRcdFx0J2NsaWNrIC5tZWRpYS1tb2RhbC1jbG9zZScgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjYW5jZWwtdXBsb2FkJyk7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdF8uZGVmYXVsdHMoIHRoaXMub3B0aW9ucywge1xuXHRcdFx0XHR1cGxvYWRlcjpcdGZhbHNlLFxuXHRcdFx0XHR0aXRsZTpcdFx0bDEwbi5wZGZVcGxvYWQsXG5cdFx0XHR9KTtcblxuXHRcdFx0d3AubWVkaWEudmlldy5NZWRpYUZyYW1lLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcblxuXHRcdFx0dGhpcy5fcGRmID0gdGhpcy5fY2FudmFzID0gbnVsbDtcblx0XHRcdHRoaXMuX2N1cnJlbnRfcGFnZSA9IDA7XG5cblx0XHRcdHRoaXMuX3VwbG9hZEJ0biA9IG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbih7XG5cdFx0XHRcdHRleHQ6IGwxMG4uVXBsb2FkSW1hZ2VzLFxuXHRcdFx0XHRjbGFzc05hbWU6ICdidXR0b24tcHJpbWFyeScsXG5cdFx0XHRcdGNsaWNrOmZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNlbGYudHJpZ2dlcignY2FuY2VsLXVwbG9hZCcpO1xuXHRcdFx0XHRcdHNlbGYudXBsb2FkSW1hZ2VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKCBwZGZBbGxvd2VkICkge1xuXHRcdFx0XHR0aGlzLl9za2lwQnRuID0gbmV3IHdwLm1lZGlhLnZpZXcuQnV0dG9uKHtcblx0XHRcdFx0XHR0ZXh0OiBsMTBuLlVwbG9hZFBERixcblx0XHRcdFx0XHRjbGFzc05hbWU6ICd1cGxvYWQtcGRmJyxcblx0XHRcdFx0XHRjbGljazpmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHNlbGYudHJpZ2dlcignY29udGludWUtdXBsb2FkJyk7XG5cdFx0XHRcdFx0XHRzZWxmLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHQvLyBkaXNtaXNzLCBjb250aW51ZSB3aXRoIHdwIGRlZmF1bHQgYmVoYXZpb3VyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2NhbmNlbEJ0biA9IG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbih7XG5cdFx0XHRcdHRleHQ6IGwxMG4uQ2FuY2VsVXBsb2FkLFxuXHRcdFx0XHRjbGFzc05hbWU6ICdjYW5jZWwtdXBsb2FkJyxcblx0XHRcdFx0Y2xpY2s6ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2VsZi50cmlnZ2VyKCdjYW5jZWwtdXBsb2FkJyk7XG5cdFx0XHRcdFx0c2VsZi5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fcGFnZXMgPSBuZXcgQmFja2JvbmUuQ29sbGVjdGlvbigpO1xuXHRcdFx0dGhpcy5fdXBsb2FkUGFnZXMgPSBuZXcgQmFja2JvbmUuQ29sbGVjdGlvbigpO1xuXHRcdFx0dGhpcy5saXN0ZW5Ubyh0aGlzLl9wYWdlcywnY2hhbmdlOnNlbGVjdGVkJyxmdW5jdGlvbihlKXtcblx0XHRcdFx0Ly8gZGlzYWJsZSBpbWcgdXBsb2FkIGJ0biBpZiBubyBwYWdlcyBzZWxlY3RlZFxuXHRcdFx0XHR0aGlzLl91cGxvYWRCdG4uJGVsLnByb3AoJ2Rpc2FibGVkJywgdGhpcy5fcGFnZXMud2hlcmUoe3NlbGVjdGVkOnRydWV9KS5sZW5ndGggPT09IDAgKVxuXHRcdFx0fSlcblxuXHRcdFx0dGhpcy5jcmVhdGVUaXRsZSgpO1xuXHRcdFx0dGhpcy5jcmVhdGVCdXR0b25zKCk7XG5cblx0XHRcdHRoaXMub24oJ2VzY2FwZScsZnVuY3Rpb24oKXtcblx0XHRcdFx0c2VsZi50cmlnZ2VyKCdjYW5jZWwtdXBsb2FkJyk7XG5cdFx0XHR9KVxuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH0sXG5cdFx0ZXNjYXBlOmZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjYW5jZWwtdXBsb2FkJyk7XG5cdFx0XHRyZXR1cm4gd3AubWVkaWEudmlldy5NZWRpYUZyYW1lLnByb3RvdHlwZS5lc2NhcGUuYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuXHRcdH0sXG5cdFx0Y3JlYXRlVGl0bGU6IGZ1bmN0aW9uKCApIHtcblx0XHRcdHRoaXMuX3RpdGxlID0gbmV3IHdwLm1lZGlhLlZpZXcoe1xuXHRcdFx0XHR0YWdOYW1lOiAnaDEnXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuX3RpdGxlLiRlbC50ZXh0KCB0aGlzLm9wdGlvbnMudGl0bGUgKTtcblx0XHRcdHRoaXMudGl0bGUuc2V0KCBbIHRoaXMuX3RpdGxlIF0gKTtcblx0XHR9LFxuXHRcdGNyZWF0ZUJ1dHRvbnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5hY3Rpb25CdG4gPSBbXTtcblxuXHRcdFx0dGhpcy5hY3Rpb25CdG4ucHVzaCggdGhpcy5fY2FuY2VsQnRuICk7XG5cdFx0XHRpZiAoICEhIHRoaXMuX3NraXBCdG4gKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uQnRuLnB1c2goIHRoaXMuX3NraXBCdG4gKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuYWN0aW9uQnRuLnB1c2goIHRoaXMuX3VwbG9hZEJ0biApO1xuXG5cdFx0XHR0aGlzLmJ1dHRvbnMuc2V0KCB0aGlzLmFjdGlvbkJ0biApO1xuXG5cdFx0fSxcblx0XHRzZXRGaWxlOmZ1bmN0aW9uKCBmaWxlICkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdHRoaXMuZmlsZSA9IGZpbGU7XG5cdFx0XHRmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4vL1x0XHRcdCAgICBhcnJheUJ1ZmZlciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdHNlbGYucGFyc2VQREYoIGV2ZW50LnRhcmdldC5yZXN1bHQgKTtcblx0XHRcdH07XG5cdFx0XHRmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKCBmaWxlLmJsb2IgKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Y2xpY2tQYWdlOmZ1bmN0aW9uKGUpIHtcblx0XHRcdHRoaXMuc2hvd1BhZ2UoJChlLnRhcmdldCkuYXR0cignZGF0YS1wYWdlJykpO1xuXHRcdH0sXG5cdFx0cmVuZGVyUGFnZU5hdjpmdW5jdGlvbihudW1QYWdlcykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRpID0gMSwgYnRucyA9IFtdLCBtO1xuXG5cdFx0XHR3aGlsZSAoIHRoaXMuX3BhZ2VzLmxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy5fcGFnZXMucG9wKCk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaTtpPD1udW1QYWdlcztpKyspIHtcblx0XHRcdFx0bSA9IG5ldyBCYWNrYm9uZS5Nb2RlbCh7XG5cdFx0XHRcdFx0aWQ6aSxcblx0XHRcdFx0XHRzZWxlY3RlZDp0cnVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5fcGFnZXMuYWRkKCBtICk7XG5cblx0XHRcdFx0YnRucy5wdXNoKFxuXHRcdFx0XHRcdG5ldyBQYWdlSXRlbSh7XG5cdFx0XHRcdFx0XHRwYWdlbnVtOmksXG5cdFx0XHRcdFx0XHRzZWxlY3RlZDp0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZWw6bSxcblx0XHRcdFx0XHRcdGV2ZW50czp7XG5cdFx0XHRcdFx0XHRcdCdjaGFuZ2UgW3R5cGU9XCJyYWRpb1wiXScgOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdGlmICggdGhpcy4kKCdbdHlwZT1cInJhZGlvXCJdJykucHJvcCgnY2hlY2tlZCcpICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZi5zaG93UGFnZSggdGhpcy5vcHRpb25zLnBhZ2VudW0gKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdCdjaGFuZ2UgW3R5cGU9XCJjaGVja2JveFwiXScgOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMubW9kZWwuc2V0KCAnc2VsZWN0ZWQnLCB0aGlzLiQoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKS5wcm9wKCdjaGVja2VkJykgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdCk7XG5cblx0XHRcdH1cblx0XHRcdHRoaXMucGFnZW5hdi5zZXQoIGJ0bnMgKTtcblx0XHR9LFxuXHRcdHBhcnNlUERGOmZ1bmN0aW9uKCBhcnIgKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRwZGZqc0xpYi5nZXREb2N1bWVudChhcnIpLnRoZW4oZnVuY3Rpb24ocGRmKSB7XG5cdFx0XHRcdC8vIGJ1aWxkIHBhZ2VzIHNlbGVjdG9yXG5cdFx0XHRcdHNlbGYuX3BkZiA9IHBkZjtcblx0XHRcdFx0c2VsZi5yZW5kZXJQYWdlTmF2KHBkZi5udW1QYWdlcylcblxuXHRcdFx0XHRzZWxmLnNob3dQYWdlKDEpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRzaG93UGFnZTpmdW5jdGlvbihpZHgpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0bSA9IHRoaXMuX3BhZ2VzLmdldChpZHgpO1xuXG5cdFx0XHRpZiAoICEhIG0uZ2V0KCdjYW52YXMnKSApIHtcblx0XHRcdFx0dGhpcy5jb250ZW50LnNldCggW1xuXHRcdFx0XHRcdG5ldyB3cC5tZWRpYS5WaWV3KHtcblx0XHRcdFx0XHRcdGVsOiBtLmdldCgnY2FudmFzJyksXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jb250ZW50LnNldChbbmV3IEJhY2tib25lLlZpZXcoKV0pXG5cdFx0XHRcdHRoaXMucmVuZGVyUGFnZSggaWR4LCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHNlbGYuc2hvd1BhZ2UoaWR4KTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0fSxcblx0XHRyZW5kZXJQYWdlOmZ1bmN0aW9uKGlkeCxjYixjYl9hcmdzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdG0gPSB0aGlzLl9wYWdlcy5nZXQoaWR4KTtcblxuXHRcdFx0c2VsZi5fcGRmLmdldFBhZ2UoaWR4KS50aGVuKGZ1bmN0aW9uKHBhZ2Upe1xuXHRcdFx0XHR2YXIgdnAgPSBwYWdlLmdldFZpZXdwb3J0KDEpLFxuXHRcdFx0XHRcdGNhbnZhcyA9ICQoJzxjYW52YXM+PC9jYW52YXM+JykuZ2V0KDApLFxuXHRcdFx0XHRcdGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0XHRcdHZwID0gcGFnZS5nZXRWaWV3cG9ydCggb3B0cy5vcHRpb25zLmltYWdlX3dpZHRoIC8gdnAud2lkdGggKTtcblxuXHRcdFx0XHRjYW52YXMud2lkdGggPSB2cC53aWR0aDtcblx0XHRcdFx0Y2FudmFzLmhlaWdodCA9IHZwLmhlaWdodDtcblxuXHRcdFx0XHRwYWdlLnJlbmRlcih7XG5cdFx0XHRcdFx0Y2FudmFzQ29udGV4dDogY3R4LFxuXHRcdFx0XHRcdHZpZXdwb3J0OiB2cCxcblx0XHRcdFx0fSkudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdG0uc2V0KCAncGFnZScsIHBhZ2UgKTtcblx0XHRcdFx0XHRtLnNldCggJ2NhbnZhcycsIGNhbnZhcyApO1xuXG5cdFx0XHRcdFx0ISFjYiAmJiBjYi5hcHBseShtLGNiX2FyZ3N8fFtdKTtcbi8vXHRcdFx0XHRcdHNlbGYuc2hvd1BhZ2UoaWR4KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cblx0XHR1cGxvYWRJbWFnZXM6ZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdHR5cGUgPSBvcHRzLm9wdGlvbnMuaW1hZ2VfdHlwZSxcblx0XHRcdFx0dXBsb2FkID0gZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0XHRcdFx0dmFyIGltZyA9IG5ldyBvLkltYWdlKCksXG5cdFx0XHRcdFx0XHRtID0gdGhpcztcblx0XHRcdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpbWcubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHRpbWcudHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0XHRpbWcuX2Zyb21QREYgPSB0cnVlO1xuXHRcdFx0XHRcdFx0c2VsZi5vcHRpb25zLnVwbG9hZGVyLmFkZEZpbGUoIGltZy5nZXRBc0Jsb2IoKSwgbmFtZSApO1xuXG5cdFx0XHRcdFx0XHRzZWxmLl9wYWdlcy5yZW1vdmUobS5pZCk7XG5cdFx0XHRcdFx0XHRzZWxmLl91cGxvYWRQYWdlcy5hZGQobSk7XG5cdFx0XHRcdFx0XHRpZiAoIHNlbGYuX3VwbG9hZFBhZ2VzLmxlbmd0aCA9PT0gc2VsZi5fcGFnZXMud2hlcmUoIHsgc2VsZWN0ZWQ6IHRydWUgfSApLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0Ly8gdHJpZ2dlciBzb21ldGhpbmdcblx0XHRcdFx0XHRcdFx0c2VsZi50cmlnZ2VyKCdjb21wbGV0ZScpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW1nLmxvYWQoIHRoaXMuZ2V0KCdjYW52YXMnKS50b0RhdGFVUkwoIG9wdHMub3B0aW9ucy5pbWFnZV90eXBlLCBvcHRzLm9wdGlvbnMuanBlZ19xdWFsaXR5ICogMC4wMSApICk7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKGltZyk7XG5cdFx0XHRcdH07XG5cdFx0XHRfLmVhY2goIHRoaXMuYWN0aW9uQnRuLCBmdW5jdGlvbihidG4pe1xuXHRcdFx0XHRidG4uJGVsLnByb3AoJ2Rpc2FibGVkJyx0cnVlKTtcblx0XHRcdH0gKTtcblx0XHRcdC8vIGNyZWF0ZSBlIG5ldyBtZWRpYSBtb2RlbCBmcm9tIGJsb2IgZGF0YSBVUkwgdGhpbmd5XG5cblx0XHRcdF8uZWFjaCggdGhpcy5fcGFnZXMud2hlcmUoIHsgc2VsZWN0ZWQ6IHRydWUgfSApLCBmdW5jdGlvbiggcGcsIGkgKXtcblxuXHRcdFx0XHR2YXIgbmFtZSA9IHNlbGYuZmlsZS5maWxlLm5hbWUucmVwbGFjZSgvXFwuW2EtejAtOV0rJC8sJycpICsgJy1wJyArIGkgKyAnLnBuZyc7XG5cblx0XHRcdFx0aWYgKCAhIHBnLmdldCgnY2FudmFzJykgKSB7XG5cdFx0XHRcdFx0Ly8gbmVlZHMgcmVuZGVyaW5nXG5cdFx0XHRcdFx0c2VsZi5yZW5kZXJQYWdlKCBwZy5nZXQoJ2lkJyksIHVwbG9hZCxbbmFtZV0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHVwbG9hZC5hcHBseShwZyxbbmFtZV0pXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cblxuXHRfLmV4dGVuZCggd3AubWVkaWEudmlldy5VcGxvYWRlcldpbmRvdy5wcm90b3R5cGUsIHtcblx0XHRfcGFyZW50UmVhZHk6IHdwLm1lZGlhLnZpZXcuVXBsb2FkZXJXaW5kb3cucHJvdG90eXBlLnJlYWR5LFxuXHRcdGRpZFJlYWR5OmZhbHNlLFxuXG5cdFx0cmVhZHk6ZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcGRmcyA9IFtdLFxuXHRcdFx0XHRwZGZNb2RhbCwgc2VsZiA9IHRoaXM7XG5cblx0XHRcdC8vIHByZXZlbnQgZG91YmxlIGluaXRcblx0XHRcdGlmICggdGhpcy5kaWRSZWFkeSApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3BhcmVudFJlYWR5LmFwcGx5KCB0aGlzICwgYXJndW1lbnRzICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRpZFJlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0cmV0ID0gdGhpcy5fcGFyZW50UmVhZHkuYXBwbHkoIHRoaXMgLCBhcmd1bWVudHMgKTtcblxuXHRcdFx0ZnVuY3Rpb24gcGRmUG9wdXAoIHVwbG9hZGVyLCBmaWxlSXRlbSApIHtcblxuXHRcdFx0XHRpZiAoIHBkZk1vZGFsICkge1xuXHRcdFx0XHRcdHBkZk1vZGFsLmNsb3NlKCkuZGlzcG9zZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cGRmTW9kYWwgPSBuZXcgcGRmUmVuZGVyZXIudmlldy5QREZGcmFtZSgge1xuXHRcdFx0XHRcdGNvbnRyb2xsZXI6ICQodGhpcyksXG5cdFx0XHRcdFx0dXBsb2FkZXI6dXBsb2FkZXIsXG5cdFx0XHRcdFx0dGl0bGU6IGwxMG4uVXBsb2FkICsgJzogJyArIGZpbGVJdGVtLmZpbGUubmFtZS5yZXBsYWNlKC9cXC5bYS16MC05XSskLywnJyksXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cGRmTW9kYWwub24oJ2NhbmNlbC11cGxvYWQnLGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIHN0b3AgZWNlcnl0aGluZyFcblx0XHRcdFx0XHR1cGxvYWRlci5yZW1vdmVGaWxlKCBmaWxlSXRlbS5maWxlICk7XG5cdFx0XHRcdFx0ZmlsZUl0ZW0uZmlsZS5hdHRhY2htZW50LmRlc3Ryb3koKTtcblxuXHRcdFx0XHR9KS5vbignY29udGludWUtdXBsb2FkJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdC8vIGdvIGFoZWFkIHdpdGggYSBub3JtYWwgV1AgdXBsb2FkLi5cblx0XHRcdFx0XHR1cGxvYWRlci5zdGFydCgpO1xuXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRwZGZNb2RhbC5zZXRGaWxlKCBmaWxlSXRlbSApO1xuXHRcdFx0XHRwZGZNb2RhbC5vcGVuKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICpcdEByZXR1cm4gbmF0aXZlIGZpbGUgb2JqZWN0IG9yIGJsb2Jcblx0XHRcdCAqL1xuXHRcdFx0ZnVuY3Rpb24gcmVzb2x2ZUZpbGUoIGZpbGUgKSB7XG5cdFx0XHRcdHZhciBfcmV0ID0ge1xuXHRcdFx0XHRcdGZpbGU6IGZpbGUsXG5cdFx0XHRcdFx0YmxvYjpmaWxlLmdldE5hdGl2ZSgpXG5cdFx0XHRcdH0sIF9yZXQyLCBieXRlcywgaTtcblx0XHRcdFx0aWYgKCAhIF9yZXQuYmxvYiApIHtcblx0XHRcdFx0XHRfcmV0LmJsb2IgPSBmaWxlLmdldFNvdXJjZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBfcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZW5kIGNyb3BkYXRhXG5cdFx0XHR0aGlzLnVwbG9hZGVyLnVwbG9hZGVyLmJpbmQoJ0JlZm9yZVVwbG9hZCcsZnVuY3Rpb24oIHVwLCBmaWxlICkge1xuXG5cdFx0XHRcdGlmICggZmlsZS50eXBlID09ICdhcHBsaWNhdGlvbi9wZGYnKSB7XG5cblx0XHRcdFx0XHRmaWxlRGF0YSA9IHJlc29sdmVGaWxlKCBmaWxlICk7XG5cdFx0XHRcdFx0aWYgKCBmaWxlRGF0YS5ibG9iIGluc3RhbmNlb2YgQmxvYiApIHtcblx0XHRcdFx0XHRcdHVwLnN0b3AoKTtcblx0XHRcdFx0XHRcdHVwLnJlZnJlc2goKTtcblx0XHRcdFx0XHRcdHBkZlBvcHVwKCB1cCwgZmlsZURhdGEgKTsgLy8gd2lsbCBhc2sgZm9yIGZvY3VzIG9yIHN0YXJ0IHVwbG9hZGVyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBwZGZzLmxlbmd0aCApIHtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fSk7XG5cdF8uZXh0ZW5kKCBwZGZfcmVuZGVyZXIsIHBkZlJlbmRlcmVyICk7XG59KSggalF1ZXJ5LCBwZGZfcmVuZGVyZXIsIG1PeGllICk7XG4iXX0=