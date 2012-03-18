define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/feed', 
	'text!templates/home/feed.html',
	'text!templates/home/feeditem.html'
	], function ($, _, Backbone, feedCollection, feedTemplate, feedItemTemplate) {

    var view = Backbone.View.extend({
        el: "",
        fn: "",
        initialize: function () {
        	this.collection = feedCollection;
        	this.collection = feedCollection.add({
        		id: 1,
                content: "Facebook",
                cdate: 20,
                from_url: 123
            });
            this.collection.bind("init", this.getData,this);
            this.collection.bind("find", this.getDataBySearch,this);
            this.collection.bind("update", this.collection.getFeeds,this);

        },
        bindEvents: function(){
        	_this = this;
        	_this.el = $('#sc_form');
			$('#search').bind('click', function() {
				if($('#query_text').val() != '')
					location.hash = '#!/feed/'+$('#query_text').val();
			});
			$('#next').bind('click', function() {
				_this.collection.updateFeed(_this.el.serialize());
			});
        },
        render: function (callback) {
        	this.fn = callback;
			this.collection.getFeeds();
        },
        findFeed: function (query,callback) {
        	this.collection.findFeed(query);
        	this.fn = callback;
        },
        getDataBySearch: function () {
        	if($("#table_result").length > 0)
        	{
				var list = _.template(feedItemTemplate, {feeds:this.collection.toJSON()});
				$("#table_result > tbody").html(list);
			}else
			{
				this.getData();
			}
        },
        getData: function () {
        	_this = this;
        	var list = _.template(feedItemTemplate, {feeds:this.collection.toJSON()});
			var template = _.template( feedTemplate, {content:list} );
            this.fn(template, function(){_this.bindEvents();});
            
        }
    });
    return new view;
});
