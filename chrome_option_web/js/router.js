// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'views/home/main',
	'views/home/options',
	'views/home/feed',
	'views/taobao/top'
	], function ($, _, Backbone, mainHomeView,optionsView,feedView,taobaoTopGoodView) {
	var pageDownloaded = function(data,fn){
		var target = $("#main-content"),
			h = location.hash;
		if (!h) {			
		    h = '#!/options';
		}
		h = h.split('/').slice(0,2).join('/');
		var anchor = $("a[href!=#]").filter(function() {
			var href = $(this).attr("href");
			return href == h || href == h.replace("#", "");
	    }).first();
	    var link = anchor.attr("href").replace(/^\#/, ""),
	    	title = anchor.attr("title"),
			id = link.replace("!/","");
		$("#wrapper > section > section > header h1").html(title);
		if(location.hash)
		{
			$('<div style="left: 100%" id="'+id+'-html">'+data+'</div>').appendTo(target);			
			if ($('#wrapper > section > section').css('position')=='absolute') {
				$("> div:last", target).css({left: 0, position: 'relative'}).siblings().remove();
				$('#wrapper > section > section').show().animate({left: 0}, 300, "easeInOutQuart", function(){$(this).css('left',0);});
			} else {
				$("> div", target).animate({left: "-=100%"}, "slow", "easeInOutQuart", function(){
					$(this).css('left',0);
					$("> div:last", target).css({position: 'relative'}).siblings().remove();
				});
			}
		}else
		{
			$('<div style="position:relative;" id="'+id+'-html">'+data+'</div>').appendTo(target);
		}
		fn();
		
    };
    var d_loading = function(){
    	var target = $("#main-content"),
			h = location.hash;
		if (!h) {			
		    h = '#!/options';
		}
		h = h.split('/').slice(0,2).join('/');
		var anchor = $("a[href!=#]").filter(function() {
			var href = $(this).attr("href");
			return href == h || href == h.replace("#", "");
	    }).first();
	    var link = anchor.attr("href").replace(/^\#/, ""),
			title = anchor.attr("title"),
			id = link.replace("!/","");
		$("#wrapper > section > section > header h1").html(title);
		if($('#'+id).length > 0 || $(target).html().replace(/\s/g, "") == '')
		{			
			$(target).html('');
			$("<div id='loading-container'><p id='loading-content'><img id='loading-graphic'  src='/images/ajax-loader-trans.gif' />  Loading...</p></div>").appendTo(target);   
		} 	
    };
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '!/options': 'optionsAction',
            '!/feed': 'feedAction',
            '!/feed/:query': 'feedSearchAction',
            '!/taobao_top_goods': 'taobaoTopGoodAction',
            '!/taobao_top_goods/:query': 'taobaoTopGoodSearchAction',
            '!/taobao_top_goods/page/:page': 'taobaoTopGoodMoreAction',
            
            '!/test': 'test',
            
            // Default
            '*actions': 'defaultAction'
        },
        optionsAction: function(){
        	this.render(optionsView);
        },
        feedAction: function(){        	
        	this.render(feedView);
        },
        taobaoTopGoodAction: function(){        	
        	this.render(taobaoTopGoodView);
        },
        taobaoTopGoodSearchAction: function(query){
        	taobaoTopGoodView.find(query,pageDownloaded);
        },
        taobaoTopGoodMoreAction: function(page){
        	taobaoTopGoodView.more(page,pageDownloaded);
        },
        feedSearchAction: function(query){
        	feedView.findFeed(query,pageDownloaded);
        },
        test: function(){
        	this.render(mainHomeView);
        },
        defaultAction: function (actions) {
            // We have no matching route, lets display the home page 
            //mainHomeView.render();
            this.render(optionsView);
        },
        render: function(view)
        {
        	setTimeout(d_loading,100);
        	view.render(pageDownloaded);
        }
    });

    var initialize = function () {
            var app_router = new AppRouter;
            Backbone.history.start();
        };
    return {
        initialize: initialize
    };
});
