define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/taobao', 
	'text!templates/taobao/top_goods.html',
	'text!templates/taobao/top_good_item.html'
	], function ($, _, Backbone, taobaoCollection, goodsTemplate, goodItemTemplate) {

    var view = Backbone.View.extend({
        el: "",
        fn: "",
        initialize: function () {
        	this.collection = taobaoCollection;
        	this.collection = taobaoCollection.add({
        		id: 1,
                content: "Facebook",
                cdate: 20,
                from_url: 123
            });
            this.collection.bind("init", this.getData,this);
            this.collection.bind("find", this.getDataBySearch,this);
            this.collection.bind("more", this.getDataByMore,this);
        },
        bindEvents: function(){
        	_this = this;
        	_this.el = $('#sc_form');
			$('#search').bind('click', function() {
				if($('#query_text').val() != '')
					location.hash = '#!/taobao_top_goods/'+$('#query_text').val();
			});
			$('#more').bind('click', function() {
				if($('#page').text() != '')
					location.hash = '#!/taobao_top_goods/page/'+$('#page').text();
			});
        },
        render: function (callback) {
        	this.fn = callback;
			this.collection.getGoods();
        },
        find: function (query,callback) {
        	this.collection.findGoods(query);
        	this.fn = callback;
        },
        more: function (page,callback) {
        	this.collection.moreGoods(page);
        	this.fn = callback;
        },
        getDataBySearch: function () {
        	if($("#table_result").length > 0)
        	{
				var list = _.template(goodItemTemplate, {rows:this.collection.toJSON()});
				$("#table_result > tbody").html(list);
			}else
			{
				this.getData();
			}
        },
        getDataByMore: function () {
        	if($("#table_result").length > 0)
        	{
				var list = _.template(goodItemTemplate, {rows:this.collection.toJSON()});
				$("#table_result > tbody").append(list);
			}else
			{
				this.getData();
			}
        	$('#page').text(parseInt($('#page').text())+1);
        },
        getData: function () {
        	_this = this;
        	var list = _.template(goodItemTemplate, {rows:this.collection.toJSON()});
			var template = _.template( goodsTemplate, {content:list} );
            this.fn(template, function(){_this.bindEvents();});
            
        }
    });
    return new view;
});
