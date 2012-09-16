Array.prototype.remove=function(dx)
{
	if(isNaN(dx)||dx>this.length){return false;}
	for(var i=0,n=0;i<this.length;i++)
	{
		if(this[i]!=this[dx])
		{
		    this[n++]=this[i];
		}
	}
	this.length-=1;
}

var BG = {
	init: function(){
		BG.event.chrome.browserAction.onClicked();
		BG.event.chrome.extension.onRequest();
		BG.plugin.simple.init();
		BG.common.menu.init();
	},
	register: function(namespace)
	{
		var nsArray = namespace.split('.');
		var sEval = "";
		var sNS = "";
		for (var i = 0; i < nsArray.length; i++)
		{
		    if (i != 0) sNS += ".";
		    sNS += nsArray[i];
		    sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();";
		}
		if (sEval != "") eval(sEval);
	}
};

BG.register("BG.common");

BG.register("BG.html5db");

BG.register("BG.memory");

BG.register("BG.event.chrome.browserAction");
BG.register("BG.event.chrome.extension");
BG.register("BG.event.chrome.experimental.webRequest");

BG.register("BG.plugin.simple");

BG.register("BG.sse.phantom");


BG.register("BG.common.timer");
BG.register("BG.common.menu");

BG.register("BG.event.taobao");






//工具栏图标被点中时
BG.event.chrome.browserAction.onClicked = function()
{
	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.create({"url":"/views/options.html","selected":true},function(tab){
			
		});
	/*
		var ret = BG.common.getOption('continue_enable');
		if(ret == true)
		{
			BG.common.setOption("continue_enable",false);
		}else
		{
			BG.common.setOption("continue_enable",true);
			chrome.tabs.executeScript(tab.id, {code: 'browserActionClicked()'});
		}	*/
	});
};
BG.common.getOption = function(key) {
	var ret;
	try {
		var options = JSON.parse(window.localStorage.getItem('options')) || {};
		if(key != 'keys')
		{			
			ret = typeof options[key] == 'undefined' ? '':options[key];
		}else
		{
			ret = options;
		}
	} catch (e) {
		ret = null;
	}
	return ret;
};

BG.common.setOption = function(key,val)
{
	var options = JSON.parse(window.localStorage.getItem('options')) || {};
	options[key] = val;
    window.localStorage.setItem('options', JSON.stringify(options));
};


BG.common.md5 = function(text)
{
	var hash = CryptoJS.MD5(text);
	//console.log(hash.toString());
	return hash.toString();
}

BG.common.str2int = function(str)
{
	return Number(str.match(/\d/g).join(""));
}

//html5数据库：添加、更新、查询、删除
//数据库地址：win7下是C:\Users\root\AppData\Local\simple-web\+(网址如http_content.businessvalue.com.cn_0)
//可以用SQLiteSpy打开查看
BG.html5db = (function () 
{
	var db = null;
	function openDb(name,display_name,size) 
	{
		console.log('initialising database');
        try {
 			if (window.openDatabase) {
 				db = openDatabase(name, "1.0", display_name, size);
 				if (!db) {
 					console.log('error occurred trying to open DB');
 				}
 			} else {
 				console.log('Web Databases not supported');
 			}
        } catch (e) {
          console.log('error occurred during DB init, Web Database supported?');
        }
	}
	function exec(query,callback)
	{		
		db.transaction(function(tx) {
			try {
				tx.executeSql(query,[],
				function (tx, results) {
					if(callback)
					{
						callback(tx,results);
					}
				}, function (tx,error) {
					console.log('error exec DB '+error.message);
				});
			} catch (e) {
				console.log('error occurred during DB exec.  '.query);
			}
        });
		
	}
	function getAll(query,callback)
	{
		db.transaction(function (tx) {
		tx.executeSql(query, [], 
			function (tx, results) {           
				callback(tx,results);
			}, function (tx,error) {
				console.log('error getAll '+error.message);
			});
		});
	}
	openDb('sDownload','sDownload',500*1024*1024);
	return {
		exec:exec,
		getAll:getAll
	};
})();

BG.memory = (function () 
{
	var memory = function() {
	  this.arr_content = [];
	};

	memory.prototype.setArrContent = function(content) {
		if(content.constructor == Array)
		{
			if(content.length == 0)
			{
				this.arr_content = [];
			}else
			{
				this.arr_content = this.arr_content.concat(content);
			}
		}
	};
	memory.prototype.getArrContent = function() {
	  return this.arr_content;
	};

	var memdb = new memory();
	return memdb;
})();

