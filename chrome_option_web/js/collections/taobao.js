define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'models/feed'
	], function ($, _, Backbone, model) {
    var collection = Backbone.Collection.extend({
    	url: 'http://127.0.0.1/slim/taobao/top/goods',
        model: model,
        findGoods:function (query) {
        	var self = this;
		    var url = (query == '') ? self.url : "http://127.0.0.1/slim/taobao/top/goods/search/" + query;
		    $.ajax({
		        url:url,
		        dataType:"json",
		        success:function (data) {
		            self.reset(data);
		            self.trigger('find');
		        }
		    });
		},
		moreGoods:function (page) {
        	var self = this;
		    var url = "http://127.0.0.1/slim/taobao/top/goods/page/" + page;
		    $.ajax({
		        url:url,
		        dataType:"json",
		        success:function (data) {
		            self.reset(data);
		            self.trigger('more');
		        }
		    });
		},
		getGoods: function () {
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
        initialize: function () {

        }

    });

    return new collection;
});
