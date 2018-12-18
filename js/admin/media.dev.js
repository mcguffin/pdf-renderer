!function(r,e,o){var l={view:{}},d=e.l10n;l.view.PDFFrame=wp.media.view.MediaFrame.extend({template:wp.template("pdf-modal"),regions:["title","content","instructions","buttons","pagenav"],events:{"click [data-page]":"clickPage"},initialize:function(){return _.defaults(this.options,{uploader:!1,title:d.pdfUpload}),wp.media.view.MediaFrame.prototype.initialize.apply(this,arguments),this._pdf=this._canvas=null,this._current_page=0,this._pages={},this.createTitle(),this.createButtons(),this},createTitle:function(){this._title=new wp.media.View({tagName:"h1"}),this._title.$el.text(this.options.title),this.title.set([this._title])},createButtons:function(){var e=this;this.buttons.set([new wp.media.view.Button({text:d.CancelUpload,className:"cancel-upload",click:function(){e.trigger("cancel-upload"),e.close()}}),new wp.media.view.Button({text:d.UploadPDF,className:"upload-pdf",click:function(){}}),new wp.media.view.Button({text:d.UploadImages,className:"button-primary",click:function(){e.trigger("cancel-upload"),e.uploadImages(),e.close()}})])},setFile:function(e){var t=this,a=new FileReader;return this.file=e,a.onload=function(e){t.parsePDF(e.target.result)},a.readAsArrayBuffer(e.blob),this},clickPage:function(e){this.showPage(r(e.target).attr("data-page"))},renderPageNav:function(e){console.log();var t,a=this,i=1,n=[];for(this._pages={};i<=e;i++)this._pages[i]={page:!1,canvas:!1,selected:!0},n.push(new wp.media.view.Button({text:"",className:"button-primary dashicons-yes dashicons",_page:i,click:function(){a.togglePage(this.options._page),this.$el.toggleClass("button-primary").next("button").toggleClass("button-primary")}}).render()),n.push(new wp.media.view.Button({text:i.toString(),className:"button-primary",_page:i,click:function(){a.showPage(this.options._page)}}).render());t=new wp.media.view.ButtonGroup({buttons:n}),this.pagenav.set([t.render()])},parsePDF:function(e){var t=this;pdfjsLib.getDocument(e).then(function(e){t._pdf=e,t.renderPageNav(e.numPages),t.showPage(1)})},togglePage:function(e){this._pages[e].selected=!this._pages[e].selected,_.each(this._pages,function(e,t){console.log(t,e)})},showPage:function(e){var t=this;this._pages[e].canvas?this.content.set([new wp.media.View({el:this._pages[e].canvas})]):this.renderPage(e,function(){t.showPage(e)})},renderPage:function(n,o,s){var p=this;p._pdf.getPage(n).then(function(e){var t=e.getViewport(1),a=r("<canvas></canvas>").get(0),i=a.getContext("2d");t=e.getViewport(1920/t.width),a.width=t.width,a.height=t.height,e.render({canvasContext:i,viewport:t}).then(function(){p._pages[n].page=e,p._pages[n].canvas=a,o&&o.apply(p._pages[n],s||[])})})},uploadImages:function(){var i=this,a="image/png",n=function(e){var t=new o.Image;t.onload=function(){t.name=e,t.type=a,i.options.uploader.addFile(t.getAsBlob(),e)},t.load(this.canvas.toDataURL(a)),r("body").append(t)};_.each(this._pages,function(e,t){var a=i.file.file.name.replace(/\.[a-z0-9]+$/,"")+"-p"+t+".png";e.canvas?n.apply(e):i.renderPage(1*t,n,[a])})}}),_.extend(wp.media.view.UploaderWindow.prototype,{_parentReady:wp.media.view.UploaderWindow.prototype.ready,didReady:!1,ready:function(){var s,p=[];if(this.didReady)return this._parentReady.apply(this,arguments);return this.didReady=!0,ret=this._parentReady.apply(this,arguments),this.uploader.uploader.bind("FilesAdded",function(e,t){for(var a,i,n,o=0;o<t.length;o++)"application/pdf"==t[o].type&&(i=t[o],n=void 0,(n={file:i,blob:i.getNative()}).blob||(n.blob=i.getSource()),(a=n).blob instanceof Blob&&p.push(a));p.length&&(e.stop(),e.refresh(),function e(t){var a;s&&s.close().dispose(),p.length?(a=p.shift(),(s=new l.view.PDFFrame({controller:r(this),uploader:t,title:d.Upload+": "+a.file.name.replace(/\.[a-z0-9]+$/,"")})).on("proceed",function(){e(t)}).on("cancel-upload",function(){a.file.attachment.destroy()}),s.setFile(a),s.open()):t.start()}(e))}),this.uploader.uploader.bind("BeforeUpload",function(e,t){}),ret}})}(jQuery,pdf_renderer,mOxie);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbIiQiLCJvcHRzIiwibyIsInBkZlJlbmRlcmVyIiwidmlldyIsImwxMG4iLCJQREZGcmFtZSIsIndwIiwibWVkaWEiLCJNZWRpYUZyYW1lIiwiZXh0ZW5kIiwidGVtcGxhdGUiLCJyZWdpb25zIiwiZXZlbnRzIiwiY2xpY2sgW2RhdGEtcGFnZV0iLCJpbml0aWFsaXplIiwiXyIsImRlZmF1bHRzIiwidGhpcyIsIm9wdGlvbnMiLCJ1cGxvYWRlciIsInRpdGxlIiwicGRmVXBsb2FkIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfcGRmIiwiX2NhbnZhcyIsIl9jdXJyZW50X3BhZ2UiLCJfcGFnZXMiLCJjcmVhdGVUaXRsZSIsImNyZWF0ZUJ1dHRvbnMiLCJfdGl0bGUiLCJWaWV3IiwidGFnTmFtZSIsIiRlbCIsInRleHQiLCJzZXQiLCJzZWxmIiwiYnV0dG9ucyIsIkJ1dHRvbiIsIkNhbmNlbFVwbG9hZCIsImNsYXNzTmFtZSIsImNsaWNrIiwidHJpZ2dlciIsImNsb3NlIiwiVXBsb2FkUERGIiwiVXBsb2FkSW1hZ2VzIiwidXBsb2FkSW1hZ2VzIiwic2V0RmlsZSIsImZpbGUiLCJmaWxlUmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImV2ZW50IiwicGFyc2VQREYiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImJsb2IiLCJjbGlja1BhZ2UiLCJlIiwic2hvd1BhZ2UiLCJhdHRyIiwicmVuZGVyUGFnZU5hdiIsIm51bVBhZ2VzIiwiY29uc29sZSIsImxvZyIsImJncnAiLCJpIiwiYnRucyIsInBhZ2UiLCJjYW52YXMiLCJzZWxlY3RlZCIsInB1c2giLCJfcGFnZSIsInRvZ2dsZVBhZ2UiLCJ0b2dnbGVDbGFzcyIsIm5leHQiLCJyZW5kZXIiLCJ0b1N0cmluZyIsIkJ1dHRvbkdyb3VwIiwicGFnZW5hdiIsImFyciIsInBkZmpzTGliIiwiZ2V0RG9jdW1lbnQiLCJ0aGVuIiwicGRmIiwiaWR4IiwiZWFjaCIsImVsIiwiY29udGVudCIsInJlbmRlclBhZ2UiLCJjYiIsImNiX2FyZ3MiLCJnZXRQYWdlIiwidnAiLCJnZXRWaWV3cG9ydCIsImdldCIsImN0eCIsImdldENvbnRleHQiLCJ3aWR0aCIsImhlaWdodCIsImNhbnZhc0NvbnRleHQiLCJ2aWV3cG9ydCIsInR5cGUiLCJ1cGxvYWQiLCJuYW1lIiwiaW1nIiwiSW1hZ2UiLCJhZGRGaWxlIiwiZ2V0QXNCbG9iIiwibG9hZCIsInRvRGF0YVVSTCIsImFwcGVuZCIsInBnIiwicmVwbGFjZSIsIlVwbG9hZGVyV2luZG93IiwiX3BhcmVudFJlYWR5IiwicmVhZHkiLCJkaWRSZWFkeSIsInBkZk1vZGFsIiwicGRmcyIsInJldCIsImJpbmQiLCJ1cCIsImZpbGVzIiwiZmlsZURhdGEiLCJfcmV0IiwibGVuZ3RoIiwiZ2V0TmF0aXZlIiwiZ2V0U291cmNlIiwiQmxvYiIsInN0b3AiLCJyZWZyZXNoIiwicGRmUG9wdXAiLCJmaWxlSXRlbSIsImRpc3Bvc2UiLCJzaGlmdCIsImNvbnRyb2xsZXIiLCJVcGxvYWQiLCJvbiIsImF0dGFjaG1lbnQiLCJkZXN0cm95Iiwib3BlbiIsInN0YXJ0IiwialF1ZXJ5IiwicGRmX3JlbmRlcmVyIiwibU94aWUiXSwibWFwcGluZ3MiOiJDQUFBLFNBQVdBLEVBQUdDLEVBQU1DLEdBRW5CLElBQUlDLEVBQWMsQ0FDaEJDLEtBQU0sSUFFUEMsRUFBT0osRUFBS0ksS0FJYkYsRUFBWUMsS0FBS0UsU0FBV0MsR0FBR0MsTUFBTUosS0FBS0ssV0FBV0MsT0FBTyxDQUMzREMsU0FBV0osR0FBR0ksU0FBUyxhQUN2QkMsUUFBVyxDQUFFLFFBQVEsVUFBVSxlQUFlLFVBQVcsV0FDekRDLE9BQU8sQ0FDTkMsb0JBQXNCLGFBRXZCQyxXQUFZLFdBaUJYLE9BZEFDLEVBQUVDLFNBQVVDLEtBQUtDLFFBQVMsQ0FDekJDLFVBQVUsRUFDVkMsTUFBUWhCLEVBQUtpQixZQUdkZixHQUFHQyxNQUFNSixLQUFLSyxXQUFXYyxV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QUFXLElBQUl0SCxFQUFZQyxLQUFLRSxTQUFVLENBQ3pDcUksV0FBWTNJLEVBQUVrQixNQUNkRSxTQUFTQSxFQUNUQyxNQUFNaEIsRUFBS3VJLE9BQVMsS0FBT0osRUFBU3RGLEtBQUt5RCxLQUFLUyxRQUFRLGVBQWUsT0FFN0R5QixHQUFHLFVBQVUsV0FFckJOLEVBQVVuSCxLQUVSeUgsR0FBRyxnQkFBZ0IsV0FDckJMLEVBQVN0RixLQUFLNEYsV0FBV0MsWUFFMUJ0QixFQUFTeEUsUUFBU3VGLEdBQ2xCZixFQUFTdUIsUUFFVDVILEVBQVM2SCxRQXFDVFYsQ0FBVVYsTUFJWjNHLEtBQUtFLFNBQVNBLFNBQVN3RyxLQUFLLGVBQWUsU0FBVUMsRUFBSTNFLE1BSWxEeUUsT0F6VFYsQ0E2VEl1QixPQUFRQyxhQUFjQyIsImZpbGUiOiJhZG1pbi9tZWRpYS5kZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oICQsIG9wdHMsIG8gKSB7XG5cblx0dmFyIHBkZlJlbmRlcmVyID0ge1xuXHRcdFx0dmlldzoge31cblx0XHR9LFxuXHRcdGwxMG4gPSBvcHRzLmwxMG4sXG5cdFx0aW1hZ2VJbmZvcyA9IHt9O1xuXG5cblx0cGRmUmVuZGVyZXIudmlldy5QREZGcmFtZSA9IHdwLm1lZGlhLnZpZXcuTWVkaWFGcmFtZS5leHRlbmQoe1xuXHRcdHRlbXBsYXRlOiAgd3AudGVtcGxhdGUoJ3BkZi1tb2RhbCcpLFxuXHRcdHJlZ2lvbnM6ICAgWyAndGl0bGUnLCdjb250ZW50JywnaW5zdHJ1Y3Rpb25zJywnYnV0dG9ucycsICdwYWdlbmF2JyBdLFxuXHRcdGV2ZW50czp7XG5cdFx0XHQnY2xpY2sgW2RhdGEtcGFnZV0nIDogJ2NsaWNrUGFnZSdcblx0XHR9LFxuXHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uKCApIHtcblxuXG5cdFx0XHRfLmRlZmF1bHRzKCB0aGlzLm9wdGlvbnMsIHtcblx0XHRcdFx0dXBsb2FkZXI6XHRmYWxzZSxcblx0XHRcdFx0dGl0bGU6XHRcdGwxMG4ucGRmVXBsb2FkLFxuXHRcdFx0fSk7XG5cblx0XHRcdHdwLm1lZGlhLnZpZXcuTWVkaWFGcmFtZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG5cblx0XHRcdHRoaXMuX3BkZiA9IHRoaXMuX2NhbnZhcyA9IG51bGw7XG5cdFx0XHR0aGlzLl9jdXJyZW50X3BhZ2UgPSAwO1xuXHRcdFx0dGhpcy5fcGFnZXMgPSB7fTtcblxuXHRcdFx0dGhpcy5jcmVhdGVUaXRsZSgpO1xuXHRcdFx0dGhpcy5jcmVhdGVCdXR0b25zKCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fSxcblx0XHRjcmVhdGVUaXRsZTogZnVuY3Rpb24oICkge1xuXHRcdFx0dGhpcy5fdGl0bGUgPSBuZXcgd3AubWVkaWEuVmlldyh7XG5cdFx0XHRcdHRhZ05hbWU6ICdoMSdcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fdGl0bGUuJGVsLnRleHQoIHRoaXMub3B0aW9ucy50aXRsZSApO1xuXHRcdFx0dGhpcy50aXRsZS5zZXQoIFsgdGhpcy5fdGl0bGUgXSApO1xuXHRcdH0sXG5cdFx0Y3JlYXRlQnV0dG9uczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHR0aGlzLmJ1dHRvbnMuc2V0KCBbXG5cdFx0XHRcdG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbih7XG5cdFx0XHRcdFx0dGV4dDogbDEwbi5DYW5jZWxVcGxvYWQsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnY2FuY2VsLXVwbG9hZCcsXG5cdFx0XHRcdFx0Y2xpY2s6ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnRyaWdnZXIoJ2NhbmNlbC11cGxvYWQnKTtcblx0XHRcdFx0XHRcdHNlbGYuY2xvc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRuZXcgd3AubWVkaWEudmlldy5CdXR0b24oe1xuXHRcdFx0XHRcdHRleHQ6IGwxMG4uVXBsb2FkUERGLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ3VwbG9hZC1wZGYnLFxuXHRcdFx0XHRcdGNsaWNrOmZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Ly8gZGlzbWlzcywgY29udGludWUgd2l0aCB3cCBkZWZ1YWx0IGJlaGF2aW91clxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSksXG5cdFx0XHRcdG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbih7XG5cdFx0XHRcdFx0dGV4dDogbDEwbi5VcGxvYWRJbWFnZXMsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnYnV0dG9uLXByaW1hcnknLFxuXHRcdFx0XHRcdGNsaWNrOmZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0c2VsZi50cmlnZ2VyKCdjYW5jZWwtdXBsb2FkJyk7XG5cdFx0XHRcdFx0XHRzZWxmLnVwbG9hZEltYWdlcygpO1xuXHRcdFx0XHRcdFx0c2VsZi5jbG9zZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdF0gKTtcblx0XHR9LFxuXHRcdHNldEZpbGU6ZnVuY3Rpb24oIGZpbGUgKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0dGhpcy5maWxlID0gZmlsZTtcblx0XHRcdGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcbi8vXHRcdFx0ICAgIGFycmF5QnVmZmVyID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdFx0c2VsZi5wYXJzZVBERiggZXZlbnQudGFyZ2V0LnJlc3VsdCApO1xuXHRcdFx0fTtcblx0XHRcdGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoIGZpbGUuYmxvYiApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRjbGlja1BhZ2U6ZnVuY3Rpb24oZSkge1xuXHRcdFx0dGhpcy5zaG93UGFnZSgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLXBhZ2UnKSk7XG5cdFx0fSxcblx0XHRyZW5kZXJQYWdlTmF2OmZ1bmN0aW9uKG51bVBhZ2VzKSB7XG5cdFx0XHRjb25zb2xlLmxvZygpXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdGkgPSAxLCBidG5zID0gW10sIGJncnA7XG5cdFx0XHR0aGlzLl9wYWdlcyA9IHt9O1xuXHRcdFx0Zm9yIChpO2k8PW51bVBhZ2VzO2krKykge1xuXHRcdFx0XHR0aGlzLl9wYWdlc1tpXSA9IHtcblx0XHRcdFx0XHRwYWdlOmZhbHNlLFxuXHRcdFx0XHRcdGNhbnZhczpmYWxzZSxcblx0XHRcdFx0XHRzZWxlY3RlZDp0cnVlLFxuXHRcdFx0XHR9XG5cdFx0XHRcdC8qXG5cdFx0XHRcdGJ0bnMucHVzaCggJCgnPGJ1dHRvbj4nK2krJzwvYnV0dG9uPicpLmdldCgwKSApO1xuXHRcdFx0XHQvKi9cblx0XHRcdFx0YnRucy5wdXNoKFxuXHRcdFx0XHRcdG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbih7XG5cdFx0XHRcdFx0XHR0ZXh0OiAnJyxcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2J1dHRvbi1wcmltYXJ5IGRhc2hpY29ucy15ZXMgZGFzaGljb25zJyxcblx0XHRcdFx0XHRcdF9wYWdlOmksXG5cdFx0XHRcdFx0XHRjbGljazpmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi50b2dnbGVQYWdlKHRoaXMub3B0aW9ucy5fcGFnZSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuJGVsLnRvZ2dsZUNsYXNzKCdidXR0b24tcHJpbWFyeScpLm5leHQoJ2J1dHRvbicpLnRvZ2dsZUNsYXNzKCdidXR0b24tcHJpbWFyeScpO1xuXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkucmVuZGVyKClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRidG5zLnB1c2goXG5cdFx0XHRcdFx0bmV3IHdwLm1lZGlhLnZpZXcuQnV0dG9uKHtcblx0XHRcdFx0XHRcdHRleHQ6IGkudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2J1dHRvbi1wcmltYXJ5Jyxcblx0XHRcdFx0XHRcdF9wYWdlOmksXG5cdFx0XHRcdFx0XHRjbGljazpmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5zaG93UGFnZSh0aGlzLm9wdGlvbnMuX3BhZ2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLnJlbmRlcigpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8qL1xuXHRcdFx0fVxuXHRcdFx0YmdycCA9IG5ldyB3cC5tZWRpYS52aWV3LkJ1dHRvbkdyb3VwKHtcblx0XHRcdFx0YnV0dG9uczpidG5zLFxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnBhZ2VuYXYuc2V0KFsgYmdycC5yZW5kZXIoKSBdKTtcblx0XHR9LFxuXHRcdHBhcnNlUERGOmZ1bmN0aW9uKCBhcnIgKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRwZGZqc0xpYi5nZXREb2N1bWVudChhcnIpLnRoZW4oZnVuY3Rpb24ocGRmKSB7XG5cdFx0XHRcdC8vIGJ1aWxkIHBhZ2VzIHNlbGVjdG9yXG5cdFx0XHRcdHNlbGYuX3BkZiA9IHBkZjtcblx0XHRcdFx0c2VsZi5yZW5kZXJQYWdlTmF2KHBkZi5udW1QYWdlcylcblxuXHRcdFx0XHRzZWxmLnNob3dQYWdlKDEpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b2dnbGVQYWdlOmZ1bmN0aW9uKGlkeCkge1xuXHRcdFx0dGhpcy5fcGFnZXNbaWR4XS5zZWxlY3RlZCA9ICEgdGhpcy5fcGFnZXNbaWR4XS5zZWxlY3RlZDtcblx0XHRcdF8uZWFjaCh0aGlzLl9wYWdlcywgZnVuY3Rpb24oZWwsaSl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGksZWwpO1xuXHRcdFx0fSlcblx0XHR9LFxuXHRcdHNob3dQYWdlOmZ1bmN0aW9uKGlkeCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0aWYgKCAhISB0aGlzLl9wYWdlc1tpZHhdLmNhbnZhcyApIHtcblx0XHRcdFx0dGhpcy5jb250ZW50LnNldCggW1xuXHRcdFx0XHRcdG5ldyB3cC5tZWRpYS5WaWV3KHtcblx0XHRcdFx0XHRcdGVsOiB0aGlzLl9wYWdlc1tpZHhdLmNhbnZhcyxcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnJlbmRlclBhZ2UoIGlkeCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRzZWxmLnNob3dQYWdlKGlkeCk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cdFx0cmVuZGVyUGFnZTpmdW5jdGlvbihpZHgsY2IsY2JfYXJncykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0dmFyIHcgPSAxOTIwLCBoPTEwODA7IC8vIHRtcFxuXG5cdFx0XHRzZWxmLl9wZGYuZ2V0UGFnZShpZHgpLnRoZW4oZnVuY3Rpb24ocGFnZSl7XG5cdFx0XHRcdHZhciB2cCA9IHBhZ2UuZ2V0Vmlld3BvcnQoMSksXG5cdFx0XHRcdFx0Y2FudmFzID0gJCgnPGNhbnZhcz48L2NhbnZhcz4nKS5nZXQoMCksXG5cdFx0XHRcdFx0Y3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRcdFx0dnAgPSBwYWdlLmdldFZpZXdwb3J0KCB3IC8gdnAud2lkdGggKTtcblxuXHRcdFx0XHRjYW52YXMud2lkdGggPSB2cC53aWR0aDtcblx0XHRcdFx0Y2FudmFzLmhlaWdodCA9IHZwLmhlaWdodDtcblxuXHRcdFx0XHRwYWdlLnJlbmRlcih7XG5cdFx0XHRcdFx0Y2FudmFzQ29udGV4dDogY3R4LFxuXHRcdFx0XHRcdHZpZXdwb3J0OiB2cCxcblx0XHRcdFx0fSkudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHNlbGYuX3BhZ2VzW2lkeF0ucGFnZSA9IHBhZ2U7XG5cdFx0XHRcdFx0c2VsZi5fcGFnZXNbaWR4XS5jYW52YXMgPSBjYW52YXM7XG5cblx0XHRcdFx0XHQhIWNiICYmIGNiLmFwcGx5KHNlbGYuX3BhZ2VzW2lkeF0sY2JfYXJnc3x8W10pO1xuLy9cdFx0XHRcdFx0c2VsZi5zaG93UGFnZShpZHgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblxuXHRcdHVwbG9hZEltYWdlczpmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0dHlwZSA9ICdpbWFnZS9wbmcnLFxuXHRcdFx0XHR1cGxvYWQgPSBmdW5jdGlvbihuYW1lKXtcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdHRoaXMuY2FudmFzLnRvQmxvYihmdW5jdGlvbihibG9iKXtcblx0XHRcdFx0XHRcdGJsb2IubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHRibG9iLnR5cGUgPSB0eXBlO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYmxvYi5uYW1lKVxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coc2VsZi5vcHRpb25zLnVwbG9hZGVyLGJsb2IpXG5cdFx0XHRcdFx0XHRzZWxmLm9wdGlvbnMudXBsb2FkZXIuYWRkRmlsZSggYmxvYiwgbmFtZSApO1xuXHRcdFx0XHRcdH0sdHlwZSk7XG5cdFx0XHRcdFx0LyovXG5cdFx0XHRcdFx0dmFyIGltZyA9IG5ldyBvLkltYWdlKCk7XG5cdFx0XHRcdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aW1nLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0aW1nLnR5cGUgPSB0eXBlO1xuXHRcdFx0XHRcdFx0c2VsZi5vcHRpb25zLnVwbG9hZGVyLmFkZEZpbGUoIGltZy5nZXRBc0Jsb2IoKSwgbmFtZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbWcubG9hZCggdGhpcy5jYW52YXMudG9EYXRhVVJMKHR5cGUpICk7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKGltZyk7XG5cdFx0XHRcdH07XG5cblx0XHRcdC8vIGNyZWF0ZSBlIG5ldyBtZWRpYSBtb2RlbCBmcm9tIGJsb2IgZGF0YSBVUkwgdGhpbmd5XG5cdFx0XHRfLmVhY2godGhpcy5fcGFnZXMsZnVuY3Rpb24oIHBnLCBpICl7XG5cdFx0XHRcdHZhciBuYW1lID0gc2VsZi5maWxlLmZpbGUubmFtZS5yZXBsYWNlKC9cXC5bYS16MC05XSskLywnJykgKyAnLXAnICsgaSArICcucG5nJztcblx0XHRcdFx0aWYgKCAhIHBnLmNhbnZhcyApIHtcblx0XHRcdFx0XHQvLyBuZWVkcyByZW5kZXJpbmdcblx0XHRcdFx0XHRzZWxmLnJlbmRlclBhZ2UoaSoxLCB1cGxvYWQsW25hbWVdKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR1cGxvYWQuYXBwbHkocGcpXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cblx0XHRcdC8vXG5cdFx0fVxuXHR9KTtcblxuXG5cdF8uZXh0ZW5kKCB3cC5tZWRpYS52aWV3LlVwbG9hZGVyV2luZG93LnByb3RvdHlwZSwge1xuXHRcdF9wYXJlbnRSZWFkeTogd3AubWVkaWEudmlldy5VcGxvYWRlcldpbmRvdy5wcm90b3R5cGUucmVhZHksXG5cdFx0ZGlkUmVhZHk6ZmFsc2UsXG5cblx0XHRyZWFkeTpmdW5jdGlvbigpIHtcblx0XHRcdHZhciBwZGZzID0gW10sXG5cdFx0XHRcdHBkZk1vZGFsLCBzZWxmID0gdGhpcztcblxuXHRcdFx0Ly8gcHJldmVudCBkb3VibGUgaW5pdFxuXHRcdFx0aWYgKCB0aGlzLmRpZFJlYWR5ICkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcGFyZW50UmVhZHkuYXBwbHkoIHRoaXMgLCBhcmd1bWVudHMgKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZGlkUmVhZHkgPSB0cnVlO1xuXG5cdFx0XHRyZXQgPSB0aGlzLl9wYXJlbnRSZWFkeS5hcHBseSggdGhpcyAsIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRmdW5jdGlvbiBwZGZQb3B1cCggdXBsb2FkZXIgKSB7XG5cdFx0XHRcdHZhciBmaWxlSXRlbSwgc3JjO1xuXHRcdFx0XHRpZiAoIHBkZk1vZGFsICkge1xuXHRcdFx0XHRcdHBkZk1vZGFsLmNsb3NlKCkuZGlzcG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggISEgcGRmcy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0ZmlsZUl0ZW0gPSBwZGZzLnNoaWZ0KCk7XG5cdFx0XHRcdFx0cGRmTW9kYWwgPSBuZXcgcGRmUmVuZGVyZXIudmlldy5QREZGcmFtZSgge1xuXHRcdFx0XHRcdFx0Y29udHJvbGxlcjogJCh0aGlzKSxcblx0XHRcdFx0XHRcdHVwbG9hZGVyOnVwbG9hZGVyLFxuXHRcdFx0XHRcdFx0dGl0bGU6bDEwbi5VcGxvYWQgKyAnOiAnICsgZmlsZUl0ZW0uZmlsZS5uYW1lLnJlcGxhY2UoL1xcLlthLXowLTldKyQvLCcnKSxcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0cGRmTW9kYWwub24oJ3Byb2NlZWQnLGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Ly8gbmV4dFxuXHRcdFx0XHRcdFx0cGRmUG9wdXAoIHVwbG9hZGVyICk7XG5cblx0XHRcdFx0XHR9KS5vbignY2FuY2VsLXVwbG9hZCcsZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmaWxlSXRlbS5maWxlLmF0dGFjaG1lbnQuZGVzdHJveSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHBkZk1vZGFsLnNldEZpbGUoIGZpbGVJdGVtICk7XG5cdFx0XHRcdFx0cGRmTW9kYWwub3BlbigpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHVwbG9hZGVyLnN0YXJ0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYWRkUERGKCBmaWxlRGF0YSwgdXBsb2FkZXIgKSB7XG5cblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKlx0QHJldHVybiBuYXRpdmUgZmlsZSBvYmplY3Qgb3IgYmxvYlxuXHRcdFx0ICovXG5cdFx0XHRmdW5jdGlvbiByZXNvbHZlRmlsZSggZmlsZSApIHtcblx0XHRcdFx0dmFyIF9yZXQgPSB7XG5cdFx0XHRcdFx0ZmlsZTogZmlsZSxcblx0XHRcdFx0XHRibG9iOmZpbGUuZ2V0TmF0aXZlKClcblx0XHRcdFx0fSwgX3JldDIsIGJ5dGVzLCBpO1xuXHRcdFx0XHRpZiAoICEgX3JldC5ibG9iICkge1xuXHRcdFx0XHRcdF9yZXQuYmxvYiA9IGZpbGUuZ2V0U291cmNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIF9yZXQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHN0b3AgdXBsb2FkZXIgYW5kIGdlbmVyYXRlIGNyb3BkYXRhXG5cdFx0XHR0aGlzLnVwbG9hZGVyLnVwbG9hZGVyLmJpbmQoJ0ZpbGVzQWRkZWQnLGZ1bmN0aW9uKCB1cCwgZmlsZXMgKSB7XG5cdFx0XHRcdHZhciBmaWxlRGF0YTtcblx0XHRcdFx0Ly8gcHV0IG1vZGFsXG5cdFx0XHRcdGZvciAodmFyIGk9MDtpPGZpbGVzLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0XHRpZiAoIGZpbGVzW2ldLnR5cGUgPT0gJ2FwcGxpY2F0aW9uL3BkZicpIHtcblx0XHRcdFx0XHRcdGZpbGVEYXRhID0gcmVzb2x2ZUZpbGUoIGZpbGVzW2ldICk7XG5cdFx0XHRcdFx0XHRpZiAoIGZpbGVEYXRhLmJsb2IgaW5zdGFuY2VvZiBCbG9iICkge1xuXHRcdFx0XHRcdFx0XHRwZGZzLnB1c2goIGZpbGVEYXRhICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggcGRmcy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0dXAuc3RvcCgpO1xuXHRcdFx0XHRcdHVwLnJlZnJlc2goKTtcblx0XHRcdFx0XHRwZGZQb3B1cCggdXAgKTsgLy8gd2lsbCBhc2sgZm9yIGZvY3VzIG9yIHN0YXJ0IHVwbG9hZGVyXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Ly8gc2VuZCBjcm9wZGF0YVxuXHRcdFx0dGhpcy51cGxvYWRlci51cGxvYWRlci5iaW5kKCdCZWZvcmVVcGxvYWQnLGZ1bmN0aW9uKCB1cCwgZmlsZSApIHtcblx0XHRcdFx0dmFyIHMsIGNyb3BkYXRhLCBmb2N1c3BvaW50O1xuXHRcdFx0XHQvLyBkbyBzb21ldGhpbmcgd2l0aCBmaWxlcyBiZWZvcmUgdXBsb2FkLi4uXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9KTtcblxufSkoIGpRdWVyeSwgcGRmX3JlbmRlcmVyLCBtT3hpZSApO1xuIl19