BG.common.notice = function (title,msg,htmlfile)
{
	/*
	var notification = webkitNotifications.createNotification(
      'res/icon48.png',  // The image.
      title, 			// The title.
      msg      			// The body.
    );
    */
    if(!htmlfile)
    {
    	htmlfile = 'notification.html';
    }
    var notification = webkitNotifications.createHTMLNotification(
      '/views/'+htmlfile+'?title='+escape(title)+'&msg='+escape(msg)
    );	
    notification.show();
};

BG.event.chrome.extension.onRequest = function(){
	chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
		var reqtype = request.type;	

		if (reqtype == 'setoption') {
			BG.common.setOption(request.key,request.value);
			sendResponse({});
			return;
		}

		if(reqtype == 'test')
		{
			var content = {};
			content.title = "标题123";
			content.con = "测试 test ...";
			var test = BG.plugin.simple.test(JSON.stringify(content));
			sendResponse({result:test});
			return;
		}

		if(reqtype == 'push2Client')
		{
			var ret = BG.plugin.simple.push2Client(JSON.stringify(request.data),JSON.stringify(request.port));
			sendResponse({result:ret});
			return;
		}

		if(reqtype == 'phantom')
		{
			var phantomjs_param = typeof request.param == 'undefined' ? '':request.param;
			var phantomjs_opt = request.opt;
			var url = phantomjs_opt.url;
			delete phantomjs_opt.url;

			var port = phantomjs_opt.option.port;
			delete phantomjs_opt.option.port;

			if(typeof BG.memory.phantomjs_opt_port == 'undefined') BG.memory.phantomjs_opt_port = [];
			BG.memory.phantomjs_opt_port[port] = {'url':url,'param':phantomjs_param,'opt':phantomjs_opt};
			BG.plugin.simple.route(port);

			sendResponse({result:true});
			return;
		}

		if(reqtype == 'taobao')
		{
			switch(request.act)
			{
				case 'get_rate':BG.event.taobao.taobao_rate_event(request.nick,sendResponse);
			}
			return;
		}

		if (reqtype == 'notice') {
			BG.common.notice(request.title,request.msg);
			sendResponse({});
			return;
		}
		if (reqtype == 'option') {
			if(request.key == 'keys')
			{
				var options = BG.common.getOption(request.key);
				var tabs = options.tabs;
				if(tabs)
				{
					tabs[tabs.length] = sender.tab.id;
				}
				options.tabs = tabs;
				options.selected_tab = sender.tab.id;
				sendResponse({result:options});
			}else
			{
				sendResponse({result:BG.common.getOption(request.key)});
			}
			return;
		}
	
		if(reqtype == 'tabs')
		{
			var opt = BG.common.getOption('tabs');
			opt[opt.length] = sender.tab.id;
			sendResponse({result:opt});
			return;
		}

		if (reqtype == 'set_temp_data') {
			window.localStorage.setItem('temp_data', JSON.stringify(request.temp_data));
			sendResponse({result:request.temp_data.length});
			return;
		}
		if (reqtype == 'append_temp_data') {
			var temp_data = JSON.parse(window.localStorage.getItem('temp_data'));
			if(temp_data.constructor == Array)
				temp_data = temp_data.concat(request.temp_data);
			else
				temp_data = request.temp_data;
			window.localStorage.setItem('temp_data', JSON.stringify(temp_data));
			sendResponse({result:temp_data.length});
			return;
		}
		if (reqtype == 'pop_temp_data') {
			var temp_data = JSON.parse(window.localStorage.getItem('temp_data'));
			var id = '';
			if(temp_data.constructor == Array && temp_data.length > 0)
				id = temp_data.pop();
			
			window.localStorage.setItem('temp_data', JSON.stringify(temp_data));
			sendResponse({result:id});
			return;
		}
		if (reqtype == 'get_temp_data') {
			var temp_data = JSON.parse(window.localStorage.getItem('temp_data'));
			sendResponse({result:temp_data});
			return;
		}
		if (reqtype == 'get_temp_flag') {
			var temp_flag = JSON.parse(window.localStorage.getItem('temp_flag'));
			sendResponse({result:temp_flag});
			return;
		}

		if (reqtype == 'set_temp_flag') {
			window.localStorage.setItem('temp_flag', JSON.stringify(request.temp_flag));
			sendResponse({result:request.temp_flag});
			return;
		}



		if (reqtype == 'set_mem_array') {
			BG.memory.setArrContent(request.temp_data);
			sendResponse({result:request.temp_data.length});
			return;
		}

		if (reqtype == 'get_mem_array') {
			var temp_data = BG.memory.getArrContent();;
			sendResponse({result:temp_data});
			return;
		}

		if (reqtype == 'set_mem_phantomjs_opt') {
			if(!BG.memory.phantomjs_opt) BG.memory.phantomjs_opt = {'url':[],'param':'','opt':{'option':{'route':'other.tool','type':'action','result_type':'file','actions':[]}}}

			////div[@id='epfeedlist']/div[@class='MIB_bobar']/div/a[position()>1][contains(@class,'btn_numWidth')]
			if(request.url != '')
			{
				BG.memory.phantomjs_opt.url[BG.memory.phantomjs_opt.url.length] = request.url;
			}
			if(request.param != '')
			{
				BG.memory.phantomjs_opt.param.replace(/request.param/g, "");
				BG.memory.phantomjs_opt.param += " "+request.param;
			}
			if(request.opt)
			{
				var action = {'action':'auto_get_content','row_xpath':request.opt.row_xpath,'cols':request.opt.cols,'attr':request.opt.attr}
				BG.memory.phantomjs_opt.opt.option.actions[BG.memory.phantomjs_opt.opt.option.actions.length] = action;
			}
			
			sendResponse({result:true});
			return;
		}

		if (reqtype == 'get_mem_phantomjs_opt') {
			var phantomjs_opt = '';
			if(BG.memory.phantomjs_opt) phantomjs_opt= BG.memory.phantomjs_opt;
			sendResponse({result:phantomjs_opt});
			return;
		}

		if (reqtype == 'send_cookies') {
			if(BG.memory.phantomjs_opt)	BG.plugin.simple.cookies(request.data,9080);
			sendResponse({result:true});
			return;
		}


		if(reqtype == 'set_time_up'){
			var munites = BG.common.getOption('time_up');		
			BG.common.timer.setTime(60*munites);
			BG.common.timer.restoreLastSession();
		}
	
		var sql = request.sql;
		if(!sql || sql == '') return;
		if (reqtype == 'exec') {
			BG.html5db.exec(sql,
				function (tx, results) {
					sendResponse({result:true});
			});		
		}
		if (reqtype == 'read') {
			BG.html5db.exec(sql,
				function (tx, results) {
					var data = {};
					if (results.rows && results.rows.length) {
						for(var i=0;i<results.rows.length;i++)
						{
							data[i] = results.rows.item(i);
						}
		            }
					sendResponse({data:data,length:results.rows.length});
			});		
		}
	
	});
};


