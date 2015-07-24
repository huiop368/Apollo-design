define([ "dojo/_base/declare",
		"dojo/text!./templates/ReusableObject.html",
		"dojo/on",
		"dojo/_base/lang",
		"ah/config/gridStructure",
		"ah/config/validateRules",
		"dojo/_base/array",
		"dojo/dom-construct",
		"dojo/i18n!i18n/util/form/nls/ReusableObject",
		"ah/util/common/ModuleBase"], function(declare, template, on, lang, Structure, rules, array, domCon, messages, ModuleBase) {

	return declare("ah/util/form/ReusableObject", [ModuleBase], {

		templateString : template,

		mode : 'list',

		i18n : messages,

		//objectType : 'userGroup',
		//objectAttr : '',

		_setModeAttr : function(v){
			var arr = [this.listArea, this.formArea],
				ret = [[this.copyButton, this.linkButton], [this.saveButton]];

			v == 'form' &&
				(arr.reverse(), ret.reverse());

			arr[0].style.display = '';
			arr[1].style.display = 'none';

			array.forEach(ret[0],function(item){ item.style.display = '';});
			array.forEach(ret[1],function(item){ item.style.display = 'none';});


			this._set('mode', v);
		},

		_setTypeAttr : function(selected){
			// @TODO can be use switch or split to some condition function
			if(this.objectType != 'userGroup') {
				this._set('extraCfg', '');
				return;
			}

			var isAuto = selected.groupType == 'AUTO_PPSK';

			this.autoGroupArea.style.display = isAuto ? '' : 'none';

			this._set('extraCfg', isAuto ? 'userNamePrefix' : '');
		},

		bCopy: true,
		_setBCopyAttr: function(b) {
			this.copyButton.style.display = b ? '' : 'none';
		},

		_typeMap : {
			'userGroup' : ['services/config/auth/ppskusergroups', 3, 'services/config/auth/ppskusergroups/copy?vocoLevel=3', 'User Groups', 'User Groups', 'SSIDs'],
			'ssid' : ['services/config/ssid/ssidprofiles', 10, 'services/config/ssid/ssidprofiles/copy?vocoLevel=10', 'SSIDs', 'SSIDs', 'Network Policies'],
			'userProfile' : ['services/config/up/userprofiles', 6 , 'services/config/up/userprofiles/copy?vocoLevel=6', 'User Profiles', 'User Profiles', 'SSIDs'],
			'assignment' : [],
			'radius' : ['services/config/auth/radiusservers', 6 , 'services/config/auth/radiusservers/copy?vocoLevel=6', 'AAA Server Profiles', 'AAA Server Profiles', 'SSIDs'],
			'schedule' : ['services/config/common/schedules', 3 , 'services/config/common/schedules/copy?vocoLevel=3', 'Schedules', 'Schedules', 'SSIDs'],

			'dnsObject': ['services/config/mgmt/dnsobjects', 2, 'services/config/mgmt/dnsobjects/copy', 'DNS Objects', 'DNS Object', 'DNS Objects'],
			'ntpServer': ['services/config/mgmt/ntpprofiles', 5, '', 'NTP Servers', 'NTP Server', 'NTP Servers'],
			'syslogServer': ['services/config/mgmt/syslogprofiles', 4, '', 'Syslog Servers', 'Syslog Server', 'Syslog Servers'],
			'bonjourGatewaySettings': ['services/config/common/bonjourgatewayprofiles', 3,'', 'Bonjour Gateway Settings', 'Bonjour Gateway Setting', 'Bonjour Gateway Settings'],
			'lldpCdp': ['services/config/common/lldpcdpprofiles', 5, '', 'LLDP/CDPs', 'LLDP/CDP', 'LLDP/CDP'],
			'accessConsole': ['services/config/common/accessconsoles', 6, '', 'Access Consoles', 'Access Console', 'Access Console'],
			'managementOptions': ['services/config/mgmt/mgmtoptions', 3, '', 'Management Options', 'Management Option', 'Management Option'],
			'wips': ['services/config/security/policy/wips', 3, '', 'WIPS','WIP', 'WIP'],
			'locationServer': ['services/config/mgmt/locationprofiles', 3, '', 'Location Servers', 'Location Server', 'Location Server'],
			'traffic': ['services/config/security/policy/trafficfilters', 2, '', 'Traffic Filters', 'Traffic Filter', 'Traffic Filter'],
			'stpConfigurations': ['', '', '', 'STP Configurations', 'STP Configuration', 'STP Configuration'],
			'classifierMaps': ['services/config/qos/classifiermaps', 5, '', 'Classifier Maps', 'Classifier Map', 'Classifier Map'],
			'hiveProfile': ['services/config/policy/additional/hiveprofiles', 10, '', 'Hive Profiles', 'Hive Profile', 'Hive Profile'],
			'vlan': ['', '', '', 'Management & Native VLANs', 'Management & Native VLAN', 'Management & Native VLAN'],
			'ddCollection': ['', '', '', 'Device Data Collection', 'Device Data Collection', 'Device Data Collection'],
			'deviceTimeZone': ['', '', '', 'Device Time Zones', 'Device Time Zone', 'Device Time Zone'],
			'stormControl': ['', '', '', 'Storm Controls', 'Storm Control', 'Storm Control'],
			'igmpSettings': ['', '', '', 'IGMP Settings', 'IGMP Settings', 'IGMP Settings'],
			'markerMaps': ['services/config/qos/markermaps', 5, '', 'Maker Maps', 'Maker Maps','Maker Map'],
			'qosOverview': ['', '', '', 'QoS Overviews', 'QoS Overview', 'QoS Overview'],
			'tunnelPolicy': ['services/config/common/tunnelpolicies', 4, '', 'Tunnel Policies', 'Tunnel policy', 'Tunnel policy'],
			'ipFirewall': ['services/config/security/policy/ipfirewalls', '3', '', 'IP Firewall Profile', 'IP Firewall Profile', 'IP Firewall Profile'],
			'macFirewall': ['services/config/security/policy/macfirewalls', '3', '', 'MAC Firewall Profile', 'MAC Firewall Profile', 'MAC Firewall Profile'],
			'rateLimit': ['services/config/qos/ratecontrols','','','Rate Limits','Rate Limit','Rate Limit'],
			'deviceTemplate': ['services/config/device/templates','5','', 'Device Templates', 'Device Template', 'Device Templates'],
			'deviceTmplFilter': ['services/config/device/templates/filter','5','', 'Device Templates', 'Device Template', 'Device Templates'],
			'dnsServer': ['services/config/mgmt/dnsobjects', 2, 'services/config/mgmt/dnsobjects/copy', 'DNS Objects', 'DNS Object', 'DNS Objects'],
			'radiusClientObject': ['services/config/auth/radiusclientobjects', '5', '', 'Radius Servers', 'RADIUS Server Groups', 'Radius Servers'],
			'snmpServer': ['services/config/mgmt/snmpobjects', '4', '', 'SNMP Servers', 'SNMP Server', 'SNMP Servers']
		},

		singleLink: ['radius', 'ntpServer', 'syslogServer', 'bonjourGatewaySettings', 'lldpCdp', 'accessConsole', 'managementOptions', 'wips', 'locationServer', 'traffic', 'classifierMaps', 'markerMaps', 'hiveProfile', 'stpConfigurations', 'vlan', 'ddCollection', 'deviceTimeZone', 'stormControl', 'igmpSettings', 'qosOverview' ,'tunnelPolicy','rateLimit', 'deviceTmplFilter', 'dnsServer', 'snmpServer'],

		events : [
			['linkButton', 'click', '_handleLink'],
			['cancelButton', 'click', '_handleCancel'],
			['saveButton', 'click', '_handleSave'],
			['copyButton', 'click', '_handleCopy'],
			['gridPick', 'afterRemove', '_handleAfterRemove'],
			['gridPick', 'beforeRefresh', '_handleBeforeData']
		],

		validateRules : rules.util.reusableObject,

		postMixInProperties: function() {
			this.inherited(arguments);
			var arr = this._typeMap[this.objectType],
				txt = arr[3].slice(0, -1),
				copyTitle = 'Creates a new copy of selected ' + txt,
				linkTitle = 'Use the selected ' + txt + '. It Could be shared across multiple ' + arr[5],
				defParam = {
					'page.sort': 'name,ASC'
				};

			this.__target = arr[0];
			if(this.objectType === 'deviceTmplFilter') {
				this.__delTarget = 'services/config/device/templates';
			}
			this.__structure = Structure.form.usableObject[this.objectType] || Structure.form.usableObject;
			this.__gridParam = lang.mixin({}, defParam, {
				'vocoLevel': arr[1]
			}, this.filterParam);

			this.__copyUrl = arr[2] || arr[0];

			//this.objectName = arr[1];
			this.dialog && this.dialog.set('title', arr[4]);

			this.linkTitle = linkTitle;
			this.copyTitle = copyTitle;

		},

		_handleLink : function(){
			var selected = this.gridPick.getSelected(),
				arr = [];

			if(!selected.length){
				this.dialog.msgErr(messages.needOne);
				return;
			}

			if (this.singleLink.indexOf(this.objectType) > -1 && selected.length > 1) {
				this.dialog.msgErr(messages.onlyOne);
				return;
			}

			if(this.objectAttr){
				array.forEach(selected, function(item){
					var o = {};
					o[this.objectAttr] = item;
					o.id = Math.random();

					arr.push(o);
				}, this);

				selected = arr;
			}


			if(this['_'+this.objectType+'LinkFn']){
				this['_'+this.objectType+'LinkFn'](selected);
			}else{
				this._linkFn(selected);
			}

		},

		_handleCancel : function(){
			var mode = this.get('mode');

			if(mode == 'form'){
				this.set('mode', 'list');
			}else{
				this.dialog.destroy();
			}
		},

		_handleSave : function(){

			if(!this.$valid()) return;


			this.$tgPost(this.dialog.loadEl)(this.__copyUrl, this._getData(), this._handleData);
		},

		_handleCopy : function(){

			var selected = this.gridPick.getSelected(),
				len = selected.length;

			if(!len){
				this.dialog.msgErr(messages.needOne);
				return;
			}

			if(len > 1){
				this.dialog.msgErr(messages.onlyOneCopy);
				return;
			}

			this.set('mode','form');

			this.set('type', selected[0]);

		},


		_handleAfterRemove : function(deletedItems){
			var arr, deletedIds;

			this.dialog.msgSucc(messages.delteSuccess);

			var delItems = ['userGroup', 'schedule', 'deviceTemplate', 'deviceTmplFilter'];

			if (delItems.indexOf(this.objectType) > -1) {
				this.onDelItems(deletedItems);
			}

			if(this.objectAttr == 'userProfile'){
				deletedIds = array.map(deletedItems, function(item){ return item.id; });
				arr = array.filter(this.datas, function(item){
					var profileId = item.userProfile.id;

					return deletedIds.indexOf(profileId) !== -1;
				});

				this.onDelItems(arr);
			}

		},

		_handleBeforeData: function(data) {
			var rmPreArr = ['ntpServer', 'syslogServer', 'bonjourGatewaySettings', 'lldpCdp', 'accessConsole', 'managementOptions', 'wips', 'locationServer', 'traffic', 'classifierMaps', 'markerMaps', 'hiveProfile', 'stpConfigurations', 'vlan', 'ddCollection', 'deviceTimeZone', 'stormControl', 'igmpSettings', 'qosOverview' ,'tunnelPolicy','rateLimit', 'deviceTmplFilter', 'dnsServer', 'snmpServer'];
			if(rmPreArr.indexOf(this.objectType) > -1) {
				for (var i = 0, len = data.length; i < len; i++) {
					if(data[i].predefined == true) {
						data.splice(i,1);
						break;
					}
				}
			}
		},

		_getData : function(){
			var id = this.gridPick.getSelected()[0].id,
				d = {
					id : id,
					name : this.nameEl.value
				},
				map = {
					ssid : {
						policyId : this.policyId,
						jsonType : 'ssid-profile-copy'
					},
					userProfile : {
						jsonType : 'user-profile-copy'
					},
					userGroup : {
						jsonType : 'ppsk-user-group-copy'
					},
					schedule : {
						jsonType : 'schedule-copy'
					},
					radius : {
						jsonType : 'radius-server-copy'
					},
					dnsObject : {
						jsonType : 'dns-object-copy'
					}
				},
				cfgMap = {
					userNamePrefix : this.prefixEl.value
				}, extraCfg = this.get('extraCfg'), o = {}, arr;


			if(extraCfg){
				arr = Array.isArray(extraCfg) ? extraCfg : [extraCfg];
			}

			array.forEach(arr, function(cfg){
				o[cfg] = cfgMap[cfg];
			});

			map[this.objectType] && lang.mixin(d, map[this.objectType], o);

			return d;
		},

		/*_cleanData : function(data){
			var d = lang.clone(data),
				i, dd;

			for(i in d){
				dd = d[i];
				delete d.id;
				delete d.createdAt;
				delete d.updatedAt;
			}

			return d;
		},*/

		_handleData : function(resp){
			var d = resp.data, o = {};

			if(this.objectAttr){
				o[this.objectAttr] = d;
				o.id = Math.random();

				d = o;
			}

			this.msgSucc(messages.copySuccess);

			if(this['_'+this.objectType+'AddFn']){
				this['_'+this.objectType+'AddFn'](d);
			}else{
				this._addFn(d);
			}
		},

		_filterLinkItems : function(selected){

			selected = array.filter(selected, function(item){ return this.ids.indexOf(item.id) === -1; }, this);

			return selected;
		},

		_classificationObjLink: function(selected) {
			var ids = array.map(this.datas, function(item) {
				return item[this.objectType].id;
			}, this);

			var isExist = selected.some(function(item, index) {
				return ids.indexOf(item.id) > -1;
			});

			if (isExist) {
				this.dialog.msgErr(messages.isExist);
				return;
			}

			var ret = [];
			selected.forEach(function(item) {
				obj = {};
				obj[this.objectType] = item;
				ret.push(obj);
			}, this);

			this._addFn(ret);
		},

		// @LinkFn

		_linkFn : function(selected){

			this.onLinkItems(selected);

			this.dialog.destroy();
		},

		_addFn : function(selected){

			this.onAddItem(selected);

			this.dialog.destroy();
		},




		// @Specail link fn

		_ssidLinkFn : function(selected){
			var items = this._filterLinkItems(selected),
				arr = array.map(items,function(item){ return item.id }),
				ids = arr.join(','),
				url = 'services/config/ssid/ssidprofiles/networkpolicy/'+this.policyId+'?vocoLevel=10&ids='+ids;

			if(!!ids === false){
				this.dialog.msgErr(messages.noSsid);
				return;
			}

			this.$put(url, null , function(resp){
				this._addFn(resp.data);
			});
		},

		_userProfileLinkFn : function(selected){
			var items = this._filterLinkItems(selected);

			this._addFn(items);
		},


		_radiusLinkFn : function(selected){
			if(this.selectedRadius && this.selectedRadius.id == selected[0].id){
				this.dialog.msgErr(messages.radioExist);
				return;
			}

			//this._linkFn(selected);
			this.onLinkItems(selected);

		},

		_dnsObjectLinkFn: function(selected) {
			this._classificationObjLink(selected);
		},

		_radiusClientObjectLinkFn: function(selected) {
			this._classificationObjLink(selected);
		},

		_deviceTemplateLinkFn: function(selected) {
			var isExist = selected.some(function(item, index) {
				return this.ids.indexOf(item.id) > -1;
			}, this);

			if(isExist) {
				this.dialog.msgErr(messages.isExist);
				return;
			}

			var pureArr = this.datas.filter(function(item) {
				return item.classAsgn == null;
			});

			var productTypes = pureArr.map(function(item) {
				return item.tmpl.productType;
			});
			var obj;

			var ret = selected.reduce(function(pre, item) {
				if (productTypes.indexOf(item.productType) == -1) {
					productTypes.push(item.productType);
					obj = {
						classAsgn: null,
						tmpl: item,
						id: item.id
					};
				} else {
					obj = {
						classAsgn: {},
						tmpl: item,
						id: item.id
					};
				}
				pre.push(obj);
				return pre;
			}, []);

			this._addFn(ret);
		},

		_deviceTmplFilterLinkFn: function(selected) {
			var isExist = selected.some(function(item, index) {
				return this.ids.indexOf(item.id) > -1;
			}, this);

			if(isExist) {
				this.dialog.msgErr(messages.isExist);
				return;
			}

			this._linkFn(selected);
		},




		// @Special add fn

		_radiusAddFn : function(){
			this.dialog.destroy();
		},

		_dnsObjectAddFn: function(data) {
			var obj = {
				dnsObject: data
			};

			this._addFn(obj);
		},


		// @Helps

		_isObj : function(obj){
			return obj.toString == '[object Object]';
		},

		// Events
		onAddItem : function(){},
		onLinkItems : function(){},
		onDelItems : function(){}

	});

});
