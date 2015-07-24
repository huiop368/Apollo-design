define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'ah/util/form/objects/ObjectBase',
	'ah/util/form/objects/VLANGroupObjectForm'
], function (
	declare, lang, ObjectBase, VLANGroupObjectForm
) {
	var vlanGroupList = [];

	return declare('ah/util/form/objects/VLANGroupObject', [ObjectBase], {
		titles: {
			'vlan-group-profile': 'VLAN Group'
		},

		deleteMsg: 'Delete VLAN Group object successfully.',

		postCreate: function () {
			this.inherited(arguments);
			vlanGroupList.push(this);
		},

		_createForm: function(cfg) {
			var obj = new VLANGroupObjectForm(cfg);

			obj.on('cancel', lang.hitch(this, function() {
				this.parentWgt[this.removeMed]();
			}));

			obj.on('dealData', lang.hitch(this, function(data) {
				this.syncObj(data);
			}));

			return obj;
		},

		syncObj: function (obj) {
			this.refresh(vlanGroupList, obj);
		},

		destroy: function () {
			this.inherited(arguments);

			var index = vlanGroupList.indexOf(this);
			if (index !== -1) {
				vlanGroupList.splice(index, 1);
			}
		}
	});
});
