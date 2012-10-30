define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'models/log'
	], function ($, _, Backbone, model) {
    var collection = Backbone.Collection.extend({
    	url: 'http://127.0.0.1/slim/feeds',
        model: model,
        findLog:function (query,source) {
        	var self = this;
        	var where = '';
        	if(typeof source != "undefined") where += " AND url_title='"+source+"'";
		    if(typeof chrome.extension != "undefined")
			{
				chrome.extension.sendRequest({type:'read',sql:"SELECT * FROM home_logs WHERE state=1 AND content like '%"+query+"%'  "+where+" order by id desc LIMIT 0,30 "}, 
					function(response){
						var data = response.data;
						self.reset(data);
						self.trigger('find');
					}
				);
			}else
			{
				self.trigger('find');
			}
		},
		filterLog:function (query,source) {
        	var self = this;
        	var where = '';
        	if(typeof source != "undefined") where += " AND url_title='"+source+"'";
		    if(typeof chrome.extension != "undefined")
			{
				var now = this.getTime();
				chrome.extension.sendRequest({type:'read',sql:"UPDATE home_logs SET state=-1,mdate='"+now+"' WHERE state=1 AND content like '%"+query+"%' "+where+" "}, 
					function(response){
						chrome.extension.sendRequest({type:'read',sql:"SELECT * FROM home_logs WHERE state=1 "+where+" order by id desc LIMIT 0,30"}, 
							function(response){
								var data = response.data;
								self.reset(data);
								self.trigger('find');
							}
						);
					}
				);
			}
		},
		getLogs: function (start) {
			var self = this;
			var limit = "0,30";
			var trigger = 'init';
			if(typeof start != "undefined") 
			{
				limit = start+",30";
				trigger = 'find';
			}
			if(typeof chrome.extension != "undefined")
			{
				chrome.extension.sendRequest({type:'read',sql:"SELECT * FROM home_logs WHERE state=1 order by id desc LIMIT "+limit}, 
					function(response){
						var data = response.data;
						self.reset(data);
						self.trigger(trigger);
					}
				);
			}else
			{
				self.trigger(trigger);
			}
        },
        updateLog: function (data) {
        	if(typeof chrome.extension != "undefined")
			{
				var n = data.length;
				var now = this.getTime();
				for(var i=0;i<n;i++)
        		chrome.extension.sendRequest({type:'exec',sql:"UPDATE home_logs SET state=-1,mdate='"+now+"' WHERE id='"+data[i]+"'"}, function(response) {});
        	}
			var self = this;
			//self.trigger('update');
        },
        fillZero: function (v)
		{
			if(v<10){v='0'+v;}
			return v;
		},
        getTime: function() {
        	var myDate = new Date();
			var timeStr = myDate.getFullYear() + '-' + this.fillZero(myDate.getMonth() + 1) + '-' + this.fillZero(myDate.getDate()) + ' ' + this.fillZero(myDate.getHours()) + ':' + this.fillZero(myDate.getMinutes()) + ':' + this.fillZero(myDate.getSeconds());
			return timeStr;
        },
        initialize: function () {

        }

    });

    return new collection;
});
