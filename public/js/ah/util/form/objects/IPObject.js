define(['dojo/_base/declare','dojo/_base/lang','ah/util/form/objects/ObjectBase', 'ah/util/form/objects/IPObjectForm'],
	function(declare, lang, ObjectBase, IPObjectForm){

	var ipList = [];

	return declare('ah/util/form/objects/IPObject',[ObjectBase],{

		titles : {
			'ip-address-profile' : 'IP Address',
			'host-name-profile' : 'Host Name',
			'ip-range-profile' : 'IP Range',
			'subnet-profile' : 'Network'
		},

		deleteMsg : 'Delete IP object successfully.',

		postCreate : function(){
			this.inherited(arguments);

			//this._index = ipList.push(this) - 1;
			ipList.push(this);
		},

		_createForm: function(cfg) {
			var obj = new IPObjectForm(cfg);

			obj.on('cancel', lang.hitch(this, function() {
				if(this.removeMed && this.parentWgt){
					this.parentWgt[this.removeMed]();
				}else{
					this.onRemoveForm(obj);
				}
			}));

			obj.on('dealData', lang.hitch(this, function(data) {
				this.syncObj(data);
			}));
			return obj;
		},

		syncObj : function(obj){
			this.refresh(ipList, obj);
		},

		destroy : function(){
			this.inherited(arguments);

			ipList.forEach(function(obj, i){
				if(obj._destroyed) ipList.splice(i, 1);
			});
			//ipList.splice(this._index,1);
		}

	});
});

