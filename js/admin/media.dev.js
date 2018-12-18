!function(r,l,o){var d={view:{}},c=l.l10n;d.view.PDFFrame=wp.media.view.MediaFrame.extend({template:wp.template("pdf-modal"),regions:["title","content","instructions","buttons","pagenav"],events:{"click [data-page]":"clickPage"},initialize:function(){return _.defaults(this.options,{uploader:!1,title:c.pdfUpload}),wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments),this._pdf=this._canvas=null,this._current_page=0,this._pages={},this.createTitle(),this.createButtons(),this},createTitle:function(){this._title=new wp.media.View({tagName:"h1"}),this._title.$el.text(this.options.title),this.title.set([this._title])},createButtons:function(){var e=this;this.buttons.set([new wp.media.view.Button({text:c.CancelUpload,className:"cancel-upload",click:function(){e.trigger("cancel-upload"),e.close()}}),new wp.media.view.Button({text:c.UploadPDF,className:"upload-pdf",click:function(){}}),new wp.media.view.Button({text:c.UploadImages,className:"button-primary",click:function(){e.trigger("cancel-upload"),e.uploadImages(),e.close()}})])},setFile:function(e){var t=this,a=new FileReader;return this.file=e,a.onload=function(e){t.parsePDF(e.target.result)},a.readAsArrayBuffer(e.blob),this},clickPage:function(e){this.showPage(r(e.target).attr("data-page"))},renderPageNav:function(e){console.log();var t,a=this,i=1,n=[];for(this._pages={};i<=e;i++)this._pages[i]={page:!1,canvas:!1,selected:!0},n.push(new wp.media.view.Button({text:"",className:"button-primary dashicons-yes dashicons",_page:i,click:function(){a.togglePage(this.options._page),this.$el.toggleClass("button-primary").next("button").toggleClass("button-primary")}}).render()),n.push(new wp.media.view.Button({text:i.toString(),className:"button-primary",_page:i,click:function(){a.showPage(this.options._page)}}).render());t=new wp.media.view.ButtonGroup({buttons:n}),this.pagenav.set([t.render()])},parsePDF:function(e){var t=this;pdfjsLib.getDocument(e).then(function(e){t._pdf=e,t.renderPageNav(e.numPages),t.showPage(1)})},togglePage:function(e){this._pages[e].selected=!this._pages[e].selected,_.each(this._pages,function(e,t){console.log(t,e)})},showPage:function(e){var t=this;this._pages[e].canvas?this.content.set([new wp.media.View({el:this._pages[e].canvas})]):this.renderPage(e,function(){t.showPage(e)})},renderPage:function(n,o,s){var p=this;p._pdf.getPage(n).then(function(e){var t=e.getViewport(1),a=r("<canvas></canvas>").get(0),i=a.getContext("2d");t=e.getViewport(l.options.image_width/t.width),a.width=t.width,a.height=t.height,e.render({canvasContext:i,viewport:t}).then(function(){p._pages[n].page=e,p._pages[n].canvas=a,o&&o.apply(p._pages[n],s||[])})})},uploadImages:function(){var i=this,a="image/png",n=function(e){var t=new o.Image;t.onload=function(){t.name=e,t.type=a,i.options.uploader.addFile(t.getAsBlob(),e)},t.load(this.canvas.toDataURL(a)),r("body").append(t)};_.each(this._pages,function(e,t){var a=i.file.file.name.replace(/\.[a-z0-9]+$/,"")+"-p"+t+".png";e.canvas?n.apply(e):i.renderPage(1*t,n,[a])})}}),_.extend(wp.media.view.UploaderWindow.prototype,{_parentReady:wp.media.view.UploaderWindow.prototype.ready,didReady:!1,ready:function(){var s,p=[];if(this.didReady)return this._parentReady.apply(this,arguments);return this.didReady=!0,ret=this._parentReady.apply(this,arguments),this.uploader.uploader.bind("FilesAdded",function(e,t){for(var a,i,n,o=0;o<t.length;o++)"application/pdf"==t[o].type&&(i=t[o],n=void 0,(n={file:i,blob:i.getNative()}).blob||(n.blob=i.getSource()),(a=n).blob instanceof Blob&&p.push(a));p.length&&(e.stop(),e.refresh(),function e(t){var a;s&&s.close().dispose(),p.length?(a=p.shift(),(s=new d.view.PDFFrame({controller:r(this),uploader:t,title:c.Upload+": "+a.file.name.replace(/\.[a-z0-9]+$/,"")})).on("proceed",function(){e(t)}).on("cancel-upload",function(){a.file.attachment.destroy()}),s.setFile(a),s.open()):t.start()}(e))}),this.uploader.uploader.bind("BeforeUpload",function(e,t){}),ret}})}(jQuery,pdf_renderer,mOxie);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbIiQiLCJvcHRzIiwibyIsInBkZlJlbmRlcmVyIiwidmlldyIsImwxMG4iLCJQREZGcmFtZSIsIndwIiwibWVkaWEiLCJNZWRpYUZyYW1lIiwiZXh0ZW5kIiwidGVtcGxhdGUiLCJyZWdpb25zIiwiZXZlbnRzIiwiY2xpY2sgW2RhdGEtcGFnZV0iLCJpbml0aWFsaXplIiwiXyIsImRlZmF1bHRzIiwidGhpcyIsIm9wdGlvbnMiLCJ1cGxvYWRlciIsInRpdGxlIiwicGRmVXBsb2FkIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfcGRmIiwiX2NhbnZhcyIsIl9jdXJyZW50X3BhZ2UiLCJfcGFnZXMiLCJjcmVhdGVUaXRsZSIsImNyZWF0ZUJ1dHRvbnMiLCJfdGl0bGUiLCJWaWV3IiwidGFnTmFtZSIsIiRlbCIsInRleHQiLCJzZXQiLCJzZWxmIiwiYnV0dG9ucyIsIkJ1dHRvbiIsIkNhbmNlbFVwbG9hZCIsImNsYXNzTmFtZSIsImNsaWNrIiwidHJpZ2dlciIsImNsb3NlIiwiVXBsb2FkUERGIiwiVXBsb2FkSW1hZ2VzIiwidXBsb2FkSW1hZ2VzIiwic2V0RmlsZSIsImZpbGUiLCJmaWxlUmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImV2ZW50IiwicGFyc2VQREYiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImJsb2IiLCJjbGlja1BhZ2UiLCJlIiwic2hvd1BhZ2UiLCJhdHRyIiwicmVuZGVyUGFnZU5hdiIsIm51bVBhZ2VzIiwiY29uc29sZSIsImxvZyIsImJncnAiLCJpIiwiYnRucyIsInBhZ2UiLCJjYW52YXMiLCJzZWxlY3RlZCIsInB1c2giLCJfcGFnZSIsInRvZ2dsZVBhZ2UiLCJ0b2dnbGVDbGFzcyIsIm5leHQiLCJyZW5kZXIiLCJ0b1N0cmluZyIsIkJ1dHRvbkdyb3VwIiwicGFnZW5hdiIsImFyciIsInBkZmpzTGliIiwiZ2V0RG9jdW1lbnQiLCJ0aGVuIiwicGRmIiwiaWR4IiwiZWFjaCIsImVsIiwiY29udGVudCIsInJlbmRlclBhZ2UiLCJjYiIsImNiX2FyZ3MiLCJnZXRQYWdlIiwidnAiLCJnZXRWaWV3cG9ydCIsImdldCIsImN0eCIsImdldENvbnRleHQiLCJpbWFnZV93aWR0aCIsIndpZHRoIiwiaGVpZ2h0IiwiY2FudmFzQ29udGV4dCIsInZpZXdwb3J0IiwidHlwZSIsInVwbG9hZCIsIm5hbWUiLCJpbWciLCJJbWFnZSIsImFkZEZpbGUiLCJnZXRBc0Jsb2IiLCJsb2FkIiwidG9EYXRhVVJMIiwiYXBwZW5kIiwicGciLCJyZXBsYWNlIiwiVXBsb2FkZXJXaW5kb3ciLCJfcGFyZW50UmVhZHkiLCJyZWFkeSIsImRpZFJlYWR5IiwicGRmTW9kYWwiLCJwZGZzIiwicmV0IiwiYmluZCIsInVwIiwiZmlsZXMiLCJmaWxlRGF0YSIsIl9yZXQiLCJsZW5ndGgiLCJnZXROYXRpdmUiLCJnZXRTb3VyY2UiLCJCbG9iIiwic3RvcCIsInJlZnJlc2giLCJwZGZQb3B1cCIsImZpbGVJdGVtIiwiZGlzcG9zZSIsInNoaWZ0IiwiY29udHJvbGxlciIsIlVwbG9hZCIsIm9uIiwiYXR0YWNobWVudCIsImRlc3Ryb3kiLCJvcGVuIiwic3RhcnQiLCJqUXVlcnkiLCJwZGZfcmVuZGVyZXIiLCJtT3hpZSJdLCJtYXBwaW5ncyI6IkNBQUEsU0FBV0EsRUFBR0MsRUFBTUMsR0FFbkIsSUFBSUMsRUFBYyxDQUNoQkMsS0FBTSxJQUVQQyxFQUFPSixFQUFLSSxLQUliRixFQUFZQyxLQUFLRSxTQUFXQyxHQUFHQyxNQUFNSixLQUFLSyxXQUFXQyxPQUFPLENBQzNEQyxTQUFXSixHQUFHSSxTQUFTLGFBQ3ZCQyxRQUFXLENBQUUsUUFBUSxVQUFVLGVBQWUsVUFBVyxXQUN6REMsT0FBTyxDQUNOQyxvQkFBc0IsYUFFdkJDLFdBQVksV0FpQlgsT0FkQUMsRUFBRUMsU0FBVUMsS0FBS0MsUUFBUyxDQUN6QkMsVUFBVSxFQUNWQyxNQUFRaEIsRUFBS2lCLFlBR2RmLEdBQUdDLE1BQU1K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LFFBQ1pPLEVBQVdkLEVBQUtnQixTQUNoQmpCLEVBQVcsSUFBSXZILEVBQVlDLEtBQUtFLFNBQVUsQ0FDekNzSSxXQUFZNUksRUFBRWtCLE1BQ2RFLFNBQVNBLEVBQ1RDLE1BQU9oQixFQUFLd0ksT0FBUyxLQUFPSixFQUFTdkYsS0FBSzBELEtBQUtTLFFBQVEsZUFBZSxPQUU5RHlCLEdBQUcsVUFBVSxXQUVyQk4sRUFBVXBILEtBRVIwSCxHQUFHLGdCQUFnQixXQUNyQkwsRUFBU3ZGLEtBQUs2RixXQUFXQyxZQUUxQnRCLEVBQVN6RSxRQUFTd0YsR0FDbEJmLEVBQVN1QixRQUVUN0gsRUFBUzhILFFBcUNUVixDQUFVVixNQUlaNUcsS0FBS0UsU0FBU0EsU0FBU3lHLEtBQUssZUFBZSxTQUFVQyxFQUFJNUUsTUFJbEQwRSxPQXhUVixDQTRUSXVCLE9BQVFDLGFBQWNDIiwiZmlsZSI6ImFkbWluL21lZGlhLmRldi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiggJCwgb3B0cywgbyApIHtcblxuXHR2YXIgcGRmUmVuZGVyZXIgPSB7XG5cdFx0XHR2aWV3OiB7fVxuXHRcdH0sXG5cdFx0bDEwbiA9IG9wdHMubDEwbixcblx0XHRpbWFnZUluZm9zID0ge307XG5cblxuXHRwZGZSZW5kZXJlci52aWV3LlBERkZyYW1lID0gd3AubWVkaWEudmlldy5NZWRpYUZyYW1lLmV4dGVuZCh7XG5cdFx0dGVtcGxhdGU6ICB3cC50ZW1wbGF0ZSgncGRmLW1vZGFsJyksXG5cdFx0cmVnaW9uczogICBbICd0aXRsZScsJ2NvbnRlbnQnLCdpbnN0cnVjdGlvbnMnLCdidXR0b25zJywgJ3BhZ2VuYXYnIF0sXG5cdFx0ZXZlbnRzOntcblx0XHRcdCdjbGljayBbZGF0YS1wYWdlXScgOiAnY2xpY2tQYWdlJ1xuXHRcdH0sXG5cdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oICkge1xuXG5cblx0XHRcdF8uZGVmYXVsdHMoIHRoaXMub3B0aW9ucywge1xuXHRcdFx0XHR1cGxvYWRlcjpcdGZhbHNlLFxuXHRcdFx0XHR0aXRsZTpcdFx0bDEwbi5wZGZVcGxvYWQsXG5cdFx0XHR9KTtcblxuXHRcdFx0d3AubWVkaWEudmlldy5NZWRpYUZyYW1lLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcblxuXHRcdFx0dGhpcy5fcGRmID0gdGhpcy5fY2FudmFzID0gbnVsbDtcblx0XHRcdHRoaXMuX2N1cnJlbnRfcGFnZSA9IDA7XG5cdFx0XHR0aGlzLl9wYWdlcyA9IHt9O1xuXG5cdFx0XHR0aGlzLmNyZWF0ZVRpdGxlKCk7XG5cdFx0XHR0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9LFxuXHRcdGNyZWF0ZVRpdGxlOiBmdW5jdGlvbiggKSB7XG5cdFx0XHR0aGlzLl90aXRsZSA9IG5ldyB3cC5tZWRpYS5WaWV3KHtcblx0XHRcdFx0dGFnTmFtZTogJ2gxJ1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLl90aXRsZS4kZWwudGV4dCggdGhpcy5vcHRpb25zLnRpdGxlICk7XG5cdFx0XHR0aGlzLnRpdGxlLnNldCggWyB0aGlzLl90aXRsZSBdICk7XG5cdFx0fSxcblx0XHRjcmVhdGVCdXR0b25zOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHRoaXMuYnV0dG9ucy5zZXQoIFtcblx0XHRcdFx0bmV3IHdwLm1lZGlhLnZpZXcuQnV0dG9uKHtcblx0XHRcdFx0XHR0ZXh0OiBsMTBuLkNhbmNlbFVwbG9hZCxcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdjYW5jZWwtdXBsb2FkJyxcblx0XHRcdFx0XHRjbGljazpmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHNlbGYudHJpZ2dlcignY2FuY2VsLXVwbG9hZCcpO1xuXHRcdFx0XHRcdFx0c2VsZi5jbG9zZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSksXG5cdFx0XHRcdG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbih7XG5cdFx0XHRcdFx0dGV4dDogbDEwbi5VcGxvYWRQREYsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAndXBsb2FkLXBkZicsXG5cdFx0XHRcdFx0Y2xpY2s6ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQvLyBkaXNtaXNzLCBjb250aW51ZSB3aXRoIHdwIGRlZnVhbHQgYmVoYXZpb3VyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0bmV3IHdwLm1lZGlhLnZpZXcuQnV0dG9uKHtcblx0XHRcdFx0XHR0ZXh0OiBsMTBuLlVwbG9hZEltYWdlcyxcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdidXR0b24tcHJpbWFyeScsXG5cdFx0XHRcdFx0Y2xpY2s6ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnRyaWdnZXIoJ2NhbmNlbC11cGxvYWQnKTtcblx0XHRcdFx0XHRcdHNlbGYudXBsb2FkSW1hZ2VzKCk7XG5cdFx0XHRcdFx0XHRzZWxmLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XSApO1xuXHRcdH0sXG5cdFx0c2V0RmlsZTpmdW5jdGlvbiggZmlsZSApIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0ZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHR0aGlzLmZpbGUgPSBmaWxlO1xuXHRcdFx0ZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xuLy9cdFx0XHQgICAgYXJyYXlCdWZmZXIgPSBldmVudC50YXJnZXQucmVzdWx0O1xuXHRcdFx0XHRzZWxmLnBhcnNlUERGKCBldmVudC50YXJnZXQucmVzdWx0ICk7XG5cdFx0XHR9O1xuXHRcdFx0ZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlciggZmlsZS5ibG9iICk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGNsaWNrUGFnZTpmdW5jdGlvbihlKSB7XG5cdFx0XHR0aGlzLnNob3dQYWdlKCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtcGFnZScpKTtcblx0XHR9LFxuXHRcdHJlbmRlclBhZ2VOYXY6ZnVuY3Rpb24obnVtUGFnZXMpIHtcblx0XHRcdGNvbnNvbGUubG9nKClcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0aSA9IDEsIGJ0bnMgPSBbXSwgYmdycDtcblx0XHRcdHRoaXMuX3BhZ2VzID0ge307XG5cdFx0XHRmb3IgKGk7aTw9bnVtUGFnZXM7aSsrKSB7XG5cdFx0XHRcdHRoaXMuX3BhZ2VzW2ldID0ge1xuXHRcdFx0XHRcdHBhZ2U6ZmFsc2UsXG5cdFx0XHRcdFx0Y2FudmFzOmZhbHNlLFxuXHRcdFx0XHRcdHNlbGVjdGVkOnRydWUsXG5cdFx0XHRcdH1cblx0XHRcdFx0Lypcblx0XHRcdFx0YnRucy5wdXNoKCAkKCc8YnV0dG9uPicraSsnPC9idXR0b24+JykuZ2V0KDApICk7XG5cdFx0XHRcdC8qL1xuXHRcdFx0XHRidG5zLnB1c2goXG5cdFx0XHRcdFx0bmV3IHdwLm1lZGlhLnZpZXcuQnV0dG9uKHtcblx0XHRcdFx0XHRcdHRleHQ6ICcnLFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnYnV0dG9uLXByaW1hcnkgZGFzaGljb25zLXllcyBkYXNoaWNvbnMnLFxuXHRcdFx0XHRcdFx0X3BhZ2U6aSxcblx0XHRcdFx0XHRcdGNsaWNrOmZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLnRvZ2dsZVBhZ2UodGhpcy5vcHRpb25zLl9wYWdlKTtcblx0XHRcdFx0XHRcdFx0dGhpcy4kZWwudG9nZ2xlQ2xhc3MoJ2J1dHRvbi1wcmltYXJ5JykubmV4dCgnYnV0dG9uJykudG9nZ2xlQ2xhc3MoJ2J1dHRvbi1wcmltYXJ5Jyk7XG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KS5yZW5kZXIoKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGJ0bnMucHVzaChcblx0XHRcdFx0XHRuZXcgd3AubWVkaWEudmlldy5CdXR0b24oe1xuXHRcdFx0XHRcdFx0dGV4dDogaS50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnYnV0dG9uLXByaW1hcnknLFxuXHRcdFx0XHRcdFx0X3BhZ2U6aSxcblx0XHRcdFx0XHRcdGNsaWNrOmZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLnNob3dQYWdlKHRoaXMub3B0aW9ucy5fcGFnZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkucmVuZGVyKClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLyovXG5cdFx0XHR9XG5cdFx0XHRiZ3JwID0gbmV3IHdwLm1lZGlhLnZpZXcuQnV0dG9uR3JvdXAoe1xuXHRcdFx0XHRidXR0b25zOmJ0bnMsXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMucGFnZW5hdi5zZXQoWyBiZ3JwLnJlbmRlcigpIF0pO1xuXHRcdH0sXG5cdFx0cGFyc2VQREY6ZnVuY3Rpb24oIGFyciApIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHBkZmpzTGliLmdldERvY3VtZW50KGFycikudGhlbihmdW5jdGlvbihwZGYpIHtcblx0XHRcdFx0Ly8gYnVpbGQgcGFnZXMgc2VsZWN0b3Jcblx0XHRcdFx0c2VsZi5fcGRmID0gcGRmO1xuXHRcdFx0XHRzZWxmLnJlbmRlclBhZ2VOYXYocGRmLm51bVBhZ2VzKVxuXG5cdFx0XHRcdHNlbGYuc2hvd1BhZ2UoMSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvZ2dsZVBhZ2U6ZnVuY3Rpb24oaWR4KSB7XG5cdFx0XHR0aGlzLl9wYWdlc1tpZHhdLnNlbGVjdGVkID0gISB0aGlzLl9wYWdlc1tpZHhdLnNlbGVjdGVkO1xuXHRcdFx0Xy5lYWNoKHRoaXMuX3BhZ2VzLCBmdW5jdGlvbihlbCxpKXtcblx0XHRcdFx0Y29uc29sZS5sb2coaSxlbCk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0c2hvd1BhZ2U6ZnVuY3Rpb24oaWR4KSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRpZiAoICEhIHRoaXMuX3BhZ2VzW2lkeF0uY2FudmFzICkge1xuXHRcdFx0XHR0aGlzLmNvbnRlbnQuc2V0KCBbXG5cdFx0XHRcdFx0bmV3IHdwLm1lZGlhLlZpZXcoe1xuXHRcdFx0XHRcdFx0ZWw6IHRoaXMuX3BhZ2VzW2lkeF0uY2FudmFzLFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdF0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyUGFnZSggaWR4LCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHNlbGYuc2hvd1BhZ2UoaWR4KTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0fSxcblx0XHRyZW5kZXJQYWdlOmZ1bmN0aW9uKGlkeCxjYixjYl9hcmdzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdHNlbGYuX3BkZi5nZXRQYWdlKGlkeCkudGhlbihmdW5jdGlvbihwYWdlKXtcblx0XHRcdFx0dmFyIHZwID0gcGFnZS5nZXRWaWV3cG9ydCgxKSxcblx0XHRcdFx0XHRjYW52YXMgPSAkKCc8Y2FudmFzPjwvY2FudmFzPicpLmdldCgwKSxcblx0XHRcdFx0XHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdFx0XHR2cCA9IHBhZ2UuZ2V0Vmlld3BvcnQoIG9wdHMub3B0aW9ucy5pbWFnZV93aWR0aCAvIHZwLndpZHRoICk7XG5cblx0XHRcdFx0Y2FudmFzLndpZHRoID0gdnAud2lkdGg7XG5cdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSB2cC5oZWlnaHQ7XG5cblx0XHRcdFx0cGFnZS5yZW5kZXIoe1xuXHRcdFx0XHRcdGNhbnZhc0NvbnRleHQ6IGN0eCxcblx0XHRcdFx0XHR2aWV3cG9ydDogdnAsXG5cdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRzZWxmLl9wYWdlc1tpZHhdLnBhZ2UgPSBwYWdlO1xuXHRcdFx0XHRcdHNlbGYuX3BhZ2VzW2lkeF0uY2FudmFzID0gY2FudmFzO1xuXG5cdFx0XHRcdFx0ISFjYiAmJiBjYi5hcHBseShzZWxmLl9wYWdlc1tpZHhdLGNiX2FyZ3N8fFtdKTtcbi8vXHRcdFx0XHRcdHNlbGYuc2hvd1BhZ2UoaWR4KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cblx0XHR1cGxvYWRJbWFnZXM6ZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdHR5cGUgPSAnaW1hZ2UvcG5nJyxcblx0XHRcdFx0dXBsb2FkID0gZnVuY3Rpb24obmFtZSl7XG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHR0aGlzLmNhbnZhcy50b0Jsb2IoZnVuY3Rpb24oYmxvYil7XG5cdFx0XHRcdFx0XHRibG9iLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0YmxvYi50eXBlID0gdHlwZTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGJsb2IubmFtZSlcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHNlbGYub3B0aW9ucy51cGxvYWRlcixibG9iKVxuXHRcdFx0XHRcdFx0c2VsZi5vcHRpb25zLnVwbG9hZGVyLmFkZEZpbGUoIGJsb2IsIG5hbWUgKTtcblx0XHRcdFx0XHR9LHR5cGUpO1xuXHRcdFx0XHRcdC8qL1xuXHRcdFx0XHRcdHZhciBpbWcgPSBuZXcgby5JbWFnZSgpO1xuXHRcdFx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGltZy5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdGltZy50eXBlID0gdHlwZTtcblx0XHRcdFx0XHRcdHNlbGYub3B0aW9ucy51cGxvYWRlci5hZGRGaWxlKCBpbWcuZ2V0QXNCbG9iKCksIG5hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aW1nLmxvYWQoIHRoaXMuY2FudmFzLnRvRGF0YVVSTCh0eXBlKSApO1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0JCgnYm9keScpLmFwcGVuZChpbWcpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHQvLyBjcmVhdGUgZSBuZXcgbWVkaWEgbW9kZWwgZnJvbSBibG9iIGRhdGEgVVJMIHRoaW5neVxuXHRcdFx0Xy5lYWNoKHRoaXMuX3BhZ2VzLGZ1bmN0aW9uKCBwZywgaSApe1xuXHRcdFx0XHR2YXIgbmFtZSA9IHNlbGYuZmlsZS5maWxlLm5hbWUucmVwbGFjZSgvXFwuW2EtejAtOV0rJC8sJycpICsgJy1wJyArIGkgKyAnLnBuZyc7XG5cdFx0XHRcdGlmICggISBwZy5jYW52YXMgKSB7XG5cdFx0XHRcdFx0Ly8gbmVlZHMgcmVuZGVyaW5nXG5cdFx0XHRcdFx0c2VsZi5yZW5kZXJQYWdlKGkqMSwgdXBsb2FkLFtuYW1lXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXBsb2FkLmFwcGx5KHBnKVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvL1xuXHRcdH1cblx0fSk7XG5cblxuXHRfLmV4dGVuZCggd3AubWVkaWEudmlldy5VcGxvYWRlcldpbmRvdy5wcm90b3R5cGUsIHtcblx0XHRfcGFyZW50UmVhZHk6IHdwLm1lZGlhLnZpZXcuVXBsb2FkZXJXaW5kb3cucHJvdG90eXBlLnJlYWR5LFxuXHRcdGRpZFJlYWR5OmZhbHNlLFxuXG5cdFx0cmVhZHk6ZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcGRmcyA9IFtdLFxuXHRcdFx0XHRwZGZNb2RhbCwgc2VsZiA9IHRoaXM7XG5cblx0XHRcdC8vIHByZXZlbnQgZG91YmxlIGluaXRcblx0XHRcdGlmICggdGhpcy5kaWRSZWFkeSApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3BhcmVudFJlYWR5LmFwcGx5KCB0aGlzICwgYXJndW1lbnRzICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRpZFJlYWR5ID0gdHJ1ZTtcblxuXHRcdFx0cmV0ID0gdGhpcy5fcGFyZW50UmVhZHkuYXBwbHkoIHRoaXMgLCBhcmd1bWVudHMgKTtcblxuXHRcdFx0ZnVuY3Rpb24gcGRmUG9wdXAoIHVwbG9hZGVyICkge1xuXHRcdFx0XHR2YXIgZmlsZUl0ZW0sIHNyYztcblx0XHRcdFx0aWYgKCBwZGZNb2RhbCApIHtcblx0XHRcdFx0XHRwZGZNb2RhbC5jbG9zZSgpLmRpc3Bvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICEhIHBkZnMubGVuZ3RoICkge1xuXHRcdFx0XHRcdGZpbGVJdGVtID0gcGRmcy5zaGlmdCgpO1xuXHRcdFx0XHRcdHBkZk1vZGFsID0gbmV3IHBkZlJlbmRlcmVyLnZpZXcuUERGRnJhbWUoIHtcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6ICQodGhpcyksXG5cdFx0XHRcdFx0XHR1cGxvYWRlcjp1cGxvYWRlcixcblx0XHRcdFx0XHRcdHRpdGxlOiBsMTBuLlVwbG9hZCArICc6ICcgKyBmaWxlSXRlbS5maWxlLm5hbWUucmVwbGFjZSgvXFwuW2EtejAtOV0rJC8sJycpLFxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRwZGZNb2RhbC5vbigncHJvY2VlZCcsZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQvLyBuZXh0XG5cdFx0XHRcdFx0XHRwZGZQb3B1cCggdXBsb2FkZXIgKTtcblxuXHRcdFx0XHRcdH0pLm9uKCdjYW5jZWwtdXBsb2FkJyxmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGZpbGVJdGVtLmZpbGUuYXR0YWNobWVudC5kZXN0cm95KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cGRmTW9kYWwuc2V0RmlsZSggZmlsZUl0ZW0gKTtcblx0XHRcdFx0XHRwZGZNb2RhbC5vcGVuKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXBsb2FkZXIuc3RhcnQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBhZGRQREYoIGZpbGVEYXRhLCB1cGxvYWRlciApIHtcblxuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqXHRAcmV0dXJuIG5hdGl2ZSBmaWxlIG9iamVjdCBvciBibG9iXG5cdFx0XHQgKi9cblx0XHRcdGZ1bmN0aW9uIHJlc29sdmVGaWxlKCBmaWxlICkge1xuXHRcdFx0XHR2YXIgX3JldCA9IHtcblx0XHRcdFx0XHRmaWxlOiBmaWxlLFxuXHRcdFx0XHRcdGJsb2I6ZmlsZS5nZXROYXRpdmUoKVxuXHRcdFx0XHR9LCBfcmV0MiwgYnl0ZXMsIGk7XG5cdFx0XHRcdGlmICggISBfcmV0LmJsb2IgKSB7XG5cdFx0XHRcdFx0X3JldC5ibG9iID0gZmlsZS5nZXRTb3VyY2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gX3JldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gc3RvcCB1cGxvYWRlciBhbmQgZ2VuZXJhdGUgY3JvcGRhdGFcblx0XHRcdHRoaXMudXBsb2FkZXIudXBsb2FkZXIuYmluZCgnRmlsZXNBZGRlZCcsZnVuY3Rpb24oIHVwLCBmaWxlcyApIHtcblx0XHRcdFx0dmFyIGZpbGVEYXRhO1xuXHRcdFx0XHQvLyBwdXQgbW9kYWxcblx0XHRcdFx0Zm9yICh2YXIgaT0wO2k8ZmlsZXMubGVuZ3RoO2krKykge1xuXHRcdFx0XHRcdGlmICggZmlsZXNbaV0udHlwZSA9PSAnYXBwbGljYXRpb24vcGRmJykge1xuXHRcdFx0XHRcdFx0ZmlsZURhdGEgPSByZXNvbHZlRmlsZSggZmlsZXNbaV0gKTtcblx0XHRcdFx0XHRcdGlmICggZmlsZURhdGEuYmxvYiBpbnN0YW5jZW9mIEJsb2IgKSB7XG5cdFx0XHRcdFx0XHRcdHBkZnMucHVzaCggZmlsZURhdGEgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBwZGZzLmxlbmd0aCApIHtcblx0XHRcdFx0XHR1cC5zdG9wKCk7XG5cdFx0XHRcdFx0dXAucmVmcmVzaCgpO1xuXHRcdFx0XHRcdHBkZlBvcHVwKCB1cCApOyAvLyB3aWxsIGFzayBmb3IgZm9jdXMgb3Igc3RhcnQgdXBsb2FkZXJcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHQvLyBzZW5kIGNyb3BkYXRhXG5cdFx0XHR0aGlzLnVwbG9hZGVyLnVwbG9hZGVyLmJpbmQoJ0JlZm9yZVVwbG9hZCcsZnVuY3Rpb24oIHVwLCBmaWxlICkge1xuXHRcdFx0XHR2YXIgcywgY3JvcGRhdGEsIGZvY3VzcG9pbnQ7XG5cdFx0XHRcdC8vIGRvIHNvbWV0aGluZyB3aXRoIGZpbGVzIGJlZm9yZSB1cGxvYWQuLi5cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cdH0pO1xuXG59KSggalF1ZXJ5LCBwZGZfcmVuZGVyZXIsIG1PeGllICk7XG4iXX0=
