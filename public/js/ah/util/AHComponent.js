/**
 *@This Class would be relate with business
 *@Later we may got some Class about business
 */
define([
	'dojo/_base/declare',
	'dojo/on',
	"dojo/_base/lang",
	'ah/util/common/ModuleBase',
	'dojo/data/ObjectStore',
	'dojo/store/Memory',
	'ah/util/AHGrid',
	'ah/util/form/Validate',
	'dojo/window',
	'dojo/date/locale',
	'dojox/date/timezone',
	"ah/util/Formatter"
], function (
	declare, on, lang, ModuleBase, ObjectStore, Memory, AHGrid, Validate, win, locale, timezone, Formatter
) {
		return declare('ah/util/AHComponent',[ModuleBase],{

			toggleArrowDis : function(arrow,area){
				dojo.toggleClass(arrow,'ui-arrow-up');
				dojo.toggleClass(arrow,'ui-arrow-down');
				//dojo[f ? 'removeClass' : 'addClass'](content,'fn-hidden');

				area.style.display = area.style.display == 'none' ? '' : 'none';
			},


			/**
			 *@For create grid
			 *@Params type {String} data {Array/Object} opts {Object}
			 */
			createGrid : function(type,data,opts,el){
				var storeStr = type + 'Store',
					data = lang.isArray(data) ? data : data.data,
					opts = opts || {},
					plugins = {
						indirectSelection : {
							headerSelector:true/*,
							styles:"vertical-align:top; line-height:20px;"*/
						}
					},
					plugMap = {
						select : 'indirectSelection'
					},
					json = {data : data},
					store,grid,i,dd,dt,plug,key,v;

				// for personal memory identifier
				if(opts.identifier){
					json = {
						data : {
							items  : data,
							identifier : opts.identifier
						}
					};

					delete opts.identifier;
				}


				this[storeStr] = store = new ObjectStore({
					objectStore : new Memory(json)
				});

				// default config
				var defaultOpts = {
					store : store,
					plugins: {},
					query : {
						id : "*"
					},
					structure : [
						{
							name : "default name",
							field : "default",
							width : "auto"
						}
					]
				};

				if(opts.plugins){
					dt = lang.clone(opts.plugins);
					for( i in dt){
						dd = dt[i];
						key = 'object' === typeof dd ? i : plugMap[i];
						v = 'object' === typeof dd ? dd : plugins[plugMap[i]];
						defaultOpts.plugins[key] = v;
					}
					//defaultOpts.plugins = lang.mixin(defaultOpts.plugins,opts.plugins);
					delete opts.plugins;
				}

				defaultOpts = lang.mixin(defaultOpts,opts);

				// TODO need remove later
				defaultOpts.autoHeight = 10;


				grid = this.toRecover(type,new AHGrid(defaultOpts,el));

				grid.startup();

				//grid.autoHeight && grid.setAutoHeight();

				return grid;
			},
            startup: function () {
                this.inherited(arguments);

                //for google analytics tracking
				this.defer(this._createTracker,1e3);
            },

            /**
             * This is to create tracking
             * @private
             */
            _createTracker: function () {
                var userObj = [
                    {id: "Test-User1", devices: 10, pages: [], events: []},
                    {id: "Test-User2", devices: 80, pages: [], events: []},
                    {id: "Test-User3", devices: 40, pages: [], events: []},
                    {id: "Test-User4", devices: 5, pages: [], events: []},
                    {id: "Test-User5", devices: 150, pages: [], events: []},
                    {id: "Test-User6", devices: 300, pages: [], events: []},
                    {id: "Test-User7", devices: 20, pages: [], events: []}
                	],
					path = curPath = this._getWidgetPath(this.id),
					counter = 0, randomIndex = Math.floor(Math.random() * userObj.length),
					c = this, p;


				window.userObj || (window.userObj = userObj[randomIndex]);

				while( (p = c.getParent()) && counter < 2){
					c = p;

					if(/dialog/i.test(p.id)) continue;
					counter++;
					path = this._getWidgetPath(p.id) + ' -> ' + path;
				}

				//console.log(path);

                window.userObj.pages.push({
					"path": path,
                    "title": curPath
				});


                //sending to google api
                //customTitle = window.userStr + " %% " + _self._getWidgetPath(_self.id);

                ga('send', 'pageview', {
                    'page': path,
                    'title': window.userStr + " %% " + curPath //_self._getWidgetPath(_self.id)
                });

            },
            /**
             * This for sending analytics event
             * @param category
             * @param action
             * @param value
             */
            analyticsEvent: function (category, action, value) {
                window.userObj = window.userObj ? window.userObj : userObj[randomIndex];


                //storing it in session storage
                var currentEvent = {
                    "category": category,
                    "action": action,
                    "value": value
                };
                window.userObj.events.push(currentEvent);


                ga('send', 'event', category, action, value);
            },
            _getWidgetPath: function (str) {
                if (typeof str === "string") {
                    return str.substring(str.lastIndexOf("/") + 1, str.length - 2);
                }
            },
			/**
			 *@Method fetchGrids
			 *@Params gird {Object} (Grid)
			 *@type {String}  data {Object}
			 */
			fetchGrids : function(grid,type,data,fn){
				var grid = 'string' == typeof grid ? this[grid] : grid,
					//store = this[grid+'Store'],
					data = lang.isArray(data) ? data : [data],
					len = data.length,yetLen, store,
					selected = grid.selection.getSelected();

				store = grid.store;
				yetLen = store.objectStore.data.length;

				if(!store || !grid) return;

				if(type == 'add'){
					if(typeof fn === 'function' && !fn(yetLen + len)){
						return;
					}
					dojo.forEach(data,function(item){
						store.newItem(item);
						store.objectStore.add(item);
					});
					//grid.setStore(store);
				}

				if(type == 'edit'){
					dojo.forEach(data,function(item){
						//store.changing(item);
						store.objectStore.put(item);
					});

					grid.setStore(store);
				}

				if(type == 'del'){
					if(!selected.length) return;
					dojo.forEach(selected,function(item){
						store.deleteItem(item);
						store.objectStore.remove(item.id);
					});
				}

				// just render height and resize
				//grid.changeHeight();
				//grid.autoHeight && grid.setAutoHeight();
			},

			/**
			 *@For the method refreshGrid
			 *@
			 */
			_refreshGrid : function(grid,data){
				var store = this[grid+'Store'],
				grid = this[grid];
				data = lang.isArray(data) ? data : data.data;
				if(!store || !grid) return;

				var newStore = new ObjectStore({
					objectStore : new Memory({
						data : data
					})
				});

				store.close();
				grid.setStore(newStore);
				//grid.changeHeight();
				//grid.autoHeight && grid.setAutoHeight();
				//grid.startup();
			},

			toDelUrl : function(selected,param,syn){
				var selected = lang.isArray(selected) ? selected : [selected],
					len = selected.length,
					ids,ret = [],syn = syn || '?',
					param = param || 'ids';

				dojo.forEach(selected,function(item){
					ret.push(item.id);
				});

				ids = ret.join(',');

				if(param != 'ids'){
					return syn + param + '=' + ids;
				}

				return len == 1 ? '/'+ ids : syn + param + '=' + ids;
			},

			toPutUrl : function(data){
				return data ? '/'+data.id : '';
			},

			mapGridId : function(data){
				var reg = /\./,
					data = lang.clone(data);

			  data &&
				dojo.map(data, function(item, index) {
					reg.test(item.id) && (item.id = null);
					return item;
				});

				return data;
			},

			getGridData : function(grid){
				return grid ? dojo.map(grid.store.objectStore.data,function(item){
									if(item.__isDirty) delete item.__isDirty;

									return item;
								}) : null;
			},

			/**
			 *@Method
			 *@Get the genegate secret
			 */
			genegate : function(num){
				var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$%&'()*+,-./:;<=>@[]^_`{|}~",
					len = chars.length,count = num || 64,
					i,j,str = '';

				for(i = count;i >0; i--){
					j = Math.floor(Math.random()*len);
					str += chars.charAt(j);
				}

				return str;
			},


			/**
			 *@For validate
			 */
			validate : function(name,opts){
				// need recover this validate widget
				this.toRecover(name || 'validator',new Validate.validator(opts,this));
			},



			/**
			 * ///////////////////////////////////////////////////////
			 * @TODO methods above this line need to be removed later
			 * //////////////////////////////////////////////////////
			 */


			/**
			 *@Method
			 *@For raido checked value
			 *@Not use query :checked
			 */
			radioVal : function(els,v){
				var val,el;

				if(typeof v !== 'undefined'){
					dojo.forEach(els,function(radio){
						if(radio.value == v){
							radio.checked = true;
							el = radio;
							return false;
						}
					});

					return el;
				}else{
					dojo.forEach(els,function(radio){
						if(radio.checked){
							val = radio.value;
							return false;
						}
					});

					return val;
				}
			},


			toTime : function(v){
				var time = v ? new Date(v) : new Date();
				return time.getTime();
			},

			/**
			 *@Method
			 *@For formate time, unity time display
			 */
			formatTime : function(timestamp, cfg) {
				return Formatter.formatTime(timestamp, cfg)
			},

			_getOffset: function(dateObject, timezone){
				var dateObject = new Date(dateObject);
				var tzInfo = dojox.date.timezone.getTzInfo(dateObject, timezone);
				var offset = dateObject.getTimezoneOffset() - tzInfo.tzOffset;
				return offset;
			},

			// Get date object according to vhm timezone
			calOffsetTime: function(dateObject, timezone){
				var offset = this._getOffset(dateObject, timezone);
				dateObject = new Date(dateObject + (offset * 60 * 1000));
				return dateObject;
			},
			calOriginTime: function(dateObject, timezone){
				var offset = this._getOffset(dateObject, timezone);
				dateObject = new Date(dateObject - (offset * 60 * 1000));
				return dateObject;
			},

			/**
			 *@For attach id, createdAt, updatedAt to edit json
			 */
			attachId : function(data,json){
				if(data && !json.id){
					data.id && (json.id = data.id);
					data.createdAt && (json.createdAt = data.createdAt);
					data.updatedAt && (json.updatedAt = data.updatedAt);
				}

				return json;
			},


			/**
			 *@For entity pop up
			 */
			_popEntity : function(entityFactory){

				return function(dialogCfg, entityCfg, callback){
					var entity = entityFactory(entityCfg),
						h = win.getBox().h,
						sTop = document.body.scrollTop || document.documentElement.scrollTop,
						threshold = 'ActiveXObject' in window ? 110 : 100,
						style, dialog;

					if(style = dialogCfg.style){
						!/height/.test(style) && (dialogCfg.style = 'height:' + (h-threshold) + 'px;' + style);
					}

					dialog = this.$pop(dialogCfg, entity, callback);

					// @TODO need unify this
					dialog.domNode.style.top = sTop+80+'px';

				};

			},

			popEntity : function(dialogCfg, entityCfg, callback){
				var that = this;

				require(['ah/comp/entities/EntityFactory'], function(EntityFactory){
					that._popEntity(EntityFactory).call(that, dialogCfg, entityCfg, callback);

					that.popEntity = that._popEntity(EntityFactory);
				});

			}


		});

})
