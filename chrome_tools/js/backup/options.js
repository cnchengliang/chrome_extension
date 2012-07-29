/* Copyright (C) 2007-2011 eBay Inc. All Rights Reserved. */
var Options = {
    _tabber: null,
    init: function () {
        this._initNavbar();        
        this._selectPane("general");
    },
    _initNavbar: function () {
        $(".navbar-item").bind("click", function (aEvent) {
            Options.selectPane($(this).attr("panel"));
        });
    },
    _addGSJSFiles: function (aJSId, aUrl) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        script.id = aJSId;
        script.type = 'text/javascript';
        script.src = aUrl;
        head.appendChild(script);
    },
    uninit: function () {

    },
    selectPane: function (aType) {
        this._selectPane(aType);
    },
    _selectPane: function (aType, aCallback) {
        const PANEL_TYPES = ["general", "alerts", "feedback", "legal", "account", "train", "fileupload"];
        var that = this;
        $(".pane-selector > .pane-button-container[ebayselected]").removeAttr("ebayselected");
        $("#pane-button-" + aType).parent().attr("ebayselected", true);
        $.each(PANEL_TYPES, function (aIndex, aValue) {
            if (aValue == aType) {
                $(".navbar-item").removeClass("navbar-item-selected");
                $("#nav-item-" + aType).addClass("navbar-item-selected");
                $("#pane-general").hide();
                $("#pane-alerts").hide();
                $("#pane-feedback").hide();
                $("#pane-legal").hide();
				$("#pane-account").hide();
				$("#pane-train").hide();
                $("#pane-" + aType).show();
                if (aCallback) aCallback();
            }
        });
    }
};

$(document).ready(function () {
    Options.init();
});
$(window).unload(function () {
    Options.uninit();
});

//保存
document.addEventListener('DOMContentLoaded', function (e) {
	var form = document.forms.sc_form;
	var options = {};
	if(localStorage['options'])
		options = JSON.parse(localStorage['options']) || {};
	var tmp = '';
	for(var i=0; options.tabs && i < options.tabs.length; i++)
	{		
		tmp = tmp + options.tabs[i] +',';
	}
	$('#tabs').html(tmp);
	
	form.continue_enable.checked = options.continue_enable;
	form.auto_get_content.checked = options.auto_get_content;
	form.auto_submit_content.checked = options.auto_submit_content;
	form.proxy_enable.checked = options.proxy_enable;
	form.download_enable.checked = options.download_enable;
	form.close_tips.value = options.close_tips==undefined?0:options.close_tips;
	form.download_twitter_enable.checked = options.download_twitter_enable;
	form.download_comment_enable.checked = options.download_comment_enable;
	form.download_relation_enable.checked = options.download_relation_enable;
	form.download_userinfo_enable.checked = options.download_userinfo_enable;	
	form.download_businessvalue_enable.checked = options.download_businessvalue_enable;
	form.download_huoche58_enable.checked = options.download_huoche58_enable;
	form.download_pceggs28_enable.checked = options.download_pceggs28_enable;
	form.download_mgjRelation_enable.checked = options.download_mgjRelation_enable;
	form.download_mgjTwitter_enable.checked = options.download_mgjTwitter_enable;
	form.download_taobaojie_enable.checked = options.download_taobaojie_enable;

	form.download_oschina_enable.checked = options.download_oschina_enable;
	
	$('#get_tabs').bind('click', function() {
		setTabs(form);
	});
	$('#get_tabs2').bind('click', function() {
		setTabs2(form);
	});
	$('#get_ports').bind('click', function() {
		setPorts(form);
	});
	$('#get_cookies').bind('click', function() {
		getCookies($('#cookies_url').val());
	});
	
	
	form.isActivated.checked = options.isActivated;
	form.frequency.value = options.frequency;
	//form.website.value = options.website;
	form.addEventListener('change', function () {
		saveSettings(form);
	});
	
	//account
	$('#get-account-pin').bind('click', function() {
		getRequestToken($('#account-type').val());
	});
	$('#save-account').bind('click', function() {
		getAccessToken($('#account-type').val());
	});
	
	//train
	$('#login').bind('click', function() {
		loginTrain(0);
	});
	$('#order').bind('click', function() {
		chrome.extension.sendRequest({type:'setoption',key:"hook_request",value:'1'}, function(response) {});
		chrome.extension.sendRequest({type:'setoption',key:"hook_request_type",value:'1'}, function(response) {});
		chrome.extension.sendRequest({type:'setoption',key:"hook_referer",value:'https://dynamic.12306.cn/otsweb/'}, function(response) {});
		orderTrain(0);
	});

});
function saveSettings(form) {
	var options = {};
	if(localStorage['options'])
		options = JSON.parse(localStorage['options']) || {};
	
	options.continue_enable = form.continue_enable.checked;
	options.proxy_enable = form.proxy_enable.checked;
	
	var config = {};
	if(options.proxy_enable)
	{
		config = {
		  mode: "fixed_servers",
		  rules: {
			singleProxy: {
			  scheme: "socks5",
			  host: "127.0.0.1",
			  port: 1080
			},
			bypassList: ["127.0.0.1"]
		  }
		};		
	}else
	{
		config = {
		  mode: "direct"
		};
	}
	chrome.proxy.settings.set(
		{
			value: config,
			scope: 'regular'
		}, 
		function() {}
	);
	
	options.download_enable = form.download_enable.checked;
	options.auto_get_content = form.auto_get_content.checked;
	options.auto_submit_content = form.auto_submit_content.checked;
	options.close_tips = form.close_tips.value;
	options.download_twitter_enable = form.download_twitter_enable.checked;
	options.download_comment_enable = form.download_comment_enable.checked;
	options.download_relation_enable = form.download_relation_enable.checked;
	options.download_userinfo_enable = form.download_userinfo_enable.checked;	
	options.download_businessvalue_enable = form.download_businessvalue_enable.checked;
	options.download_huoche58_enable = form.download_huoche58_enable.checked;
	options.download_pceggs28_enable = form.download_pceggs28_enable.checked;
	options.download_mgjRelation_enable = form.download_mgjRelation_enable.checked;
	options.download_mgjTwitter_enable = form.download_mgjTwitter_enable.checked;
	options.download_taobaojie_enable = form.download_taobaojie_enable.checked;

	options.download_oschina_enable = form.download_oschina_enable.checked;
	
	options.isActivated = form.isActivated.checked;
	options.frequency = form.frequency.value;
	//options.website = form.website.value;
    localStorage['options'] = JSON.stringify(options);
}

