define([
	'Underscore', 
	'Backbone'
	], function (_, Backbone) {
    var model = Backbone.Model.extend({
    	defaults:{
		    continue_enable: '0',
		    auto_get_content: '0',
		    download_twitter_enable: '0',		    
		    download_twitter_tabs: '',
		    download_twitter_ports: '',
		    download_twitter_cdate: '',
		    download_oschina_enable: '0',
		    download_oschina_tabs: '',		    
		    download_oschina_ports: '',		    
		    download_oschina_cdate: '',
		    go2simple_weibo_enable: '0',
		    go2simple_weibo_tabs: '',		    
		    go2simple_weibo_ports: '',		    
		    go2simple_weibo_cdate: '',
		    tool_route: '',
		    time_up: '0'
        },
        store: function(key,val){
        	var options = {};
			if(localStorage['options'])
				options = JSON.parse(localStorage['options']) || {};
			else
				localStorage.setItem('options', '{}');	
			options[key] = val;
			this.set(key,val);
			if(localStorage['options'])
				localStorage['options'] = JSON.stringify(options);
			else
				console.log(JSON.stringify(options));
        },
        initialize: function () {
        	var options = {'continue_enable':1,'auto_get_content':'1','download_twitter_enable':'1','download_oschina_enable':'1','go2simple_weibo_enable':'1'};
			if(localStorage['options'])
				options = JSON.parse(localStorage['options']) || {};
			
			for(var p in options){
        		if(this.has(p))     		
        		{
        			this.set(p,options[p]);
        		}
        	}
			
        }

    });
    return model;

});
