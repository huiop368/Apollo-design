define(['dojo/_base/declare','ah/util/common/ModuleBase','dojo/on','dojo/_base/lang','ah/app/DataMgr',"dojo/dom-class", 'dojo/dom-construct'],
	function(declare,ModuleBase,on,lang, DataMgr, domClass, domCon){

		return declare('ah/util/form/objects/ObjectFormBase',[ModuleBase],{

			postMixInProperties : function(){

				this.showMsg = this.dialog ? lang.hitch(this,function(type, message){
									this.dialog.showMsg(type, message);
								}) : this.staMsg;
			},

			_setTypeAttr : function(type){
				this.__toggle(type);
				this._set('type',type);
			},

			_setBTitleAttr : function(b){
				var div;

				this.titleEl.style.display = b ? '' : 'none';

				if(b){
					div = document.createElement('div');
					div.className = 'btn-area btn-mir';
					div.appendChild(this.btnArea);
					this.btnArea.className = 'btn-area-inner';

					this.domNode.appendChild(div);
				}
			},

			_setModeAttr : function(mode){
				if(mode !== 'dialog') return;

				var div = document.createElement('div');

				domCon.place(div, this.domNode, 'before');

				div.appendChild(this.domNode);

				domClass.add(this.domNode, 'ui-dialog-content');

				div.appendChild(this.btnArea);

				this.btnArea.className = 'ui-dialog-bottom clearfix';

				this.saveBtn.style['float'] = 'right';

				this.domNode = div;

			},

			_handleCancel : function(){
				this.destroy();
				//this.parentWgt[this.removeMed]();
				this.onCancel();
			},

			_handleToggle : function(e){
				this.set('type',e.target.value)
			},

			__toggle : function(val){
				var i,dd;

				if(!this.toggleMap) return;

				for( i in this.toggleMap ){
					dd = this.toggleMap[i];
					this[dd].style.display = i == val ? '' : 'none';
				}

			},

			attachId : function(data,json){
				if(data && !json.id){
					data.id && (json.id = data.id);
					data.createdAt && (json.createdAt = data.createdAt);
					data.updatedAt && (json.updatedAt = data.updatedAt);
				}

				return json;
			},

			// interfacement
			getData : function(){
				return {};
			},

			onCancel: function(){}

		});

})
