define(['dojo/_base/declare','dojo/_base/lang','ah/util/form/objects/ObjectBase', 'ah/comp/configuration/cwp/CreateCWP'],
	function(declare, lang, ObjectBase, CreateCWP){

	return declare('ah/util/form/objects/CWPObject',[ObjectBase],{

		titles : {
			'cwp-profile' : 'CWP Profile'
		},

		deleteMsg : 'Delete CWP object successfully.',

		_createForm : function(cfg){
			var obj = new CreateCWP(cfg);

			obj.on('cancel', lang.hitch(this, function() {
				this.parentWgt[this.removeMed]();
			}));

			return obj;
		}

	});
});
