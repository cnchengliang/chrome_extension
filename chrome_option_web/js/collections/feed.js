define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'models/feed'
	], function ($, _, Backbone, model) {
    var collection = Backbone.Collection.extend({
    	url: 'http://127.0.0.1/slim/feeds',
        model: model,
        findFeed:function (query) {
        	var self = this;
		    var url = (query == '') ? self.url : "http://127.0.0.1/slim/feeds/search/" + query;
		    $.ajax({
		        url:url,
		        dataType:"json",
		        success:function (data) {
		            self.reset(data);
		            self.trigger('find');
		        }
		    });
		},
		getFeeds: function () {
			var self = this;
		    $.ajax({
		        url:self.url,
		        dataType:"json",
		        success:function (data) {
		            self.reset(data);
		            self.trigger('init');
		        }
		    });
        },
        updateFeed: function (data) {
			var self = this;
			var url = "http://127.0.0.1/slim/updatefeed";
		    $.ajax({
		        url:url,
		        type: 'POST',
		        data:data,
		        dataType:"json",
		        success:function () {
		            self.trigger('update');
		        }
		    });
        },
        initialize: function () {

        }

    });

    return new collection;
});
