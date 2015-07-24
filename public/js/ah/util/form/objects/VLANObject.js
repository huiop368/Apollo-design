define(['dojo/_base/declare','dojo/_base/lang','ah/util/form/objects/ObjectBase', 'ah/util/form/objects/VLANObjectForm'],
	function(declare, lang, ObjectBase, VLANObjectForm){

	var vlanList = [];

	return declare('ah/util/form/objects/VLANObject',[ObjectBase],{

		titles : {
			'vlan-profile' : 'VLAN'
		},

		postCreate : function(){
			this.inherited(arguments);
			vlanList.push(this);
		},

		_createForm: function(cfg) {
			var vlanObjectForm = new VLANObjectForm(cfg);

			vlanObjectForm.on('dealData', lang.hitch(this, function(data) {
				this.refresh(vlanList, data);
			}));
			vlanObjectForm.on('cancel', lang.hitch(this, function(data) {
				if (this.removeMed && this.parentWgt) {
					this.parentWgt[this.removeMed]();
				} else {
					this.onRemoveForm(data || vlanObjectForm);
				}
			}));
			vlanObjectForm.on('addChild', lang.hitch(this, function(data) {
				this.onAddForm(data);
			}));

			return vlanObjectForm;
		},

		syncObj : function(obj){
			this.refresh(vlanList, obj);
		},

		destroy : function(){
			this.inherited(arguments);

			vlanList.forEach(function(obj, i){
				if(obj._destroyed) vlanList.splice(i, 1);
			});
		}

	});
});