/*
request=>
method: "GET"
type: "xmlhttprequest"
url: "http://127.0.0.1/
headers=>
X-Requested-With:XMLHttpRequest
User-Agent:Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7
Accept:text/html
Referer:http://127.0.0.1/test.php
Accept-Encoding:gzip,deflate,sdch
Accept-Language:zh-CN,zh;q=0.8
Accept-Charset:GBK,utf-8;q=0.7,*;q=0.3
Cookie:....
*/


BG.event.chrome.experimental.webRequest.onBeforeSendHeaders = function(){
	chrome.experimental.webRequest.onBeforeSendHeaders.addListener(
	function(request)
	{
		//BG.common.setOption('hook_request','0');
		var headers = request.requestHeaders,blockingResponse = {};
		if(BG.common.getOption('hook_request') == '1')
		{
			for (var j = 0, l = headers.length; j < l; j++) {        
				if (headers[j].name == "Referer") {
				    headers[j].value = BG.common.getOption('hook_referer');
				}
				if (BG.common.getOption('hook_request_type') == 1 && headers[j].name == "X-Requested-With") {
				    headers.splice(j,1);
					l = headers.length;
					j--;
				}
			}
		}
		blockingResponse.requestHeaders = headers;
		return blockingResponse;//返回给interceptRequest函数 
		//return { redirectUrl: 'http://127.0.0.1/' }
		//return {cancel: details.url.indexOf("://127.0.0.1/") != -1};
	}
	, { }, ['requestHeaders','blocking']);
};

/*
if(typeof BG.memory.phantomjs_opt_step == 'undefined') BG.memory.phantomjs_opt_step = [];
BG.memory.phantomjs_opt_step[9087] = 12150;
BG.memory.phantomjs_opt_step[9086] = 1860;
BG.memory.phantomjs_opt_step[9085] = 2050;
BG.memory.phantomjs_opt_step[9084] = 6880;
BG.memory.phantomjs_opt_step[9083] = 6320;
BG.memory.phantomjs_opt_step[9082] = 6340;
BG.memory.phantomjs_opt_step[9081] = 6680;
BG.memory.phantomjs_opt_step[9080] = 6920;
*/

