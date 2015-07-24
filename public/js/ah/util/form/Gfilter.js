define([ "dojo/_base/declare",
		"dojo/on",
		"dojo/_base/lang",
		"dojo/dom-construct",
		"dojo/query",
		"dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
		"dojo/mouse",
		"ah/util/Tab",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/_base/array",
		"ah/util/message/ConfirmMsg",
		"ah/util/common/SessionStorage",
	    "ah/util/common/Base",
	    "ah/util/dojocover/AHDialog",
	    "ah/comp/entities/PolicyEntity",
	    "dojo/when",
	    "ah/util/AHComponent"], function(declare, on, lang, domCon, $, _WidgetBase, _TemplatedMixin,  mouse, Tab, domClass, domContruct, array, ConfirmMsg, sessionStorage, Base, AHDialog, PolicyEntity, when, AHComponent) {

	var cache = {};


	var Popbox = declare([AHComponent],{

		templateString : '<div>'+
						'<div class="ui-sml-tle">'+
	       					'<span class="title" style="padding-left:10px">Save Filter</span>'+
						'</div>'+
						'<div style="padding:10px">'+
						'<p>${des}</p>'+
						'<div class="line clearfix">'+
							'<div class="grid_2 first column">'+
								'<label class="label-rqe">Filter Name</label>'+
							'</div>'+
							'<div class="column grid_4 last">'+
								'<input class="grid_3" type="text" data-dojo-attach-point="filterName" placeholder="Name"/>'+
								'<div class="clearfix" data-dojo-attach-point="errorMessage"></div>'+
								'<div class="clearfix" data-dojo-attach-point="nameErrorMessage"></div>'+
							'</div>'+
						'</div>'+
						'<div class="line clearfix">'+
							'<div class="grid_2 first column">'+
								'<label>&nbsp;</label>'+
							'</div>'+
							'<div class="column grid_4 last">'+
								'<button class="btn btn-small btn-primary" data-dojo-attach-point="saveButton">Save</button>'+
								'<button class="btn btn-small btn-cancel" data-dojo-attach-point="cancelButton">Cancel</button>'+
							'</div>'+
						'</div></div></div>',

		des : 'Save currently selected filter criteria, for quick access in the future',

		postCreate : function(){
			this._bindUI();
			this._rendUI();
		},

		_bindUI : function(){
			this.own(
				on(this.cancelButton,'click',lang.hitch(this,this._handleCancel)),
				on(this.saveButton,'click',lang.hitch(this,this._handleSave))
			);

		},

		_rendUI : function() {
			this.$validate({
				rules : {
					'filterName' : {
						required : true,
						// wordChar : true,
						minlength: 1,
						maxlength: 16
					}
				},

				errorPlacement : function(label, element) {
					if(element.getAttribute('data-dojo-attach-point')=="filterName") {
                         dojo.place(label,this.errorMessage,'first');
					}else {
					    dojo.place(label,element,'after');
					}
				}
			});
		},

		_handleCancel : function(e){
			this.nameErrorMessage && domContruct.empty(this.nameErrorMessage);
			this.dialog.hide();
		},

		_clearTreeData : function(data) {
			data = dojo.filter(data, function(node) {
				return node.id;
			});
			data.forEach(function(node) {
				node.children = this._clearTreeData(node.children);
			}, this);
			return data;
		},

		_clearData : function(data) {
			data = lang.clone(data);
			data.content.forEach(function(category) {
				category.value.forEach(function(items) {
					if(items.type == "TREE") {
						items.value = this._clearTreeData(items.value);
					} else if(items.type == "ITEMS") {
						var arr = dojo.filter(items.value,function(v){
									return v.value && v.id;
								  });
						items.value = arr;
					}
				}, this);
			}, this);
			return data;
		},

		_handleSave : function(e){
			var filter = this.filter,
				data = this._clearData(cache.data),
				name = lang.trim(this.filterName.value),
				url = filter.url,f = !!cache.data.id,method;

			method = f ? 'put' : 'post';
			url += f ? '/' + data.id : '';
			data.name = name;
			if(!this.$valid()) return;
			this.nameErrorMessage && domContruct.empty(this.nameErrorMessage);
			this['$'+method](url, data, this._handleData,f);
		},

		_handleData : function(f,data){
			if(data) {
				this.filter.refreshFilterListItem(data);

				// cache.name = d.name;
				// cache.id = d.id;
			}

			this.dialog.hide();
		},

		fillName : function(name){
			this.filterName.value = name ? name : '';
		}

	});



	var Filter = declare("ah/util/form/Gfilter", [AHComponent], {

		templateString : '<div><div data-dojo-attach-point="filterWrap">'+
							'<div class="filter-panel clearfix">'+
							'<div data-dojo-attach-point="listCon"></div>'+
							'<div data-dojo-attach-point="filterCon"></div>'+
							'</div>'+
						'</div></div>',

		url : 'services/inventory/global/data/filter',

		getUrl : 'services/report/config/management/filter',

		listUrl : 'services/inventory/global/data/filter/list',

		listClose:false,

		loadSessionData: true,

		replaceSessionData: true,

		postCreate : function(){
			this._rendUI();
			this._bindUI();
		},

		_rendUI : function(){
			// now , jsut set cache null, need confirm do we need localstorage
			cache.data = null;

			this.loadSessionData && this.initListCloseStatus();//TODO
			/*this.tab = new Tab({tabTitles : 'Filter,List'},this.filterWrap);*/

			// rend filter area
			this.initFilter();

			// rend filter list
			this.initFilterList();
		},

		initListCloseStatus: function() {
			var obj = this, sessionData = sessionStorage.get('com.filter.data'), filterId = sessionStorage.get('com.filter.id'), found=false;

			if(filterId) {
				this.listClose = false;
			} else if(sessionData){
				if(!sessionData.content) {
					sessionStorage.set('com.filter.data', null);
					sessionStorage.set('com.filter.id', null);
					return;
				}
				sessionData.content.some(function(category) {
					category.value.forEach(function(items) {
						if(items.value && items.value.length) {
							this.listClose = false;
							found = true;
						}
						return found;
					});
					return found;
				});
			}
		},

		rendData : function(data) {
			if(this.defaultFilters) {
				this.listClose = false;
				sessionStorage.set('com.filter.id', null);
				data = this.makeData(data, this.defaultFilters);
			} else if(this.loadSessionData && sessionStorage.get('com.filter.data')) {
				var sessionData = sessionStorage.get('com.filter.data');
				this.makeNewData(data, sessionData);
			}

			this.setupFilterHtml(data);

			this._filterGrid(this.defaultFilters?true:false);
		},

		initFilter : function(){
			if(this.data) {
				this.rendData(this.data);
			} else if(this.filterConfigKey) {
				this.filterPromiser = this.$get(this.url+'/-1?filterConfigKey='+this.filterConfigKey,function(data){
					this.rendData(data.data);
				});
			}
		},

		makeNewData: function(data, sessionData) {
			sessionData.content.forEach(function(sessionCategory) {

				var cg = null, its = null;
				data.content.some(function(category) {
					if(category.name == sessionCategory.name) {
						cg = category;
						return true;
					}
					return false;
				});
				if(!cg) return;

				sessionCategory.value.forEach(function(sessionItems) {
					if(sessionItems.value && sessionItems.value.length) {
						cg.value.some(function(items) {
							if(items.code == sessionItems.code) {
								its = items;
								return true;
							}
							return false;
						});
						if(!its) return;

						if(sessionItems.type == "ITEMS") {
							its.value.forEach(function(item) {
								if(sessionItems.value.indexOf(item.id) != -1) {
									item.value = true;
								}
							});
						} else if(sessionItems.type == "TREE") {
							its.value.forEach(function(item) {
								this.makeLocation(item, sessionItems.value);
							}, this);
						}
					}
				}, this);
			}, this);
			return data;
		},

		makeData: function(data, defaultFilters) {
			var found = false;
			data.content.some(function(category) {
				category.value.some(function(items) {
					if(items.code == "DEVICE_MANAGEMENT_STATE") {
						items.value.some(function(item) {
							if(item.id == defaultFilters.adminStatus) {
								item.value = found = true;
								return true;
							}
							return false;
						});
					}
					return found;
				});
				return found;
			});

			found = false;
			data.content.some(function(category) {
				category.value.some(function(items) {
					if(items.code == "DEVICE_CONNECTION_STATE") {
						items.value.some(function(item) {
							if(item.id == defaultFilters.isConnected) {
								item.value = found = true;
								return true;
							}
							return false;
						});
					}
					return found;
				});
				return found;
			});

			found = false;
			data.content.some(function(category) {
				category.value.some(function(items) {
					if(items.code == "LOCATION") {
						items.value.forEach(function(item) {
							this.makeLocation(item, defaultFilters.locations);
						}, this);
						found = true;
					}
					return found;
				}, this);
				return found;
			}, this);

			return data;
		},

		makeLocation: function(item, locationIds) {
			var children = item.children;
			if(locationIds.indexOf(item.id) != -1) {
				item.value = true;
			}
			if(children && children.length) {
				array.forEach(children, lang.hitch(this, function(obj){
					this.makeLocation(obj, locationIds);
				}));
			}
		},

		initFilterList : function(){
			this.$get(this.listUrl,function(data){
				if(this.data) {
					this.setupHtml(this._makeFilterListHtml(data.data),'listCon');
				} else {
					when(this.filterPromiser, lang.hitch(this,function(){
						this.setupHtml(this._makeFilterListHtml(data.data),'listCon');
					}));
				}
			});
		},

		setupFilterHtml : function(data){
			cache.data = data;
			this.setupHtml(this._makeFilterHtml(data),'filterCon');
		},

		setupHtml : function(html,el){
			this[el].innerHTML = html;
		},

		_bindUI : function(){
			this.own(
				on(this.domNode,'.ui-filter-categ-tle:click',lang.hitch(this,this._handleToggleWipe)),
				on(this.domNode,'.ui-filter-dtl-tle:click',lang.hitch(this,this._handleToggleWipe)),
				on(this.domNode,'.J-more:click',lang.hitch(this,this._handleMoreClick)),
				on(this.domNode,'.J-less:click',lang.hitch(this,this._handleLessClick)),
				on(this.domNode,'.J-check-any:click',lang.hitch(this,this._handleCheckAny)),
				on(this.domNode,'.J-check-item:click',lang.hitch(this,this._handleCheckItem)),
				on(this.domNode,'.J-pa-hook:click',lang.hitch(this,this._handleToggleWipe)),
				on(this.domNode,'.J-save-filter:click',lang.hitch(this,this._handleSaveMsgShow)),
				on(this.domNode,'.filter-loca-checked:click',lang.hitch(this,this._handleClickLocation)),

				on(this.domNode,'.J-detail:click',lang.hitch(this,this._handleDetailClick)),

			//	on(this.domNode,'.ui-filter-list-item:mouseover',this._handleToggleDel),
				//on(this.domNode,'.ui-filter-list-item:mouseout',this._handleToggleDel),
				on(this.domNode,'.list-item-name:click',lang.hitch(this,this._handleClickFilter)),
				on(this.domNode,'.list-item-del:click',lang.hitch(this,this._handleItemDel)),
				on(this.domNode,'.J-last-child:click',lang.hitch(this,this._handleClickTree))
			);

		},

		_handleDetailClick: function(e) {
			var target = e.target,
				id = target.getAttribute('data-id'),
				name = this._encode(target.getAttribute('data-name'));

			this.popEntity(
				{ style: "width: 1165px;overflow:hidden;background-color:white" },
				{ entityType: 'policy', srcObj: { id: id, name: name } },
				function(dialog) { dojo.destroy(dialog.titleBar); }
			);
		},

		_handleClickLocation: function(e) {
			var ns = e.target.parentNode.nextSibling;
			if(ns && ns.children && ns.children.length) {
				array.forEach($('input', ns), function(item) {
					item.checked = e.target.checked;
				});
			}

			if(!e.target.checked) {
				var t = e.target.parentNode;
				while(t.parentNode.parentNode.previousSibling.className.indexOf("checkbox") != -1) {
					t = t.parentNode.parentNode.previousSibling;
					t.firstChild.checked = false;
				}
			}

			if(e.target.checked) {
				//TODO
			}

			this._filterGrid(true);
		},
		/**
		 * _makeFilterHtml accepts a collection and generates HTML that can be used to create a global filter.
		 * @param  Collection 	data 	Collection of objects that represent Global Filter Options.
		 * @return String    		HTML 	string that can be injected into the DOM to create a global filter.
		 */
		_makeFilterHtml : function(data){
			var str = '<div style="border-top:0px solid #a7a9ab;" class ="filter-con-header"><span class="filter-con-title">FILTER BY</span><button style="padding:0 10px" class="J-save-filter btn btn-small btn-fillter-save">Save</button></div>';
			var that = this;
			var sessionData = sessionStorage.get('com.filter.data');

			data.content.forEach(function(category) {
				str += '<div class="ui-filter-categ" data-name="'+category.name+'">';
				str += '<h3 class="ui-filter-categ-tle">'+category.name+'<em class="ui-filter-extextend-blue '+(this.listClose ? 'ui-filter-extextend-blue-cur': '')+'"></em></h3>';
				str += '<div class="ui-filter-dtl-area" style="display:'+(this.listClose ? 'none' : '')+';padding-top:1px;padding-bottom: 5px;">';

				//iterates the value subarray
				category.value.forEach(function(items) {
					var tree = false, any;
					if(items.type === "TREE"){
						tree = true;
					}
					//looks at the boolean value for items in subarray collection
					if(!tree){
						any = dojo.every(items.value, function(itemObj){
							if(itemObj.name === 'Real Devices' && sessionData === null){
								itemObj.value = true;
							}

							return !itemObj.value;
						});
					}

					str += '<div class="ui-filter-dtl" data-code="' + items.code + '" data-name="' + items.name + '">';
					str += '<h4 class="ui-filter-dtl-tle">' + items.name + '<em style="top: 3px;" class="ui-filter-extextend-blue"></em></h4>'
					str += '<ul>';
					//This line is reponsible for placing the "All" option into the global filter lists.
					if(!tree){
						str += that._makeNoTree({value : any, name : 'All', className : 'J-check-any'});
					}

					items.value.forEach(lang.hitch(this, function(item, index){
						str += tree ? that._makeTree(item) : that._makeNoTree(item, items.code, index, index === items.value.length-1);
					}));

					str += '</ul>';
					str += '</div>';
				});
				str += '</div></div>';
			});
			return str;
		},

		_makeFilterListHtml : function(data){
			var str = '<div class="ui-filter-list-wrap"><div class ="filter-con-header" style="border-top:0px solid #a7a9ab;"><span class="filter-con-title">MY FILTERS</span></div><ul class="ui-filter-list clearfix">',
			    f =data.length == 0 ? '' : 'style="display:none;"';

			dojo.forEach(data,lang.hitch(this,function(item){
				str += '<li class="ui-filter-list-item">';
				str += this._makeFilterListItem(item);
				str += '</li>';
			}));

			str +='<p class="no-filter" '+f+'>No saved filter</p>';

			str += '</ul></div>';

			return str;
		},

		_makeFilterListItem : function(item){
			var current = item.checked || (this.loadSessionData && sessionStorage.get('com.filter.id') == item.id);
			if(current) {
				cache.data.id = item.id;
				cache.data.name = item.name;
				this.replaceSessionData && sessionStorage.set('com.filter.id', item.id);
			}
			var name = this._encode(item.name);
			return '<label class="checkbox"><input data-name="'+name+'" data-id="'+item.id+'" class="list-item-name'+(current ? ' list-item-name-cur' : '')+'" type="checkbox" '+(current ? 'checked' : '')+' /><span class="lbl fn-ellipsis" style="width: 80%;" title="'+name+'">'+name+'</span></label>'+
			       '<span data-id="'+item.id+'" class="list-item-del"></span>';
		},

		_makeNoTree : function(item, j, i, isLast){
			var name = this._encode(item.name);
			var f = i > 2, needMore = i == 3, disabled = !item.id && j;
				str = '<li '+(f ? 'style="display:none"' : '')+'><label class="checkbox"><input '+(disabled?'disabled':'')+' data-name="'+name+'" data-id="'+item.id+'" class="'+(item.className || 'J-check-item')+'" type="checkbox" '+(item.value ? 'checked' : '')+' /><span class="lbl fn-ellipsis" style="width: 80%;" title="'+name+'">' + name + '</span>' + (j == "NETWORK_POLICIES" ? '<a href="javascript:void(0);" class="J-detail" data-name="' + name + '" data-id="' + item.id + '"></a>' : '') + '</label></li>';

			if(needMore){
				str = '<li><a href="#" class="J-more">More<!--em style="top: 3px;" class="ui-filter-extextend-blue"></em--></a></li>' + str;
			}

			if(isLast && i>=3) {
				str = str + '<li style="display:none;"><a href="#" class="J-less">Less</a></li>';
			}

			return str;
		},

		_makeTree : function(item){
			var name = this._encode(item.name);
			var children = item.children,
				str = '<li style="position:relative;">', disabled = !item.id;

			if(children && children.length) {//'+(item.listClose ? 'ui-filter-extextend-location-blue-cur': '')+'
				str = str+'<span class="ui-filter-extextend-location-blue J-pa-hook "></span>';
			}
			str = str+'<label class="checkbox ml10"><input '+(disabled?'disabled':'')+' type="checkbox"' +(item.value ? 'checked' : '')+' class="filter-loca-checked" data-id="'+item.id+'" data-name="'+name+'"/><span class="lbl fn-ellipsis" style="width: 80%;" title="'+name+'">'+name+ '</span></label>';

			if(children && children.length){
				str += '<ul>';
				dojo.forEach(children,lang.hitch(this,function(obj){
					str += this._makeTree(obj);
				}));
				str += '</ul>';
			}

			str += '</li>';

			return str;

		},

		_changeCodeToKey : function(str) {
			var strArr = str.toLowerCase().split("_"), rtnArr=[];
			strArr.forEach(function(item, i) {
				if(i > 0) {
					item = item.charAt(0).toUpperCase() + item.substring(1);
				}
				rtnArr.push(item);
			});

			return rtnArr.join("");
		},


		/**
		 *@Method for event attach
		 *
		 */

		_handleToggleWipe : function(e){
			var target = e.target, locationExt = (e.target.className.indexOf("J-pa-hook") != -1);
			if(locationExt) {
				target = target.nextSibling;
			} else if(e.target.className.indexOf("ui-filter-extextend-blue") != -1) {
				target = target.parentNode;
			}

			var cur = $(target),
				area = cur.next()[0],
				curArrow = locationExt?$('.ui-filter-extextend-location-blue',target.parentNode):$('.ui-filter-extextend-blue',target),
				f = area.style.display;

			$(curArrow[0])[f =='' ? 'addClass' : 'removeClass'](locationExt?'ui-filter-extextend-location-blue-cur':'ui-filter-extextend-blue-cur');
			this.$toggleWipe(area);
		},

		_handleMoreClick : function(e){
			e.preventDefault();
			var target=e['target'].className=="ui-filter-extextend-blue"?e['target'].parentNode:e.target;
			var liEls = $(target).parent().nextAll();

			liEls.style('display','');
			target.parentNode.style.display = 'none';
		},

		_handleLessClick : function(e) {
			e.preventDefault();
			var target=e['target'].className=="ui-filter-extextend-blue"?e['target'].parentNode:e.target;
			var liEls = $(target).parent().prevAll();
			var f = false;
			liEls.forEach(function(item) {
				if(item.firstChild.tagName == "LABEL" && !f) {
					item.style.display = "none";
				} else if(item.firstChild.tagName == "A") {
					f = true;
					item.style.display = "";
				}
			});
			target.parentNode.style.display = 'none';
		},

		_handleCheckAny : function(e){
			var t = $(e.target),
				nextAlls = $('.J-check-item',t.closest('ul')[0]),
				any = $('.J-check-any',t.closest('ul')[0]),
				checked = e.target.checked;

            any.attr('checked',true);

			checked && nextAlls.attr('checked',false);

			this._filterGrid(true);
		},

		_handleCheckItem : function(e){
			var t = $(e.target),
				ul = t.closest('ul')[0],
				any = $('.J-check-any',ul),
				allItems = $('.J-check-item',ul),
				checked = e.target.checked;

			checked && any.attr('checked',false);

			allItems.every(function(item){
				return !item.checked;
			}) && any.attr('checked',true);

			this._filterGrid(true);
		},

		_handleToggleDel : function(e){
			var t = this,
				del = $('.list-item-del',t)[0];

			del.style.display = e.type == 'mouseover' ? '' : 'none';
		},

		_handleClickFilter : function(e){
			var t = e.target,el = $(t),
				id = t.getAttribute('data-id'),
				name = lang.trim(t.getAttribute('data-name')),
				alls = $('.list-item-name',el.closest('ul')[0]),
				checked = e.target.checked,
				cla = 'list-item-name-cur';

			if(dojo.hasClass(t,cla)) {
				// if no filters selected, reload
				this.replaceSessionData && sessionStorage.set('com.filter.id', null);
                $('.'+cla,this.domNode).removeClass(cla);
                var url = this.templateKey?this.getUrl+"/-1?templateKey="+this.templateKey:this.url+'/-1?filterConfigKey='+this.filterConfigKey;
                this.$get(url,function(data){
				    this.setupFilterHtml(data.data);
				    this._filterGrid(true);
			    });
				return;
			}

			this.loadSessionData && sessionStorage.set('com.filter.id', id);

            alls.attr('checked',false);
            el.attr('checked',true);
			// current state action
			$('.'+cla,this.domNode).removeClass(cla);
			el.addClass(cla);

			// fetch data to reRender content
			var url = this.templateKey?this.getUrl+"/"+id+"?templateKey="+this.templateKey:this.url+'/'+id+'?filterConfigKey='+this.filterConfigKey;
			this.$get(url, function(data){
				this.setupFilterHtml(data.data);
				this._filterGrid(true);
			});

			// // store id or name to check if it is edit or add
			// cache.name = name;
			// cache.id = id;

		},

		_handleClickTree : function(e){
			var t = $(e.target);

			// need filter grid list

			// need add and remove class for this element
			t.toggleClass('filter-loca-checked');
		},

		_handleItemDel : function(e){
			var t = e.target,
				li = $(t).closest('li')[0],
				id = t.getAttribute('data-id');

			ConfirmMsg.show(lang.hitch(this,this._delItem,id,li));
		},

		_handleSaveMsgShow : function(e){

			if(!this._msgbox){

				this._msgbox = this.$pop(
						{
							style: "width:380px",
							bDefHide: true
						},
						this._msgcon = new Popbox({filter : this}),
						function(dialog, widget){
							dojo.destroy(dialog.titleBar);
						}
					);
			}
			this._msgbox.show();
			this._msgcon.fillName(cache.data.name);
		},

		/**
		 *@Method for hanlde events
		 */

		_delItem : function(id,li){
			this.$del(
				this.url + '/' + id,
				function(data){
					dojo.destroy(li);

					if(id == cache.data.id){
						cache.data.name = null;
						cache.data.id = null;
					}

					var list = $('.ui-filter-list-item',this.domNode);
					if(list.length == 0) {
						$('.no-filter',this.domNode)[0].style.display = '';
					}
				}
			);

		},

		_filterGrid : function(isNewFilter){
			var simFilter = this._toSimFilter(this.__toFilterObj());
			var params = this._toFilterParams(simFilter);

			if(!this.gridFilterFn){
				return;
			}

	    	this._xtimer && this._xtimer.remove();
	    	this._xtimer = this.defer(function(){
			// Filter gird accroding to the special page
			      this.gridFilterFn(params);
	    	},1e3);

	    	if(isNewFilter && this.replaceSessionData) {
	    		sessionStorage.set('com.filter.data', simFilter);
	    	}
		},

		_encode : function(s) {
			if(s.length == 0) return "";
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			s = s.replace(/ /g, "&nbsp;");
			s = s.replace(/\'/g, "&#39;");
			s = s.replace(/\"/g, "&quot;");
			s = s.replace(/\n/g, "<br>");
			return s;
		},


		/**
		 *@Method for data
		 *@return
		 * {
		 *	devices : [
		 *		{id : 1, checked : true/false}
		 *	],
		 *	**** : []
		 *
		 *	}
		 */
		__toFilterObj: function() {
			var that = this;
			$('.ui-filter-categ',this.domNode).forEach(function(el) {
				var elName = el.getAttribute("data-name"), categoryObj = null;
				cache.data.content.some(function(category) {
					if(category.name == elName) {
						categoryObj = category;
						return true;
					}
					return false;
				});

				$('.ui-filter-dtl',el).forEach(function(items) {
					var itemsName = items.getAttribute('data-name'), itemsObj = null;
					categoryObj.value.some(function(cacheItems) {
						if(cacheItems.name == itemsName) {
							itemsObj = cacheItems;
							return true;
						}
						return false;
					});

					if(itemsObj.type == "ITEMS") {
						var els = $('.J-check-item', items);
						els.forEach(function(item) {
							itemsObj.value.some(function(cacheItem) {
								if(item.getAttribute("data-id") == cacheItem.id) {
									cacheItem.value = item.checked;
									return true;
								}
								return false;
							});
						});
					} else if(itemsObj.type === "TREE") {
						var els = $('.filter-loca-checked', items);
						els.forEach(function(item) {
							that._setLocationValue(itemsObj.value, item);
						});
					}
				});
			});
			return cache.data;
		},

		_setLocationValue: function(items, el) {
			var that = this;
			items.some(function(item) {
				if(el.getAttribute("data-id") === item.id) {
					item.value = el.checked;
					return true;
				} else if(item.children && item.children.length) {
					return that._setLocationValue(item.children, el);
				}
				return false;
			});
		},

		/**
		 *@Return
		 * {
		 *	 devices : [
		 *		1,2,3,4,5
		 *	 ],
		 *	 ******* : []
		 *
		 * }
		 */
		_toSimFilter : function(obj){
			var objBak = lang.clone(obj), that=this;
			objBak.content.forEach(function(category) {
				category.value.forEach(function(items) {
					if(items.type === "TREE") {
						items.value = that._filterLocations(items.value);
					} else if(items.type === "ITEMS") {
						items.value = dojo.map(dojo.filter(items.value,function(v){
									return v.value && v.id;
								}),function(v){return +v.id});
					}
				});
			});
			return objBak;
		},

		_filterLocations: function(locations) {
			var that = this, locationArr = [];
			locations.forEach(function(node) {
				if(node.value && node.id) locationArr.push(node.id);
				if(node.children && node.children.length) {
					locationArr = locationArr.concat(that._filterLocations(node.children));
				}
			});
			return locationArr;
		},

		/**
		 *@return {String} /^\??networkPolicy=1,2,3&deviceType=1,2$/
		 *@
		 */
		_toFilterParams : function(obj){
			var arr = [], param, str;
			obj.content.forEach(function(category) {
				category.value.forEach(function(items) {
					if(items.value && items.value.length) {
						arr.push(this._changeCodeToKey(items.code)+"="+items.value.join(","));
					}
				}, this);
			}, this);

			param = arr.join('&');
			str = param != '' ? '?' : '';

			// console.log(param);
			return str + param;
		},


		/**
		 *@Interface for outer
		 */
		refreshFilterListItem : function(data){
			this.setupHtml(this._makeFilterListHtml(data.data),'listCon');
		},

		show : function(holder){
			domCon.place(this.domNode,holder,'last');
		},

		destroy : function(){
			this.inherited(arguments);

			this._msgbox &&
				(this._msgbox.destroy(),this._msgcon.destroy());
		}

	}),obj = null;


	return {
		show : function(holder,opts){
			if(obj){
				obj.destroy();
				obj = null;
			}

			obj = new Filter(opts || {});

			obj.show(holder);
		},

		getData: function() {
			if(!obj || !cache) return;
			return cache.data;
		}
	};


});
