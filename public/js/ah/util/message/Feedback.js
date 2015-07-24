define(['dojo/_base/declare',
        'dijit/_WidgetBase',
        'dijit/_TemplatedMixin',
		"dojo/text!./template/Feedback.html",
		'ah/util/message/Mask',
		'dojo/on',
		'dojo/_base/lang',
		"dojo/_base/array",
		"dojo/dom-class",
		"ah/app/DataMgr",
		'ah/comp/common/PageHelpLinkFinder',
	"ah/app/User",
		"ah/util/message/StatusMsg",
		"ah/util/DeveloperTools","dojo/mouse" ],
	function(declare, _WidgetBase, _TemplateMixin, template, Mask, on, lang, array, domClass, DataMgr, PageHelpLinkFinder, User, StatusMsg, DeveloperTools,mouse){

	var Feedback = declare([_WidgetBase,_TemplateMixin],{

		_nameMap : {
			'LoginPage' : 'Home Page',
				'LandingPage': 'User Dashboard',
				'UserHomePage': 'User Dashboard',
				'AvailabilitySchedule': 'Availability Schedule',
				'CreateCWP': 'Captive Web Portal',
				'CreateDNSServer': 'Create DNS Server',
				'CreateIPFirewall': 'IP Firewall',
				'CreateIPFirewallRule': 'IP Firewall',
				'CreateIPObject': 'IP Object',
				'CreateMacFirewall': 'MAC Object',
				'CreateNTPServer': 'NTP Server',
				'ExternalRadiusServer': 'External RADIUS Server',
				'FirewallList': 'Firewall List',
				'IDMUser': 'Create User',
				'IDMUserGroup': 'Create User Group',
				'NTPServer': 'NTP Server',
				'PortTypes': 'Port Types',
				'PortTypesAlign': 'Port Types',
				'QOS': 'QOS',
				'QoSOverview': 'QOS',
				'RateLimitDialog': 'Rate Limits',
				'SelectDevices': 'Select Devices',
				'ConfigListPage': 'Network Policy List',
				'ServiceIPSelect': 'IP Selection',
				'SSIDManagement': 'SSID Management',
				'SSIDDetailsForm': 'SSID Management',
				'ConfigPolicyDetails': 'Network Policy Info',
				'TrafficTunneling': 'Traffic Tunneling',
				'UserAccountAuto': 'Auto User Account',
				'UserAccountManual': 'Manual User Account',
				'UserProfileMgmt': 'User Profile',
				'WiredConnectivityPage': 'Device Template List',
				'WirelessConnectivityPage': 'SSID List',
				'DashboardPage': 'Apollo Dashboard',
				'ClientMonitoring': 'Connected Clients',
				'DeviceConfiguration': 'Device Configuration',
				'DeviceList': 'List of Devices',
				'DevicesHome': 'Devices Home',
				'InterfaceSettings': 'Device Interface Settings',
				'WiredInterface': 'Wired Devices',
				'WirelessInterface': 'Wireless Devices',
				'AccountManagement': 'Account Management',
				'AdminAccount': 'Admin Account',
				'AdminAccountList': 'Admin Account List',
				'AdminGroup': 'Admin Group',
				'AdminGroupList': 'Admin Group List',
				'AdminGroupPermissionsTree': 'Admin Group Permissions',
				'UniqueApplicationsWidget': 'User Dashboard',
				'MapLandingPage': 'Plan Landing',
				'MapFolderTree': 'Plan Management'
		},

		_hackMap : {
			'comp/troubleshoot' : 'TroubleShoot',
			'comp/dashboard' : 'Dashboard'
		},

		feedbackType : "LIKE",

		templateString : template,

		page : null,

		_setVisbleAttr : function(n){
			Mask[n ? 'show' : 'hide']();
			this.domNode.style.display = n ? '' : 'none';

			// if you don`t need get visble outer, this can be removed
			this._set('visble',n);
		},

		_setPageAttr : function(obj){
			var widgetName = '', title;

			if(obj && obj.id) {
				var objId = obj.id.split('/');
				widgetName = objId[objId.length-1].split('_')[0];
			}

			if (typeof obj === 'string') {
				title = obj;
			} else {
				widgetName || (widgetName = PageHelpLinkFinder.getWidgetName());
				title = this._nameMap[widgetName] || this._normalizeName(widgetName);
			}

			title || (title = 'Current Page');

			this.pageEl.innerHTML = title;
			this.getCurrentPageStats(title);
		},

		postCreate : function(){
			this.bindUI();
		},

		getCurrentPageStats: function(title) {
			var url = "services/misc/surveys/filter?appName=hm-webapp&surveyObjectId=" + title;
			DataMgr.get({
				url: url,
				callbackFn: lang.hitch(this, function(resp) {
					var d = resp.data;
					if(d) {
						this.likeCount.innerHTML = d.likeNum || 0;
						this.dislikeCount.innerHTML = d.dislikeNum || 0;
					}
				}),
				errorFn: lang.hitch(this, function(data) {
					//console.log(data);
				}),
				noId : true
			});
		},

		bindUI : function(){
			this.own(
				on(this.feedbackLike,'click',lang.hitch(this,this.handleLike)),
                on(this.feedbackLike,mouse.enter,lang.hitch(this,this.handleLikeHover)),
                on(this.feedbackLike,mouse.leave,lang.hitch(this,this.handleLikeHover)),

                on(this.feedbackDislike,'click',lang.hitch(this,this.handleDislike)),
                on(this.feedbackDislike,mouse.enter,lang.hitch(this,this.handleDislikeHover)),
                on(this.feedbackDislike,mouse.leave,lang.hitch(this,this.handleDislikeHover)),

				on(this.cancelBtn,'click',lang.hitch(this,this._handleCancel)),
				on(this.sendBtn,'click',lang.hitch(this,this._handleSend))
			);
		},

		handleLike: function() {
			this.feedbackType = "LIKE";
			domClass.add(this.feedbackLike, 'selected');
			domClass.remove(this.feedbackDislike, 'selected');
			this.likeCount.innerHTML = this.likeCount.innerHTML * 1 + 1;
		},

        handleDislike: function() {
            this.feedbackType = "DISLIKE";
            domClass.add(this.feedbackDislike, 'selected');
            domClass.remove(this.feedbackLike, 'selected');
            this.dislikeCount.innerHTML = this.dislikeCount.innerHTML * 1 + 1;
        },
        handleLikeHover: function(event) {
            if(event.type==='mouseover'){
                domClass.add(this.feedbackLike, 'hover');
            }
            else{
                domClass.remove(this.feedbackLike, 'hover');
            }
        },

		handleDislikeHover: function() {
            if(event.type==='mouseover'){
                domClass.add(this.feedbackDislike, 'hover');
            }
            else{
                domClass.remove(this.feedbackDislike, 'hover');
            }
		},


		_handleCancel : function(){
			this.hide();
		},


		_handleSend : function(e){

			if(GDATA.appInfo){
				this._sendFeedback(GDATA.appInfo);
			}else{
				new DeveloperTools().renderBuildInfo().then(lang.hitch(this, function(){
					this._sendFeedback(GDATA.appInfo);
				}));
			}
		},

		_sendFeedback : function(data){
			var json = {
  				"appName": data.appName,
  				"buildId": data.buildId,
  				"buildVersion": data.buildVersion,
  				"name": "feedback",
  				"queries": [
    				{
    					"customerName": User.data.customerId,
      					"answer": this.desEl.value,
      					"query": this.subjectEl.value,
      					"queryId": 123,
      					"type":  "LIKE",
      					"country": User.data.country || '',
      					"industry": User.data.industry || '',
      					"userName": User.data.username,
      					"ownerId" : DataMgr.ownerId,
      					"userLike": this.feedbackType == "LIKE" ? "true" : "false"
    				}
  				],
  				"surveyObjectId": this.pageEl.innerHTML
			};

			DataMgr.post({
				url : 'services/misc/surveys',
				callbackFn : lang.hitch(this,this._handleFeedback),
				data : json
			});

			this.hide();
		},

		_handleFeedback : function(data){
			StatusMsg.show('success','Feedback sent successfully.','main','first');
		},

		_normalizeName : function(name){
			var reg = /[A-Z][a-z]+/g,
				name = name.charAt(0).toUpperCase() + name.substring(1),
				str;

			str = name.replace(reg, function(a){
				return ' ' + a;
			});

			return lang.trim(str);
		},

		show : function(tab){
			// find the page where you are now
			this.set('page',this.getPage(tab));

			this.set('visble',1);
		},

		hide : function(){
			this.set('visble',0);

			this.reset();
		},

		reset : function(){
			this.subjectEl.value = '';
			this.desEl.value = '';
		},

		getPage : function(tab){
			var hash = dijit.registry._hash,
				i,dd,ret = [], page;


			// TODO special for like as: troubleshoot
			if(page = this._hackMap[tab]){
				return page;
			}


			for(i in hash){
				dd = hash[i];
				if(i.search(tab) !== -1){
					ret.push(dd);
				}
			}

			ret = array.filter(ret,function(w,i){
				return this._isVisble(w.domNode);
			},this);

			ret = ret.sort(lang.hitch(this,function(a,b){
				if(this._contains(a.domNode,b.domNode)){
					return 1;
				}else{
					return -1;
				}

				return 0;
			}));

			return ret[0];
		},

		_isHidden : function(el){
			return (el.offsetWidth == 0 && el.offsetHeight == 0) ||
						el.style.display == 'none';
		},

		_isVisble : function(el){
			return !this._isHidden(el);
		},

		_contains : function(p,c){
			if(p.compareDocumentPosition){
				return p.compareDocumentPosition(c) === 20;
			}else{
				return p.contains(c);
			}
		}
	});

	var _instance = null;

	function getFeedback() {
		if (!_instance) {
			_instance = new Feedback();
			_instance.placeAt(document.body, 'last');
		}
		return _instance;
	}

	return {
		show: function (tab) {
			getFeedback().show(tab);
		},

		hide: function () {
			getFeedback().hide();
		},

		getPage: function (tab) {
			return getFeedback().getPage(tab);
		}
	};
});