BG.plugin.simple = (function () 
{
	var obj = null;
	
    var plugin = document.getElementById('simple_pluginId');
	//obj = plugin.CreateObject("simple");
	if(plugin) console.log('initialising simple plugin');

	plugin.route = function(port) {	
		if(typeof BG.memory.phantomjs_opt_port[port] == 'undefined') return;

		//////////////////////////
		var step = 5;
		var start = port%step;		
		if(typeof BG.memory.phantomjs_opt_step == 'undefined') BG.memory.phantomjs_opt_step = [];
		BG.memory.phantomjs_opt_step[port] = typeof BG.memory.phantomjs_opt_step[port] == 'undefined' ?0:BG.memory.phantomjs_opt_step[port];	
		for(var i=2;i>BG.memory.phantomjs_opt_port[port].url.length && urls.length > BG.memory.phantomjs_opt_step[port] + start;)
		{
			BG.memory.phantomjs_opt_port[port].url[BG.memory.phantomjs_opt_port[port].url.length] = urls[BG.memory.phantomjs_opt_step[port] + start];
			BG.memory.phantomjs_opt_step[port] += step;
		}
		//////////////////////////

		
		var phantomjs_opt = BG.memory.phantomjs_opt_port[port];
		var phantomjs_param = phantomjs_opt.param;
		var opt = phantomjs_opt.opt;
		
		if(phantomjs_opt.url.length > 0)
		{
			opt.url = BG.memory.phantomjs_opt_port[port].url.shift();
			opt.port = port;
			console.log(port+":"+opt.url);
		}else
		{
			BG.sse.phantom.stopCount(port);
			BG.common.sendForm('GET','http://127.0.0.1:'+port+'/reset','');
			return;
		}
		var opt_str = escape(JSON.stringify(opt));
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://127.0.0.1:'+port+'/route', true);
		xhr.responseType = 'text';		
		var run = function() {
			//opt_str = opt_str.replace(/\"/g, '\\"');
			//opt_str = opt_str.replace(/\'/g, "\\'");
			//--proxy-type=socks5 --proxy=127.0.0.1:1080
			//BG.common.notice('run phantomjs:','port:'+port);
			//var ret = BG.plugin.simple.phantom("plugin/bin/phantomjs","  --load-images=no "+phantomjs_param+" js/init.js " + opt_str);
			var ret = BG.plugin.simple.phantom("plugin/bin/phantomjs","  --load-images=no --cookies-file=data/cookies_"+port+".txt "+phantomjs_param+" js/init.js " + opt_str);
			//考虑手动关闭函数
			BG.sse.phantom.stopCount(port);
			setTimeout(function(){if(BG.sse.phantom.isListening(port) == false)	BG.sse.phantom.CreateEventSource(port);},1000); 
				
		};
		xhr.onerror = run;
		xhr.onload = function(e) {
			if (this.status == 200) {
				console.log(port+":"+this.response);
				
			}else
			{
				console.log(port+':phantom onload error');
				run();
			}
		};
		xhr.send(opt_str);
	}

	plugin.cookies = function(data,port) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://127.0.0.1:'+port+'/write2file', true);
		xhr.responseType = 'text';
		xhr.onload = function(e) {
			if (this.status == 200) {
				console.log(port+":"+this.response);
			}else
			{
				console.log(port+':phantom cookies onload');
			}
		};
		xhr.onerror = function() {
			console.log(port+':phantom cookies onerror');
		};
		var content = JSON.stringify({'filename':'data/cookies_'+port+'.txt','data':data});
		xhr.send(content);
	}

	plugin.init = function(port)
	{
		if(port)
		{
			var ret = BG.plugin.simple.phantom("cmd"," /c for /f \"tokens=5\" %i in (\'netstat -aon^|findstr \"0.0.0.0:" + port + "\"\') do @taskkill /F /PID %i");
			//"taskkill","  /f /t /im phantomjs.exe "
			var ret = BG.plugin.simple.phantom("kill","  -9 $(lsof -i:" + port + " | grep *:" + port + " | awk '{print $2}') ");
			//BG.common.notice('init phantomjs:','port:'+port);
		}else
		{
			var ret = BG.plugin.simple.phantom("taskkill","  /f /t /im phantomjs.exe ");
			var ret = BG.plugin.simple.phantom("killall","  -9 phantomjs ");
		}
	}

	return plugin;
})();



