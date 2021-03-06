// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'views/home/main',
	'views/home/options',
	'views/home/log',
	'views/home/feed',
	'views/taobao/options',
	'views/taobao/top',
    'views/job/options',
	], function ($, _, Backbone, mainHomeView,optionsView,logView,feedView,taobao_optionsView,taobaoTopGoodView,job_optionsView) {
	var pageDownloaded = function(data,fn){
		var target = $("#main-content"),
			h = location.hash;
		if (!h) {			
		    h = '#!/taobao_options';
		}
		h = h.split('/').slice(0,2).join('/');
		var anchor = $("a[href!=#]").filter(function() {
			var href = $(this).attr("href");
			return href == h || href == h.replace("#", "");
	    });
	    var title = 'empty title';
        if(anchor.length > 0)
        {
            title = anchor.attr("title");
        }
        var id = h.replace("#!/","");
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
		    h = '#!/taobao_options';
		}
		h = h.split('/').slice(0,2).join('/');
		var anchor = $("a[href!=#]").filter(function() {
			var href = $(this).attr("href");
			return href == h || href == h.replace("#", "");
	    });
        var title = 'empty title';
        if(anchor.length > 0)
        {
            title = anchor.attr("title");
        }
	    var id = h.replace("#!/","");
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
        	'!/taobao_options': 'taobao_optionsAction',
            '!/job_options': 'job_optionsAction',
            '!/options': 'optionsAction',
            '!/log': 'logAction',
            '!/log/:query': 'logSearchAction',
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
        logAction: function(){        	
        	this.render(logView);
        },
        taobao_optionsAction: function(){
        	this.render(taobao_optionsView);
        },
        job_optionsAction: function(){
            this.render(job_optionsView);
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
            this.render(taobao_optionsView);
        },
        render: function(view)
        {
            $("#main-content").html('');
        	setTimeout(d_loading,100);//reloading
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
