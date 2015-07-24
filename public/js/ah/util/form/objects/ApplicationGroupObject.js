define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'ah/util/form/objects/ObjectBase',
	'ah/util/form/objects/ApplicationGroupObjectForm'
], function (
	declare, lang, ObjectBase, ApplicationGroupObjectForm
) {
	var bsList = [];

	return declare('ah/util/form/objects/ApplicationGroupObject', [ObjectBase], {
		titles: {
			'application-service-category': 'Application Group',
		},

		deleteMsg: 'Delete application group object successfully.',

		postCreate: function () {
			this.inherited(arguments);
			bsList.push(this);
		},

		_createForm: function (cfg) {
			var obj = new ApplicationGroupObjectForm(cfg);

			obj.on('cancel', lang.hitch(this, function() {
				this.parentWgt[this.removeMed]();
			}));

			obj.on('dealData', lang.hitch(this, function(data) {
				this.syncObj(data);
			}));

			return obj;
		},

		syncObj: function (obj) {
			this.refresh(bsList, obj);
		},

		destroy: function () {
			this.inherited(arguments);

			var index = bsList.indexOf(this);
			if (index !== -1) {
				bsList.splice(index, 1);
			}
		}
	});
});
