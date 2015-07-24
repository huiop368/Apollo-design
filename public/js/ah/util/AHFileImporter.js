define([
		'dojo/_base/declare',
		"dojo/query",
		"dojo/on",
		"ah/AHWidget",
		"dojo/text!./templates/AHFileImporter.html",
		"ah/app/DataMgr",
		"dojox/form/Uploader"
		],function(declare, query, on, AHWidget, template, DataMgr, Uploader){

		return declare('ah/AHFileImporter',[ AHWidget ],{

			'class': 'AHFileImporter',
			cssFile: 'ah/AHFileImporter',
			templateString : template,
			uploader: null,

			uploadUrl: "services/config/auth/cwpfiles/shared/",
			deleteUrl: "services/config/auth/cwpfiles/shared/",
			listUrl: "services/config/auth/cwpfiles/shared",

			events: [
				['backgroundContainer', 'click', function(event) { event.preventDefault(); event.stopPropagation(); }],
				['backgroundContainer', 'scroll', function(event) { event.preventDefault(); event.stopPropagation(); }],
				['closeButton', 'click', function(event) { this.destroy(); }]
			],

			_addFilesToList: function(files) {
				var li, i, frag, del;
				if(files instanceof Array) {
					frag = document.createDocumentFragment();
					for(i = 0; i < files.length; i++) {
						li = document.createElement('li');
						del = document.createElement('span');
						del.setAttribute('class', 'delete');
						li.setAttribute('data-name', files[i]);
						li.innerText = files[i];
						li.appendChild(del);
						frag.appendChild(li);
					}
					this.uploadedFileList.appendChild(frag);
				} else {
					li = document.createElement('li');
					del = document.createElement('span');
					del.setAttribute('class', 'delete');
					li.innerText = files;
					li.setAttribute('data-name', file);
					li.appendChild(del);
					this.uploadedFileList.appendChild(li);
				}
			},

			startup: function() {
				this.inherited(arguments);
				this.initUploader();
				this.fetchSavedFiles();
				document.body.appendChild(this.domNode);
			},

			initUploader: function() {
				this.uploader = new Uploader({
				    label: "Choose",
				    name : 'file'
				});
				this.uploader.addDropTarget(this.dropTarget);
				this.uploader.placeAt(this.fileUpload);

				this.addEvents([
					[this.uploader, 'change', 'uploadFile'],
					[this.uploader, 'complete', 'uploadComplete'],
					[this.dropTarget, 'dragover', 'fileDrag'],
					[this.dropTarget, 'dragleave', 'fileDrag'],
					[this.uploadedFileList, 'li:click', 'selectFile'],
					[this.uploadedFileList, '.delete:click', 'deleteFile']
				]);

			},

			selectFile: function(event) {
				// select file
				event.stopPropagation();
				event.preventDefault();
				if(event.target.nodeName.toUpperCase() == "LI") {
					on.emit(this, 'select', {
						fileName: event.target.getAttribute('data-name')
					});
				}
			},

			deleteFile: function(event) {
				// delete file
				event.stopPropagation();
				event.stopImmediatePropagation();
				event.preventDefault();

				var item = event.target.parentElement,
					fileName = event.target.parentElement.getAttribute('data-name');

				if(confirm('Are you sure you want to delete '+fileName+'?')) {
					DataMgr.del({
						requestURL: this.deleteUrl+fileName,
						callbackFn: function(data) {
							item.remove();
						}
					});
				}
			},


			fileDrag: function(event) {
				event.stopPropagation();
				event.preventDefault();
				event.type == "dragover" ? query(this.dropTarget).addClass('dragover') : query(this.dropTarget).removeClass('dragover');
			},

			uploadComplete: function(event) {
				this.fetchSavedFiles();
			},

			uploadFile: function(event) {
				this.uploader.url = this.uploadUrl+event[0].name+'?ownerId='+DataMgr.ownerId;
				this.uploader.upload({
					fileName: event[0].name
				});

			},

			fetchSavedFiles: function() {
				DataMgr.makeGetRequest({
					requestURL: this.listUrl,
					callbackFn: "displayFiles",
					parent: this
				});
			},

			displayFiles: function(data) {
				this._addFilesToList(data.data);
			}
		});
});
