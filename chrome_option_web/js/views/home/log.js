define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/log', 
	'text!templates/home/log.html',
	'text!templates/home/logitem.html'
	], function ($, _, Backbone, logCollection, logTemplate, logItemTemplate) {

    var view = Backbone.View.extend({
        el: "",
        fn: "",
        initialize: function () {
        	this.collection = logCollection;
        	this.collection = logCollection.add({
        		id: 1,
                content: "Facebook",
                cdate: 20,
                from_url: 123
            });
            this.collection.bind("init", this.getData,this);
            this.collection.bind("find", this.getDataBySearch,this);
            this.collection.bind("update", this.collection.getLogs,this);

        },
        bindEvents: function(){
        	_this = this;
        	_this.el = $('#sc_form');
			$('#search').bind('click', function() {
				if($('#query_text').val() != '')
					location.hash = '#!/feed/'+$('#query_text').val();
			});
			$('#next').bind('click', function() {
				_this.collection.updateLog(_this.el.serialize());
			});
        },
        render: function (callback) {
        	this.fn = callback;
			this.collection.getLogs();
        },
        findLog: function (query,callback) {
        	this.collection.findLog(query);
        	this.fn = callback;
        },
        getDataBySearch: function () {
        	if($("#table_result").length > 0)
        	{
				var list = _.template(logItemTemplate, {feeds:this.collection.toJSON()});
				$("#table_result > tbody").html(list);
			}else
			{
				this.getData();
			}
        },
        getData: function () {
        	_this = this;
        	var list = _.template(logItemTemplate, {feeds:this.collection.toJSON()});
			var template = _.template( logTemplate, {content:list} );
            this.fn(template, function(){_this.bindEvents();});
            
        }
    });
    return new view;
});
