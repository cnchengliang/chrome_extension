define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'templates/job/options.compiled'
	], function ($, _, Backbone) {

    var view = Backbone.View.extend({
        el: "",
        initialize: function () {

        },
        bindEvents: function(){
        	_this = this;

			$('#get_job').bind('click', function(){
				var arrChk = [];
				$("input[name='wb']:checked").each(function(){arrChk[arrChk.length]=this.value;});
				for(var i=0,n=arrChk.length;i<n;i++)
				{
					var act = arrChk[i];
					chrome.extension.sendRequest({
							type:'job',
							act:act
						},
						function(response) {
							console.log(act);
					});
				}
				
			});

			$('#get_house').bind('click', function(){
				var arrChk = [];
				$("input[name='hs']:checked").each(function(){arrChk[arrChk.length]=this.value;});
				for(var i=0,n=arrChk.length;i<n;i++)
				{
					var act = arrChk[i];
					chrome.extension.sendRequest({
							type:'house',
							act:act
						},
						function(response) {
							console.log(act);
					});
				}
				
			});
			
        },
        render: function (callback) {
        	_this = this;
        	//var template = _.template( optionsTemplate, {} );
		    callback(job_optionsTemplate({}), function(){_this.bindEvents();});		
            
        }
    });
    return new view;
});