function setTabs(form)
{
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
			var options = JSON.parse(window.localStorage.getItem('options')) || {};
			if(form.tabs_route.value != '')
				options[form.tabs_route.value] = rel_tabs;
			window.localStorage.setItem('options', JSON.stringify(options));
		});
	});
}

function setTabs2(form)
{
	chrome.tabs.create({"url":$('#tab_filter_url').val(),"selected":false},function(tab){
		var options = JSON.parse(window.localStorage.getItem('options')) || {};
		if(form.tabs_route.value != '')
			options[form.tabs_route.value] = [tab.id];
		window.localStorage.setItem('options', JSON.stringify(options));
    });
}

function setPorts(form)
{
	var ports = [];
	var tmp = form.ports_zmq.value.split(',');
	for(var i=0; i < tmp.length; i++)
	{
		if(tmp[i] != '')
		{									
			ports[ports.length] = tmp[i];
		}
	}
	var options = JSON.parse(window.localStorage.getItem('options')) || {};
	if(form.ports_route.value != '')
		options[form.ports_route.value] = ports;
	window.localStorage.setItem('options', JSON.stringify(options));
}


//account
function getRequestToken(consumerName)
{
	var accessor = consumer[consumerName];
	var message = {
		'method': "GET", 
		'action': accessor.serviceProvider.requestTokenURL,
		'parameters': []
	};
	OAuth.completeRequest(message, accessor);
	var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
	var parameterMap = OAuth.getParameterMap(message.parameters);
	//请求令牌
	$.ajax({
		url: accessor.serviceProvider.requestTokenURL,
		type: 'GET',
		data: parameterMap,
		async: true,
		dataType: 'text',
		timeout: 5000,
		error: function(){
			alert('error!');
		},
		success: function(res){
			var results = OAuth.decodeForm(res);
			message = {method: "GET", action: accessor.serviceProvider.userAuthorizationURL};
			OAuth.completeRequest(message,
				{ 
					token : OAuth.getParameter(results, "oauth_token")
				});
			var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
			var parameterMap = OAuth.getParameterMap(message.parameters);
			parameterMap.oauth_callback = 'oob';
			$('#account-request-token-key').val(OAuth.getParameter(results, "oauth_token"));
			$('#account-request-token-secret').val(OAuth.getParameter(results, "oauth_token_secret"));
			var params = OAuth.formEncode(parameterMap);
			chrome.windows.create({url: accessor.serviceProvider.userAuthorizationURL+'?'+params, type: "popup",width:600,height:500});
			return;
			/*
			//授权认证
			$.ajax({
				url: accessor.serviceProvider.userAuthorizationURL,
				type: 'GET',
				data: parameterMap,
				async: true,
				dataType: 'html',
				timeout: 5000,
				error: function(){
					alert('error!');
				},
				success: function(res){
					var pinReg = new RegExp(/<span class="fb">(.*?)<\/span>/ig);
					var pinArr = pinReg.exec(res);
					var pin = pinArr[1];
					message = {method: "GET", action: accessor.serviceProvider.accessTokenURL,parameters: [['oauth_verifier',pin]]};
					OAuth.completeRequest(message,
						{ consumerKey   : accessor.consumerKey
						, consumerSecret: accessor.consumerSecret
						, token         : OAuth.getParameter(results, "oauth_token")
						, tokenSecret   : OAuth.getParameter(results, "oauth_token_secret")
						});
					var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
					var parameterMap = OAuth.getParameterMap(message.parameters);
					//请求通行证
					$.ajax({
						url: accessor.serviceProvider.accessTokenURL,
						type: 'GET',
						data: parameterMap,
						async: true,
						dataType: 'text',
						timeout: 5000,
						error: function(){
							alert('error!');
						},
						success: function(res){
							alert(res);
						}
					});
				}
			});	*/		
		}
	});
}
function getAccessToken(consumerName)
{
	var accessor = consumer[consumerName];
	var message = {method: "GET", action: accessor.serviceProvider.accessTokenURL,parameters: [['oauth_verifier',$('#account-pin').val()]]};
	OAuth.completeRequest(message,
		{ consumerKey   : accessor.consumerKey
		, consumerSecret: accessor.consumerSecret
		, token         : $('#account-request-token-key').val()
		, tokenSecret   : $('#account-request-token-secret').val()
		});
	var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
	var parameterMap = OAuth.getParameterMap(message.parameters);
	//请求通行证
	$.ajax({
		url: accessor.serviceProvider.accessTokenURL,
		type: 'GET',
		data: parameterMap,
		async: true,
		dataType: 'text',
		timeout: 5000,
		error: function(){
			alert('error!');
		},
		success: function(res){
			var results = OAuth.decodeForm(res);
			var options = JSON.parse(window.localStorage.getItem('options')) || {};
			options['account_weibo'] = {'oauth_token':OAuth.getParameter(results, "oauth_token"),'oauth_token_secret':OAuth.getParameter(results, "oauth_token_secret"),'user_id':OAuth.getParameter(results, "user_id")};
			window.localStorage.setItem('options', JSON.stringify(options));
			alert('saved');

		}
	});	
}

