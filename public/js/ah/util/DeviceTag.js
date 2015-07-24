define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang','ah/app/DataMgr','ah/util/Chosen'],
	function(declare,_WidgetBase,_TemplateMixin,on,lang, DataMgr, Chosen){

		return declare('ah/util/DeviceTag',[_WidgetBase,_TemplateMixin],{

			templateString : '<div class="ui-broadssid">'+
								'<p data-dojo-attach-point="linkWrap">'+
								'</p>'+
								'<select data-dojo-attach-point="boardChzn" class="${selectClass}" multiple>'+
								'</select>'+
							'</div>',			

			titles : 'Tags,Location,Host Name',

			cur : 'Tags',

			url : "services/config/common/tags",

			curClass : 'ui-broadssid-cur',

			selectClass : this.selectClass || 'w410' ,

			staticData : [],

			postCreate : function(){
				this._rendUI();
				this._bindUI();
			},

			startup : function(){
				this.chosen = new Chosen({},this.boardChzn);
				this.chosen.startup();
			},

			_rendUI : function(){
				var str = '',that = this;
				dojo.forEach(this.titles.split(','),function(item){
					str += '<a href="" data-type="'+item.toLowerCase()+'" class="J-op '+(item == that.cur ? that.curClass : '')+'">'+item+'</a>';
				});

				this.linkWrap.innerHTML = str;

				this._cached = {};
				this._ret = [];

				// init status
				this.getData(this.cur.toLowerCase());
			},

			_bindUI : function(){
				this.own(
					dojo.query('.J-op',this.domNode).on('click',lang.hitch(this,this.handleTypeChange))
				);
			},

			handleTypeChange : function(e){
				e.preventDefault();

				var type = e.target.getAttribute('data-type');
				
				this.makeCur(e.target);

				// for change the data
				this.getData(type);
			},
			
			getData : function(type){
				
				if(this._ret.length){
					this._toggleList(type);
					return;
				}
				
				if(this.url){
					// DataMgr.get({
					// 	//requestURL : this.url+'/'+type,
					// 	url : this.url,
					// 	callbackFn : lang.hitch(this,this.makeOptions,type)
					// });
				}else{
					this.makeOptions(type,this.staticData);
				}
			},

			makeOptions : function(type,data){
				var str = '',arr,that = this,
					frag = document.createDocumentFragment();

				if(!data) return;

				dojo.forEach(data.data,function(item){
					var option = dojo.create('option');
					option.value = item.value;
					option.setAttribute('data-id',item.id);
					option.text = item.value;
					option.obj = item;
					that._ret.push(option);

					frag.appendChild(option);
				});

				this.updateOptions(frag,type);
			},

			updateOptions : function(html,type){
				this.boardChzn.appendChild(html);
				this._toggleList(type);
			},

			getIds : function(){
				return this._loop(function(opt){return opt.getAttribute('data-id');});
			},

			getValues : function(){
				return this._loop(function(opt){return opt.value;});
			},

			getObjs : function(){
				return this._loop(function(opt){return opt.obj});
			},

			setSelected : function(data){
				if(typeof data[0] == 'object'){
					data = dojo.map(data,function(item){return item.id});
				}
				this.defer(function(){
					dojo.forEach(this._ret,function(option){
						data.indexOf(+option.getAttribute('data-id')) !== -1 &&
							(option.selected = true);
					});
					this._updateList('device');
				},60);
				
			},

			/**
			 *@Helps
			 */
			_normalize : function(data){
				var obj = {};
				dojo.forEach(data,function(item){
					obj[item.id] = item;
				});

				return obj;
			},

			_loop : function(fn){
				var ret = [];
				dojo.forEach(this.boardChzn.options,function(opt){
					if(opt.selected){
						ret.push(fn(opt));
					}
				});

				return ret;
			},

			_toggleList : function(type){
				var map = {
						'tags' : 'device'
					};

				type = map[type] || type;

				this._updateList(type);
			},

			_updateList : function(type){
				dojo.forEach(this._ret,function(option){
					var f = option.obj.jsonType == type;
					if(f){
						option.removeAttribute('disabled');
					}else{
						!option.selected && option.setAttribute('disabled',true);
					}
				});
				dojo.publish('liszt:updated', this.boardChzn);
			},

			makeCur : function(tar){
				var curClass = this.curClass;

				dojo.query('.J-op',this.domNode).removeClass(curClass);
				dojo.addClass(tar,curClass);
			}
			
		});
	
});