BG.sse.phantom = (function () 
{
	var arr_source = [];
	var arr_num = [];
	var arr_timer = [];
	var countdown = [];
	var fns = [];
	function tick(port) {
		if (countdown[port]) {
			clearInterval(countdown[port]);
		}
		countdown[port] = setInterval(function() {
			if (fns[port]) {
				fns[port]();
			}
		}, 1000);
	}
	function CreateEventSource(port)
	{
		var phantomjs_opt = BG.memory.phantomjs_opt_port[port];
		arr_num[port] = 0;
		arr_timer[port] = 0;
		tick(port);
		// sse.php sends messages with text/event-stream mimetype.
		arr_source[port] = new EventSource('http://127.0.0.1:'+port+'/result');		
		arr_source[port].addEventListener('message', function(event) {			
			var d = new Date();
			arr_timer[port] = d;//10秒之后
			fns[port] = function(){
				var now = new Date();
				if(now - arr_timer[port] >=10*1000 && phantomjs_opt.url.length > 0)
				{
					//BG.common.notice('EventSource:'+port,'timeout');
					console.log('EventSource:'+port,'timeout');					
					BG.plugin.simple.init(port);					
					arr_num[port] = 0;
					setTimeout(function(){BG.plugin.simple.route(port);},3000);
					BG.sse.phantom.stopCount(port);
				}
			};
			var timeStr = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

			console.log('port: ' + port + ', server time: ' + timeStr, 'msg:'+event.data);
			try
			{

				if(event.data.indexOf("sse_result") != -1)
				{
					var data = JSON.parse(unescape(event.data));					
					if(phantomjs_opt.opt.option.result_type == 'api')
					{
						BG.common.sendForm('POST','http://127.0.0.1/php_tools/slim/import_web_content',JSON.stringify(data.sse_result));
					}
					else if(phantomjs_opt.opt.option.result_type == 'notice')
					{
						if(phantomjs_opt.callback)
						{
							eval(phantomjs_opt.callback)(data.sse_result);
						}else
						{
							//BG.common.notice(port+':time:'+timeStr,data.sse_result);
							console.log(port+':time:'+timeStr,data.sse_result);
						}
					}
				}else
				{
					if(phantomjs_opt.callback)
					{
						eval(phantomjs_opt.callback)('');
					}
				}
			} catch (e) {
				console.log(port+':sse error');
			}
			arr_num[port]++;
			////////////////////////////////////////////////////////////////
			var limit_page = 5;
			if(typeof phantomjs_opt.limit_page != 'undefined') limit_page = Number(phantomjs_opt.limit_page);
			if(arr_num[port] >= limit_page || event.data.indexOf("sys_result") != -1)
			{
				if(arr_num[port] >= limit_page)
				{
					BG.plugin.simple.init(port);					
					arr_num[port] = 0;
					setTimeout(function(){BG.plugin.simple.route(port);},3000);
					BG.sse.phantom.stopCount(port);
				}else
				{
					BG.plugin.simple.route(port);
					arr_num[port] = 0;
				}
			}
			////////////////////////////////////////////////////////////////
			
		}, false);

		arr_source[port].addEventListener('open', function(event) {
		  console.log(port+'> Connection was opened');
		}, false);

		arr_source[port].addEventListener('error', function(event) {
		  if (event.eventPhase == 2) { //EventSource.CLOSED
			console.log(port+'> Connection was closed');
			//BG.sse.phantom.CloseEventSource(port);
			
		  }
		}, false);
	}
	function CloseEventSource(port)
	{
		var src = arr_source[port];
		if(src)
		{
			clearInterval(countdown[port]);
			arr_source.remove(port);
			src.close();			
		}
	}
	function stopCount(port)
	{
		if(fns[port])
		{
			fns[port] = false;
		}
	}
	function isListening(port)
	{
		return typeof arr_source[port] == 'undefined' ? false:true;
	}
	return {
		arr_source:arr_source,
		CreateEventSource:CreateEventSource,
		CloseEventSource:CloseEventSource,
		isListening:isListening,
		stopCount:stopCount
	};
})();




