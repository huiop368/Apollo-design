define(['dojo/_base/declare',
	'ah/util/form/objects/ObjectFormBase',
	"dojo/text!./templates/VLANObjectForm.html",
	'dojo/on',
	'dojo/_base/lang',
	"dojo/_base/array",
	'ah/app/DataMgr',
	"ah/config/gridStructure",
	"dojo/dom-class",
	"ah/config/validateRules",
	"ah/comp/configuration/assignment/AssignmentRule",
	"ah/comp/configuration/assignment/SelectAssignRuleCopy",
	"dojo/i18n!i18n/util/form/objects/nls/VLANObjectForm"
], function(declare, ObjectFormBase, template, on, lang, array, DataMgr, Structure, domClass, Rules, AssignmentRule, SelectAssignRuleCopy, messages) {

	var vlanGridFlags = [];

	return declare('ah/util/form/objects/VLANObjectForm', [ObjectFormBase], {

		templateString: template,

		i18n: messages,

		validateRules: Rules.config.vlan,

		events: [
			['cancelBtn', 'click', '_handleCancel'],
			['saveBtn', 'click', '_handleSave'],
			['addToVlan', 'click', '_addVlanItem'],
			['vlanRuleButton', 'click', function() {
				this.vlanGrid.resize();
			}],
			['vlanGrid.grid', 'RowClick', '_handleGridClick']
		],

		postMixInProperties: function() {
			this.__structure = Structure.config.vlanRuleList(vlanGridFlags);
		},

		postCreate: function() {
			this.inherited(arguments);
			this._parseData();
		},

		_parseData: function() {
			var data = this.data;
			if (!data) {
				return;
			}
			data.name = data.name || '';
			data.defVlanId = data.defVlanId || '';
			this._restoreData(data);
		},

		_restoreData: function(data) {
			this.nameEl.value = data.name;
			this.defaultVlanId.value = data.defVlanId;
			this.classifiedEntries = data.classifiedEntries;

			this.vlanGrid.refresh(data.classifiedEntries || []);

			this.$emit(this.vlanRuleButton, 'click', data.enableClassification);
		},

		_handleSave: function(e) {
			var f = this.data && this.data.jsonType,
				method = f ? 'put' : 'post';

			if (!this.$valid()) {
				return;
			}

			if (this.vlanRuleButton.checked && !this.vlanGrid.getGridData().length) {
				this.msgErr(messages.needVlan);
				return;
			}

			if (this.vlanRuleButton.checked && !this._ruleValid()) {
				this.msgErr(messages.needRule);
				return;
			}

			DataMgr[method]({
				url: "services/config/common/vlanprofiles" + (f ? '/' + this.data.id : '') + '?vocoLevel=5',
				data: this.getData(),
				callbackFn: lang.hitch(this, this._handleData)
			});
		},

		_handleData: function(data) {
			this._handleCancel();
			this.onDealData(data.data);
			this.msgSucc(this.i18n.saveSuccess);
		},

		getData: function() {
			var enableClassification = this.vlanRuleButton.checked,
				classifiedEntries = enableClassification ? this.vlanGrid.getPureData() : [];

			var json = {
				name: this.nameEl.value,
				defVlanId: this.defaultVlanId.value,
				jsonType: "vlan-profile",
				ownerId: DataMgr.ownerId,
				predefined: false,
				enableClassification: enableClassification,
				classifiedEntries: classifiedEntries
			};

			json = this.attachId(this.data, json);

			return json;
		},

		_addVlanItem: function() {
			if (!this.validator.checkElement(this.vlanId)) {
				return;
			}

			var vlanObj, gridData = this.vlanGrid.getPureData(),
				vlanId = this.vlanId.value,
				isExitsVlan = array.some(gridData, function(item, index) {
					return item.vlanId == vlanId;
				});

			if (isExitsVlan) {
				this.msgErr(messages.diffVlan);
				return;
			}

			vlanObj = {
				vlanId: vlanId,
				ownerId: DataMgr.ownerId,
				predefined: false,
				classAsgn: {
					jsonType: 'classification-assignment',
					ownerId: DataMgr.ownerId,
					name: '',
					description: '',
					predefined: false,
					classifications: []
				}
			};

			this.vlanGrid.add(vlanObj);
			this.$toggleWipe(this.addNewVlan);
			this.vlanId.value = '';
		},

		_handleGridClick: function(e) {
			e.preventDefault();
			var ruleObj, target = e.target,
				index = e.rowIndex,
				data = e.grid.getItem(index);

			if (domClass.contains(target, 'J-add-rule')) {
				ruleObj = this.toRecover('assignRule', new AssignmentRule({
					pageTitle: 'Assignment Rule'
				}));

				ruleObj.on('cancel', lang.hitch(this, function(item) {
					this.onCancel(item);
				}));

				ruleObj.on('dealData', lang.hitch(this, function(item) {
					this.vlanGrid.setValue(data, 'classAsgn', item);
				}));

				this.onAddChild(ruleObj);
			} else if (domClass.contains(target, 'J-edit-rule')) {
				ruleObj = this.toRecover('assignRule', new AssignmentRule({
					pageTitle: 'Assignment Rule',
					data: data.classAsgn
				}));

				ruleObj.on('cancel', lang.hitch(this, function(item) {
					this.onCancel(item);
				}));

				ruleObj.on('dealData', lang.hitch(this, function(item) {
					this.vlanGrid.setValue(data, 'classAsgn', item);
				}));

				this.onAddChild(ruleObj);
			} else if (domClass.contains(target, 'J-select-rule')) {
				var rule = new SelectAssignRuleCopy({
					parent: this,
					selected: data.classAsgn,
					gridData: this.vlanGrid.getGridData()
				});

				rule.on('dealData', lang.hitch(this, function(item) {
					this.vlanGrid.setValue(data, 'classAsgn', item);
				}));

				this.$pop({
					style: "width: 680px",
					title: 'Select Assignment Rules'
				}, rule);
			} else if (domClass.contains(target, 'J-triggerAssignDetails')) {
				var contents = target.innerHTML;
				var tblRules = this.$query('.J-tblRules', target.parentNode)[0];
				if (!tblRules) return;

				if (this.$isHidden(tblRules)) {
					vlanGridFlags[index] = true;
					this.vlanGrid.resize();

					this.defer(function() {
						// query `tblRules` agagin because the old `tblRules` has been replaced
						tblRules = this.$query('.J-tblRules', this.vlanGrid.domNode)[index];
						tblRules.style.display = 'none';
						this.$wipeIn(tblRules);
					}, 0);
				} else {
					this.$wipeOut(tblRules, {
						onEnd: lang.hitch(this, function() {
							vlanGridFlags[index] = false;
							this.vlanGrid.resize();
						})
					});
				}
			}
		},

		_ruleValid: function() {
			var gridData = this.vlanGrid.getPureData();

			return array.every(gridData, function(item) {
				return !!item.classAsgn.classifications.length;
			});
		},

		onDealData: function() {},
		onAddChild: function() {}

	});

})
