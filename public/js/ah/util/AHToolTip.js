define([
    'dojo/_base/declare',
    "dojo/query",
    "dojo/on",
    "ah/AHWidget",
    "dojo/text!./templates/AHToolTip.html",
    "dojo/dom"
    ],function(declare, query, on, AHWidget, template, dom){

      return declare("ah/util/AHToolTip", [ AHWidget ], {

        templateString: template,

        startup: function() {
          this.inherited(arguments);
          this.titleArea.innerHTML = this.title;
          this.contentArea.appendChild(this.content);
        },

        closeToolTip: function(event) {
          if(event.target != this.domNode && !dom.isDescendant(event.target, this.domNode)) this.destroy();
        },

        placeToolTip: function(element) {

          var pos = dojo.position(element);
          this.domNode.style.visibility = 'hidden';
          query('body')[0].appendChild(this.domNode);
          var tooltip_pos = dojo.position(this.domNode);
          this.domNode.style.position = 'absolute';
          this.domNode.style.left = pos.x + (pos.w / 2) - (tooltip_pos.w / 2) + 'px';
          this.domNode.style.top = pos.y + (pos.h + 10) + 'px';
          this.domNode.style.visibility = 'visible';
          this.addEvents([
            [document.body, 'click', 'closeToolTip']
          ]);
        }

      });
});