BG.common.timer = (function () 
{
	/**
	 * Number of milliseconds in a second.
	 * @type {number}
	 */
	MILLISECONDS_IN_A_SECOND = 1000;

	/**
	 * Duration of desktop notification in milliseconds.
	 * @type {number}
	 */
	NOTIFICATION_DURATION = 10000;


	/**
	 * Starts, resets and pauses timer, updates timer values at regular intervals,
	 * shows notifications at specified time.
	 * @constructor
	 */
	var Timer = function() {
	  // Store interval ID for setInterval.
	  this.countdown = 0;

	  // Stores seconds value.
	  this.seconds = 0;

	  // Indicate if timer is running.
	  this.running = false;

	  // Function to update time values in popup.
	  this.popupNotifier = null;

	  // Stores desktop notification reference.
	  this.notification = null;

	  // Stores notification timeout ID.
	  this.notificationTimeout = 0;
	};

	/**
	 * Restores last timer session if present
	 * (in case when browser was closed while timer running).
	 */
	Timer.prototype.restoreLastSession = function() {
	  // Stores time elapsed since timer started (in seconds).
	  var timeGap;
	  if (window.localStorage.getItem('seconds') == undefined) {
		return;
	  }
	  // Get last session start time in milliseconds.
	  var startTime = window.localStorage.getItem('start-time');

	  // Get duration of session in seconds.
	  var seconds = window.localStorage.getItem('seconds');

	  // Store current system time in milliseconds.
	  var currentTime = new Date().getTime();
	  // Get time difference in seconds.
	  timeGap = Math.floor((currentTime - startTime) / MILLISECONDS_IN_A_SECOND);
	  if (timeGap > seconds) {
		this.reset();
	  } else {
		// Browsing time left.
		this.seconds = seconds - timeGap;
		this.running = true;
		this.start();
	  }
	};

	/**
	 * Cancels any existing desktop notification.
	 */
	Timer.prototype.cancelNotification = function() {
	  if (this.notificationTimeout) {
		clearTimeout(this.notificationTimeout);
		//this.notification.cancel();
	  }
	};

	/**
	 * Sets timer values and stores the session duration and current system time.
	 * @param {String} seconds Value of seconds set in popup.
	 */
	Timer.prototype.setTime = function(seconds) {
	  this.seconds = Number(seconds);
	  localStorage.setItem('seconds', this.seconds);
	  // Store current system time.
	  localStorage.setItem('start-time', new Date().getTime());
	  this.cancelNotification();
	};

	/**
	 * Updates timer, shows animation every minute and notify popup (if active)
	 * to update its display.
	 */
	Timer.prototype.tick = function() {
	  this.seconds--;
	  this.updateBadge();
	};

	/**
	 * Starts timer.
	 */
	Timer.prototype.start = function() {
	  this.running = true;
	  this.updateBadge();
	  var self = this;
	  // Set interval of one second.
	  this.countdown = setInterval(function() {
		self.tick();
	  }, MILLISECONDS_IN_A_SECOND);
	};

	/**
	 * Resets timer.
	 */
	Timer.prototype.reset = function() {
	  if (this.countdown) {
		clearInterval(this.countdown);
	  }
	  if (this.seconds) {
		// If timer being reset using reset button.
		chrome.browserAction.setBadgeText({text: ''});
		chrome.browserAction.setTitle({title: chrome.i18n.getMessage('title')});
		this.cancelNotification();
	  }
	  localStorage.removeItem('start-timer');
	  localStorage.removeItem('seconds');
	  this.running = false;
	};

	/**
	 * Pauses timer.
	 */
	Timer.prototype.pause = function() {
	  if (this.countdown) {
		clearInterval(this.countdown);
	  }
	};

	/**
	 * Shows desktop notification.
	 * @param {string} htmlFilePath HTML notification file path.
	 */
	Timer.prototype.notify = function(htmlFilePath) {
	  // Cancel any existing notification.
	  /*
	  this.cancelNotification();
	  this.notification = webkitNotifications.createHTMLNotification(htmlFilePath);
	  this.notification.show();*/
	  var title = '时间到了';
	  var msg = '^_^';
	  /*this.notification = webkitNotifications.createHTMLNotification(
		  '/notification.html?title='+escape(title)+'&msg='+escape(msg)
		);	
	  this.notification.show();*/
	  BG.common.notice(title,msg,'alert_timeup.html');
	};

	/**
	 * Updates badge text/color and show notification at specified time.
	 */
	Timer.prototype.updateBadge = function() {
	  var sed = this.seconds;

	  // Store local reference to current instance.
	  var self = this;
	  if (sed <= 0) {
		// If session time up.
		this.notify('/views/alert_timeup.html');
		// Cancel notification and reset timer after 10 sec.
		this.notificationTimeout = setTimeout(function() {
		  //self.notification.cancel();
		}, NOTIFICATION_DURATION);
		this.reset();
	  }
	};
	var timer = new Timer();
	return timer;
	
})();


BG.common.sendForm = function(action,url,data) {
	var formData = new FormData();
	formData.append('data', data);

	var xhr = new XMLHttpRequest();
	xhr.open(action, url, true);
	xhr.responseType = 'text';
	xhr.onload = function(e) {
		if (this.status == 200) {
			console.log(this.response);
		}else
		{
			console.log('sendForm onload error');
		}
	};
	xhr.onerror = function() {
		console.log('sendForm onerror');
	};

	xhr.send(formData);
}

