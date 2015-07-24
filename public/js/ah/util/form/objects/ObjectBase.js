define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','ah/util/common/ModuleBase','dojo/on',
		'dojo/_base/lang',"dojo/dom-class","dojo/dom-style","dojo/dom-construct", "dojo/_base/array","dojo/mouse"
		],
	function(declare, _WidgetBase, _TemplateMixin, ModuleBase, on, lang, domClass,
			domStyle, domCon, array, mouse){

		return declare('ah/util/form/objects/ObjectBase',[ModuleBase],{

			templateString : '<div class="ui-ip">'+
								'<div data-dojo-attach-point="ipElWrap" style="position:relative">'+
									'<input type="text" class="ui-ip-input" data-dojo-attach-point="ipEl" />'+
									'<span class="ui-ip-mark ui-ip-inactive" data-dojo-attach-point="ipMark"></span>'+
									'<span class="ui-ip-sta ui-ip-save" data-dojo-attach-point="ipSave"></span>'+
									'<span class="ui-ip-sta ui-ip-edit" data-dojo-attach-point="ipEdit"></span>'+
								'</div>'+
								'<div class="ui-ip-list" data-dojo-attach-point="ipList" style="display:none"></div>'+
								'<div class="ui-ip-types" data-dojo-attach-point="ipTypes" style="display:none">'+
									'<p class="ui-ip-types-title">Select</p>'+
									'<ul class="ui-ip-types-list" data-dojo-attach-point="ipTypeList"></ul>'+
								'</div>'+
							'</div>',


			remoteUrl : null,

			// scrolled when view size exceed `MAX_VIEW_SIZE`
			// can customized per instance
			MAX_VIEW_SIZE: 8,

			timeout : 100,

			_cache : {},

			noRecordMsg : '<div class="ui-ip-noresult">No Records Found.</div>',

			any : false,

			anyData : {
				id : 0,
				name : 'Any',
				value : 'Any',
				predefined : true,
				jsonType : 'Any'
			},

			_setClassAttr : {node : 'ipEl', type : 'class'},

			_setDataAttr : function(data){
				var json = lang.isArray(data) ? data : data.data,
					data = lang.clone(json);

				if(this.any && array.every(data, function(item){ return item.id !== 0})){
					data.unshift(this.anyData);
				}
				// some types hash for data
				this.set('_by_id', this._makeDataHash(data, 'id'));
				this.set('_by_name', this._makeDataHash(data, 'name'));
				this.set('listTmpl', this._makeListTmpl(this._makeTypeHash(data)));
				this.set('len', data.length);

				this._cache = {};

				this._set('data', data);
			},

			/*_setActionAttr : function(ac){
				var map = {
					'edit' : 'ui-ip-edit',
					'save' : 'ui-ip-save'
				};

				if(!map[ac]) return;

				for(var i in map){
					domClass[i == ac ? 'add' : 'remove'](this.ipSta, map[i]);
				}

			},*/

			_setDataIdAttr : function(id){
				//this.set('obj', this.get('_by_id')[id]);
				this.set('value', this.get('_by_id')[id].name, 1);
				this._set('dataId',id);
			},

			_setObjAttr : function(obj, f){
				var item = obj;

				if(!this.any && !obj){
					return;
				}

				if(this.any && obj == null){
					item = this.anyData;
				}

				/*if(!obj){
					return;
				}

				item = obj;*/

				this.set('value', item.name, f);

				//this.set('action','edit');
				//this._toggle(this.ipSta, item.predefined ? 0 : 1);

				this._set('dataId',item.id);
				this._set('obj', item);

			},

			_setValueAttr : function(val, flag, b){
				var f = this.getItem(val),
					arr = ['ui-ip-edit', 'ui-ip-edit-active'];

				f && !f.predefined && arr.reverse();

				!b && (this.ipEl.value = val);

				domClass.add(this.ipEdit, arr[0]);
				domClass.remove(this.ipEdit, arr[1]);

				this._set('value', val);

				// TODO
				// for validate not trigger focusout event to revalidate
				// just for now, when have done save autoly, this should be remove

				if(val == ''){
					this.ipEl.validator && this.ipEl.validator.clearElement(this.ipEl);
				}else{

					if(flag){
					on.emit(this.ipEl,'focusout',{
						bubbles: true,
    					cancelable: true
					});

					on.emit(this.ipEl,'blur',{
						bubbles: true,
    					cancelable: true
					});

					}

				}
			},

			_setListAttr : function(html){
				this.ipList.innerHTML = html;
				this._toggleList(true);
			},

			_getListAttr : function(){
				return this.ipList.innerHTML;
			},

			_getObjAttr : function(){
				if(!lang.trim(this.ipEl.value)){
					return null;
				}

				var obj = this.getItem();

				return (!obj || obj.id == '0') ? null : obj;
			},

			_getDataIdAttr : function(){
				if(!lang.trim(this.ipEl.value)){
					return null;
				}

				var obj = this.getItem();

				return (!obj || obj.id == '0') ? null : obj.id;
			},

			_setLenAttr : function(len){
				var MAX_VIEW_SIZE = this.MAX_VIEW_SIZE;

				domClass[len > MAX_VIEW_SIZE ? 'add' : 'remove'](this.ipList,'ui-ip-list-scroll');

				if(this.scrollHeight){
					this.ipList.style.height = len > MAX_VIEW_SIZE ? this.scrollHeight + 'px' : 'auto';
				}

				this._set('len',len);
			},

			getItem : function(name){
				//var name = name || lang.trim(this.ipEl.value);

				if('undefined' == typeof name){
					name = lang.trim(this.ipEl.value);
				}

				return this.get('_by_name') && this.get('_by_name')[name];
			},

			postMixInProperties : function(){

				this.showMsg = this.dialog ? lang.hitch(this,function(type, message){
									this.dialog.showMsg(type, message);
								}) : this.staMsg;
			},

			postCreate : function(){

				this.inherited(arguments);

				this._fetchData(this._handleData, true);

				this._bindUI();

				this._rendTypes();
			},

			startup : function(){
				this.inherited(arguments);

				this._rendUI();
			},

			_rendUI : function(){

				var position = domStyle.getComputedStyle(this.ipEl),
					w, h;

				w = parseInt(position.width)+parseInt(position.paddingLeft)+parseInt(position.paddingRight);
				h = parseInt(position.height)+parseInt(position.paddingTop)+parseInt(position.paddingBottom);

				/*
				domStyle.set(this.ipMark,{
					left : w - 25 + 'px'
				});
				*/

				domStyle.set(this.ipList,{
					left : '0',
					top : h - 1 +'px'
				});

			},

			_bindUI : function(){
				this.own(
					on(this.ipMark, 'click', lang.hitch(this, this._handleClickMark)),
					on(this.ipEl, 'keyup', lang.hitch(this, this._handleKeyUp)),
					//on(this.ipSta, 'click', lang.hitch(this, this._handleEditOrSave)),
					on(this.ipSave, 'click', lang.hitch(this, this._handleSaveOrNew)),
					on(this.ipEdit, 'click', lang.hitch(this, this._handleEdit)),
					on(this.domNode,'.J-ip-item:click',lang.hitch(this,this._handleClickItem)),
					on(this.domNode, on.selector('.J-ip-item',mouse.enter), lang.hitch(this, this._handleMouseOverItem)),
					on(this.domNode, on.selector('.J-ip-item',mouse.leave), lang.hitch(this, this._handleMouseOutItem)),
					on(this.domNode,'.J-ip-type:click',lang.hitch(this,this._handleClickType)),
					on(this.domNode,'.item-new:click',lang.hitch(this,this._handleClickNew)),
					on(this.domNode,'.ui-ip-del:click',lang.hitch(this,this._handleDel)),
					on(dojo.body(),'click',lang.hitch(this,function(e){
						if(this !== this) return;
						if(this.$contains(this.domNode,e.target)) return;

						this._toggleList(0);
						//this._toggle(this.ipTypes, 0);
						this._toggleTypes(0);
					}))
				);
			},

			_rendTypes : function(){
				var types = this._splitUrl(),
					str = '';

				this.__filters = types || [];

				array.forEach(types, function(type){
					str += '<li class="ui-ip-types-item J-ip-type" data-type="'+type+'">'+this.titles[type]+'</li>';

				}, this);

				this.ipTypeList.innerHTML = str;
			},

			_fetchData : function(fn, f){
				var deferred,
					always = lang.hitch(this, function(){
						this.domNode.style.visibility = '';
					});

				if(!this.remoteUrl) return;

				if(f){
					this.domNode.style.visibility = 'hidden';
				}

				deferred = this.$get(this.remoteUrl, fn);

				if(f){
					deferred.then(always,always);
				}

				return deferred;
			},

			_handleData : function(data){
				this.set('data',data);

				if(this.get('value')){
					this.set('value',this.get('value'), 1);
				}
			},

			refresh : function(list, obj){
				this.$get(this.remoteUrl, this.syncAllObject, list, obj);
			},

			syncAllObject : function(list, obj, data){
				var currentId = obj.id;

				array.forEach(list, function(item){
					!item._destroyed && item.set('data', data);

					if(!item._destroyed && item._get('dataId') == currentId) {
						item.set('value',obj._isDeleted ? '' : obj.name,1);
						item.onClickItem && item.onClickItem(obj);
					}
					//item._cache = {};
				},this);

				//this.set('obj', obj);
				!obj._isDeleted && this.set('value', obj.name, 1);
				!obj._isDeleted && this.set('dataId', obj.id, 1);
			},

			/**
			 *@Events attach
			 */
			_handleClickMark : function(e){
				var v = lang.trim(this.ipEl.value),
					listTmpl = this.get('listTmpl'),
					data = this.get('data');

				if(listTmpl === ''){
					return;
				}

				this.set('len', data.length);

				this._toggleList();
				this.ipList.innerHTML = listTmpl;

			},

			_handleClickItem : function(e){
				if(dojo.hasClass(e.target,'ui-ip-del')) return;

				var obj = this.get('_by_id')[e.target.getAttribute('data-id')];

				this.set('value', obj.name, 1);

				this.set('dataId', obj.id, 1);

				this.onClickItem(obj);

				this._toggleList(0);
			},

			_handleClickType : function(e){
				if(!dojo.hasClass(e.target,'J-ip-type')) return;

				// create object form
				// & and hide ipTypes
				//this._toggle(this.ipTypes, 0);
				this._toggleTypes(0);

				this._createObjectForm({
					data : {name : this.getItem() ? '' : this.ipEl.value},
					type : e.target.getAttribute('data-type')
				});
			},

			_handleKeyUp : function(e){
				var t = e.target,
					val = lang.trim(t.value),
					isEmpty = val == '', d;

				//this._toggle(this.ipSta, !isEmpty);
				//this.set('action', 'save');

				this.set('value', val, true, true);

				if(this._cache[val]){
					this.set('list', this._cache[val]);
					return;
				}


				this._timer && clearTimeout(this._timer);

				this._timer = setTimeout(lang.hitch(this, function(){

					d = this._matchData(val);
					this.set('len', d.length);
					this.set('list', d.length ? (this._cache[val] = this._makeListTmpl(this._makeTypeHash(d))) : this.noRecordMsg );

				}), this.timeout);

			},

			_handleSaveOrNew : function(e){
				var position = dojo.position;

				if(this.__filters.length > 1){
					//this._toggle(this.ipTypes, 1);
					this._toggleTypes(1);
					this._toggleList(0);
					!this.__typeX && domStyle.set(this.ipTypes, {
						left : this.__typeX = position(this.ipSave).x - position(this.domNode).x - 18 + 'px'
					});
				}else{
					this._createObjectForm(
						lang.mixin({data : {name : this.getItem() ? '' : this.ipEl.value}}, this.__filters.length == 0 ? {} : {type : this.__filters[0]})
					);
				}
			},

			_handleEdit : function(e){
				var obj = this.getItem();

				obj &&
					!obj.predefined &&
						this._createObjectForm({
							data : lang.clone(obj),
							pageTitle : obj.name,
							type : obj.jsonType
						});

			},

			/*_handleEditOrSave : function(e){
				var t = e.target, position = dojo.position,
					isEdit = dojo.hasClass(t,'ui-ip-edit'),
					obj = this.get('obj');

				if(isEdit){
					this._createObjectForm({
						data : obj,
						pageTitle : obj.name,
						type : obj.jsonType
					});
				}else{

					if(this.__filters.length > 1){
						this._toggle(this.ipTypes, 1);
						this._toggleList(0);
						!this.__typeX && domStyle.set(this.ipTypes, {
							left : this.__typeX = position(this.ipSta).x - position(this.domNode).x - 20 + 'px'
						});
					}else{
						this._createObjectForm(
							lang.mixin({data : {name : this.ipEl.value}}, this.__filters.length == 0 ? {} : {type : this.__filter[0]})
						);
					}

				}
			},*/

			_handleClickNew : function(e){
				e.preventDefault();

				this._toggleList(false);

				this._createObjectForm({
					type : e.target.getAttribute('data-type')
				});
			},

			_handleDel : function(e){
				e.stopPropagation();

				var item = e.target.parentNode,
					id = item.getAttribute('data-id');

				this.cfmMsg(lang.hitch(this, function(){

					return this.$del(this._getDelUrl(id), function(){

						if(this.get('_by_id')[id].name == this.ipEl.value){
							this.set('value','', 1);
						}

						var data = this._removeObj(id),
							obj = {
								'id':id,
								'name': '',
								'_isDeleted': true
							};

						this.set('data',data);

						this.syncAfterRemoveList && this.syncAfterRemoveList(data, obj);

						domCon.destroy(item);

						this.showMsg('success', this.deleteMsg);

						this.onAfterRemove();
					});

				}));

			},

			_handleMouseOverItem : function(e){
				var delEl = e.target.children[0];

				delEl && (delEl.style.visibility = 'visible');
			},

			_handleMouseOutItem : function(e){
				var delEl = e.target.children[0];

				delEl && (delEl.style.visibility = 'hidden');
			},



			_createObjectForm : function(opts){
				var obj = {
						parentWgt : this.parentWgt,
						pageTitle : this.pageTitle,
						removeMed : this.removeMed,
						dialog : this.dialog,
						ipObj : this,
						bTitle : this.bTitle,
						mode : this.mode
					},
				extObj = this.context ? this.paramFn.call(this.context) : this.paramFn ? this.paramFn() : {};

				this.ipForm = this._createForm(lang.mixin({}, obj, opts, extObj));

				if(this.addMed && this.parentWgt){
					// this for backward compatible
					this.parentWgt[this.addMed](this.ipForm);
				}else{
					this.onAddForm(this.ipForm);
				}

			},

			// just for now , when click save need save ipobject first , it would be removed
			isSaved : function(){
				//return this.get('_by_name')[this.ipEl.value];
				return this.getItem();
			},

			attr : function(name){
				return this.get(name);
			},


			/**
			 *@Helps fn
			 *
			 */
			_removeObj : function(id){

				return array.filter(this.get('data'), function(d){
					return id != d.id;
				});
			},

			_getDelUrl : function(id){
				var arr = this.remoteUrl.split('?'),
					url = arr[0], reg = /\/filter$/;

				return url.replace(reg,'') + '/' + id;
			},

			_splitUrl : function(){
				var reg = /jsonType=(.+)/,
					arr = this.remoteUrl.match(reg),
					ret;

				return arr && (ret = arr[1].split('&')) && ret[0].split(',');
			},


			_toggle : function(el, f){
				var flag = 'undefined' == typeof f ? this.$isHidden(el) : f;

				el.style.display = flag ? '' : 'none';
			},

			_toggleTypes : function(f){
				var arr = ['ui-ip-save', 'ui-ip-save-active'];

				f && arr.reverse();

				this._toggle(this.ipTypes, f);

				domClass.add(this.ipSave, arr[0]);
				domClass.remove(this.ipSave, arr[1]);
			},

			_toggleList : function(f){
				var flag = 'undefined' == typeof f ? this.$isHidden(this.ipList) : f;

				this.ipList.style.display = flag ? '' : 'none';

				domClass[flag ? 'add' : 'remove'](this.ipMark, 'ui-ip-active');

				if(flag){
					this.ipTypes.style.display = 'none';
				}
			},

			_makeDataHash : function(data, type){
				var obj = {};

				array.forEach(data, function(item){
					obj[item[type]] = item;
				});

				return obj;
			},

			_makeTypeHash : function(data){
				var data = lang.clone(data),
					obj = {};

				array.forEach(data, function(item){
					var type = item.jsonType;

					(obj[type] || (obj[type] = [])).push(item);
				});

				return obj;
			},

			_makeListTmpl : function(data){
				var str = '', i,dd,label;

				for(i in data){
					dd = data[i];
					if(dd.length){
						str += '<div class="ui-ip-list-item">';
						str += '<p class="item-title-wrap"><span class="item-title">'+(this.titles[i] || i)+'</span>';
						if(i.toLowerCase() != 'any'){
							str += '<a href="#" class="item-new" data-type="'+i+'">New</a></p>';
						}
						str += '<ul class="item-area">';
						array.forEach(dd,function(o,i){
							// change o.val to o.name
							str += '<li class="J-ip-item" data-id="'+o.id+'">'+o.name+(!o.predefined ? '<span class="table-action-icons table-sim-remove ui-ip-del"></span>' : '') + '</li>';
						});
						str += '</ul></div>';
					}
				}

				return str;
			},

			_matchData : function(val){
				var arr = [],
					val = val.replace(/[\.\/]/g,function(a){ return '\\' + a;}),
					reg = new RegExp('^'+val,'i');

				if(val == ''){
					return [];
				}

				dojo.forEach(this.get('data'),lang.hitch(this,function(item){
					/*var val = this.getMatchVal(item),
						f = this.any ? reg.test(val) : item.id == '0';

					f && arr.push(item);*/
					reg.test(item.name) && arr.push(item);
				}));

				return arr;
			},



			onAfterRemove : function(){},
			onAddForm : function(){},
			onRemoveForm : function(){},
			onClickItem : function(){},


			/**
			 *@Interface for extend
			 */
			titles : {},
			_createForm : function(cfg){}

		});
});
