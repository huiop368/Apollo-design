define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/string',
	'dojo/json',

	'dojo/text!./templates/BonjourServiceObjectForm.html',
	"ah/app/DataMgr",
	'ah/config/validateRules',
	'ah/util/form/objects/ObjectFormBase'
], function (
	declare, lang, string, JSON,
	template, DataMgr,
	rules, ObjectFormBase
) {
	return declare('ah/util/form/objects/BonjourServiceObjectForm', [ObjectFormBase], {
		templateString: template,
		validateRules: rules.util.bonjourService,

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
			this.typeNode.value = data.type || '';
		},

		_handleSave: function () {
			if (!this.$valid()) {
				return false;
			}

			var data = this.getData();
			var isAdd = this.data && this.data.jsonType;
			var method = isAdd ? '$put' : '$post';
			var saveUrl = 'services/config/common/bonjourservices';

			if (method === '$put') {
				saveUrl += '/' + this.data.id;
			}

			this[method](saveUrl, data, this._handleSucc);
		},

		_handleSucc: function (resp) {

			// may be not need go back just show the message
			this._handleCancel();
			this.onDealData(resp.data);
			this.showMsg('success', 'Save bonjour service object successfully.');
		},

		getData: function () {
			var result = {
				ownerId: DataMgr.ownerId,
				predefined: false,
				jsonType: 'bonjour-service',
				description: '',
				name: string.trim(this.nameNode.value),
				type: this.typeNode.value
			};

			var data = this.data;
			data && this.attachId(data, result);

			return result;
		},

		onDealData: function(){}
	});
});