BG.event.taobao = (function () 
{
	var is_seller = false;
	var cur_action = 0;
	var output = 1;
	var resp;
	function get_taobao_rate(data)
	{
		cur_action = (cur_action+1)%2 == 0?2:1;
		
		if(toString.apply(data) === '[object Array]')
		{
			var ret = data[0];
			if(cur_action == 1)
			{
				if(ret[ret.length-2] != 'null')
				{
					BG.common.notice(ret[ret.length-2],'');
				}else if(ret[ret.length-3] == 'null')
				{
					BG.common.notice('不存在该买家','');
				}else if(ret[2] == 'null')
				{
					is_seller = ret[ret.length-1] == 'null'?false:true;
				}
			}
			
			if(cur_action == 2 && ret[2] != 'null')
			{
				var credit = ret[0].match(/\d/g).join("");
				var url = "http://rate.taobao.com/rate.htm?user_id="+ret[1];
				var nick = ret[2];
				var url_label = '查看';
				if(output == 2) url_label = url;
				if(is_seller)
				{										
					BG.memory.taobao_rate = '<ul><li>买家昵称：'+nick+'</li><li>买家信用：<font color="blue"><b>'+credit+'</b></font></li><li>详细信息：<font color="blue"><a href="'+url+'" target="_blank">'+url_label+'</a></font></li><li>　　备注：该买家同时也开有店铺</li></ul>';
					if(output == 1)
						BG.common.notice('买家信息(该买家同时也开有店铺)',"",'taobao_rate.html');
					else if(typeof resp != 'undefined')
						resp({result:BG.memory.taobao_rate,append:true});
					
				}else
				{
					var rate = ret[3].match(/\d+\.+\d+%/g).join("");
					var hao = BG.common.str2int(ret[4]) + BG.common.str2int(ret[5]);
					var zhong = BG.common.str2int(ret[6]) + BG.common.str2int(ret[7]);
					var cha = BG.common.str2int(ret[8]) + BG.common.str2int(ret[9]);
					BG.memory.taobao_rate = '<ul><li>买家昵称：'+nick+'</li><li>买家信用：<font color="blue"><b>'+credit+'</b></font>(好评率:'+rate+')<font color="#FF0000"><strong></strong></font></li><li>　　中评：<font color="blue"><b>'+zhong+'</b></font></li><li>　　差评：<font color="blue"><b>'+cha+'</b></font></li><li>详细信息：<font color="blue"><a href="'+url+'" target="_blank">'+url_label+'</a></font></li></ul>';
					if(output == 1)
						BG.common.notice('买家信息',"",'taobao_rate.html');
					else if(typeof resp != 'undefined')
						resp({result:BG.memory.taobao_rate,append:true});
				}
			}else if(cur_action == 2)
			{
				BG.common.notice('获取买家信用超时,请重新查看','');
			}
		}
		console.log(data);
		//BG.common.notice('rate:',data.sse_result);		
	}
	
	function taobao_rate_event(text,send)
	{
		if(!text || text == '') return;
		var url = 'http://member1.taobao.com/member/userProfile.jhtml?asker=wangwang&userID='+urlEncode(text);
		var port = 9080;
		var phantomjs_opt = {"option":{"route":"other.tool","type":"action","result_type":"notice","actions":[{"action":"auto_get_content","row_xpath":"//li[contains(descendant-or-self::*/text(),'买家信用')];//input[@id='monthuserid'];//span[@data-tnick!=''];//em[contains(descendant-or-self::*/text(),'好评率')];//div[@id='J_show_list']/ul/li[3]/table/tbody/tr[2]/td[2];//div[@id='J_show_list']/ul/li[4]/table/tbody/tr[2]/td[2];//div[@id='J_show_list']/ul/li[3]/table/tbody/tr[2]/td[3];//div[@id='J_show_list']/ul/li[4]/table/tbody/tr[2]/td[3];//div[@id='J_show_list']/ul/li[3]/table/tbody/tr[2]/td[4];//div[@id='J_show_list']/ul/li[4]/table/tbody/tr[2]/td[4];//a[contains(descendant-or-self::*/text(),'信用评价')];//div[@class='ErrorMsg'];//a[contains(descendant-or-self::*/text(),'店铺介绍')]","cols":"","attr":"textContent;value;data-tnick;textContent;textContent;textContent;textContent;textContent;textContent;textContent;textContent;textContent;textContent"},{"action":"auto_click","xpath":"//a[contains(descendant-or-self::*/text(),'信用评价')]"}]}};

		if(typeof BG.memory.phantomjs_opt_port == 'undefined') BG.memory.phantomjs_opt_port = [];
		BG.memory.phantomjs_opt_port[port] = {'url':[url],'param':'','opt':phantomjs_opt,'callback':'BG.event.taobao.get_taobao_rate','limit_page':2};
		
		BG.plugin.simple.route(port);
		if(send)
		{
			output=2;
			resp = send;
		}
	}
	return {
		taobao_rate_event:taobao_rate_event,
		get_taobao_rate:get_taobao_rate
	};
})();
BG.common.menu = (function () 
{
	var menuid = {'taobao_rate':0};	
	
	function genericOnClick(info, tab) {
		//console.log("菜单ID为 " + info.menuItemId + "的菜单已被点击");
		//console.log("元素信息: " + JSON.stringify(info));
		//console.log("标签信息: " + JSON.stringify(tab));
		switch(info.menuItemId)
		{
			case menuid.taobao_rate:BG.event.taobao.taobao_rate_event(info.selectionText);break;
		}
	}
	
	function createMenu()
	{
		var parent = chrome.contextMenus.create({"title": "simple tool", "contexts":["all"]});
		//和创建父菜单项一样的方法，只是多了一个"parentId"参数。
		menuid.taobao_rate = chrome.contextMenus.create(
		  {"title": "查看淘宝买家信用", "parentId": parent, "contexts":["all"], "onclick": genericOnClick});
		/*
		//创建一些复选(checkbox)菜单项,需要注意的是"type"所标示的参数为checkbox,如果忽略此参数则创建普通的菜单项
		var checkbox1 = chrome.contextMenus.create(
		  {"title": "Checkbox1", "parentId": parent, "contexts":["all"], "type": "checkbox", "onclick":genericOnClick});*/
	}
	function init()
	{
		chrome.contextMenus.removeAll();
		createMenu();
	}
	return {
		init:init
	};
})();

