define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/json',

	'dojo/text!./templates/VLANGroupObjectForm.html',
	"ah/app/DataMgr",
	'ah/config/validateRules',
	'ah/util/form/objects/ObjectFormBase'
], function (
	declare, lang, JSON,
	template, DataMgr,
	rules, ObjectFormBase
) {
	return declare('ah/util/form/objects/VLANGroupObjectForm', [ObjectFormBase], {
		templateString: template,
		validateRules: rules.util.vlanGroup,

		events: [
			['cancelBtn', 'click', '_handleCancel'],
			['saveBtn', 'click', '_handleSave']
		],

		postCreate: function () {
			this.inherited(arguments);
			this.restoreData();
		},

		restoreData: function () {
			var data = this.data || {};

			this.nameNode.value = data.name || '';
			this.vlansNode.value = data.vlans || '';
			this.descriptionNode.value = data.description || '';
		},

		_handleSave: function () {
			if (!this.$valid()) {
				return false;
			}

			var data = this.getData();
			var isAdd = this.data && this.data.jsonType;
			var method = isAdd ? '$put' : '$post';
			var saveUrl = 'services/config/common/vlangroupprofiles';

			if (method === '$put') {
				saveUrl += '/' + this.data.id;
			}

			return this[method](saveUrl, data, this._handleSucc);
		},

		_handleSucc: function (resp) {

			// may be not need go back just show the message
			this._handleCancel();
			this.onDealData(resp.data);
			this.showMsg('success', 'Save VLAN Group object successfully.');
		},

		getData: function () {
			var result = {
				ownerId: DataMgr.ownerId,
				predefined: false,
				jsonType: 'vlan-group-profile',
				name: this.nameNode.value,
				vlans: this.vlansNode.value,
				description: this.descriptionNode.value
			};

			var data = this.data;
			data && this.attachId(data, result);

			return result;
		},

		onDealData: function() {}
	});
});
