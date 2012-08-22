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






//工具栏图标被点中时
BG.event.chrome.browserAction.onClicked = function()
{
	chrome.browserAction.onClicked.addListener(function (tab) {
		var ret = BG.common.getOption('continue_enable');
		if(ret == true)
		{
			BG.common.setOption("continue_enable",false);
		}else
		{
			BG.common.setOption("continue_enable",true);
			chrome.tabs.executeScript(tab.id, {code: 'browserActionClicked()'});
		}	
	})
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
			//var phantomjs_opt = {'url':'http://baidu.com','option':{'route':'other.tool','row_xpath':"//title",'cols':'','attr':'textContent'}};
			var phantomjs_opt = request.opt;
			var url = phantomjs_opt.url;
			delete phantomjs_opt.url;			
			//var ret = BG.plugin.simple.phantom("plugin/bin/phantomjs" , " js/init.js " + opt_str);
			//console.log(ret);
			BG.memory.phantomjs_opt = {'url':url,'param':phantomjs_param,'opt':phantomjs_opt};
			BG.plugin.simple.route();
			
			sendResponse({result:true});
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
			if(!BG.memory.phantomjs_opt) BG.memory.phantomjs_opt = {'url':[],'param':'','opt':{'option':{'route':'other.tool','row_xpath':'','cols':'','attr':''}}}

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
				BG.memory.phantomjs_opt.opt.option.row_xpath += BG.memory.phantomjs_opt.opt.option.row_xpath == ''?request.opt.row_xpath:","+request.opt.row_xpath;
				BG.memory.phantomjs_opt.opt.option.cols += BG.memory.phantomjs_opt.opt.option.cols == ''?request.opt.cols:","+request.opt.cols;
				BG.memory.phantomjs_opt.opt.option.attr += BG.memory.phantomjs_opt.opt.option.attr == ''?request.opt.attr:","+request.opt.attr;
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
			if(BG.memory.phantomjs_opt)	BG.plugin.simple.cookies(request.data);
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




BG.plugin.simple = (function () 
{
	var obj = null;
	
    var plugin = document.getElementById('simple_pluginId');
	//obj = plugin.CreateObject("simple");
	if(plugin) console.log('initialising simple plugin');

	plugin.route = function() {
		if(typeof BG.memory.phantomjs_opt == 'undefined') return;
		var phantomjs_param = BG.memory.phantomjs_opt.param;
		var opt = BG.memory.phantomjs_opt.opt;
		if(BG.memory.phantomjs_opt.url.length > 0)
		{
			opt.url = BG.memory.phantomjs_opt.url.shift();
		}else
		{
			return;
		}
		var opt_str = JSON.stringify(opt);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://127.0.0.1:9080/route', true);
		xhr.responseType = 'text';
		xhr.onload = function(e) {
			if (this.status == 200) {
				console.log(this.response);
			}else
			{
				console.log('phantom onload error');
			}
		};
		xhr.onerror = function() {
			opt_str = opt_str.replace(/\"/g, '\\"');
			opt_str = opt_str.replace(/\'/g, "\\'");
			//--proxy-type=socks5 --proxy=127.0.0.1:1080
			var ret = BG.plugin.simple.phantom("plugin/bin/phantomjs","  --load-images=no --cookies-file=data/cookies.txt "+phantomjs_param+" js/init.js " + opt_str);
			//考虑手动关闭函数
			if(BG.sse.phantom.isListening() == false)
				BG.sse.phantom.CreateEventSource(9080);
		};
		xhr.send(opt_str);
	}

	plugin.cookies = function(data) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://127.0.0.1:9080/cookies', true);
		xhr.responseType = 'text';
		xhr.onload = function(e) {
			if (this.status == 200) {
				console.log(this.response);
			}else
			{
				console.log('phantom cookies onload');
			}
		};
		xhr.onerror = function() {
			console.log('phantom cookies onerror');
		};
		xhr.send(data);
	}

	plugin.init = function()
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://127.0.0.1:9080/exit', true);
		xhr.send();
	}

	return plugin;
})();



BG.sse.phantom = (function () 
{
	var arr_source = [];
	function CreateEventSource(port)
	{
		// sse.php sends messages with text/event-stream mimetype.
		arr_source[port] = new EventSource('http://127.0.0.1:'+port+'/result');		
		arr_source[port].addEventListener('message', function(event) {
		  var data = JSON.parse(unescape(event.data));

		  var d = new Date();
		  var timeStr = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

		  console.log('lastEventID: ' + event.lastEventId +
				     ', server time: ' + timeStr, 'msg:'+data.sse_result);
		  BG.common.notice('time:'+timeStr,data.sse_result);
		  BG.plugin.simple.route();
		}, false);

		arr_source[port].addEventListener('open', function(event) {
		  console.log('> Connection was opened');
		}, false);

		arr_source[port].addEventListener('error', function(event) {
		  if (event.eventPhase == 2) { //EventSource.CLOSED
			console.log('> Connection was closed');
		  }
		}, false);
	}
	function CloseEventSource(port)
	{
		var src = arr_source[port];
		if(src)
		{			
			arr_source.remove(port);
			src.close();
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
		isListening:isListening
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




BG.init();
//C:\Users\root\Desktop\beta\chrome>C:\Users\root\AppData\Local\Google\Chrome\Application\chrome.exe --pack-extension=C:\Users\root\Desktop\beta\chrome\chrome_tools --pack-extension-key=C:\Users\root\Desktop\beta\chrome\chrome_tools.pem

