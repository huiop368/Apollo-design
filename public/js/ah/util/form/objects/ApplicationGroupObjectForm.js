define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/text!./templates/ApplicationGroupObjectForm.html',
	"ah/app/DataMgr",
	'ah/config/validateRules',
	'ah/util/form/objects/ObjectFormBase'
], function (
	declare, lang, template, DataMgr, rules, ObjectFormBase
) {
	return declare('ah/util/form/objects/ApplicationGroupObjectForm', [ObjectFormBase], {
		templateString: template,
		validateRules: rules.util.applicationGroup,

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
			this.txtGroupNameNode.value = data.name || '';
		},

		_handleSave: function () {
			if (!this.$valid()) {
				return false;
			}

			var data = this.getData();
			var isAdd = this.data && this.data.jsonType;
			var method = isAdd ? '$put' : '$post';
			var saveUrl = 'services/config/common/applicationservicecategories';

			if (method === '$put') {
				saveUrl += '/' + this.data.id;
			}

			this[method](saveUrl, data, this._handleSucc);
		},

		_handleSucc: function (resp) {

			// may be not need go back just show the message
			this._handleCancel();
			this.onDealData(resp.data);
			this.showMsg('success', 'Save application group object successfully.');
		},

		getData: function () {
			var result = {
				ownerId: DataMgr.ownerId,
				predefined: false,
				jsonType: 'application-service-category',
				name: lang.trim(this.txtGroupNameNode.value),
				description: ''
			};

			var data = this.data;
			data && this.attachId(data, result);

			return result;
		},

		onDealData: function() {}
	});
});
