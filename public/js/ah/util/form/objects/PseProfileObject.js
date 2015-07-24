define(['dojo/_base/declare','dojo/_base/lang','ah/util/form/objects/ObjectBase', 'ah/util/form/objects/PseProfileObjectForm'],
	function(declare, lang, ObjectBase, PseProfileObjectForm){

	var pseList = [];

	return declare('ah/util/form/objects/PseProfileObject',[ObjectBase],{

		titles : {
			'pse-profile' : 'PSE Profile'
		},

		postCreate : function(){
			this.inherited(arguments);
			pseList.push(this);
		},

		_createForm: function(cfg) {
			var pseObjectForm = new PseProfileObjectForm(cfg);

			pseObjectForm.on('dealData', lang.hitch(this, function(data,f) {
				data.editMode = f;
				this.refresh(pseList, data);
				this.onClickItem(data);
			}));
			pseObjectForm.on('cancel', lang.hitch(this, function(data) {
				if (this.removeMed && this.parentWgt) {
					this.parentWgt[this.removeMed]();
				} else {
					this.onRemoveForm(data || pseObjectForm);
				}
			}));
			pseObjectForm.on('addChild', lang.hitch(this, function(data) {
				this.onAddForm(data);
			}));

			return pseObjectForm;
		},

		syncObj : function(obj){
			this.refresh(pseList, obj);
		},

		syncAfterRemoveList : function(data,obj){
			this.syncAllObject(pseList,obj,data);
		},

		destroy : function(){
			this.inherited(arguments);

			pseList.forEach(function(obj, i){
				if(obj._destroyed) pseList.splice(i, 1);
			});
		}

	});
});

