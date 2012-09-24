define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'templates/taobao/options.compiled'
	], function ($, _, Backbone) {

    var view = Backbone.View.extend({
        el: "",
        initialize: function () {

        },
        bindEvents: function(){
        	_this = this;

			$('#get_taobao_rate').bind('click', function(){
				chrome.extension.sendRequest({
						type:'taobao',
						act:'get_rate',
						nick:$('#taobao_nick').val()
					},
					function(response) {
						if(response.append)
						{
							$('#result').html($('#result').html() + response.result);
						}else
						{
							$('#result').html(response.result);
						}
				});
				
			});
			
        },
        render: function (callback) {
        	_this = this;
        	//var template = _.template( optionsTemplate, {} );
		    callback(optionsTemplate({}), function(){_this.bindEvents();});		
            
        }
    });
    return new view;
});
