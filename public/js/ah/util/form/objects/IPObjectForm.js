define(['dojo/_base/declare',"dojo/text!./templates/IPObjectForm.html","ah/util/form/objects/ObjectFormBase","dojo/_base/array",
		'dojo/on','dojo/_base/lang',"dojo/dom-class","ah/util/message/StatusMsg", "ah/app/DataMgr", "ah/config/validateRules"],
	function(declare,template, ObjectFormBase, array, on,lang, domClass, StatusMsg, DataMgr, rules){

		return declare('ah/util/form/objects/IPObjectForm', [ObjectFormBase],{

			templateString : template,

			toggleMap : {
				'ip-address-profile' : 'addressWrap',
				'host-name-profile' : 'hostnameWrap',
				'ip-range-profile' : 'rangeWrap',
				'subnet-profile' : 'subnetWrap'
			},

			validateRules : rules.util.ipobject,

			events : [
				['cancelBtn', 'click', '_handleCancel'],
				['saveBtn', 'click', '_handleSave']
			],

			postCreate : function(){
				this.inherited(arguments);
				this.restoreData();
			},


			_handleSave : function(e){
				if(!this.$valid()) return;

				var f = this.data && this.data.jsonType,
					method = f ? '$put' : '$post';

				this[method](
					this.getUrl() + (f ? '/'+this.data.id : ''),
					this.getData(),
					this._handleData,
					this._handleError
				);

			},

			_handleError : function(data) {
                var msg = JSON.parse(data.responseText).error.message;

				this.showMsg('error', msg);

				return true;
			},

			_handleData : function(data){

				// may be not need go back jsut show the message
				this._handleCancel();
				this.onDealData(data.data);

				this.showMsg('success', 'IP Object was successfully saved.');
			},

			restoreData : function(){
				var data = this.data;

				if(!data) return;

				if(!data.jsonType){
					this.nameEl.value = data.name;
					return;
				}

				this.nameEl.value = data.name || '';

				switch(data.jsonType){
					case 'ip-address-profile':
						this.ipAddress.value = data.value;
					case 'host-name-profile':
						this.hostName.value = data.value;
						break;
					case 'ip-range-profile':
						this.ipRange1.value = data.value;
						this.ipRange2.value = data.ipAddressEnd;
						break;
					case 'subnet-profile':
						this.subnetIp.value = data.value;
						this.subnetMask.value = data.netmask;
						break;
				}

			},

			getData : function(){
				var data = {
					jsonType : this.type,
					ownerId : DataMgr.ownerId,
					predefined : false,
					name : this.nameEl.value,
					description : ''
				}, ip = this.ipAddress.value,
				  host = this.hostName.value,
				  ipRag1 = this.ipRange1.value,
				  ipRag2 = this.ipRange2.value,
				  subIp = this.subnetIp.value,
				  subMask = this.subnetMask.value,f, type;

				type = this.type;

				if(type == 'ip-address-profile'){
					data.value = ip;
				}

				if(type == 'host-name-profile'){
					data.value = host;
				}

				if(type == 'ip-range-profile'){
					data.value = ipRag1;
					data.ipAddressEnd = ipRag2;
				}

				if(type == 'subnet-profile'){
					data.value = subIp;
					data.netmask = subMask;
				}

				if(this.data){
					this.data.id && (data.id = this.data.id);
					this.data.createdAt && (data.createdAt = this.data.createdAt);
					this.data.updatedAt && (data.updatedAt = this.data.updatedAt);
				}

				return data;
			},

			getUrl : function(){
				var hold = 'services/config/common/',
					str = 'addressprofiles',
					map = {
						'ip-address-profile' : 'ip',
						'host-name-profile' : 'hostname',
						'ip-range-profile' : 'iprange',
						'subnet-profile' : 'subnet'
					};

				return hold + map[this.type] + str;

			},

			onDealData: function() {}

		});

})

