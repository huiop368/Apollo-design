define(['dojo/_base/lang', "ah/util/common/Base", 'ah/app/User'], function (lang, Base, User) {
	var store = {};

	/**
	var base = add('ah.comp', {}, store),
		utils = add('ah.util', {}, store);
	*/

	/**
	 *@ This comment for our local code
	 *@ Have change for server store
	 *
	function add(name, value, context) {
		// cloned to avoid different key point to same value
		value = lang.clone(expandObject(value));
		return lang.setObject(name, value, context || base);
	}

	function expandObject(target) {
		return Object.keys(target).reduce(function (ret, key) {
			var value = target[key];

			if (isPlainObject(value)) {
				value = expandObject(value);
			}

			key.split('|').forEach(function (k) {
				lang.setObject(k, value, ret);
			});

			return ret;
		}, {});
	}

	function isPlainObject(target) {
		return Object.prototype.toString.call(target) === '[object Object]';
	}

	add('_special', {
		'dashboard': 'gui/dashboard/viewing-dashboard.htm',
		'troubleshoot': 'gui/troubleshoot/using-troubleshooting-tool.htm',
		'multipleedit': 'gui/configuration/configuring-multiple-devices.htm'
	}, store);

	add('usermanagement', {
		'AdminAccountList': 'gui/administration/viewing-the-admin-accounts-list.htm',
		'AdminAccount': 'gui/administration/adding-a-new-admin-account.htm',

		'AdminGroupList': 'gui/administration/viewing-the-admin-groups-list.htm',
		'PermissionSlider': 'gui/administration/adding-a-new-admin-group.htm',

		'AccountDetails': 'gui/administration/viewing-account-details.htm',
		'AuditLogs': 'gui/administration/viewing-audit-logs.htm',
		'VHMLogs': 'gui/administration/viewing-vhm-logs.htm',
		'KddrLogs': 'gui/administration/downloading-kddr-logs.htm',
		'LicenseInfo': 'gui/administration/adding-license-information.htm',
		'VhmSettings': 'gui/administration/selecting-a-vhm-to-log-into.htm',
		'DeviceManagementSettings': 'gui/administration/managing-default-device-settings.htm'
	});

	add('configuration', {
		'SSIDSelectedSchedules': 'gui/configuration/configuring-user-profile-availability-schedule.htm',
		'ExternalRadiusServer': 'gui/configuration/configuring-external-radius-server-settings.htm',
		'AdvancedSecurityOptions' : 'gui/configuration/configuring-advanced-access-security.htm',


		'ClientSLA' : 'gui/configuration/configuring-client-sla.htm',

		'ConfigListPage|policycard.CardItem|AdditionalSettings': 'gui/configuration/viewing-the-network-policy-list.htm',
		'WirelessConnectivityPage': 'gui/configuration/viewing-the-list-of-deployed-wireless-ssids.htm',
		'SSIDDetailsForm': 'gui/configuration/configuring-wireless-ssid-settings.htm',
		'ConfigPolicyDetails': 'gui/configuration/configuring-the-network-policy-information.htm',
		'WiredConnectivityPage' : 'gui/configuration/viewing-device-templates.htm',
		'SelectDevices' : 'gui/configuration/deploying-policy.htm',
		'ConfigurationView': 'gui/configuration/viewing-configuration-cli.htm',
		'AD' : 'gui/configuration/configuring-active-directory-servers.htm',
		'CreateSchedule': 'gui/configuration/configuring-schedule.htm'
	});

	add('configuration.userprofile', {
		'FirewallList': 'gui/configuration/configuring-user-profile-security-settings.htm',
		'TrafficTunneling': 'gui/configuration/configuring-user-profile-traffic-tunneling.htm',
		'QOS': 'gui/configuration/configuring-user-profile-qos-settings.htm',
		'AvailabilitySchedule': 'gui/configuration/configuring-user-profile-availability-schedule.htm',
		'RateLimitDialog': 'gui/configuration/configuring-rate-limit-settings.htm'
	});

	add('configuration.assignment', {
		'UserAssignment': 'gui/configuration/configuring-user-profile-assignment.htm',
		'CreateOSObject': 'gui/configuration/configuring-OSObject.htm',
		'AssignmentRule': 'gui/configuration/configuring-classification-assignment.htm'
	});

	add('configuration.deviceTemplate', {
		'PortTypes' : 'gui/configuration/configuring-port-type.htm',
		'RadioProfile' : 'gui/configuration/configuring-radio-profile.htm',
		'APTemplate|APTemplateExp|SwitchTemplate|SwitchTemplateExp|SwitchTemplateNew' : 'gui/configuration/configuring-device-template.htm'
	});

	add('configuration.cwp', {
		'CreateCWP|CWPLogin|CWPSuccessPage|CWPErrorPage': 'gui/configuration/configuring-captive-web-portal.htm'
	});

	add('configuration.commonObject', {
		'CertificateManagement' : 'gui/configuration/viewing-certificate-management.htm',
		'CreateCert|ImportCert' : 'gui/configuration/configuring-certificate-management.htm',
		'ApplicationServices' : 'gui/configuration/viewing-applications.htm',
		'CreateCustomApplication': 'gui/configuration/configuring-custom-application.htm',
		'HiveManagement': 'gui/configuration/viewing-hive-management.htm',
		'PortTypeManage': 'gui/configuration/viewing-protType-management.htm',
		'RadioManagement': 'gui/configuration/viewing-radio-management.htm',
		'SSIDManage': 'gui/configuration/viewing-ssid-management.htm',
		'ScheduleManagement': 'gui/configuration/viewing-schedule-management.htm',
		'UserProfileManage': 'gui/configuration/viewing-userProfile-management.htm',
		'IpObjectManage': 'gui/configuration/viewing-ipObject-management.htm',
		'MacObjectsManagement': 'gui/configuration/viewing-macObject-management.htm',
		'OSObjectManagement': 'gui/configuration/viewing-osObject-management.htm',
		'VLANManagement': 'gui/configuration/viewing-vlan-management.htm',
		'IpFirewallManagement': 'gui/configuration/viewing-ipFirewall-management.htm',
		'IPFirewallProfile': 'gui/configuration/configuring-ipFirewall-profile.htm',
		'IPFirewallRule': 'gui/configuration/configuring-ipFirewall-rule.htm',
		'IpFirewallRuleService': 'gui/configuration/configuring-ipFirewall-rule-service.htm',
		'MacFirewallManagement': 'gui/configuration/viewing-macFirewall-management.htm',
		'MacFirewallProfile': 'gui/configuration/configuring-macFirewall-profile.htm',
		'MacFirewallRule': 'gui/configuration/configuring-macFirewall-rule.htm',
		'TrafficFilterManagement': 'gui/configuration/viewing-trafficFilter-management.htm',
		'WIPSManagement': 'gui/configuration/viewing-wips-management.htm',
		'ClassifierMapManagement': 'gui/configuration/viewing-classfierMap-management.htm',
		'MarkerMapManagement': 'gui/configuration/viewing-makerMap-management.htm',
		'RateLimitManage': 'gui/configuration/viewing-rateLimit-management.htm',
		'DNSManagement': 'gui/configuration/viewing-dnsServer-management.htm',
		'DNSObject': 'gui/configuration/configuring-dns-object.htm',
		'NTPAssignmentManagement': 'gui/configuration/viewing-ntpServer-management.htm',
		'NTPProfile': 'gui/configuration/configuring-ntp-profile.htm',
		'SyslogServerManagement': 'gui/configuration/viewing-syslogServer-management.htm',
		'AccessConsoleManagement': 'gui/configuration/viewing-accessConsole-management.htm',
		'BonjourGatewaySettingsManagement': 'gui/configuration/viewing-bonjourGatewaySet-management.htm',
		'LocationServerManage': 'gui/configuration/viewing-locationServer-management.htm',
		'LLDPManage': 'gui/configuration/viewing-LLDP-management.htm',
		'ManageOptionManagement': 'gui/configuration/viewing-manageOption-management.htm',
		'TunnelPolicyManage': 'gui/configuration/viewing-tunnelPolicy-management.htm',
		'TunnelingPolicy': 'gui/configuration/configuring-tunneling-policy.htm',
		'ExtRadiusServerManage': 'gui/configuration/viewing-externalRadiusServer-management.htm',
		'AaaServerManagement': 'gui/configuration/viewing-AAAServer-management.htm',
		'LDAPManagement': 'gui/configuration/viewing-LDAP-management.htm',
		'ADServerManagement': 'gui/configuration/viewing-ADServer-management.htm'
	});

	add('configuration.additional', {
		'BonjourGatewaySettings': 'gui/configuration/configuring-bonjour-gateway-settings.htm',
		'AddBonjourFilterRule': 'gui/configuration/configuring-bonjour-gateway-rule.htm',

		'TrafficFilter': 'gui/configuration/configuring-traffic-filter.htm',
		'AccessConsole': 'gui/configuration/configuring-access-console.htm',
		'ManagementOptions': 'gui/configuration/configuring-management-options.htm',

		'NTPServer': 'gui/configuration/configuring-ntp-server-settings.htm',
		'CreateNTPServer' : 'gui/configuring/adding-a-new-ntp-server.htm',
		'DNSServer': 'gui/configuration/configuring-dns-server-settings.htm',
		'CreateDNSServer' : 'gui/configuring/adding-a-new-dns-server.htm',
		'HiveProfile': 'gui/configuration/configuring-hive-settings.htm',
		'DeviceTimezone': 'gui/configuration/configuring-device-time-zone.htm',
		'NativeVlan': 'gui/configuration/configuring-management-native-vlan.htm',
		'DeviceDataCollection': 'gui/configuration/configuring-device-data-collection.htm',
		'STPConfigurations': 'gui/configuration/configuring-stp-settings.htm',
		'StormControl': 'gui/configuration/configuring-traffic-storm-control-settings.htm',
		'IGMPSettings': 'gui/configuration/configuring-igmp-settings.htm',
		'LLDPCDP': 'gui/configuration/configuring-lldp-and-cdp-settings.htm',
		'ClassifierMaps': 'gui/configuration/configuring-classifier-maps.htm',
		'MarkerMaps': 'gui/configuration/configuring-marker-maps.htm',
		'QoSOverview': 'gui/configuration/configuring-qos-dynamic-airtime-scheduling.htm',
		'WIPS': 'gui/configuration/configuring-wireless-intrusion-prevention-system.htm',

		'SyslogServer': 'gui/configuration/configuring-syslog-server.htm',
		'LocationServer': 'gui/configuration/configuring-location-server.htm'
	});

	add('configuration.radiusserver', {
		'AHRadiusServer': 'gui/configuration/viewing-radius-servers.htm',

		'AAAServerProfile': 'gui/configuration/configuring-aaa-server.htm',
		'LDAPServer': 'gui/configuration/configuring-ldap-servers.htm',
		'ADStep0': 'gui/configuration/configuring-active-directory-servers.htm',
		'ADStep1': 'gui/configuration/configuring-active-directory-servers.htm',
		'ADStep2': 'gui/configuration/configuring-active-directory-servers.htm',
		'ADStep3': 'gui/configuration/configuring-active-directory-servers.htm',
		'ADStep4': 'gui/configuration/configuring-active-directory-servers.htm',
		'ADStep5': 'gui/configuration/configuring-active-directory-servers.htm',
		'ADStep6': 'gui/configuration/configuring-active-directory-servers.htm'
	});

	add('configuration.optionalsettings', {
		'OptionSettings': 'gui/configuration/configuring-ssid-optional-settings.htm',
		'bgRateSetting' : 'dialog.htm'
	});

	add('configuration.users', {
		'IDMUserGroup': 'gui/configuration/configuring-local-user-group.htm',
		'UserAccountList': 'gui/configuration/viewing-local-users.htm',
		'UserAccountManual|UserAccountAuto': 'gui/configuration/configuring-local-user.htm',
	});

	add('devicemanagement', {
		'DeviceList': 'gui/devices/viewing-the-device-list.htm',
		'ClientMonitoring': 'gui/devices/viewing-connected-clients.htm',
		'DeviceConfiguration': 'gui/devices/configuring-device-settings.htm',
		'InterfaceSettings': 'gui/devices/configuring-interface-settings.htm',
		'ConfigureNetdump': 'gui/devices/configuring-device-net-dump.htm',
		'DeviceCredentials': 'gui/devices/configuring-device-credentials.htm',
		'Overview': 'gui/devices/viewing-device-details.htm',
		'BonjourGatewayConfiguration': 'gui/devices/configuring-device-bonjour-gateway.htm',
		'WiredInterface': 'gui/devices/viewing-wired-interfaces.htm',
		'WirelessInterface': 'gui/devices/viewing-wireless-interfaces.htm',
		'NeighboringDevices': 'gui/configuration/viewing-neighbor-devices.htm',
		'BonjourGatewayConfiguration' : 'gui/devices/configuring-device-bonjour-gateway.htm',
		'Troubleshooting' : 'gui/devices/configuring-device-troubleshooting.htm',
		'ConfigDownloadOptions': 'gui/configuration/uploading-configuration.htm'
	});

	add('monitoring', {
		'ActiveClients': 'gui/monitor/viewing-the-client-list.htm',
		'Events_monitor': 'gui/monitor/viewing-the-event-list.htm',
		'Events_device': 'gui/devices/viewing-events.htm',
		'Alarms': 'gui/monitor/viewing-the-alarm-list.htm'
	});

	add('plan', {
		'layouts.MapLandingPage|utilities.MapImport|utilities.MapLandingForm': 'gui/plan/plan-landing.htm',
		'layouts.MapCanvasPage|utilities.MapNetworkSummary|utilities.MapZoomTool': 'gui/plan/viewing-plan.htm'
	});
	add('form.objects', {
		'VLANObjectForm': 'gui/configuration/configuring-vlan.htm',
		'IPObjectForm': 'gui/configuration/configuring-ipObject.htm',
		'MACObjectForm': 'gui/configuration/configuring-macObject.htm'
	}, utils);

	add('entities', {
		'DeviceEntity': 'gui/monitor/viewing-device-entity.htm',
		'ClientEntity': 'gui/monitor/viewing-client-entity.htm',
		'ApplicationEntity': 'gui/monitor/viewing-application-entity.htm',
		'PolicyEntity': 'gui/monitor/viewing-network-entity.htm',
		'UserEntity': 'gui/monitor/viewing-user-entity.htm'
	});
	**/

	// test stored data
	// console.log(JSON.stringify(store, null, 2));

	// notes: a tricky method to clone JSON-safe object
	// store = JSON.parse(JSON.stringify(store));
	

	/**
	 *@ Server store solution
	 *@
	 */
	User.isLoggedIn(function(success){
		if(success){
			lang.mixin({

				init : function(){
					this._fetchLinks()
				},

				_fetchLinks : function(){
					this.$DataMgr.get({
						url : 'services/misc/helplinks', 
						callbackFn : function(resp){
							var links = resp.data.helpLinks;

							store = links;
						},
						noId : true
					});
				}

			}, new Base()).init();
		}
	});
	
	

	

	return {
		query: function (name, context) {
			// prefer empty string to `undefined`
			//return name && lang.getObject(name, false, context || store) || '';
			return name && store[name] || '';
		},
		specialQuery: function (name) {
			//return this.query(name, store._special);
			return name && store['_special.'+name] || '';
		}
	};
});
