define(['dojo/_base/declare',
	'ah/util/form/objects/ObjectFormBase',
	"dojo/text!./templates/PseProfileObjectForm.html",
	'dojo/on',
	'dojo/_base/lang',
	"dojo/_base/array",
	'ah/app/DataMgr',
	"ah/config/gridStructure",
	"dojo/dom-class",
	"ah/config/validateRules",
	"dojo/i18n!i18n/util/form/objects/nls/PseProfileObjectForm"
], function(declare, ObjectFormBase, template, on, lang, array, DataMgr, Structure, domClass, Rules, messages) {

	return declare('ah/util/form/objects/PseProfileObjectForm', [ObjectFormBase], {

		templateString: template,

		i18n: messages,

		validateRules: Rules.config.pseprofile,

		events: [
			['cancelBtn', 'click', '_handleCancel'],
			['saveBtn', 'click', '_handleSave'],
			['powerMode.domNode', 'change', '_togglePowerMode']
		],

		postCreate: function() {
			this.inherited(arguments);
			this._parseData();
		},

		_parseData: function() {
			var data = this.data;
			if (!data) {
				return;
			}

			data.name = typeof data.name != 'undefined' ? data.name : '';
			data.powerLimit = typeof data.powerLimit != 'undefined' ? data.powerLimit : '15400';
			data.description = typeof data.description != 'undefined' ? data.description : '';

			this._restoreData(data);
		},


		_togglePowerMode: function () {
			var target = this.powerMode.domNode;

			switch (target.value) {
			case '_8023AF':
				this.powerLimit.value = '15400';
				break;
			case '_8023AT':
				this.powerLimit.value = '32000';
				break;
			}
		},

		_restoreData: function(data) {
			this.nameEl.value = data.name;
			this.powerMode.domNode.value = data.powerMode;
			dojo.publish('liszt:updated', this.powerMode.domNode);
			this.powerLimit.value = data.powerLimit;
			this.priority.domNode.value = data.priority;
			dojo.publish('liszt:updated', this.priority.domNode);
			this.description.value = data.description;			
		},

		_handleSave: function(e) {
			var f = this.data && this.data.jsonType,
				method = f ? '$put' : '$post';

			if (!this.$valid()) {
				return;
			}

			var url = "services/config/common/pseprofiles" + (f ? '/' + this.data.id : '') + '?vocoLevel=10';

			this[method](url,this.getData(),this._handleData);
		},

		_handleData: function(data) {
			var f = this.data && this.data.jsonType;

			this._handleCancel();
			this.onDealData(data.data,f);
			this.msgSucc(this.i18n.saveSuccess);
		},

		getData: function() {

			var json = {
				jsonType: "pse-profile",
				ownerId: DataMgr.ownerId,
				predefined: false,
				name: this.nameEl.value,
				powerMode: this.powerMode.domNode.value,
				powerLimit: this.powerLimit.value,
				priority: this.priority.domNode.value,
				description: this.description.value
			};

			json = this.attachId(this.data, json);

			return json;
		},

		onDealData: function() {},
		onAddChild: function() {}

	});

})
