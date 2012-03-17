define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'models/options', 
	'text!templates/home/options.html'
	], function ($, _, Backbone, optionsModel, optionsTemplate) {

    var view = Backbone.View.extend({
        el: "",
        initialize: function () {
            this.model = new optionsModel();
        },
        bindEvents: function(){
        	_this = this;
        	_this.el = $('#sc_form');
        	_this.el.bind('change', function(e) {
				_this.changed(e.target.id);
			});

			$('#tab_filter_url').val($('#'+$('#tabs_route').val()+'_url').text());
			$('#tabs_route').bind('change', function(e) {
				$('#tab_filter_url').val($('#'+$('#tabs_route').val()+'_url').text());
			});
			
			$('#get_tabs').bind('click', function() {
				_this.setTabs();
			});
			$('#get_tabs2').bind('click', function() {
				_this.setTabs2();
			});
			$('#get_ports').bind('click', function() {
				_this.setPorts();
			});
			$('#get_cdate').bind('click', function() {
				_this.setCdate();
			});
			$('#get_cookies').bind('click', function() {
				_this.getCookies();
			});
        },
        setTabs: function()
		{
			if(typeof chrome != "undefined")
			{
				_this = this;
				chrome.windows.getCurrent(function(wnd){
					chrome.tabs.getAllInWindow(wnd.id, function(tabs){				
						var rel_tabs = [];
						var tmp = '';
						for(var i=0; i < tabs.length; i++)
						{
							if(tabs[i].url.indexOf($('#tab_filter_url').val()) != -1)
							{									
								rel_tabs[rel_tabs.length] = tabs[i].id;
								tmp = tmp + tabs[i].id +',';
							}
						}
						$('#tabs').html(tmp);
						if($('#tabs_route').val() != '')
							_this.model.store($('#tabs_route').val(),rel_tabs);
					});
				});
			}
		},
		setTabs2: function()
		{
			if(typeof chrome != "undefined")
			{
				_this = this;
				chrome.tabs.create({"url":$('#tab_filter_url').val(),"selected":false},function(tab){
					var rel_tabs = [];
					rel_tabs[rel_tabs.length] = tab.id;
					if($('#tabs_route').val() != '')
						_this.model.store($('#tabs_route').val(),rel_tabs);
				});
			}
		},
		setPorts: function()
		{
			var ports = [];
			var tmp = $('#ports_zmq').val().split(',');
			for(var i=0; i < tmp.length; i++)
			{
				if(tmp[i] != '')
				{									
					ports[ports.length] = tmp[i];
				}
			}
			if($('#ports_route').val() != '')
				this.model.store($('#ports_route').val(),ports);
		},
		setCdate: function()
		{
			var cdate = $('#cdate').val();
			if($('#cdate_route').val() != '')
				this.model.store($('#cdate_route').val(),cdate);
		},
		getCookies: function()
		{
			url = $('#cookies_url').val();
			server = url.match(/:\/\/(.[^/:#?]+)/)[1];
			parts = server.split(".");
			domain = parts[parts.length - 2] + "." + parts[parts.length -1];
			if(typeof chrome != "undefined")
			{
				chrome.cookies.getAll({}, function(cookies) {
					var cookies_str = '';
					cookies_str += '['+domain+']\n';
					for (var i in cookies) {
						cookie = cookies[i]; 
						if (cookie.domain.indexOf(domain) != -1) {
							//cookies_str += '['+cookie.domain+']\n';
							cookies_str += cookie.name+'='+cookie.value+'\n';                   
						}
					}
					console.log(cookies_str);
				});
			}
		},
        changed: function (id) {
        	var arr = this.el.serialize().split('&'),data = {};
        	for(var i=0,n=arr.length;i<n;i++)
        	{
        		var tmp = arr[i].split('=');
        		data[tmp[0]] = unescape(tmp[1]);
        	}
        	var is_store = false;
        	for(var p in data){
        		if(p == id && this.model.has(p))     		
        		{
        			this.model.store(p,data[p]);
        			is_store = true;
        		}
        	}
        	if(!is_store)
        		this.model.store(id,this.model.defaults[id]);
            console.log(JSON.stringify(this.model.attributes));
        },
        render: function (callback) {
        	_this = this;
			var template = _.template( optionsTemplate, {options:this.model.attributes} );
            callback(template, function(){_this.bindEvents();});
            
        }
    });
    return new view;
});
