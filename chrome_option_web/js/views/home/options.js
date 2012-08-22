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

			$('#get_cookies').bind('click', function() {
				_this.getCookies();
			});
			$('#clear_temp_data').bind('click', function(){
				if(typeof chrome != "undefined")
				{
					chrome.extension.sendRequest({
						type:'set_temp_data',
						temp_data:[]
						},
						function(response) {
							console.log(response.result);
							/*
							chrome.extension.sendRequest({
								type:'get_temp_data'},
								function(response) {
									document.getElementById('byte_content').innerHTML = response.result.join('<br />');
							});*/
					});
					chrome.extension.sendRequest({
							type:'set_temp_flag',
							temp_flag:'0'
						},
						function(response) {
							console.log(response.result);
					});
					chrome.extension.sendRequest({
							type:'set_mem_phantomjs_opt',
							url:''							
						},
						function(response) {
							
					});
				}
			});
			$('#show_temp_data').bind('click', function(){
				if(typeof chrome != "undefined")
				{
					chrome.extension.sendRequest({
							type:'get_temp_data'
						},
						function(response) {
							console.log('temp_data:'+response.result.length);
							console.log(response.result);
					});
					chrome.extension.sendRequest({
							type:'get_temp_flag'
						},
						function(response) {
							console.log('temp_flag:'+response.result);
					});
				}
			});

			$('#get_short_url').bind('click', function(){
				$.ajax({
				    url:'http://127.0.0.1/taobaoke/sinaurl.php',
				    type: 'POST',
				    data:{'url':$('#short_url').val()},
				    dataType:"html",
				    success:function (res) {
				        $('#short_url_result').html(res);
				    }
				});
				
			});
			
			$('#set_time_up').bind('click', function(){
				chrome.extension.sendRequest({
						type:'set_time_up'
					},
					function() {
						
				});				
			});
			
				
			$('#send_notice_content').bind('click', function(){
				chrome.extension.sendRequest({
						type:'notice',
						title:'通知标题',
						msg:$('#notice_content').val()
					},
					function(response) {
						console.log('content sent!');
				});				
			});
			
			$('#run_phantom').bind('click', function(){
				var opt = {};
				opt.url = JSON.parse($('#phantom_url').val());
				opt.option = JSON.parse($('#phantom_opt').val());
				chrome.extension.sendRequest({
						type:'phantom',
						opt:opt
					},
					function(response) {
						console.log('result:'+response.result);
				});				
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
			if(url != '')
			{
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
						chrome.extension.sendRequest({
								type:'send_cookies',
								data:cookies_str
							},
							function(response) {
						});
					});
				}
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
        	var options = _this.model.attributes;
        	chrome.extension.sendRequest({
					type:'get_mem_phantomjs_opt',
				},
				function(response) {
					var ret = response.result;
					if(ret != '')
					{
						options.phantomjs_url = JSON.stringify(ret.url);
						options.phantomjs_opt = JSON.stringify(ret.opt.option);
					}else
					{
						options.phantomjs_url = '["http://www.baidu.com"]';
						options.phantomjs_opt = '{"route":"other.tool","row_xpath":"//title","cols":"","attr":"textContent"}';
					}
					options.phantomjs_url = options.phantomjs_url.replace(/\'/g, "&#039;");
					options.phantomjs_opt = options.phantomjs_opt.replace(/\'/g, "&#039;");
					var template = _.template( optionsTemplate, {options:options} );
		            callback(template, function(){_this.bindEvents();});
			});			
            
        }
    });
    return new view;
});