function getUserInfo(consumerName)
{
	var options = JSON.parse(window.localStorage.getItem('options')) || {};
	var account = options['account_'+consumerName];
	var accessor = consumer[consumerName];
	var message = {method: "GET", action: accessor.serviceProvider.echoURL,parameters: []};
	OAuth.completeRequest(message,
		{ consumerKey   : accessor.consumerKey
		, consumerSecret: accessor.consumerSecret
		, token         : account['oauth_token']
		, tokenSecret   : account['oauth_token_secret']
		});
	var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
	var parameterMap = OAuth.getParameterMap(message.parameters);
	//请求通行证
	$.ajax({
		url: accessor.serviceProvider.echoURL,
		type: 'GET',
		data: parameterMap,
		async: true,
		dataType: 'json',
		timeout: 5000,
		error: function(){
			alert('error!');
		},
		success: function(res){
			console.log(res);
		}
	});	
}


//getUserInfo('weibo');
/*
$.ajax({
	url: 'http://weibo.com',
	type: 'GET',
	async: true,
	dataType: 'html',
	timeout: 5000,
	error: function(){
		alert('error!');
	},
	success: function(res){

		console.log(res);
	}
});*/

function getCookies(url)
{
	domain = getDomain(url);
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

function getDomain(url)
{
  server = url.match(/:\/\/(.[^/:#?]+)/)[1];
  parts = server.split(".");
  domain = parts[parts.length - 2] + "." + parts[parts.length -1];
  return domain;
}

function loginTrain(login_times)
{
	login_times++;
	$('#login').val('登录('+login_times+')');
	if(login_times == 1 || $('#autoReLogin').attr('checked') == true)
	{
		$.ajax({
			url: 'https://dynamic.12306.cn/otsweb/loginAction.do?method=login',
			type: 'POST',
			data: {
				'loginUser.user_name': $('#user_name').val(),
				'user.password':$('#password').val(),
				'randCode':$('#randCode').val()
			},
			async: true,
			dataType: 'html',
			timeout: 10000,
			error:function()
			{
				loginTrain(login_times);
			}
			,
			success: function(result){
				console.log(result);
				if(result.indexOf('用户注销') == -1)
				{
					loginTrain(login_times);
				}else
				{
					$('#train_result').text('登录成功...\n');
				}
			}
		});
	}
}

function orderTrain(order_times)
{
	order_times++;
	$('#order').val('下单('+order_times+')');
	if(order_times == 1 || $('#autoReOrder').attr('checked') == true)
	{
		var query_obj = $('#order_form').val().split('&');
		var query_data ={};
		$.each(query_obj, function(x,y){
			var temp = y.split('=');
			query_data[temp[0]] = temp[1];
		});
		$.ajax({
			url: 'https://dynamic.12306.cn/otsweb/order/confirmPassengerAction.do?method=confirmPassengerInfoSingle',
			type: 'POST',
			data: query_data,
			async: true,
			dataType: 'html',
			timeout: 10000,
			error:function()
			{
				orderTrain(order_times);
			}
			,
			success: function(result){
				console.log(result);
				if(result.indexOf('成功') == -1)
				{
					orderTrain(order_times);
				}else
				{
					$('#train_result').text('下单成功...\n');
				}
			}
		});
	}
}
console.log(window.localStorage.getItem('options'));
