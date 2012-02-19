// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'models/option',
	'views/home/main',
	'views/weibo/feed'
	], function ($, _, Backbone, optionModel, mainHomeView, weiboFeedView) {

	var actions = function(options) {

		if(options.auto_get_content)
		{
			mainHomeView.auto_get_content();
		}
		if(options.download_twitter_enable)
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
	}
	
    var initialize = function () {
			optionModel.getOption(actions);
			//console.log(optionModel.defaults);
        };	
    return {
        initialize: initialize
    };
});
