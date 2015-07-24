define([
	"dojo/_base/lang",
	"ah/util/Formatter",
	"dojo/date/locale",
	"dojo/string",
	"dojo/query",
	'ah/comp/configuration/assignment/__Assignment'
], function (lang, Formatter, locale, string, query, __Assignment) {
	var structure = {};

	// Helps
	var add = function(name,cfg){
		lang.setObject(
			name,
			cfg,
			structure
		);
	};



	/**
	 *@Used for assignment
	 */

	// var __Assignment = new __Assignment();

	add('common.name', [
		{
			name : "Name",
			field : "name",
			width : "auto"
		}
	]);



	add('config.networkPolicy',[
		{
			name : "Policy Name",
			field : "name",
			width : "auto",
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},{
			name : "Description",
			field : "description",
			width : "auto"
		},
		/* TODO : need to do this the dojo 1.9 way */
		{
			name : "Last Updated",
			field : "updatedAt",
			formatter: function(value) {
				return Formatter.formatTime(value);
			},
			width : "auto"
		},{
			name : "id",
			field : "policyId",
			width : "auto",
			hidden: true
		}
	]);

	add('config.ssidList', [
		{
			name : 'SSID',
			field : 'name',
			width : 'auto',
			formatter : function(name){
				return '<a href="javascript:void(0)" class="J-ssid-name">'+name+'</a>';
			}
		},
		{
			name : 'Access Security',
			field : 'accessSecurity',
			width : 'auto',
			formatter : function(v){
				var map = {
					'802dot1x' : 'WPA / WPA2 802.1X (Enterprise)',
					'psk' : 'WPA / WPA2 PSK (Personal)',
					'ppsk' : 'Private PSK',
					'wep' : 'WEP',
					'open-access' : 'Unsecured (Open) Network'
				};

				return map[v.jsonType] || null;
			}
		},
		{
			name : 'VLAN',
			field : 'defaultUserProfile',
			width : 'auto',
			formatter : function(profile){
				return profile.vlan ? profile.vlan.name : '';
			}
		}
	]);

	add('config.macOuiList',[
		{
			name : "MAC OUI",
			field : "name",
			width : "auto"
		}
	]);

	add('config.tunnelTrafficForwardingExceptionIpEntriesList',[
		{
			name : "IP",
			field : "ipAddress",
			width : "auto"
		},
		{
			name : "Netmask",
			field : "netmask",
			width : "auto"
		}
	]);

	add('config.wipsSsidList',[
		{
			name : "SSID",
			field : "_item",
			formatter: function(obj) {
				if(obj.ssidProfile && obj.ssidProfile != null) {
					return obj.ssidProfile.name;
				} else {
					return obj.ssid;
				}
				return "";
			},
			width : "auto"
		}, {
			name : "Check for Encryption Type",
			field : "_item",
			formatter: function(obj) {
				if(obj.enableCheckSsidEncryptionType) {
					return obj.ssidEncryptionType;
				}
				return "";
			},
			width : "auto"
		}
	]);

	add('config.ntpServerList',[
		{
			name : "NTP Server",
			field : "name",
			width : "auto"
		},
		{
			name : "Server IP",
			field : "serverIp",
			formatter : function(obj){
				return obj.name;
			},
			width : "auto"
		},
		{
			name : "Description",
			field : "description",
			width : "auto"
		},
		{
			name : "Order",
			width: "60px",
			formatter: function() {
				return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);
	add('config.snmpServerList',[
		{
			name : "SNMP Server",
			field : "serverIp",
			formatter : function(obj){
				return obj.name;
			},
			width : "auto"
		},
		{
			name : "Version",
			field : "version",
			width : "auto"
		},
		{
			name : "Operation",
			field : "operation",
			width : "auto"
		},
		{
			name : "Community",
			field : "community",
			width : "auto"
		},
		{
			name : "Admin",
			field : "admin",
			width : "auto"
		},
		{
			name : "Auth",
			field : "authMethod",
			width : "auto"
		},
		{
			name : "Encryption",
			field : "encryptionMethod",
			width : "auto"
		},
		{
			name : "Order",
			width: "60px",
			formatter: function() {
				return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.dnsServerList',[
		{
			name : "DNS Server",
			field : "ipAddress",
			width : "auto"
		},
		{
			name : "Order",
			width: "auto",
			formatter: function() {
			return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.qosOverview5g',[
		{
			name : "User Profile",
			field : "userProfileName",
			width : "auto"
		}, {
			name : "802.11a",
			field : "rateLimit11abg",
			width : "104px"
		}, {
			name : "802.11n/a",
			field : "rateLimit11n",
			width : "104px"
		}, {
			name : "802.11ac",
			field : "rateLimit11ac",
			width : "104px"
		}, {
			name : "Scheduling Weight",
			field : "schedulingWeight",
			width : "110px"
		}, {
			name : "Scheduling %",
			field : "weight",
			width : "85px"
		}
	]);

	add('config.qosOverview24g',[
		{
			name : "User Profile",
			field : "userProfileName",
			width : "auto"
		}, {
			name : "802.11b/g",
			field : "rateLimit11abg",
			width : "166px"
		}, {
			name : "802.11g/n",
			field : "rateLimit11n",
			width : "166px"
		}, {
			name : "Scheduling Weight",
			field : "schedulingWeight",
			width : "110px"
		}, {
			name : "Scheduling %",
			field : "weight",
			width : "85px"
		}
	]);

	add('inventory.devices',[
		{
			name : "Status",
			width: "70px",
			field: "isConnected",
			formatter: function(status) {
				return (Boolean(status) === true) ? '<span class="hive-status dashboard-icon hive-status-true"></span>' : '<span class="hive-status dashboard-icon hive-status-false"></span>';
			}
		},{
			name : "IP Address",
			field : "_item",
			width : "auto",
			formatter : function(obj){
				return '<a href="#/devices/'+obj.id+'/overview" class="J-ipaddress">'+obj.ipAddress+'</a>';
			}
		} , {
			name : "MAC Address",
			field : "macAddress",
			width : "auto"
		},
		{
			name : "Host Name",
			field : "hostname",
			width : "auto"
		} , {
			name : "Serial Number",
			field : "serialNumber",
			width : "auto"
		},
		{
			name : "Product Type",
			field : "productType",
			width : "auto"
		}, {
			name : "State",
			field : "simType",
			width : "auto"
		},
		{
			name : "Software Version",
			field : "softwareVersion",
			width : "auto"
		}
	]);

	add('dashboard.deviceList',[
		{
			name : "Status",
			field : "deviceStatus",
			width: '70px',
			formatter: function(status) {
				return (Boolean(status) === true) ? '<span class="hive-status dashboard-icon hive-status-true"></span>' : '<span class="hive-status dashboard-icon hive-status-false"></span>';
			}
		},
		{
			name : "Host Name",
			field : "hostName",
			width: 'auto',
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				return '<a href="#/devices/'+obj.deviceId+'/overview" class="J-ipaddress">'+obj.hostName+'</a>';
			}
		},
		{
			name : "Uptime",
			field: "upTime",
			width: 'auto',
			formatter: function(uptime, idx) {
				uptime = uptime/1000;
				var row = this.grid.getItem(idx);

				if(row.deviceStatus) {
					var d = Math.floor(uptime / 86400),
						h = Math.floor((uptime - (d * 86400)) / 3600),
						m = Math.floor((uptime - (d * 86400) - (h * 3600)) / 60),
						s = Math.floor((uptime - (d * 86400) - (h * 3600) - (m * 60)) / 60);
					return d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
				} else {
					if(uptime) {
						return 'Last seen: ' + new Date(uptime*1000).toLocaleString();
					}
					else {
						return 'Last seen: Never';
					}
				}

		  }
		},
		{
			name : "Connected Clients",
			field: "connectedClients",
			width: 'auto'
		},
		{
			name : "Data Usage",
			field: "dataUsage",
			width: 'auto',
			formatter: function(usage, idx) {
				var delta = this.grid.getItem(idx).dataUsageDelta,
					icon = delta > 0 ? '<span class="dashboard-icon data-usage-delta-up"></span>' : '<span class="dashboard-icon data-usage-delta-down"></span>',
					conversion = Formatter.convertBytes(usage);
				return '<span class="data-usage">'+conversion.value+' '+conversion.label+'</span>' + icon;
			}
		}
	]);

	add('config.ssidSelectedSchedules',[
		{
			name : "Name",
			field : "schedule",
			formatter : function(obj){
				return obj.name;
			},
			width : "auto"
		},
		{
			name : "Schedule Type",
			field : "schedule",
			formatter : function(obj){
				val = obj.scheduleType.split('_').join('-');
				return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
			},
			width : "auto"
		},
		{
			name : "Description",
			field : "schedule",
			formatter : function(obj){
				return obj.description;
			},
			width : "auto"
		}
	]);

	add('config.schedule',[
		{
			name : "Name",
			field : "name",
			formatter : function(v){
				return '<a href="#" class="J-item-edit">' + v + '</a>';
			},
			width : "auto"
		},
		{
			name : "Schedule Type",
			field : "scheduleType",
			width : "auto",
			formatter: function (val) {
				val = val.split('_').join('-');
				return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
			}
		},
		{
			name : "Description",
			field : "description",
			width : "auto"
		}
	]);

	add('config.deviceTmplExp',[
		{
			name : "Template Name",
			field : "deviceTemplate",
			width : "auto",
			formatter: function(obj){
				return obj && obj.name;
			}
		} ,
		{
			name : "Criteria",
			field : "tags",
			width : "auto",
			formatter: function(obj){
				var tags = [];
				if(!obj){return;}
				obj.forEach(function(el, index){
					tags.push(el.value);
				});
				return tags.join(",");
			}
		},
		{
			name : "Order",
			width : "auto",
			formatter: function() {
				return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.portTypes', [
		{
			name : "Port Type Name",
			field : "name",
			width : "auto",
			formatter : function(v,i,obj){
				if(obj.grid.getItem(i).jsonType=="mirror-port"){
					return '<a href="#" class="J-porttype" data-index="'+i+'">'+v+'</a><a href="#" class="J-mirrorSet table-action-icons table-settings"></a>'
				}
				else{
					return '<a href="#" class="J-porttype" data-index="'+i+'">'+v+'</a>';
				}
			}
		},
		{
			name : "Applied to Ports",
			field : "forPorts",
			width : "auto",
			formatter: function(v,i,obj){
				var str = "";
				if(v.aggs || v.red){
					var tp = v.aggs ? v.aggs : v.red;
					for(var channel in tp){
						var ports = dojo.map(tp[channel], function(item){
							if(obj.grid.deviceType == 'Ap'){
								return parseInt(item);
							}
							return parseInt(item) + 1;
						});

						str = str + "<a href='#' class='J-agg' data-index='"+i+"'>" + (v.aggs ? "Agg" : "Red") + channel + "</a>[Eth1/" + ports.join(",") + "]";
					}
				}
				if(v.ports){
					var ports = dojo.map(v.ports, function(item){
						if(obj.grid.deviceType == 'Ap'){
							return parseInt(item);
						}
						return parseInt(item) + 1;
					});
					str = str.length>0 ? str + ", " + ports.join(",") : ports.join(",");
				}
				return str;
			}
		},
		{
			name : "Authentication",
			field : "authenticationMethodPriority",
			width: "auto",
			formatter: function (v, i, obj) {
				var priorityMap = {
					'PRIMARY_802DOT1X': '802.1X',
					'PRIMARY_802DOT1X_SECONDARY_MAC': '802.1X, MAC',
					'PRIMARY_MAC': 'MAC',
					'PRIMARY_MAC_SECONDARY_802DOT1X': 'MAC, 802.1X'
				};

				var ret = priorityMap[v] || '';
				var grid = obj.grid;
				var deviceType = grid.deviceType || '';

				if (deviceType.toUpperCase() === 'AP') {
					var dt = grid.getItem(i);
					if (dt.enableCwp) {
						ret += ', CWP';
					}
				}

				return ret || undefined;
			}
		},
		{
			name: "User Profile",
			field: "defaultUserProfile",
			width: "auto",
			formatter: function(v,i,obj){
				if(obj.grid.deviceType == 'Ap'){
					return v && v.name;
				}else{
					var dt = obj.grid.getItem(i);
					if(dt.jsonType=="access-port"){
						var str = "";
						if(dt.authenticationMethodPriority && dt.defaultUserProfile){
							str += "<span>default: " + dt.defaultUserProfile.name+"</span>";
						}
						if(dt.authenticationMethodPriority && !dt.enableAllowMultipleHosts && dt.authenticationFailureUserProfile){
							var failStr = "<span>failure: " + dt.authenticationFailureUserProfile.name + "</span>";
							str = str == "" ? str + failStr : str + "<br/>"+failStr;
						}
						return str;
					}
				}

			}
		},
		{
			name: "VLAN",
			width: 'auto',
			field: "defaultUserProfile",
			formatter: function(v,i,obj){
				var dt = this.grid.getItem(i);
				if(dt.jsonType=="trunk-port" || dt.jsonType == 'uplink-port'){
					return dt.vlan && dt.vlan.defVlanId + "[Allowed: " + dt.allowedVlans + "]<a class='J-trunkVlan' data-index='"+i+"' href='#'>Select...</a>";
				}
				if(dt.jsonType == "access-port" && !dt.authenticationMethodPriority && dt.vlan){
					return dt.vlan.name;
				}
				if(dt.jsonType == "phone-data-port"){
					return "Voice VLAN: "+ dt.voiceVlan.name + "<br/>Data VLAN: " + dt.vlan.name;
				}
			}
		}
	]);
	add('config.portTypeNew', [
		{
			name : "Port Type Name",
			field : "portType",
			width : "auto",
			formatter : function(v,i,obj){
				if(v.jsonType == "mirror-port"){
					return '<a href="#" class="J-porttype" data-index="'+i+'">'+ v.name + '</a><a href="#" class="J-mirrorSet table-action-icons table-settings"></a>'
				}
				else{
					return '<a href="#" class="J-porttype">' + v.name +'</a>';
				}
			}
		},
		{
			name : "Applied to Ports",
			field : "ports",
			width : "auto",
			formatter: function(v,i,obj){
				var str = '',
					data = obj.grid.getItem(i);
				if(data.hasOwnProperty('agg') || data.hasOwnProperty('red')){
					if(obj.grid.deviceType == 'Ap'){
						str = (data.hasOwnProperty('agg') ? 'Agg' : 'Red') + '0[Eth1/0,1]';
					}else{
						str =  "<a href='#' class='J-agg' data-index='"+i+"'>Agg" + data.agg + "</a>[Eth1/" + v.join(",") + "]";
					}
				}else{
					str = v.join(',');
				}
				return str;
			}
		},
		{
			name : "Authentication",
			field : "portType",
			width: "auto",
			formatter: function (v, i, obj) {
				var priorityMap = {
					'PRIMARY_802DOT1X': '802.1X',
					'PRIMARY_802DOT1X_SECONDARY_MAC': '802.1X, MAC',
					'PRIMARY_MAC': 'MAC',
					'PRIMARY_MAC_SECONDARY_802DOT1X': 'MAC, 802.1X'
				};

				var ret = priorityMap[v.authenticationMethodPriority] || '';
				var grid = obj.grid;
				var deviceType = grid.deviceType || '';

				if (deviceType.toUpperCase() === 'AP') {
					if (v.enableCwp) {
						ret += (ret ? ', ' : '') + 'CWP';
					}
				}

				return ret || undefined;
			}
		},
		{
			name: "User Profile",
			field: "portType",
			width: "auto",
			formatter: function(v,i,obj){
				if(obj.grid.deviceType == 'Ap'){
					return v.defaultUserProfile && v.defaultUserProfile.name;
				}else{
					if(v.jsonType=="access-port" || v.jsonType == 'phone-data-port'){
						var str = "";
						if(v.authenticationMethodPriority && v.defaultUserProfile){
							str += "<span>default: " + v.defaultUserProfile.name+"</span>";
						}
						if(v.authenticationMethodPriority && !v.enableAllowMultipleHosts && v.authenticationFailureUserProfile){
							var failStr = "<span>failure: " + v.authenticationFailureUserProfile.name + "</span>";
							str = str == "" ? str + failStr : str + "<br/>"+failStr;
						}
						return str;
					}
				}

			}

		},
		{
			name: "VLAN",
			width: 'auto',
			field: "portType",
			formatter: function(v,i,obj){
				if(v.jsonType=="trunk-port" || v.jsonType == 'uplink-port'){
					return v.vlan && v.vlan.defVlanId + "[Allowed: " + v.allowedVlans + "]<a class='J-trunkVlan' data-index='"+i+"' href='#'>Select...</a>";
				}
				if(v.jsonType == "access-port" && !v.authenticationMethodPriority && v.vlan){
					return v.vlan.defVlanId;
				}
				if(v.jsonType == "phone-data-port"){
					return "Voice VLAN: "+ v.voiceVlan.defVlanId + "<br/>Data VLAN: " + v.vlan.defVlanId;
				}
			}
		}
	]);

	add('config.vlanExpList', [{
		name : "IP Address / Domain Name",
		field : "address",
		width : "auto"
	}, {
		name : "Criteria",
		field : "tags",
		width : "auto",
		formatter : function(tag){
			var str = '';
			dojo.forEach(tag,function(item){
				str += item.value+' ';
			});
			return str;
		}
	}]);

	add('config.radioProfiles', [
		{
			name : "Radio Profile Name",
			field : "name",
			width : "auto",
			formatter : function(v,i,obj){
				return '<a href="#" class="J-item-edit" data-index="'+i+'">'+v+'</a>';
			}
		} ,
		{
			name : "Applied to Radio",
			field : "radioMode",
			width : "auto",
			formatter: function(obj){
				if (obj) {
					return ['_11ng','_11bg'].indexOf(obj) > -1 ? '2.4 GHz' : '5 GHz';
				}
				return '';
			}
		},
		{
			name : "Radio Mode",
			field : "radioMode",
			formatter: function(obj){
				var value;
				switch(obj) {
					case "_11bg":
						value = "802.11b/g";
						break;
					case "_11a":
						value = "802.11a";
						break;
					case "_11an":
						value = "802.11a/n";
						break;
					case "_11ng":
						value = "802.11g/n";
						break;
					case "_11ac":
						value = "802.11ac";
						break;
					default :
						break;
				}
				return value;
			},
			width: "auto"
		},
		{
			name: "Status",
			field: "enabled",
			width: "auto",
			formatter: function(obj){
				return '<span class="port-status enabled"></span>';
			}
		}
	]);

	add('config.radioManagement', [
		{
			name : "Radio Profile Name",
			field : "name",
			width : "auto",
			formatter : function(v,i,obj){
				return '<a href="#" class="J-item-edit" data-index="'+i+'">'+v+'</a>';
			}
		}, {
			name : "Applied to Radio",
			field : "radioMode",
			width : "auto",
			formatter: function(obj){
				if (obj) {
					return ['_11ng','_11bg'].indexOf(obj) > -1 ? '2.4 GHz' : '5 GHz';
				}
				return '';
			}
		}, {
			name : "Radio Mode",
			field : "radioMode",
			formatter: function(obj){
				var value;
				switch(obj) {
					case "_11bg":
						value = "802.11b/g";
						break;
					case "_11a":
						value = "802.11a";
						break;
					case "_11an":
						value = "802.11a/n";
						break;
					case "_11ng":
						value = "802.11g/n";
						break;
					case "_11ac":
						value = "802.11ac";
						break;
					default :
						break;
				}
				return value;
			},
			width: "auto"
		}, {
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.userGroupList',[{
		name : "User Group Name",
		field : "name",
		width : "auto"
	},{
		name : 'User Type',
		field : 'groupType',
		width : 'auto',
		formatter : function(v){
			return v == 'PPSK' ? 'Private PSK-Manual' : 'Private PSK-Auto';
		}
	},{
		name : "# of Users",
		field : "userCount",
		width : "auto",
		formatter: function(v,i,obj) {
			var d = obj.grid.getItem(i),
				revoked = d.revokedUserCount || 0;

			return v-revoked + '<span class="table-action-icons table-sim-remove fn-right"></span>';
		}
	 }
	]);

	add('config.radiusUserGroupList',[{
		name : "User Group Name",
		field : "name",
		width : "auto",
		formatter : function(v){
			return '<a href="javescript:void(0)" class="J-edit-group">'+v+'</a>';
		}
	},{
		name : "# of Users",
		field : "userCount",
		width : "auto",
		formatter : function(v,i,obj){
			var d = obj.grid.getItem(i),
				revoked = d.revokedUserCount || 0,
				str = v-revoked != 0 ? '<a href="javescript:void(0)" class="J-user-acc">'+(v-revoked)+'</a>' : '<span>'+(v-revoked)+'</span>';
			return str + '<span class="ml10"></span><a href="javascript:void(0)" class="add-user">Add</a>';
		}
	 },{
		name : 'Description',
		field : 'description',
		width : 'auto'
	}
	]);


	add('config.userList',function(obscure){

	return [{
		name : "Username",
		field : "name",
		width : "auto",
		formatter : function(v){
			return '<a href="javascript:void(0)" class="J-edit-user">'+v+'</a>'
		}
	}, {
		name : "PSK",
		field : "psk",
		width : "auto",
		formatter : function(v){
			return '<span class="J-password-sec" '+(obscure.checked ? '' : 'style="display:none"')+'>***************</span>'+
					'<span class="J-password-txt" '+(!obscure.checked ? '' : 'style="display:none"')+'>'+v+'</span>'
		}
	},{
		name : 'Start Time',
		field : '_item',
		width : 'auto',
		formatter : function(item){
			return item.startDateTimeMillis ? (new Date().getTime() - item.endDateTimeMillis > 0 ? 'Expired' : Formatter.formatTime(item.startDateTimeMillis)) : '';
		}
	},{
		name : 'Expiration Time',
		field : 'endDateTimeMillis',
		width : 'auto',
		formatter : function(value){
			return value ? (new Date().getTime() - value > 0 ? 'Expired' : Formatter.formatTime(value)) : '';
		}
	},{
		name : 'Email',
		field : 'email',
		width : 'auto'
	},{
		name : 'PSK Digest',
		field : 'pskDigest',
		width : 'auto'
	}/*,{
		name : "Description",
		field : "description",
		width : "auto"
	}*/];});

	add('config.radiusServerUserList',function(obscure){

		return [{
			name : "Username",
			field : "name",
			width : "auto",
			formatter : function(v){
				return '<a href="javascript:void(0)" class="J-edit-user">'+v+'</a>'
			}
		}, {
			name : "Password",
			field : "password",
			width : "auto",
			formatter : function(v){
				return '<span class="J-password-sec" '+(obscure.checked ? '' : 'style="display:none"')+'>***************</span>'+
						'<span class="J-password-txt" '+(!obscure.checked ? '' : 'style="display:none"')+'>'+v+'</span>'
			}
		},{
			name : "Description",
			field : "description",
			width : "auto"
		}];});

	add('acct.adminAccountList', [
		{
			name : "id",
			field : "id",
			hidden : true
		},{
			name : "User Name",
			field : "vhmUser",
			width : "auto",
			formatter: function(val) {
				var i=(val.isExternalUser==true)?'<span class="vhmUser"></span> ':'';
				return val.displayName + i;
			}
		}, {
			name : "Email Address",
			field : "loginName",
			width : "auto"
		}, {
			name : "Admin Group",
			field : "ownerGroup",
			width : "auto",
			formatter : function(val){return val.groupName}
		}
	]);

	add('acct.adminGroupList', [
		{
			name : "Group Name",
			field : "groupName",
			width : "auto"
		},
		{
			name: "Description",
			field: "description",
			width: "auto"
		},
		{
			name: "# Accounts",
			field: "numUsers",
			width: "auto"
		}
	]);

	add('dashboard.card.activeClients', [
 		 {
 			name : "Status Health",
 			field: "clientHealth",
 			width: '57px',
 			formatter: function(v,i,obj) {
 				var obj = obj.grid.getItem(i);
 				var connectStatus = obj.connectionStatus.toUpperCase();
 				if(obj.connectionType == 'WIRED') {
 					var statusClass = connectStatus == "CONNECTED"?"status-wired-connected":"status-wired-disconnected";
 					return '<span class="status-ico '+statusClass+'"></span>';
 				}

 				var statusClass = "status-disconnected";
 				if(connectStatus == "CONNECTED") {
 					if(obj.clientHealth >= 50) {
 						statusClass = "status-connected-good";
 					} else if(obj.clientHealth >= 25) {
 						statusClass = "status-connected-node-good";
 					} else {
 						statusClass = "status-connected-poor";
 					}
 				}
 				return '<span class="status-ico '+statusClass+'"></span>';
 		   }
 		 },
		{
			name : "OS",
			field : "osType",
			width : '45px',
			formatter: function(osType, idx, obj){
					var names = ['android', 'apple', 'ipod', 'iphone', 'ipad', 'mac', 'blackberry', 'chrome', 'cros', 'hiveos', 'linux', 'symbian', 'windows'];
					var len = names.length;
					var osName = 'unknown';
				    var name = osType.toLowerCase();
					var item;
					for(var i=0; i<len; i++ ) {
						item = names[i];
						if(name.indexOf(item) !== -1) {
							osName = item;
							break;
						}
					}
				return '<span title="'+osType+'" class="client-os client-os-'+ osName +'"></span>';
			}
		},
 		 {
 			name : "Host Name",
 			field : "hostName",
 			width : '126px'
 		 },
 		 {
 		   name : "IP / MAC",
 		   field : "ipAddress",
 		   width: '156px',
 		   noresize: true,
 		   formatter: function(o,index,obj) {
 				var obj = obj.grid.getItem(index);
 				var ip = '<div><span class="client-ipmac-width">IP:</span>'+(o||'N/A')+'</div>';
 				var mac = '<div><span class="client-ipmac-width">MAC:</span><a href="javascript:void(0);" class="open-client-entity"  data-mac="'+o+'" data-id="'+obj.id+'">'+(obj.macAddress||"N/A")+'</a></div>';

				return ip + mac;
 		   }
 		 },
 		 {
 			name : "User Name",
 			field : "userName",
 			width : "134px"
 		 },
 		 {
 			name : "Usage",
 			field : "usage",
 			width: "98px",
 			formatter: function(usage, idx,obj) {
 				var delta = obj.grid.getItem(idx).dataUsageDelta,
 					icon = delta > 0 ? '<span class="dashboard-icon data-usage-delta-up"></span>' : '<span class="dashboard-icon data-usage-delta-down"></span>',
 					conversion = Formatter.convertBytes(usage);
 				return '<span class="data-usage">'+conversion.value+' '+conversion.label+'</span>' + icon;
 		   }
 		 },
 		 {
 			name: "VLAN",
 			field: "vlan",
 			width: "67px"
 		 },
 		{
 			name: "SSID",
 			field: "ssidOrPort",
 			width: "158px",
 			formatter : function(v,i,obj){
 				var obj = obj.grid.getItem(i);
 				return obj.connectionType == 'WIRED' ? 'N/A': v;
 			}
 		},
		{
			name: "Location",
			field: "location",
			width: "107px",
			noresize: true,
			formatter : function(v){
				if(!v) return '';
				var nameArr = [],
					idArr = [],
					i;
				for(i=0;i<v.length;i++) {
					v[i].name !='undefined' && nameArr.push(v[i].name);
					v[i].id !='undefined' && idArr.push(v[i].id);
				}
				var displayName = "", displayTitle="";
				if(nameArr.length > 0) {
					displayTitle = nameArr.length ==1 ? nameArr.join("") : nameArr.join("&nbsp;&gt;&gt;&nbsp;");
					displayName = nameArr.length ==1 ? nameArr.join("") : ("&gt;&gt;&nbsp;"+nameArr[nameArr.length-1]);
				}
				var link = idArr.length > 0 ? '#/plan/'+idArr.pop()+'/overview' : '#/plan';
				return "<a href="+link+" style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
			}
		},
 		 {
 			name: "RSSI",
 			field: "rssi",
 			width: "93px",
 			formatter : function(v,i,obj){
 				var obj = obj.grid.getItem(i);
 				if(obj.connectionType == 'WIRED' || obj.connectionStatus.toUpperCase() != "CONNECTED") {
 					return 'N/A';
 				}

 				var display = '', displayClass = 'status-underline';
 				if(v >= -60) {
 					display = 'Excellent';
 					// displayClass = "status-color-green";
 				} else if(v >= -70) {
 					display = 'Very Good';
 					// displayClass = "status-color-green";
 				} else if(v >= -80) {
 					display = 'Good';
 					// displayClass = "status-color-green";
 				} else {
 					display = 'Poor';
 					// displayClass = "status-color-red";
 				}

 				return '<span class='+displayClass+'>'+display+'</span>';
 			}
 		 },
 		 {
 			name: "SNR",
 			field: "snr",
 			width: "auto",
 			formatter : function(v,i,obj){
 				var obj = obj.grid.getItem(i);
 				if(obj.connectionType == 'WIRED' || obj.connectionStatus.toUpperCase() != "CONNECTED") {
 					return 'N/A';
 				}

 				var display = '', displayClass = 'status-underline';
 				if(v >= 35) {
 					display = 'Very High';
 					// displayClass = "status-color-green";
 				} else if(v >= 25) {
 					display = 'High';
 					// displayClass = "status-color-green";
 				} else if(v >= 15) {
 					display = 'Medium';
 					// displayClass = "status-color-yellow";
 				} else {
 					display = 'Low';
 					// displayClass = "status-color-red";
 				}

 				return '<span class='+displayClass+'>'+display+'</span>';
 			}
 		 }
 	]);

	add('acct.xapiTokenList', [
		{
			name : "id",
			field : "id",
			hidden : true
		},{
			name : "Application",
			field : "appName",
			width : "auto",
			formatter : function(v, i, obj) {
				return (v == null || v == "") ? 'Unknown Application' : v;
			}
		},{
			name : "Access Token",
			field : "accessToken",
			width : "auto"
		},{
			name : "Expiration",
			field : "expireAt",
			width : "auto",
			formatter : function(value){
				return value ? (new Date().getTime() - value > 0 ? 'Expired' : Formatter.formatTime(value)) : '';
			}
		},{
			name : "Refresh Token",
			field : "refreshToken",
			width : "auto"
		}
	]);

	add('acct.backupHistoryList', [
		{
			name: "Backup Data",
			field: "backupUnits",
			width: "auto",
			formatter: function(v){
				if(v === "ALL"){
					return "Full Backup";
				}else if(v === "CONFIG"){
					return "Configuration Only";
				}
			}
		},
		{
			name: "Date",
			field: "backupDate",
			width: "auto",
			formatter: function(v){
				return Formatter.formatTime(v);
			}
		},
		{
			name: "Backup File",
			field: "backupFileName",
			width: "auto"
		},
		{
			name: "Restore",
			field: "versionMatched",
			width: "auto",
			formatter: function(v){
				if(v){
					return '<button class="J-restore btn btn-3" data-type="restoreNow">Restore</button>';
				}else{
					return '<span>Version Mismatch</span>';
				}
			}
		}
	]);

	add('monitor.activeClients', [
		 {
			name : "Status Health",
			field: "clientHealth",
			width: 'auto',
			formatter: function(v,i,obj) {
				var obj = obj.grid.getItem(i);
				var connectStatus = obj.connectionStatus.toUpperCase();
				if(obj.connectionType == 'WIRED') {
					var statusClass = connectStatus == "CONNECTED"?"status-wired-connected":"status-wired-disconnected";
					return '<span class="status-ico '+statusClass+'"></span>';
				}

				var statusClass = "status-disconnected";
				if(connectStatus == "CONNECTED") {
					if(obj.clientHealth >= 50) {
						statusClass = "status-connected-good";
					} else if(obj.clientHealth >= 25) {
						statusClass = "status-connected-node-good";
					} else {
						statusClass = "status-connected-poor";
					}
				}
				return '<span class="status-ico '+statusClass+'"></span>';
		   }
		 },
		 {
			name : "Host Name",
			field : "hostName",
			width : 'auto'
		 },
		 {
		   name : "IP / MAC",
		   field : "ipAddress",
		   width: '150px',
		   noresize: true,
		   formatter: function(o,index,obj) {
				var obj = obj.grid.getItem(index);
				var ip = '<div><span class="client-ipmac-width">IP:</span>'+(o||'N/A')+'</div>';
				var mac = '<div><span class="client-ipmac-width">MAC:</span><a href="javascript:void(0);" class="open-client-entity"  data-mac="'+o+'" data-id="'+obj.id+'">'+(obj.macAddress||"N/A")+'</a></div>';
				return ip + mac;
		   }
		 },
		 {
			name : "User Name",
			field : "userName",
			width : "auto"
		 },
		 {
			name : "OS Type",
			field : "osType",
			width : 'auto'
		 },
		 {
			name : "Usage",
			field : "usage",
			width: "auto",
			formatter: function(usage, idx,obj) {
				var delta = obj.grid.getItem(idx).dataUsageDelta,
					icon = delta > 0 ? '<span class="dashboard-icon data-usage-delta-up"></span>' : '<span class="dashboard-icon data-usage-delta-down"></span>',
					conversion = Formatter.convertBytes(usage);
				return '<span class="data-usage">'+conversion.value+' '+conversion.label+'</span>';// + icon;
		   }
		 },
		 {
			name: "VLAN",
			field: "vlan",
			width: "auto"
		 },
		{
			name: "SSID",
			field: "ssidOrPort",
			width: "auto",
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				return obj.connectionType == 'WIRED' ? 'N/A': v;
			}
		},
		 {
			name: "User Profile",
			field: "userProfile",
			width: "auto"
		 },
		{
			name: "Location",
			field: "location",
			width: "100px",
			noresize: true,
			formatter : function(v){
				if(!v) return '';
				var nameArr = [],
					idArr = [],
					i;
				for(i=0;i<v.length;i++) {
					v[i].name !='undefined' && nameArr.push(v[i].name);
					v[i].id !='undefined' && idArr.push(v[i].id);
				}
				var displayName = "", displayTitle="";
				if(nameArr.length > 0) {
					displayTitle = nameArr.length ==1 ? nameArr.join("") : nameArr.join("&nbsp;&gt;&gt;&nbsp;");
					displayName = nameArr.length ==1 ? nameArr.join("") : ("&gt;&gt;&nbsp;"+nameArr[nameArr.length-1]);
				}
				var link = idArr.length > 0 ? '#/plan/'+idArr.pop()+'/overview' : '#/plan';
				return "<a href="+link+" style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
			}
		},
		 {
			name: "RSSI",
			field: "rssi",
			width: "auto",
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				if(obj.connectionType == 'WIRED' || obj.connectionStatus.toUpperCase() != "CONNECTED") {
					return 'N/A';
				}

				var display = '', displayClass = 'status-underline';
				if(v >= -60) {
					display = 'Excellent';
					// displayClass = "status-color-green";
				} else if(v >= -70) {
					display = 'Very Good';
					// displayClass = "status-color-green";
				} else if(v >= -80) {
					display = 'Good';
					// displayClass = "status-color-green";
				} else {
					display = 'Poor';
					// displayClass = "status-color-red";
				}

				return '<span class='+displayClass+'>'+display+'</span>';
			}
		 },
		 {
			name: "SNR",
			field: "snr",
			width: "auto",
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				if(obj.connectionType == 'WIRED' || obj.connectionStatus.toUpperCase() != "CONNECTED") {
					return 'N/A';
				}

				var display = '', displayClass = 'status-underline';
				if(v >= 35) {
					display = 'Very High';
					// displayClass = "status-color-green";
				} else if(v >= 25) {
					display = 'High';
					// displayClass = "status-color-green";
				} else if(v >= 15) {
					display = 'Medium';
					// displayClass = "status-color-yellow";
				} else {
					display = 'Low';
					// displayClass = "status-color-red";
				}

				return '<span class='+displayClass+'>'+display+'</span>';
			}
		 },
		 {
			name: "Last Session Start Time",
			field: "startTime",
			width: "80px",
			formatter: function(value) {
				return Formatter.formatTime(value);
			}
		 }
	]);

	add('monitor.alarms', function (i18n) {
		return [
		 {
			name : i18n.timestamp,
			field: "timestamp",
			width: '120px',
			noresize: true,
			formatter : function(value){
				return '<div style="white-space:nowrap;">'+Formatter.formatTime(value)+'</div>';
			}
		 },
		 {
			name : i18n.severity,
			field : "severity",
			noresize: true,
			width : "auto"
		 },
		 {
			name : i18n.category,
			field : "category",
			noresize: true,
			width : "120px",
			formatter: function(v){
				return '<div title="'+v+'" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+v+'</div>';
			}
		 },
		 {
			name : i18n.hostname,
			field : "hostname",
			noresize: true,
			width: "auto",
			formatter: function(v){
				return '<div title="'+v+'" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+v+'</div>';
			}
		 },
		 {
			name : i18n.deviceMac,
			field : "deviceMac",
			noresize: true,
			width: "120px"
		 },
		 {
			name : i18n.clientMac,
			field : "clientMac",
			noresize: true,
			width: "120px"
		 }
	]});

	add('monitor.events', function (i18n) {
		return [
		 {
			name : i18n.timestamp,
			field: "timestamp",
			width: '120px',
			noresize: true,
			formatter : function(value){
				return '<div style="white-space:nowrap;">'+Formatter.formatTime(value)+'</div>';
			}
		 },
		 {
			name : i18n.severity,
			field : "severity",
			noresize: true,
			width : "auto"
		 },
		 {
			name : i18n.category,
			field : "category",
			noresize: true,
			width : "120px",
			formatter: function(v){
				return '<div title="'+v+'" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+v+'</div>';
			}
		 },
		 {
			name : i18n.hostname,
			field : "hostname",
			noresize: true,
			width: "auto",
			formatter: function(v){
				return '<div title="'+v+'" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+v+'</div>';
			}
		 },
		 {
			name : i18n.deviceMac,
			field : "deviceMac",
			noresize: true,
			width: "120px"
		 },
		 {
			name : i18n.clientMac,
			field : "clientMac",
			noresize: true,
			width: "120px"
		 }
	]});

	add('device.connectedClients', [
		{
			name : "Type",
			field : "connectionType",
			width : "auto",
			noresize: true,
			formatter: function(obj) {
				return obj === 1 ? "Wireless":"Wired";
			}
		},
		{
			name : "OS Type",
			field : "osType",
			noresize: true,
			width: '100px'
		},

		{
			name : "Health Status",
			field: "clientHealthStatus",
			width: 'auto',
			noresize: true,
			formatter: function(obj) {
				return obj === 1 ? "Healthy":"Poor";
			}
		},
		{ name : "Host Name", field : "hostName", noresize: true, width: "auto"},
		{
			name : "Client MAC",
			field : "clientMac",
			width : "auto",
			noresize: true/*,
			formatter: function(o) {
				return '<span class="open-client-entity" style="cursor: pointer;text-decoration: underline;" data-mac="'+o+'">'+o+'</span>';
		   }*/
		},
		{
			name : "IP Address",
			field : "ipAddress",
			width : "auto",
			noresize: true
		},
		{ name : "Username", field : "userName", noresize: true, width : "auto"},
		{
			name : "VLAN",
			field : "vlan",
			width : "auto",
			noresize: true
		},
		{
			name : "SSID",
			field : "ssid",
			noresize: true,
			width : "auto",
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				return obj.connectionType == 1 ? v : 'N/A';
			}
		},
		{ name: "RSSI", field: "rssi", noresize: true, width: "auto",
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				if(obj.connectionType == '2') {
					return 'N/A';
				}

				var display = '', displayClass='status-underline';
				if(v >= -60) {
					display = 'Excellent';
				} else if(v >= -70) {
					display = 'Very Good';
				} else if(v >= -80) {
					display = 'Good';
				} else {
					display = 'Poor';
				}
				return '<span class='+displayClass+'>'+display+'</span>';
			}
		},
		{ name: "SNR", field: "snr", noresize: true, width: "auto",
			formatter : function(v,i,obj){
				var obj = obj.grid.getItem(i);
				if(obj.connectionType == '2') {
					return 'N/A';
				}

				var display = '', displayClass='status-underline';
				if(v >= 35) {
					display = 'Very High';
				} else if(v >= 25) {
					display = 'High';
				} else if(v >= 15) {
					display = 'Medium';
				} else {
					display = 'Low';
				}

				return '<span class='+displayClass+'>'+display+'</span>';
			}
		}
	]);

	add('device.staticMulticastGroups',[
		  {
				name : "VLAN",
				field : "vlan",
				width : "auto"
			},
		  {
				name : "IP Address",
				field : "ipAddressProfile",
				width : "auto",
				formatter : function(obj){
					return obj.name;
				}
			},
		  {
				name : "Interfaces",
				field : "interfaceNames",
				formatter : function(objs){
					var interfaceDisplayNames = [];
					dojo.forEach(objs,function(interfaceName){
						if(interfaceName.indexOf("eth") == 0){
							interfaceDisplayNames.push("Eth1/" + interfaceName.replace("eth",""));
						} else if(interfaceName.indexOf("sfp") == 0) {
							var index = parseInt(interfaceName.replace("sfp",""))+24;
							interfaceDisplayNames.push("Eth1/" + index);
						}
					});
					return interfaceDisplayNames;
				},
				width : "auto"
			}
	]);


	add('config.accessConsole', [
		{
			name : "MAC Object",
			field : "macObject",
			width : "auto",
			formatter : function(v){
				return v.name;
			}
		},
		{
			name : 'Action',
			field : 'action',
			width : 'auto'
		}
	]);

	add('config.syslogServer', [
		{
			name: 'Syslog Servers',
			field: 'defaultServer',
			width: 'auto',
			formatter: function (obj) {
				return obj.serverIp.name;
			}
		},
		{
			name: 'Severity',
			field: 'defaultServer',
			width: '100px',
			formatter: function (obj) {
				return obj.severity;
			}
		},
		{
			name: 'Description',
			field: 'defaultServer',
			width: "auto",
			formatter: function (obj) {
				return obj.description;
			}
		},
		{
			name: 'Order',
			width: '60px',
			noresize: true,
			formatter: function () {
				return '<a href="javascript:;" class="ui-order ui-order-up"></a><a href="javascript:;" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.bonjourGatewaySettings', [
		{
			name: 'Service',
			field: 'bonjourService',
			width: 'auto',
			formatter: function (obj) {
				return obj.name;
			}
		},
		{
			name: 'Type',
			field: 'bonjourService',
			width: 'auto',
			formatter: function (obj) {
				return obj.type;
			}
		},
		{
			name: 'From VLAN Group',
			field: 'fromVlanGroup',
			width: 'auto',
			formatter: function (obj) {
				return (obj || {}).name || 'Any';
			}
		},
		{
			name: 'To VLAN Group',
			field: 'toVlanGroup',
			width: 'auto',
			formatter: function (obj) {
				return (obj || {}).name || 'Any';
			}
		},
		{
			name: 'Wireless Hop',
			field: 'maxWirelessHop',
			width: 'auto',
			formatter: function (value) {
				return value || '';
			}
		},
		{
			name: 'Realm',
			field: 'realmName',
			width: 'auto'
		},
		{
			name: 'Order',
			width: 'auto',
			formatter: function () {
				return '<a href="javascript:;" class="ui-order ui-order-up"></a><a href="javascript:;" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('deviceUtilities.neighborInformation', [
		{
			name : "Neighbor Information",
			field : "hostName",
			width : "auto",
			formatter:function(hostName){
				return hostName?hostName:"N/A";
			}
		},
		{
			name : 'MAC Address',
			field : 'macAddress',
			width : 'auto'
		},
		{
			name : 'Connection Time',
			field : 'connectionTime',
			width : 'auto',
			formatter: function(time) {
				var d = Math.floor(time / 86400),
					h = Math.floor((time - (d * 86400)) / 3600),
					m = Math.floor((time - (d * 86400) - (h * 3600)) / 60),
					s = Math.floor((time - (d * 86400) - (h * 3600) - (m * 60)) / 60);
				return d + 'Days' + h + 'Hrs ' + m + 'Mins ' + s + 'Secs';
			}
		},
		{
			name : 'Link Cost',
			field : 'linkCost',
			width : 'auto'
		},
		{
			name : 'RSSI',
			field : 'rssi',
			width : 'auto'
		},
		{
			name : 'Link Type',
			field : 'linkType',
			width : 'auto',
			formatter:function(v) {
				return ['Ehternrt Link','Wireless Link'][v];
			}
		}
	]);

	add('deviceUtilities.clientInformations', [
		{
			name : "MAC Address",
			field : "clientMac",
			width : "auto"
		},
		{
			name : 'IP Address',
			field : 'clientIp',
			width : 'auto'
		},
		{
			name : 'Host Name',
			field : 'hostName',
			width : 'auto'
		},
		{
			name : 'Device Name',
			field : 'deviceName',
			width : 'auto'
		},
		{
			name : 'Connection Time',
			field : 'connectionTime',
			width : 'auto'
		},
		{
			name : 'RSSI',
			field : 'rssi',
			width : 'auto'
		},
		{
			name : 'Authentication Method',
			field : 'authMethod',
			width : 'auto'
		},
		{
			name : 'Encryption Method',
			field : 'encryptionMethod',
			width : 'auto'
		},
		{
			name : 'Client Captive Web Portal Used',
			field : 'clientCwpUsed',
			width : 'auto'
		},
		{
			name : 'Radio Mode',
			field : 'radioMode',
			width : 'auto'
		},
		{
			name : 'SSID',
			field : 'ssid',
			width : 'auto'
		},
		{
			name : 'VLAN',
			field : 'vlan',
			width : 'auto'
		},
		{
			name : 'User Profile',
			field : 'userProfId',
			width : 'auto'
		},
		{
			name : 'Channel',
			field : 'channel',
			width : 'auto'
		},
		{
			name : 'Last Transmission Rate (Kbps)',
			field : 'lastTransRate',
			width : 'auto'
		}
	]);

	add('device.neighborDevice',[
		{
			name: 'Device Host Name',
			field: 'hostName',
			width: 'auto'
		},
		{
			name: 'IP Address',
			field: 'device',
			formatter: function(obj){
				return obj.ipAddress;
			},
			width: 'auto'
		}
	]);


	add('config.assignmentRule',[
		{
			name: 'Category',
			field: 'type',
			width: '210px'
		},
		{
			name: 'Value',
			field: 'value',
			width: 'auto'
		}
	]);

	add('config.assignRules', [
		{
			name: 'Assignment Rules',
			field: 'name',
			width: 'auto'
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto',
			formatter : function(des){
				return des + '<span class="table-action-icons table-sim-remove fn-right"></span>';
			}
		}
	]);

	add('config.walledGarden', [
		{
			name : "IP/Hostname",
			field : "serverIp",
			formatter: function(obj){
				return obj.value;
			},
			width : "auto"
		},

		{
			name : "Service",
			field : "service",
			width : "auto"
		},
		{
			name : "Protocol",
			field : "protocolNumber",
			width : "auto"
		},
		{
			name : "Port",
			field : "port",
			width : "auto"
		}
	]);
	add('config.certList', [
		{
			name: 'File Name',
			field: 'name',
			formatter : function(v){
				if(v == 'Default_CA.pem' || v == 'Default_key.pem'){
					return v;
				}
				return '<a href="#" class="J-fileName">'+v+'</a>';
			},
			width: 'auto'
		},
		{
			name: 'Type',
			field: 'fileType',
			width: '70px'
		},
		{
			name: 'Encrypted',
			field: 'encrypted',
			width: '65px'
		},
		{
			name: 'Size',
			field: 'fileSize',
			width: '70px'
		},
		{
			name: 'Date Modified',
			field: 'updatedAt',
			width: 'auto',
			formatter: function(obj){
				return new Date(obj);
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.extRadiusServerList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		/*{
			name: 'Used In',
			field: 'usedObj',
			width: '70px'
		}*/
	]);

	add('config.macObjsList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'MAC Objects/MAC OUIs',
			field: 'value',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		]);

	add('config.lldpCdpList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		]);

	add('config.rateLimitList',[
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		]);

	add('config.syslogServerList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		]);

	add('config.portTypeList', [
		{
			name : "Port Type Name",
			field : "name",
			width : "auto"
		},
		{
			name : "Device Series",
			field : "deviceSeries",
			width : "auto"
		},
		{
			name : "Authentication",
			field : "portType",
			width: "auto",
			formatter: function (v, i, obj) {
				var priorityMap = {
					'PRIMARY_802DOT1X': '802.1X',
					'PRIMARY_802DOT1X_SECONDARY_MAC': '802.1X, MAC',
					'PRIMARY_MAC': 'MAC',
					'PRIMARY_MAC_SECONDARY_802DOT1X': 'MAC, 802.1X'
				};

				var grid = obj.grid,
					 	portType = grid.getItem(i),
				 		ret = priorityMap[portType.authenticationMethodPriority] || '';

				if (portType.deviceSeries.toUpperCase() === 'AP_ROUTER') {
					if (portType.enableCwp) {
						ret += (ret ? ', ' : '') + 'CWP';
					}
				}

				return ret || undefined;
			}
		},
		{
			name: "User Profile",
			field: "portType",
			width: "auto",
			formatter: function(v,i,obj){
				var portType = obj.grid.getItem(i);
				if(portType.deviceSeries.toUpperCase() === 'AP_ROUTER'){
					return portType.defaultUserProfile && portType.defaultUserProfile.name;
				}else{
					if(portType.jsonType=="access-port" || portType.jsonType == 'phone-data-port'){
						var str = "";
						if(portType.authenticationMethodPriority && portType.defaultUserProfile){
							str += "<span>default: " + portType.defaultUserProfile.name+"</span>";
						}
						if(portType.authenticationMethodPriority && !portType.enableAllowMultipleHosts && portType.authenticationFailureUserProfile){
							var failStr = "<span>failure: " + portType.authenticationFailureUserProfile.name + "</span>";
							str = str == "" ? str + failStr : str + "<br/>"+failStr;
						}
						return str;
					}
				}
			}
		},
		{
			name: "VLAN",
			width: 'auto',
			field: "portType",
			formatter: function(v,i,obj){
				var portType = obj.grid.getItem(i);
				if(portType.jsonType=="trunk-port" || portType.jsonType == 'uplink-port'){
					return portType.vlan && portType.vlan.defVlanId + "[Allowed: " + portType.allowedVlans + "]";
				}
				if(portType.jsonType == "access-port" && !portType.authenticationMethodPriority && portType.vlan){
					return portType.vlan.name;
				}
				if(portType.jsonType == "phone-data-port"){
					return "Voice VLAN: "+ portType.voiceVlan.name + "<br/>Data VLAN: " + portType.vlan.name;
				}
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.locationServerList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		]);

	add('config.ssidCommonList', [
		{
			name : 'SSID',
			field : 'name',
			width : 'auto'
		},
		{
			name : 'Access Security',
			field : 'accessSecurity',
			width : 'auto',
			formatter : function(v){
				var map = {
					'802dot1x' : 'WPA / WPA2 802.1X (Enterprise)',
					'psk' : 'WPA / WPA2 PSK (Personal)',
					'ppsk' : 'Private PSK',
					'wep' : 'WEP',
					'open-access' : 'Unsecured (Open) Network'
				};

				return map[v.jsonType] || null;
			}
		},
		{
			name : 'VLAN',
			field : 'defaultUserProfile',
			width : 'auto',
			formatter : function(profile){
				return profile.vlan ? profile.vlan.name : '';
			}
		},
		{
			name : 'Default User Profile',
			field : 'defaultUserProfile',
			width : 'auto',
			formatter : function(profile){
				return profile.name;
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);
	add('config.markerMapList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
		]);

	add('config.ipObjectList', [{
		name: 'Name',
		field: 'name',
		width: 'auto',
		formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
		}
	}, {
		name: 'Ip Address/Host Name',
		field: 'value',
		width: 'auto'
	},
	{
		name: 'Used By',
		field: 'usedby',
		width: 'auto',
		formatter : function(v){
			return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
		}
	}
	]);

	add('config.vlanList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.userProfileList', [{
		name: 'Name',
		field: 'name',
		width: 'auto',
		formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
		}
	},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.tunnelPolicyList', [{
		name: 'Name',
		field: 'name',
		width: 'auto',
		formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
		}
	},{
		name: 'Description',
		field: 'description',
		width: 'auto'
	},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.classifierMapList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		}, {
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.accessConsoleList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		}, {
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
			{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.ntpAssignmentList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		}, {
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.snmpAssignmentList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		}, {
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'UsedBy',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.wipsList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		}, {
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.macFirewallPolicies', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		}, {
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
			{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.osObjects', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.macFirewallList', [
		{
			name : "Source MAC",
			field : "sourceMac",
			formatter : function(obj){
				return obj ? obj.name : 'Any';
			},
			width : "auto"
		}, {
			name : "Destination MAC",
			field : "destinationMac",
			formatter : function(obj){
				return obj ? obj.name : 'Any';
			},
			width : "auto"
		}, {
			name : "Action",
			field : "action",
			width : "auto"
		}, {
			name : "Logging",
			field : "loggingType",
			width : "auto"
		}, {
			name : "Order",
			width: "60px",
			formatter: function() {
				return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.manageOptionList', [{
		name: 'Name',
		field: 'name',
		width: 'auto',
		formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
		}
	}, {
		name: 'Description',
		field: 'description',
		width: 'auto'
	},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.scheduleList', [{
		name: 'Name',
		field: 'name',
		width: 'auto',
		formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
		}
	}, {
		name: 'Description',
		field: 'description',
		width: 'auto'
	},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.trafficFilterList', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.bonjourGateList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.dnsAssignList', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto',
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.ipFirewallPolList', [{
		name: 'Name',
		field: 'name',
		width: 'auto',
		formatter : function(v){
			return '<a href="#" class="J-item-edit">'+v+'</a>';
		}
	}, {
		name: 'Description',
		field: 'description',
		width: 'auto'
	},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.ipFirewallRuleList', [{
		name: "Source IP",
		field: "sourceIp",
		formatter: function(obj) {
			return obj ? obj.name : 'Any';
		},
		width: "auto"
	}, {
		name: "Destination IP",
		field: "destinationIp",
		formatter: function(obj) {
			return obj ? obj.name : 'Any';
		},
		width: "auto"
	}, {
		name: "Service",
		field: "service",
		formatter: function(obj) {
			if (obj == null) return "Any";
			return obj.fullName || obj.name;
		},
		width: "200px",
		style: "overflow:hidden; text-overflow:ellipsis; white-space:nowrap"
	}, {
		name: "Action",
		field: "action",
		width: "auto"
	}, {
		name: "Logging",
		field: "loggingType",
		width: "auto"
	}, {
		name : "Order",
		width: "60px",
		formatter: function() {
			return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
		}
		}]);

	add('config.assignment.ldap', [
		{
			name : 'LDAP Server OUs or User Groups',
			field : 'groupName',
			width : 'auto'
		},
		{
			name : '',
			field : '',
			width : 'auto',
			formatter : function(){
				return '<span class="table-action-icons table-sim-remove"></span>';
			}
		}
	]);


	add('plan.deviceList', [
		{
			name: 'Status',
			field: 'isConnected',
			width: 'auto',
			formatter: function(v, i, obj) {
				var obj = obj.grid.getItem(i);
				var status = (Boolean(obj.isConnected) === true) ? '<span class="hive-status dashboard-icon hive-status-true"></span>' : '<span class="hive-status dashboard-icon hive-status-false"></span>';
				return ((obj.simType == 'REAL') ? status : (status + '<span title="simulated device" class="sim-device-type">SIM</span>'));
			}
		},
		{
			name: 'Host Name',
			field: 'hostname',
			width: 'auto'
		},
		{
			name: 'Device Model',
			field: 'productType',
			width: 'auto',
			formatter: function (obj) {
				return obj.replace("_", "");
			}
		},
		{
			name: 'IP Address',
			field: 'ipAddress',
			width: 'auto',
			formatter : function(obj){
				return obj || '';
			}
		},
		{
			name: 'MAC Address',
			field: 'macAddress',
			width: 'auto'
		},
		{
			name: 'Serial Number',
			field: 'serialNumber',
			width: 'auto'
		}
	]);


	add('config.ahRadiusServer', [
		{
			name : 'Host Name',
			field : 'hostName',
			width : 'auto'
		},{
			name : 'Device Type',
			field : 'device',
			formatter: function(obj){
				return obj.productType;
			},
			width : 'auto'
		},{
			name : 'IP Address',
			field : 'device',
			formatter: function(obj){
				return obj.ipAddress;
			},
			width : 'auto'
		},{
			name : 'Location',
			field : 'locationName',
			formatter : function(v){
				var displayName = "Assign", displayTitle="Assign";
				if(v) {
					displayTitle = v.length ==1?v.join(""):v.join("&nbsp;&gt;&gt;&nbsp;");
					displayName = v.length ==1?v.join(""):("&gt;&gt;&nbsp;"+v[v.length-1]);
				}
				return "<a href='javascript:void(0);' style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
			},
			width : 'auto'
		},{
			name : 'AAA Server Settings',
			field : 'aaaProfile',
			width : 'auto',
			formatter : function(obj, i, o){
				var str = '<a class="sp-rule-select-norm ml5 J-select-radius" href="javascript:;"></a>',
					name = o.grid.getItem(i).radiusServerName,
					serverName = obj && obj.name ? obj.name : name ? name : '';

				//return (obj ? '<a href="#" class="J-edit-radius">Modify</a>' : '') + str;
				return '<a href="#" class="J-edit-radius">'+serverName+'</a>' + str;
			}
		}
	]);

	add('config.selectDevicesToConfig', [
		{
			name : 'Host Name',
			field : 'hostName',
			width : 'auto'
		},{
			name : 'Device Type',
			field : 'device',
			formatter: function(obj){
				return obj.productType;
			},
			width : 'auto'
		},{
			name : 'IP Address',
			field : 'device',
			formatter: function(obj){
				return obj.ipAddress;
			},
			width : 'auto'
		},{
			name : 'Location',
			field : 'locationName',
			formatter : function(v){
				var displayName = "Assign", displayTitle="Assign";
				if(v) {
					displayTitle = v.length ==1?v.join(""):v.join("&nbsp;&gt;&gt;&nbsp;");
					displayName = v.length ==1?v.join(""):("&gt;&gt;&nbsp;"+v[v.length-1]);
				}
				return "<a href='javascript:void(0);' style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
			},
			width : 'auto'
		}
	]);

	add('config.activeDirectory', [
		{
			name : 'Active Directory Server Name',
			field : 'name',
			width : '300px'
		},
		{
			name: 'Domain',
			field: 'domain',
			width: 'auto'
		},
		{
			name: 'Order',
			width : '200px',
			formatter: function () {
				return '<a href="javascript:;" class="ui-order ui-order-up"></a><a href="javascript:;" class="ui-order ui-order-down ml10"></a>';
			}
		},
	]);

	add('config.ADServerManagement', [
		{
			name : 'Active Directory Server Name',
			field : 'name',
			width : '300px'
		},
		{
			name: 'Domain',
			field: 'domain',
			width: 'auto'
		},
		{
			name: 'Order',
			width : '200px',
			formatter: function () {
				return '<a href="javascript:;" class="ui-order ui-order-up"></a><a href="javascript:;" class="ui-order ui-order-down ml10"></a>';
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.ldapServer', [
		{
			name : 'LDAP Server Name',
			field : 'name',
			width : '300px'
		},
		{
			name: 'LDAP Server Address',
			field: 'serverIp',
			formatter: function (obj) {
				return obj.value;
			},
			width: 'auto'
		},
		{
			name: 'Order',
			width : '200px',
			formatter: function () {
				return '<a href="javascript:;" class="ui-order ui-order-up"></a><a href="javascript:;" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.ldapServerManagement', [
		{
			name : 'LDAP Server Name',
			field : 'name',
			width : '300px'
		},
		{
			name: 'LDAP Server Address',
			field: 'serverIp',
			formatter: function (obj) {
				return obj.value;
			},
			width: 'auto'
		},
		{
			name: 'Order',
			width : '200px',
			formatter: function () {
				return '<a href="javascript:;" class="ui-order ui-order-up"></a><a href="javascript:;" class="ui-order ui-order-down ml10"></a>';
			}
		},
		{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.localUserGroup', [
	{
		name : 'User Group Name',
		field : 'name',
		width : 'auto',
		formatter : function(v){
			return '<a href="#" class="J-add-local">'+v+'</a>';
		}
	},{
		name : '# of Users',
		field : 'userCount',
		width : 'auto',
		formatter : function(v){
			return '<a href="#" class="J-user-count">'+v+'</a><span class="ml10"></span><a href="javascript:void(0)" class="J-add-user">Add</a>';
		}
	},{
		name : 'Description',
		field : 'description',
		width : 'auto'
	}
	]);


	add('config.radius.step1', [
	{
		name : 'Status',
		field : '',
		width : 'auto'
	},{
		name : 'Host Name',
		field : 'name',
		width : 'auto'
	},{
		name : 'IP Address',
		field : 'ipaddress',
		width : 'auto'
	},{
		name : 'Netmask',
		field : 'netmask',
		width : 'auto'
	},{
		name : 'Default Gateway',
		field : 'netmask',
		width : 'auto'
	},{
		name : 'AD aware DNS Server',
		field : 'netmask',
		width : 'auto'
	}

	]);

	add('config.selectLocalUserGroups',[
	{
		name : "User Group Name",
		field : "name",
		width : "auto"
	},{
		name : 'User Type',
		field : 'jsonType',
		width : 'auto'
	},{
		name : "# of Users",
		field : "userCount",
		width : "auto",
		formatter: function(v,i,obj) {
			var d = obj.grid.getItem(i),
				revoked = d.revokedUserCount || 0;

			return v-revoked + '<span class="table-action-icons table-sim-remove fn-right"></span>';
		}
	 }
	]);

	add('config.LDAPServerList', [
		{
			name: 'LDAP Server Name',
			field: 'name',
			width: 'auto'
		},{
			name: 'LDAP Server Address',
			field: 'serverIp',
			formatter: function (obj) {
				return obj.value;
			},
			width: 'auto'

		},{
			name: 'Description',
			field: 'description',
			width: 'auto'
		}
	]);

	add('config.radiusClient', [
		{
			name: 'IP Address/Host Name',
			field: 'clientIp',
			formatter: function(obj){
				return obj.name;
			},
			width: 'auto'
		},{
			name: 'Shared Secret',
			field: 'sharedSecret',
			width: 'auto',
			formatter : function(){
				return '******';
			}
		},{
			name: 'Description',
			field: 'description',
			width: 'auto'
		}
	]);

	add('config.selectExternalRadius', [
		{
			name: 'Name',
			field: 'name',
			width: 'auto'
		},{
			name: 'IP/Host Name',
			field: 'serverIp',
			width: 'auto',
			formatter : function(obj){
				return obj.value;
			}
		}
	]);

	add('config.selectInternalRadius', [
		{
			name: 'Name',
			field: 'device',
			width: 'auto',
			formatter : function(obj){
				return obj.hostname;
			}
		},{
			name: 'IP/Host Name',
			field: 'device',
			width: 'auto',
			formatter : function(obj){
				return obj.ipAddress;
			}
		}
	]);

	add('form.usableObject', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto'
		}
	]);

	//for special resuable structure
	//DNS Object resuable
	add('form.usableObject.dnsObject', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto'
		},
		{
			name: 'IP Address',
			field: 'primaryServerIp',
			formatter: function(v, i, obj) {
				var gridData = obj.grid.getItem(i),
					ipStr = v;
				gridData.backupServerIp && (ipStr = ipStr + '/' + gridData.backupServerIp);
				gridData.backup2ServerIp && (ipStr = ipStr + '/' + gridData.backup2ServerIp);
				return ipStr;
			},
			width: 'auto'
		}
	]);

	add('form.usableObject.deviceTemplate', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto'
		},
		{
			name: 'Model',
			field: 'productType',
			width: 'auto',
			formatter: function(obj) {
				return obj.replace("_","");
			}
		}
	]);

	add('form.usableObject.aaaServer', [
		{
			name : 'Name',
			field : 'name',
			width : 'auto'
		}, {
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.selectADToDB', [
		{
			name: 'Name',
			field: 'name',
			width: '200px'
		},
		{
			name: 'Domain',
			field: 'domain',
			width: 'auto'
		}
	]);

	add('config.authType', [
		{
			name: "AUTH Type",
			field: "name",
			width: "auto"
		},
		{
			name: "Order",
			width: "auto",
			formatter: function(){
				return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
			}
		}
	]);

	add('config.radiusServer', [
		{
			name : "Name",
			field : "xx",
			width : "auto",
			formatter: function(v, i, obj) {
				var d = obj.grid.getItem(i),
					isRadius = d.device,
					name = isRadius ? d.device.hostname : d.name;

				return '<a href="#" class="J-edit-radius">'+name+'</a>';
			}
		},{
				name : "Type",
				field : "xx",
				width : "auto",
				formatter : function(v, i, obj){
					var d = obj.grid.getItem(i),
						isRadius = d.device;

					return isRadius ? 'Aerohive RADIUS Server' : 'External RADIUS Server';
				}
		},{
				name : "IP / hostname",
				field : "xx",
				width : "auto",
				formatter: function(v, i, obj) {
					var d = obj.grid.getItem(i),
						isRadius = d.device;

					return isRadius ? d.device.ipAddress : d.serverIp.value;
				}
		}
	]);


	add('config.ssid.group', [
		{
				name : "User Group Name",
				field : "name",
				width : "auto",
				formatter : function(v){
					return '<a href="javescript:void(0)" class="J-edit-group">'+v+'</a>';
				}
			},
			{
				name : 'User Type',
				field : 'groupType',
				width : 'auto',
				formatter : function(v){
					return v == 'PPSK' ? 'Private PSK-Manual' : 'Private PSK-Auto';
				}
			},
			{
				name : "# of Users",
				field : "_item",
				width : "auto",
				formatter : function(v,i,obj){
					var userCount = v.userCount,
						d = obj.grid.getItem(i),
						revoked = d.revokedUserCount || 0,
						str = userCount-revoked != 0 ? '<a href="javescript:void(0)" class="J-user-acc">'+(userCount-revoked)+'</a>' : '<span>'+(userCount-revoked)+'</span>';
					str = (v.pskValidityPeriod == "RECURRING" && v.enablePpskRotation)?str:str + '<span class="ml10"></span><a href="javascript:void(0)" class="add-user">Add</a>';
					return str;
				}
			},
			{
				name : "Description",
				field : "description",
				width : "auto"
			}
	]);

	add('config.ssid.radiusServer', [
		{
				name : "Name",
				field : "xx",
				width : "auto",
				formatter: function(v, i, obj) {
					var d = obj.grid.getItem(i),
						isRadius = d.device,
						name = isRadius ? d.device.hostname : d.name;

					return '<a href="#" class="J-edit-radius">'+name+'</a>';
				}
			},{
				name : "Type",
				field : "xx",
				width : "auto",
				formatter : function(v, i, obj){
					var d = obj.grid.getItem(i),
						isRadius = d.device;

					return isRadius ? 'Aerohive RADIUS Server' : 'External RADIUS Server';
				}
			},{
				name : "IP/Hostname",
				field : "xx",
				width : "auto",
				formatter: function(v, i, obj) {
					var d = obj.grid.getItem(i),
						isRadius = d.device;

					return isRadius ? d.device.ipAddress : d.serverIp.value;
				}
			},{
				name : "Order",
				field : "order",
				width : "100px",
				formatter: function() {
					return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
				}
			}

	]);

	add('config.ssid.profileAssignment', function(arr){return [
		{
				name: "User Profile Name",
				field: "userProfile",
				width: "220px",
				formatter : function(userprofile){
					return '<a href="javascript:;" class="J-edit-user-profile">' + userprofile.name + '</a>';
				},
				styles : 'vertical-align : top;padding:8px 5px 0;'
			},{
				name: "VLAN",
				field: "userProfile",
				width: "80px",
				formatter : function(userprofile){
					return userprofile.vlan.name;
				},
				styles : 'vertical-align : top;padding:8px 5px 0;'
			},{
				name: "Assignment Rules",
				field: "userProfileAssignment",
				width: "220px",
				formatter : function(obj){
					var ret = '<a class ="sp-rule-add-norm mr5 J-add-rule" href="javascript:;" title="Add a user profile assignment rule"></a><a class ="sp-rule-select-norm mr5 J-select-rule" href="javascript:;" title="Select a user profile assignment rule"></a>';

					if (obj) {
						ret += '<a class ="J-edit-rule" href="javascript:;">' + obj.name + '</a>';
					}

					return ret;
				},
				styles : 'vertical-align : top;padding:8px 5px 0;'
			},{
				name: "Assignment Description",
				field: "userProfileAssignment",
				width: "auto",
				formatter : function(obj, index, dr){
					var collapsed = !arr[index];
					var rules = new __Assignment().getTypeValuePairs(obj);
					var hasRules = !!rules.length, fn;

					var result =
					'<div class="J-triggerAssignDetails"'+ (hasRules ? ' style="cursor:pointer;"' : '') + '>' +
					(hasRules ? (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) : '') +
					(obj ? obj.description : '') + '</div>';

					var tplDetail =
						'<div class="J-tblRules mt10 ml10 font11" style="display:${display};">' +
							'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
								'<thead>' +
									'<tr style="background:#F5F4F2;"><td class="w100">Type</td><td>Value</td></tr>' +
								'</thead>' +
								'<tbody>${content}</tbody>' +
							'</table>' +
						'</div>';


					var details = rules.map(function (item) {
						var f = 'function' == typeof item,
							str = 'style="border-radius:0;word-break:break-word;"',
							tmpl = f ? '<tr><td class="w100" '+str+'>Location</td><td class="J-assign-local-value" '+str+'></td></tr>' :
										'<tr><td class="w100" '+str+'>${type}</td><td '+str+'>${value}</td></tr>';

						f && (fn = item);

						return string.substitute(tmpl, item);
					}).join('');

					fn && fn(function(data){
							setTimeout(function(){
								var node = query('.dojoxGridRow', dr.grid.viewsNode)[index];
								query('.J-assign-local-value',node)[0].innerHTML = data.value;
							},1e2);
						});

					if (details) {
						result += string.substitute(tplDetail, {
							content: details,
							display: collapsed ? 'none' : ''
						});
					}

					return result;
				}
			}, {
				name : "Order",
				field : "order",
				width : "100px",
				formatter: function() {
					return '<a href="javascript:void(0)" class="ui-order ui-order-up"></a><a href="javascript:void(0)" class="ui-order ui-order-down ml10"></a>';
				},
				styles : 'vertical-align : top;padding:8px 5px 0;'
			}
	]});

	add('config.osObject.DHCPOption', [
		{
			name: 'OS Type',
			field: 'osType',
			width: 'auto'
		},
		{
			name: 'Parameter Request List',
			field: 'option55',
			width: 'auto',
			formatter: function (value) {
				return value || 'Default';
			}
		}
	]);

	add('config.osObject.HTTPAgent', [
		{
			name: 'OS Type',
			field: 'osType',
			width: 'auto'
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		}
	]);


	add('config.deployDevice',[
		{
					name : "Status",
					width: "70px",
					noresize : true,
					field: "isConnected",
					formatter: function(v,i,obj) {
						obj = obj.grid.getItem(i);
						var iconClass = obj.simType !== 'REAL'? 'sim-icon' : 'dashboard-icon';
						var titleText = obj.simType !== 'REAL'? 'Simulated device' : (v ? 'Connected' : 'Disconnected');
						var status;
						var status = (v == true) ? '<span class="hive-status hive-status-true '+ iconClass +'" title="' + titleText + '"></span>' : '<span class="hive-status hive-status-false '+ iconClass +'"></span>';
						var view = "<span class='J-view"+ (obj.configMismatch ? " ui-icon-sprite-mismatch " : " ui-icon-sprite-match ") +"ml5' title='Configuration Audit'></span>";
						return status + view;
					}
				},
				{
					name : "Device Name",
					field : "hostname",
					width : "auto"
				},
				{
					name: "Device Model",
					field:"productType",
					width: "auto",
					formatter: function(obj) {
						return obj.replace("_","");
					}
				},
				{
					name : "IP Address",
					width: "auto",
					field:"ipAddress"
				},
				{
					name : "MAC Address",
					width: "auto",
					field:"macAddress"
				},
				{
					name: "Serial Number",
					field: "serialNumber",
					width: "auto"
				},
				{
					name : "Last Updated On",
					width: "auto",
					field : 'statusDate',
					formatter : function(obj){
						return obj ? obj.msg : '';
					}
				}
	]);

	add('config.classifiermaps.servicesList',[
		{
			name : "Services",
			field : "service",
			width : "auto",
			formatter: function(obj){
				return obj.fullName || obj.name;
			}
		},
		{
			name : "QoS Class",
			field : "qosClass",
			width : "auto"
		},
		{
			name : "Action",
			field : "action",
			width : "auto"
		},
		{
			name : "Logging",
			field: "logging",
			width: "auto"
		}
	]);

	add('config.classifiermaps.ouiList',[
		{
			name : "MAC OUIs",
			field : "macOuiProfile",
			width : "auto",
			formatter: function(obj){
				return obj.name;
			}
		},
		{
			name : "QoS Class",
			field : "qosClass",
			width : "auto"
		},
		{
			name : "Action",
			field : "action",
			width : "auto"
		},
		{
			name : "Logging",
			field : "logging",
			width : "auto"
		}
	]);

	add('config.classifiermaps.ssidList',[
		{
			name : "SSIDs",
			field : "ssidProfile",
			width : "auto",
			formatter: function(obj){
				return obj.name;
			}
		},
		{
			name : "QoS Class",
			field : "qosClass",
			width : "auto"
		}
	]);

	add('device.list', [
		{
			name: "Status",
			width: "50px",
			field: "isConnected",
			noresize: true,
			formatter: function (v, i, obj) {
				obj = obj.grid.getItem(i);
				var iconClass = obj.simType !== 'REAL'? 'sim-icon' : 'dashboard-icon';
				var titleText = obj.simType !== 'REAL'? 'Simulated device' : (v ? 'Connected' : 'Disconnected');
				var status;
				var status = (v == true) ? '<span class="hive-status hive-status-true '+ iconClass +'" title="' + titleText + '"></span>' : '<span class="hive-status hive-status-false '+ iconClass +'"></span>';
				var view = "<span class='J-view"+ (obj.configMismatch ? " ui-icon-sprite-mismatch " : " ui-icon-sprite-match ") +"ml5' title='Configuration Audit'></span>";
				return status + view;
			}
		},
		{
			name: "Host Name",
			field: "hostname",
			width: "100px",
			noresize: true,
			formatter: function (v, i, obj) {
				obj = obj.grid.getItem(i);
				return '<a href="#/devices/' + obj.id + '/overview" class="J-ipaddress" title="' + v + '">' + v + '</a>';
			}
		},
		{
			name: "Clients",
			field: 'activeClientCount',
			width: "auto",
			formatter: function (v) {
				return v;
			}
		},
		{
			name: "Device",
			field: "productType",
			width: "150px",
			noresize: true,
			formatter: function (v, i, obj) {
				obj = obj.grid.getItem(i);
				var model = "<span style='display: inline-block;width: 40px;'>Model:</span>" + v.replace("_", "");
				var serial = "<span style='display: inline-block;width: 40px;'>Serial:</span>"+obj.serialNumber;
				return model + "<br/>" + serial;
			}
		},
		{
			name: "IP / MAC",
			field: "ipAddress",
			width: "140px",
			formatter: function (v, i, obj) {
				obj = obj.grid.getItem(i);
				var ip = "<span style='display: inline-block;width: 32px;'>IP:</span>"+(v||"N/A");
				var map = "<span style='display: inline-block;width: 32px;'>MAC:</span>"+(obj.macAddress||"N/A");
				return ip + "<br/>" + map;
			}
		},
		{
			name: "Location",
			field: "locationNames",
			width: "100px",
			noresize: true,
			formatter : function(v){
				var displayName = "Assign", displayTitle="Assign";
				if(v) {
					displayTitle = v.length ==1?v.join(""):v.join("&nbsp;&gt;&gt;&nbsp;");
					displayName = v.length ==1?v.join(""):("&gt;&gt;&nbsp;"+v[v.length-1]);
				}
				return "<a href='javascript:void(0);' style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
			}
		},
		{
			name: "Device Mode",
			width: "65px",
			field: "apType",
			noresize: true,
			formatter: function (v, i, obj) {
							obj = obj.grid.getItem(i);
							return obj.apType === 'MP'? 'Mesh Point' : obj.apType === 'PORTAL'? 'Portal' : '';
			}
		},
		{
			name: "HiveOS Version",
			field: "displayVer",
			width: "50px",
			noresize: true,
			formatter : function(v) {
				return "<span title='"+v+"' style='display: inline-block;width:90px;' class='fn-ellipsis'>" + v + "</span>";
			}
		},
		{
			name: "Updated on",
			field: 'statusDate',
			width: "65px",
			formatter: function (obj) {
				return obj ? obj.msg : '';
			}
		},
		{
			name: "Management Status",
			field: 'adminState',
			width: "78px",
			formatter: function (obj) {
				var title = obj.toLowerCase(), display = obj.toLowerCase();
				if("BOOTSTRAP,STAGED".indexOf(obj) != -1) {
					display = "setting up...";
				}
				return '<span class="capitalize" title='+title+'>' + display + '</span>';
			}
		}
	]);
	add('dashboard.card.alarm.list', [
      {
		name: "Timestamp",
		width: "125px",
		field: "timestamp",
		noresize: true,
		formatter: function (value) {
			return '<div>'+Formatter.formatTime(value)+'</div>';
		}
      },
      {
		name: "Category",
		width: "131px",
		field: "category",
		noresize: true
       },
       {
			name: "Host Name",
			width: "164px",
			field: "hostname",
			noresize: true,
			formatter : function(item) {
    		  var l = item.length;
    		  var displayName = l>16 ?item.substring(0,14)+'...':item;
				// style="text-decoration: none;color:#717174;"
             return '<span title="'+item+'" >'+displayName+'</a>';
         }
       },
       {
  			name: "Description",
  			width: "164px",
  			field: "description",
  			noresize: false
         },
         {
  			name: "Device MAC",
  			width: "144px",
  			field: "deviceMac",
  			noresize: true
          },
          {
 			name: "Client MAC",
 			width: "auto",
 			field: "clientMac",
 			noresize: true
         }

	]);

	add('dashboard.card.device.list', [
	{
		name: "Status",
		width: "50px",
		field: "isConnected",
		noresize: true,
		formatter: function (v, i, obj) {
						obj = obj.grid.getItem(i);
						var iconClass = obj.simType !== 'REAL'? 'sim-icon' : 'dashboard-icon';
						var titleText = obj.simType !== 'REAL'? 'Simulated device' : (v ? 'Connected' : 'Disconnected');
						var status;
						var status = (v == true) ? '<span class="hive-status hive-status-true '+ iconClass +'" title="' + titleText + '"></span>' : '<span class="hive-status hive-status-false '+ iconClass +'"></span>';
						var view = "<span class='J-view"+ (obj.configMismatch ? " ui-icon-sprite-mismatch " : " ui-icon-sprite-match ") +"ml5' title='Configuration Audit'></span>";
						return status + view;
		}
	},
	{
		name: "Host Name",
		field: "hostname",
		width: "100px",
		noresize: true,
		formatter: function (v, i, obj) {
			obj = obj.grid.getItem(i);
			return '<a href="#/devices/' + obj.id + '/overview" class="J-ipaddress" title="' + v + '">' + v + '</a>';
		}
	},
	{
		name: "Clients",
		field: 'activeClientCount',
		width: "auto",
		formatter: function (v) {
			return v;
		}
	},
	{
		name: "Device",
		field: "productType",
		width: "150px",
		noresize: true,
		formatter: function (v, i, obj) {
			obj = obj.grid.getItem(i);
			var model = "<span style='display: inline-block;width: 40px;'>Model:</span>" + v.replace("_", "");
			var serial = "<span style='display: inline-block;width: 40px;'>Serial:</span>"+obj.serialNumber;
			return model + "<br/>" + serial;
		}
	},
	{
		name: "IP / MAC",
		field: "ipAddress",
		width: "150px",
		formatter: function (v, i, obj) {
			obj = obj.grid.getItem(i);
			var ip = "<span style='display: inline-block;width: 32px;'>IP:</span>"+(v||"N/A");
			var map = "<span style='display: inline-block;width: 32px;'>MAC:</span>"+(obj.macAddress||"N/A");
			return ip + "<br/>" + map;
		}
	},
	{
		name: "Device Mode",
		width: "70px",
		field: "apType",
		noresize: true,
		formatter: function (v, i, obj) {
						obj = obj.grid.getItem(i);
						return obj.apType === 'MP'? 'Mesh Point' : obj.apType === 'PORTAL'? 'Portal' : '';
		}
	},
	{
		name: "HiveOS Version",
		field: "softwareVersion",
		width: "50px",
		noresize: true
	},
	{
		name: "Updated on",
		field: 'statusDate',
		width: "auto",
		formatter: function (v, i, obj) {
			obj = obj.grid.getItem(i)
			return obj ? Formatter.formatTime(obj.updatedAt) : '';
			}
		}
	]);


	add('security.rougeApList', function (i18n) {
		return [
			{
				name: i18n.bssid,
				width: "auto",
				field: "idpBssid",
				noresize: true
			},
			{
				name: i18n.vendor,
				field: "vendor",
				width: "auto",
				noresize: true
			},
			{
				name: i18n.ssid,
				field: 'ssid',
				width: "auto"
			},
			{
				name: i18n.idpAction,
				field: "idpAction",
				width: "auto",
				noresize: true,
				formatter: function(v, i, obj) {
					var rtn = "";
					switch(v) {
						case "INNET":
							rtn = i18n.innet;
							break;
						case "UNAUTHORIZED":
							rtn = i18n.unauthorized;
							break;
						case "REMOVED":
							rtn = i18n.removed;
							break;
						default:
							break;
					}
					return rtn;
				}
			},
			{
				name: i18n.clientCount,
				field: "clientCount",
				width: "auto"
			},
			{
				name: i18n.location,
				field: "locationNames",
				width: "100px",
				noresize: true,
				formatter: function(v, i, obj) {
					obj = obj.grid.getItem(i);
					var displayName = "", displayTitle="";
					if(v) {
						displayTitle = v.length ==1?v.join(""):v.join("&nbsp;&gt;&gt;&nbsp;");
						displayName = v.length ==1?v.join(""):("&gt;&gt;&nbsp;"+v[v.length-1]);
					}
					if(obj.locationId && obj.locationId < 0) {
						return "<a href='javascript:void(0);' style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
					} else {
						return "<span style='display: inline-block;width:100px;' title='"+displayTitle+"' class='fn-ellipsis'>" + displayName + "</span>";
					}
				}
			},
			{
				name: i18n.compliance,
				field: "compliance",
				width: "90px",
				noresize: true,
				formatter: function (value) {
					value = value.toString(2);
					var arr = value.split("").reverse(),
						display = [],
						keys = ["Open auth", "WEP auth", "WPA auth", "WMM support", "OUI", "SSID", "Short preamble", "Short beacons", "Ad hoc"];
					arr.forEach(function(item, i) {
						if(parseInt(item)) {
							display.push(keys[i]);
						}
					});
					if(!display.length) return "";
					return "<span title='"+display.join("; ")+"' style='display: inline-block;width:90px;' class='fn-ellipsis'>" + display.join("; ") + "</span>";
				}
			},
			{
				name: i18n.deviceName,
				field: 'deviceName',
				width: "auto",
				formatter: function(v, i, obj) {
					obj = obj.grid.getItem(i);
					return "<a href='javascript:void(0);' class='entity-device' data-name='"+v+"' data-id='"+obj.deviceId+"'>" + v + "</a>";
				}
			},
			{
				name: i18n.reportTime,
				field: 'reportTime',
				width: "auto",
				formatter: function(v) {
					return Formatter.formatTime(v);
				}
			}
		]
	});

	add('security.rougeClientList', function (i18n) {
		return	[
			{
				name: i18n.macAddress,
				width: "auto",
				field: "idpBssid",
				noresize: true
			},
			{
				name: i18n.vendor,
				field: "vendor",
				width: "auto",
				noresize: true
			},
			{
				name: i18n.idpAction,
				field: "idpAction",
				width: "auto",
				noresize: true,
				formatter: function(v, i, obj) {
					var rtn = "";
					switch(v) {
						case "INNET":
							rtn = i18n.innet;
							break;
						case "UNAUTHORIZED":
							rtn = i18n.unauthorized;
							break;
						case "REMOVED":
							rtn = i18n.removed;
							break;
						default:
							break;
					}
					return rtn;
				}
			},
			{
				name: i18n.ssid,
				field: 'ssid',
				width: "auto"
			},
			{
				name: i18n.location,
				field: "locationNames",
				width: "100px",
				noresize: true,
				formatter: function(v, i, obj) {
					obj = obj.grid.getItem(i);
					var displayName = "", displayTitle="";
					if(v) {
						displayTitle = v.length ==1?v.join(""):v.join("&nbsp;&gt;&gt;&nbsp;");
						displayName = v.length ==1?v.join(""):("&gt;&gt;&nbsp;"+v[v.length-1]);
					}
					if(obj.locationId && obj.locationId < 0) {
						return "<a href='javascript:void(0);' style='display: inline-block;width:100px;' title='"+displayTitle+"' class='J-location fn-ellipsis'>" + displayName + "</a>";
					} else {
						return "<span style='display: inline-block;width:100px;' title='"+displayTitle+"' class='fn-ellipsis'>" + displayName + "</span>";
					}
				}
			},
			{
				name: i18n.deviceName,
				field: "deviceName",
				width: "auto",
				formatter: function(v, i, obj) {
					obj = obj.grid.getItem(i);
					return "<a href='javascript:void(0);' class='entity-device' data-name='"+v+"' data-id='"+obj.deviceId+"'>" + v + "</a>";
				}
			},
			{
				name: i18n.reportTime,
				field: "reportTime",
				width: "auto",
				noresize: true,
				formatter: function(v) {
					return Formatter.formatTime(v);
				}
			}
		]
	});

	add('usermanagements.auditLogs', function (i18n) {
		return [
			{
				name: i18n.timestamp,
				field: 'timeStamp',
				width: '175px',
				formatter: function (value) {
					return '<div>'+Formatter.formatTime(value)+'</div>';
				}
			},
			{
				name: i18n.category,
				field: 'category',
				width: '90px',
				formatter: function (value) {
					return i18n.categoryFormatter[value];
				}
			},
			{
				name: i18n.admin,
				field: 'userName',
				width: '200px'
			},
			{
				name: i18n.description,
				field: 'description',
				width: 'auto'
			}
		];
	});

	add('deviceonboarding.devices', [
		{
			name: 'Host Name',
			field: 'hostName',
			width: 'auto'
		},
		{
			name: 'Product Type',
			field: 'deviceModel',
			width: 'auto',
			formatter: function (value) {
				return value.replace('_', '');
			}
		},
		{
			name: 'Serial Number',
			field: 'serialNumber',
			width: 'auto'
		},
		{
			name: 'Location',
			field: 'locationNames',
			width: 'auto',
			formatter: function (value) {
				var displayName = null, displayTitle="";
				if(value) {
					displayTitle = value.length ==1?value.join(""):value.join("&gt;&gt;&nbsp;");
					displayName = value.length ==1?value.join(""):("&gt;&gt;&nbsp;"+value[value.length-1]);
					displayName = "<span title="+displayTitle+">"+displayName+"</span>";
				}
				var defaults = '<span style="font-style: italic; color: rgb(97, 97, 97);">Unassigned</span>';
				return displayName || defaults;
			}
		}
	]);

	add('commonObject.ApplicationServices', [
		{
			name: 'Type',
			field: 'jsonType',
			width: '80px',
			formatter: function (value) {
				if (value === 'custom-application-service') {
					return '<span class="ui-badge">CUSTOM</span>';
				}
				return '';
			}
		},
		{
			name: 'Application',
			field: 'fullName',
			width: 'auto',
			formatter: function (value, index, obj) {
				var item = obj.grid.getItem(index);

				if (item.jsonType === 'custom-application-service') {
					value = '<a href="javascript:;" class="J-edit-application ml10" title="Edit Custom Application">' + value + '</a>';
				} else {
					value = '<span class="ml10">' + value + '</span>';
				}

				return ('<a href="javascript:;" class="J-show-entity-page ui-eye-open" title="Show Application Entity Details"></a>' + value);
			}
		},
		{
			name: 'Group',
			field: 'categoryName',
			width: 'auto'
		}
	]);

	add('commonObject.AppDetectionRules', [
		{
			name: 'Type',
			width: 'auto',
			field: 'applicationDetectionType',
			formatter: function (value) {
				return ({
					'HOST_NAME': 'Host Name',
					'SERVER_IP_ADDRESS': 'Server IP Address',
					'PORT_NUMBER': 'Port Number'
				}[value]);
			}
		},
		{
			name: 'Protocol',
			width: 'auto',
			field: 'protocol'
		},
		{
			name: 'IP/Host Name',
			width: 'auto',
			field: 'value',
			formatter: function (value) {
				return value || '';
			}
		},
		{
			name: 'Port',
			width: 'auto',
			field: 'port',
			formatter: function (value) {
				return value || '';
			}
		}
	]);

	add('entity.appClient', [
		{
			name:"Client",
			field:"name",
			width:"auto",
			formatter:function(item,index,obj){
				var obj = obj.grid.getItem(index),
					name = obj.name || obj.clientMac;
				return '<a href="javascript:void(0)" data-id="'+obj.id+'" class="entity-client">'+name+'</a>';
			}
		},
		{
			name:"Client MAC",
			field:"clientMac",
			width:"auto"
		},
		{
			name:"OS",
			field:"osInfo",
			width:"auto"
		},
		{
			name:"Recently Connected To",
			field:"connectedTo",
			width:"auto"
		},
		{
			name:"Usage",
			field:"usage",
			width:"220px",
			formatter : function(v,i,obj){
				var highUsage = obj.grid.getItem(i).highUsage;
				var conversion = Formatter.convertBytes(v),
					width = Math.floor(150 * (v/highUsage));
				return '<div style="display: inline-block; padding-right: 10px; line-height: 10px; background: #83c9e3; height: 10px; width: '+width+'px;">  </div>  '+conversion.value+' '+conversion.label;
			}
		}
	]);

	add('entity.appUser', [
		{
			name:"Name",
			field:"name",
			width:"auto",
			formatter:function(item,index,obj){
				var obj = obj.grid.getItem(index),
					name = obj.name;
				if(obj.id) {
					return '<a href="javascript:void(0)" data-id="'+obj.id+'" class="entity-user">'+name+'</a>';
				}

				return name;
			}
		},
		{
			name:"Recently Connected To",
			field:"connectedTo",
			width:"auto"
		},
		{
			name:"Usage",
			field:"usage",
			width:"220px",
			formatter : function(v,i,obj){
				var highUsage = obj.grid.getItem(i).highUsage;
				var conversion = Formatter.convertBytes(v),
					width = Math.floor(150 * (v/highUsage));
				return '<div style="display: inline-block; padding-right: 10px; line-height: 10px; background: #83c9e3; height: 10px; width: '+width+'px;">  </div>  '+conversion.value+' '+conversion.label;
			}
		}
	]);

	add('troubleshoot.events', [
		{
			name: ' ',
			width: '10px',
			field : 'keyEvent',
			formatter: function (value) {
				return value?'<i class="fa fa-caret-right contributing"></i>':'';
			},
			classes: 'field-contributing'
		},
		{
			name: 'Timestamp',
			field: 'timeStamp',
			width: '160px',
			classes: 'field-timeStamp',
			formatter: function (value) {
				return value && Formatter.formatTime(value/10)||"";
			}
		},
		{
			name: 'Device Name',
			field: 'networkDeviceHostname',
			width: '150px'
		},
		{
			name: 'Device BSSID',
			field: 'bssId',
			width: '100px'
		},
		{
			name: 'Event Type',
			field: 'type',
			width: '100px',
			formatter: function (value) {
				var eventTypes = ['Basic','Info','Detail'];
				return eventTypes[value];
			}
		},
		{
			name: 'Description',
			field: 'description',
			width: 'auto'
		}
	]);

	add('config.hiveProfile', [
		{
			name: "Name",
			field: "macObject",
			formatter: function (obj) {
				return obj.name;
			},
			width: "auto"
		}, {
			name: "Action",
			field: "action",
			width: "auto"
		}
	]);

	add('config.vlanRuleList', function(arr) {
		return [{
			name: 'VLAN',
			field: 'vlanId',
			width: '220PX',
			styles : 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Rules",
			field: "classAsgn",
			width: "220px",
			formatter: function(obj) {
				var ret = '<a class ="sp-rule-add-norm mr5 J-add-rule" href="javascript:;" title="Add an assignment rule"></a><a class ="sp-rule-select-norm mr5 J-select-rule" href="javascript:;" title="Select an assignment rule"></a>';

				if (obj) {
					ret += '<a class ="J-edit-rule" href="javascript:;">' + obj.name + '</a>';
				}

				return ret;
			},
			styles: 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Description",
			field: "classAsgn",
			width: "auto",
			formatter: function(obj, index, dr) {
				var collapsed = !arr[index];
				var rules = new __Assignment().getAssignType(obj && obj.classifications);
				var hasRules = !!rules.length,
					fn;

				var result =
					'<div class="J-triggerAssignDetails"' + (hasRules ? ' style="cursor:pointer;"' : '') + '>' +
					(hasRules ? (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) : '') +
					(obj ? obj.description : '') + '</div>';

				var tplDetail =
					'<div class="J-tblRules mt10 ml10 font11" style="display:${display};">' +
					'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
					'<thead>' +
					'<tr style="background:#F5F4F2;"><td class="w100">Type</td><td>Value</td></tr>' +
					'</thead>' +
					'<tbody>${content}</tbody>' +
					'</table>' +
					'</div>';

				var details = rules.map(function(item) {
					var f = 'function' == typeof item,
						str = 'style="border-radius:0;word-break:break-word;"',
						tmpl = f ? '<tr><td class="w100" ' + str + '>Location</td><td class="J-assign-local-value" ' + str + '></td></tr>' :
						'<tr><td class="w100" ' + str + '>${type}</td><td ' + str + '>${value}</td></tr>';

					f && (fn = item);

					return string.substitute(tmpl, item);
				}).join('');

				fn && fn(function(data) {
					setTimeout(function() {
						var node = query('.dojoxGridRow', dr.grid.viewsNode)[index];
						query('.J-assign-local-value', node)[0].innerHTML = data.value;
					}, 1e2);
				});

				if (details) {
					result += string.substitute(tplDetail, {
						content: details,
						display: collapsed ? 'none' : ''
					});
				}

				return result;
			}
		}];
	});

	add('config.dnsRuleList', function(arr,arr2) {
		return [{
			name: 'DNS Server',
			field: 'dnsObject',
			width: '220PX',
			formatter: function(obj, index) {
				var collapsed = !arr2[index],
					ret = '<a href="javascript:;" class="J-edit-dns-object">' + obj.name + '</a>';

				ret = ret + '<span class="J-showIp ml10" style="cursor: pointer;">' + (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) + '</span>';

				var ipDetails = '<div class="J-ipDetails mt10 ml10 font11" style="display:${display};">' +
				 		'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
				 			'<tbody>${content}</tbody>' +
				 		'</table>'
			 		'</div>',
			 		ipContents = '<tr><td>DNS1</td><td>' + obj.primaryServerIp + '</td></tr>';

		 		obj.backupServerIp && (ipContents += '<tr><td>DNS2</td><td>' + obj.backupServerIp + '</td></tr>');

		 		obj.backup2ServerIp && (ipContents += '<tr><td>DNS3</td><td>' + obj.backup2ServerIp + '</td></tr>');

				ret = ret + string.substitute(ipDetails, {
					content: ipContents,
					display: collapsed ? 'none' : ''
				});

				return ret;
			},
			styles: 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Rules",
			field: "classAsgn",
			width: "220px",
			formatter: function(obj) {
				var ret = '<a class ="sp-rule-add-norm mr5 J-add-rule" href="javascript:;" title="Add an assignment rule"></a><a class ="sp-rule-select-norm mr5 J-select-rule" href="javascript:;" title="Select an assignment rule"></a>';

				if (obj) {
					ret += '<a class ="J-edit-rule" href="javascript:;">' + obj.name + '</a>';
				}

				return ret;
			},
			styles: 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Description",
			field: "classAsgn",
			width: "auto",
			formatter: function(obj, index, dr) {
				var collapsed = !arr[index];
				var rules = new __Assignment().getAssignType(obj && obj.classifications);
				var hasRules = !!rules.length,
					fn;

				var result =
					'<div class="J-triggerAssignDetails"' + (hasRules ? ' style="cursor:pointer;"' : '') + '>' +
					(hasRules ? (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) : '') +
					(obj ? obj.description : '') + '</div>';

				var tplDetail =
					'<div class="J-tblRules mt10 ml10 font11" style="display:${display};">' +
					'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
					'<thead>' +
					'<tr style="background:#F5F4F2;"><td class="w100">Type</td><td>Value</td></tr>' +
					'</thead>' +
					'<tbody>${content}</tbody>' +
					'</table>' +
					'</div>';

				var details = rules.map(function(item) {
					var f = 'function' == typeof item,
						str = 'style="border-radius:0;word-break:break-word;"',
						tmpl = f ? '<tr><td class="w100" ' + str + '>Location</td><td class="J-assign-local-value" ' + str + '></td></tr>' :
						'<tr><td class="w100" ' + str + '>${type}</td><td ' + str + '>${value}</td></tr>';

					f && (fn = item);

					return string.substitute(tmpl, item);
				}).join('');

				fn && fn(function(data) {
					setTimeout(function() {
						var node = query('.dojoxGridRow', dr.grid.viewsNode)[index];
						query('.J-assign-local-value', node)[0].innerHTML = data.value;
					}, 1e2);
				});

				if (details) {
					result += string.substitute(tplDetail, {
						content: details,
						display: collapsed ? 'none' : ''
					});
				}

				return result;
			},
			styles: 'vertical-align : top;padding:8px 5px 0;'
		}];
	});

	add('config.deviceList', function(arr) {
		return [{
			name: 'Device Model',
			field: 'tmpl',
			width: '220px',
			formatter: function(v, i, obj) {
				return v.productType.replace("_", "");
			},
			styles : 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: 'Template',
			field: 'tmpl',
			width: '220px',
			formatter: function(v,i,obj) {
				var gridData = obj.grid.getItem(i),
				tmplName = v.name + (gridData.classAsgn ? '' : '(default)'),
				ret = '<a class ="sp-rule-select-norm J-select-tmpl mr5" href="javascript:;" title="Select a template"></a><a class ="J-tmplName" href="javascript:;">' + tmplName + '</a>';

				return ret;
			},
			styles : 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Rules",
			field: "classAsgn",
			width: "220px",
			formatter: function(obj) {
				var ret = '';
				if (obj) {
					ret += '<a class ="sp-rule-add-norm mr5 J-add-rule" href="javascript:;" title="Add an assignment rule"></a><a class ="sp-rule-select-norm mr5 J-select-rule" href="javascript:;" title="Select an assignment rule"></a>';
					if(obj.name) {
						ret += '<a class ="J-edit-rule" href="javascript:;">' + obj.name + '</a>';
					}
				}

				return ret;
			},
			styles: 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Description",
			field: "classAsgn",
			width: "auto",
			formatter: function(obj, index, dr) {
				var collapsed = !arr[index];
				var rules = new __Assignment().getAssignType(obj && obj.classifications);
				var hasRules = !!rules.length,
					fn;

				var result =
					'<div class="J-triggerAssignDetails"' + (hasRules ? ' style="cursor:pointer;"' : '') + '>' +
					(hasRules ? (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) : '') +
					(obj ? (obj.description || '') : '') + '</div>';

				var tplDetail =
					'<div class="J-tblRules mt10 ml10 font11" style="display:${display};">' +
					'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
					'<thead>' +
					'<tr style="background:#F5F4F2;"><td class="w100">Type</td><td>Value</td></tr>' +
					'</thead>' +
					'<tbody>${content}</tbody>' +
					'</table>' +
					'</div>';

				var details = rules.map(function(item) {
					var f = 'function' == typeof item,
						str = 'style="border-radius:0;word-break:break-word;"',
						tmpl = f ? '<tr><td class="w100" ' + str + '>Location</td><td class="J-assign-local-value" ' + str + '></td></tr>' :
						'<tr><td class="w100" ' + str + '>${type}</td><td ' + str + '>${value}</td></tr>';

					f && (fn = item);

					return string.substitute(tmpl, item);
				}).join('');

				fn && fn(function(data) {
					setTimeout(function() {
						var node = query('.dojoxGridRow', dr.grid.viewsNode)[index];
						query('.J-assign-local-value', node)[0].innerHTML = data.value;
					}, 1e2);
				});

				if (details) {
					result += string.substitute(tplDetail, {
						content: details,
						display: collapsed ? 'none' : ''
					});
				}

				return result;
			}
		}];
	});

	add('config.HiveProfileList', [
		{
			name: "Name",
			field: "name",
			formatter : function(v){
				return '<a href="#" class="J-item-edit">'+v+'</a>';
			},
			width: "auto"
		}, {
			name: "Description",
			field: "description",
			width: "auto"
		},
			{
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);

	add('config.CWPManagement', [
		{
			name: "Name",
			field: "name",
			width: "auto"
		}, {
			name: 'RegistrationType',
			field: 'registrationType',
			width: 'auto'
		}, {
			name: 'Used By',
			field: 'usedby',
			width: 'auto',
			formatter : function(v){
				return '<a class="J-item-over" href="#">'+(v === undefined ? '' : v)+'</a>';
			}
		}
	]);


	add('report.Generated', [
		{
			label: 'Report',
			field: 'queryTimeRang',
			renderExpando: true,
			formatter: function(v,obj){
				var lnk = '#',
					childNum = obj.childNum ? (' (' + obj.childNum + ') ') : '';

				var tmpName = '<a href="javascript:void(0)"' + (obj.execEndTime ? 'class="J-report-link">' : ' class="J-edit-title">') + obj.templateName + childNum+ '</a>';
				if(obj.scheduleType == 'ONCE' && !obj.execEndTime){
					tmpName = '<span>' + obj.templateName + childNum + '</span>';
				}
				return tmpName;
			}
		},{
			label: 'Time Range',
			field: 'queryTimeRang'
		},{
			label: 'Expires On',
			field: 'expireAt',
			className: 'w100'
		},{
			label: 'Recurrence',
			field: 'scheduleType',
			className: 'w100',
			formatter: function(v){
				return '<span class="tt-c">' + v.toLowerCase() + '</span>'
			}
		},{
			label: 'Generated On',
			field: 'execEndTime',
			formatter: function(obj){
				return obj;
			}
		},{
			label: 'Share With',
			field: 'sharingMailList',
			formatter: function(obj){
				var tip = obj ? obj.join(', ') : '';
				return '<span class="fn-ellipsis" style="display:inline-block;width:100%;height:23px;line-height:23px;" data-email="' + tip +'">' + (obj || '') + '</span>';
			}
		}
	]);

	add('report.Upcoming', [
		{
			label: 'Report',
			field: 'queryTimeRang',
			colSpan: 2,
			formatter: function(v,obj){
				return '<span>' + obj.templateName + ' ' + v + '</span>';
			}
		},{
			label: 'Recurrence',
			field: 'scheduleType',
			formatter: function(v){
				return '<span class="tt-c">' + v.toLowerCase() + '</span>'
			}
		},{
			label: 'Generated On',
			field: 'nextNotifyTime',
			formatter: function(obj){
				return obj;
			}
		},{
			label: 'Share With',
			field: 'sharingMailList',
			formatter: function(obj){
				var tip = obj ? obj.join(', ') : '';
				return '<span class="fn-ellipsis" style="display:inline-block;width:100%;height:23px;line-height:23px;" data-email="' + tip +'">' + (obj || '') + '</span>';
			}
		}
	]);

	add('config.radiusRuleList', function(arr,arr2) {
		return [{
			name: 'Name',
			field: 'radiusClientObject',
			width: '350PX',
			formatter: function(obj, index) {
				var collapsed = !arr2[index],
					ret = '<a href="javascript:;" class="J-edit-radius-object">' + obj.name + '</a>';

				ret += '<span class="J-showIp ml10" style="cursor: pointer;">' + (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) + '</span>';

				var ipDetails = '<div class="J-ipDetails mt10 ml10 font11" style="display:${display};">' +
					'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
					'<thead>' +
					'<tr style="background:#F5F4F2;"><td>name</td><td class="w160">Type</td><td>IP/Hostname</td></tr>' +
					'</thead>' +
					'<tbody>${content}</tbody>' +
					'</table></div>',
					ipContents = '',
					itemCon, isRadius;

				obj.entries.forEach(function(item) {
					itemCon = item.externalRadiusServer || item.internalRadiusServer;
					isRadius = itemCon.device,
					name = isRadius ? itemCon.device.hostname : itemCon.name;
					ipContents += '<tr><td>'+ name +'</td><td>' + (isRadius ? 'Aerohive RADIUS Server' : 'External RADIUS Server') + '</td><td>' + (isRadius ? itemCon.device.ipAddress : itemCon.serverIp.value) + '</td></tr>';
				}, this);

				ret = ret + string.substitute(ipDetails, {
					content: ipContents,
					display: collapsed ? 'none' : ''
				});


				return ret;
			},
			styles : 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Rules",
			field: "classAsgn",
			width: "220px",
			formatter: function(obj) {
				var ret = '<a class ="sp-rule-add-norm mr5 J-add-rule" href="javascript:;" title="Add an assignment rule"></a><a class ="sp-rule-select-norm mr5 J-select-rule" href="javascript:;" title="Select an assignment rule"></a>';

				if (obj) {
					ret += '<a class ="J-edit-rule" href="javascript:;">' + obj.name + '</a>';
				}

				return ret;
			},
			styles: 'vertical-align : top;padding:8px 5px 0;'
		}, {
			name: "Assignment Description",
			field: "classAsgn",
			width: "auto",
			formatter: function(obj, index, dr) {
				var collapsed = !arr[index];
				var rules = new __Assignment().getAssignType(obj && obj.classifications);
				var hasRules = !!rules.length,
					fn;

				var result =
					'<div class="J-triggerAssignDetails"' + (hasRules ? ' style="cursor:pointer;"' : '') + '>' +
					(hasRules ? (collapsed ? decodeURIComponent('%E2%96%BA') : decodeURIComponent('%E2%96%BC')) : '') +
					(obj ? obj.description : '') + '</div>';

				var tplDetail =
					'<div class="J-tblRules mt10 ml10 font11" style="display:${display};">' +
					'<table class="table table-condensed table-bordered table-stripped table-hover" style="border-radius:0;">' +
					'<thead>' +
					'<tr style="background:#F5F4F2;"><td class="w100">Type</td><td>Value</td></tr>' +
					'</thead>' +
					'<tbody>${content}</tbody>' +
					'</table>' +
					'</div>';

				var details = rules.map(function(item) {
					var f = 'function' == typeof item,
						str = 'style="border-radius:0;word-break:break-word;"',
						tmpl = f ? '<tr><td class="w100" ' + str + '>Location</td><td class="J-assign-local-value" ' + str + '></td></tr>' :
						'<tr><td class="w100" ' + str + '>${type}</td><td ' + str + '>${value}</td></tr>';

					f && (fn = item);

					return string.substitute(tmpl, item);
				}).join('');

				fn && fn(function(data) {
					setTimeout(function() {
						var node = query('.dojoxGridRow', dr.grid.viewsNode)[index];
						query('.J-assign-local-value', node)[0].innerHTML = data.value;
					}, 1e2);
				});

				if (details) {
					result += string.substitute(tplDetail, {
						content: details,
						display: collapsed ? 'none' : ''
					});
				}

				return result;
			},
			styles : 'vertical-align : top;padding:8px 5px 0;'
		}];
	});

	return structure;
});
