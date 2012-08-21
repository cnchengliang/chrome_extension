// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'models/option',
	'views/home/main',
	'views/weibo/feed',
	'views/oschina/feed',
	'views/taobao/top',
	'views/alexa/top'
	], function ($, _, Backbone, optionModel, 
			mainHomeView, 
			weiboFeedView, 
			oschinaView, 
			taobaoTopView,
			alexaTopView
	) {

	var actions = function(options) {

		if(Number(options.auto_get_content))
		{
			mainHomeView.auto_get_content();
		}
		if(Number(options.download_twitter_enable))
		{
			var tabs = options.download_twitter_tabs;
			var ports = options.download_twitter_ports;
			var tmpid = options.selected_tab;
			for(var i=0; i < tabs.length; i++)
			{							
				if(tabs[i] == tmpid && Number(ports[i]) >= 5500)
				{
					weiboFeedView.setOptions({'port':Number(ports[i])});
					weiboFeedView.getContent();
					break;
				}
			}			
		}
		if(Number(options.go2simple_weibo_enable))
		{
			var tabs = options.go2simple_weibo_tabs;
			var ports = options.go2simple_weibo_ports;
			var tmpid = options.selected_tab;
			var cdate = options.go2simple_weibo_cdate;
			for(var i=0; i < tabs.length; i++)
			{							
				if(tabs[i] == tmpid && Number(ports[i]) >= 5500)
				{
					weiboFeedView.setOptions({'port':Number(ports[i]),'cdate':cdate});
					weiboFeedView.getMyContent();
					break;
				}
			}			
		}
		if(Number(options.download_oschina_enable))
		{
			var tabs = options.download_oschina_tabs;
			var ports = options.download_oschina_ports;
			var tmpid = options.selected_tab;
			var cdate = options.download_oschina_cdate;
			for(var i=0; i < tabs.length; i++)
			{							
				if(tabs[i] == tmpid && Number(ports[i]) >= 5500)
				{
					oschinaView.setOptions({'port':Number(ports[i]),'cdate':cdate});
					oschinaView.getContent();
					break;
				}
			}
		}
		if(options.tool_route == 'taobaoTopView_1')
		{
			taobaoTopView.getGoodsData();
		}else if(options.tool_route == 'alexaTopView_1')
		{
			alexaTopView.getContent();
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