BG.init();
//C:\Users\root\Desktop\beta\chrome>C:\Users\root\AppData\Local\Google\Chrome\Application\chrome.exe --pack-extension=C:\Users\root\Desktop\beta\chrome\chrome_tools --pack-extension-key=C:\Users\root\Desktop\beta\chrome\chrome_tools.pem

//景点介绍、详细报价、
//{"route":"other.tool","type":"action","result_type":"api","actions":[{"action":"auto_get_content","row_xpath":"//title,//div[@id='lymain_left']/table/tbody/tr[3]/td/table/tbody/tr[2]/td[2]/font[1],//div[@id='lymain_left']/table/tbody/tr[3]/td/table/tbody/tr[3]/td[2]/img,//div[@id='lymain_left']/table/tbody/tr[7]/td/table/tbody/tr[4]/td,//div[@id='lymain_left']/table/tbody/tr[7]/td/table/tbody/tr[5]/td/span,//div[@id='lymain_left']/table/tbody/tr[12]/td[2]/form/table/tbody/tr[2]/td/table,//div[@id='lymain_left']/table/tbody/tr[15]/td[2]/table","cols":",,,,,,","attr":"textContent,textContent,src,textContent,textContent,innerHTML,innerHTML"}]}

//console.log(BG.common.md5("http://www.zhangjiajie.com/line/changshayiriyou_222.html"));


//行程安排
//{"route":"other.tool","type":"action","result_type":"api","actions":[{"action":"auto_get_content","row_xpath":"//div[@id='lymain_left']/table/tbody/tr[9]/td[2]/table","cols":"/tbody/tr[2]/td/table/tbody/tr[1]/td[1]/p/span,/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/span,/tbody/tr[2]/td/table/tbody/tr[2]/td,/tbody/tr[3]/td[2]/p/b,/tbody/tr[4]/td[2]/p/span,/tbody/tr[5]/td[2]/p/b,/tbody/tr[6]/td[2]/p/span,/tbody/tr[7]/td[2]/p/b,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[1]/table/tbody/tr[2]/td,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[3]/table/tbody/tr[2]/td,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[1]/table/tbody/tr[1]/td/a/img,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[3]/table/tbody/tr[1]/td/a/img","attr":"textContent,textContent,textContent,textContent,textContent,textContent,textContent,textContent,textContent,textContent,src,src"}]}
////div[@id='lymain_left']/table/tbody/tr[9]/td[2]/table
///tbody/tr[2]/td/table/tbody/tr[1]/td[1]/p/span,/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/span,/tbody/tr[2]/td/table/tbody/tr[2]/td,/tbody/tr[3]/td[2]/p/b,/tbody/tr[4]/td[2]/p/span,/tbody/tr[5]/td[2]/p/b,/tbody/tr[6]/td[2]/p/span,/tbody/tr[7]/td[2]/p/b,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[1]/table/tbody/tr[2]/td,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[3]/table/tbody/tr[2]/td,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[1]/table/tbody/tr[1]/td/a/img,/tbody/tr[8]/td[2]/div/table/tbody/tr/td[3]/table/tbody/tr[1]/td/a/img
//textContent,textContent,textContent,textContent,textContent,textContent,textContent,textContent,textContent,textContent,src,src


//["http://127.0.0.1/php_tools/slim/data/0a25c0737b9f4c01ad57459821446278.html"]



