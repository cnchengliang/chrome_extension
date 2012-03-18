// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'models/option',
	'views/home/main',
	'views/weibo/feed',
	'views/oschina/feed'
	], function ($, _, Backbone, optionModel, mainHomeView, weiboFeedView, oschinaView) {

	var actions = function(options) {

		if(parseInt(options.auto_get_content))
		{
			mainHomeView.auto_get_content();
		}
		if(parseInt(options.download_twitter_enable))
		{
			var tabs = options.download_twitter_tabs;
			var ports = options.download_twitter_ports;
			var tmpid = options.selected_tab;
			for(var i=0; i < tabs.length; i++)
			{							
				if(tabs[i] == tmpid && parseInt(ports[i]) >= 5500)
				{
					weiboFeedView.setOptions({'port':parseInt(ports[i])});
					weiboFeedView.getContent();
					break;
				}
			}			
		}
		if(parseInt(options.go2simple_weibo_enable))
		{
			var tabs = options.go2simple_weibo_tabs;
			var ports = options.go2simple_weibo_ports;
			var tmpid = options.selected_tab;
			var cdate = options.go2simple_weibo_cdate;
			for(var i=0; i < tabs.length; i++)
			{							
				if(tabs[i] == tmpid && parseInt(ports[i]) >= 5500)
				{
					weiboFeedView.setOptions({'port':parseInt(ports[i]),'cdate':cdate});
					weiboFeedView.getMyContent();
					break;
				}
			}			
		}
		if(parseInt(options.download_oschina_enable))
		{
			var tabs = options.download_oschina_tabs;
			var ports = options.download_oschina_ports;
			var tmpid = options.selected_tab;
			var cdate = options.download_oschina_cdate;
			for(var i=0; i < tabs.length; i++)
			{							
				if(tabs[i] == tmpid && parseInt(ports[i]) >= 5500)
				{
					oschinaView.setOptions({'port':parseInt(ports[i]),'cdate':cdate});
					oschinaView.getContent();
					break;
				}
			}
		}
	}
	
    var initialize = function () {
			optionModel.getOption(actions);
			//console.log(optionModel.defaults);
        };	
    return {
        initialize: initialize
    };
});
