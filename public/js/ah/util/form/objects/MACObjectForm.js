define(['dojo/_base/declare','ah/util/form/objects/ObjectFormBase',"dojo/text!./templates/MACObjectForm.html","dojo/_base/array",
		'dojo/on','dojo/_base/lang',"dojo/dom-class", "ah/config/validateRules", "ah/app/DataMgr"],
	function(declare,ObjectFormBase,template,array,on,lang, domClass, rules, DataMgr){

		return declare('ah/util/form/objects/MACObjectForm',[ObjectFormBase],{

			toggleMap : {
				'mac-address-profile' : 'addressWrap',
				'mac-range-profile' : 'rangeWrap',
				'mac-oui-profile' : 'subnetWrap'
			},

			type : 'mac-address-profile',
			
			templateString : template,
			
			validateRules : rules.util.macObject,

			events : [
				['cancelBtn', 'click', '_handleCancel'],
				['saveBtn', 'click', '_handleSave']
			],
			
			postCreate : function(){
				this.inherited(arguments);
				this.restoreData();
			},
			

			_handleSave : function(){
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
                var msg = JSON.parse(data.responseText).error.message, type="error";

				this.showMsg(type, msg);
			
				return true;
			},

			_handleData : function(data){
				var type = 'success',
					msg = 'Save MAC Object successfully.';

				//this.ipObj.syncObj(data.data);
				this._handleCancel();
				this.onDealData(data.data);

				// may be not need go back jsut show the message
				//this._handleCancel();
				
				
				this.showMsg(type, msg);
			},

			restoreData : function(){
				var data = this.data;

				if(!data) return;

				if(!data.jsonType){
					this.nameEl.value = data.name;
					return;
				}

				this.nameEl.value = data.name;	
				//this.typEl.set('value',data.jsonType);
				//this.typEl.domNode.disabled = true;

				switch(data.jsonType){
					case 'mac-address-profile':
						this.macAddress.value = data.value;
						break;
					case 'mac-range-profile':
						this.ipRange1.value = data.value;
						this.ipRange2.value = data.macAddressEnd;
						break;
					case 'mac-oui-profile':
						this.macOui.value = data.value;
						break;
					default:
						break;
				}
			},

			getData : function(){
				var type = this.type,
					data = {
					ownerId : DataMgr.ownerId,
					predefined : false,
					name : this.nameEl.value,
					description : '',
					jsonType : type
				},mac = this.macAddress.value,
				  rag1 = this.ipRange1.value,
				  rag2 = this.ipRange2.value,
				  macOui = this.macOui.value;	

				switch(type){
					case 'mac-address-profile':
						data.value = mac;
						break;
					case 'mac-range-profile':
						data.value = rag1;
						data.macAddressEnd = rag2;
						break;
					case 'mac-oui-profile':
						data.value = macOui;
						break;
					default:
						break;
				}

				data = this.attachId(this.data,data);

				return data;
			},

			getUrl : function(){
				var type = this.type,
					url = 'services/config/common/';	

				return url + (type == 'mac-address-profile' ? 'macaddressprofiles' : 
						type == 'mac-range-profile' ? 'macrangeprofiles' : 'macouiprofiles');
			},

			onDealData : function(){}
		
		});

	})
