define([
	'Underscore', 
	'Backbone'
	], function (_, Backbone) {
    var model = Backbone.Model.extend({
        defaults: {
            default_data: 'ok'
        },
        initialize: function () {},
		getOption: function(callback){
			if(typeof chrome.extension == "undefined")
			{
				var options = {
					'auto_get_content':true,
					'download_twitter_enable':true,
					'download_twitter_tabs':[1],
					'download_twitter_ports':[5500]
				};
				callback(options);
			}else
			{
				chrome.extension.sendRequest({type:'option',key:'keys'}, 
					function(response) {
						callback(response.result);
					}
				);
			}	
		}

    });
    return new model;

});
