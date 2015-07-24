define(['dojo/_base/declare','dojo/_base/lang','ah/util/form/objects/ObjectBase', 'ah/util/form/objects/MACObjectForm'],
	function(declare, lang, ObjectBase, MACObjectForm){

	var macList = [];
	
	return declare('ah/util/form/objects/MACObject',[ObjectBase],{

		titles : {
			'mac-address-profile' : 'MAC Address',
			'mac-range-profile' : 'MAC Range',
			'mac-oui-profile' : 'MAC Oui'
		},

		deleteMsg : 'Delete MAC object successfully.',

		postCreate : function(){
			this.inherited(arguments);

			//this._index = macList.push(this) - 1;
			macList.push(this);
		},

		_createForm : function(cfg){
			var macObj = new MACObjectForm(cfg);

			macObj.on('cancel', lang.hitch(this, function() {
				if(this.removeMed && this.parentWgt){
					this.parentWgt[this.removeMed]();
				}else{
					this.onRemoveForm(macObj);
				}
			}));

			macObj.on('dealData', lang.hitch(this, function(data) {
				this.syncObj(data);
			}));

			return macObj;
		},

		syncObj : function(obj){
			this.refresh(macList, obj);   
		},

		destroy : function(){
			this.inherited(arguments);

			macList.forEach(function(obj, i){
				if(obj._destroyed) macList.splice(i, 1);
			});
			//macList.splice(this._index,1);
		}

	});
});

