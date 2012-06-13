
//工具栏图标被点中时
chrome.browserAction.onClicked.addListener(function (tab) {

	var ret = getOption('continue_enable');
	if(ret == true)
	{
		setOption("continue_enable",false);
	}else
	{
		setOption("continue_enable",true);
		chrome.tabs.executeScript(tab.id, {code: 'browserActionClicked()'});
	}	
});
function getOption(key) {
	var ret;
	try {
		var options = JSON.parse(window.localStorage.getItem('options')) || {};
		if(key != 'keys')
		{			
			ret = options[key];
		}else
		{
			ret = options;
		}
	} catch (e) {
		ret = null;
	}
	return ret;
}

function setOption(key,val)
{
	var options = JSON.parse(window.localStorage.getItem('options')) || {};
	options[key] = val;
    window.localStorage.setItem('options', JSON.stringify(options));
}

//html5数据库：添加、更新、查询、删除
//数据库地址：win7下是C:\Users\root\AppData\Local\simple-web\+(网址如http_content.businessvalue.com.cn_0)
//可以用SQLiteSpy打开查看
var html5db = (function () 
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
	return {
		openDb:openDb,
		exec:exec,
		getAll:getAll
	};
})();
html5db.openDb('sDownload','sDownload',500*1024*1024);

function notice(title,msg)
{
	/*
	var notification = webkitNotifications.createNotification(
      'res/icon48.png',  // The image.
      title, 			// The title.
      msg      			// The body.
    );
    */
    var notification = webkitNotifications.createHTMLNotification(
      'notification.html?title='+escape(title)+'&msg='+escape(msg)
    );	
    notification.show();
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	var reqtype = request.type;	

	if (reqtype == 'setoption') {
		setOption(request.key,request.value);
		sendResponse({});
		return;
	}

	if(reqtype == 'test')
	{
		var content = {};
		content.title = "标题123";
		content.con = "测试 test ...";
		var test = plugin.test(JSON.stringify(content));
		sendResponse({result:test});
		return;
	}

	if(reqtype == 'push2Client')
	{
		var ret = plugin.push2Client(JSON.stringify(request.data),JSON.stringify(request.port));
		sendResponse({result:ret});
		return;
	}

	if (reqtype == 'notice') {
		notice(request.title,request.msg);
		sendResponse({});
		return;
	}
	if (reqtype == 'option') {
		if(request.key == 'keys')
		{
			var options = getOption(request.key);
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
			sendResponse({result:getOption(request.key)});
		}
		return;
	}
	
	if(reqtype == 'tabs')
	{
		var opt = getOption('tabs');
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
	
	var sql = request.sql;
	if(!sql || sql == '') return;
	if (reqtype == 'exec') {
		html5db.exec(sql,
			function (tx, results) {
				sendResponse({result:true});
		});		
	}
	if (reqtype == 'read') {
		html5db.exec(sql,
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
setOption('hook_request','0');
function interceptRequest(request) {
	var headers = request.requestHeaders,blockingResponse = {};
	if(getOption('hook_request') == '1')
	{
		for (var j = 0, l = headers.length; j < l; j++) {        
			if (headers[j].name == "Referer") {
		        headers[j].value = getOption('hook_referer');
		    }
			if (getOption('hook_request_type') == 1 && headers[j].name == "X-Requested-With") {
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
chrome.experimental.webRequest.onBeforeSendHeaders.addListener(interceptRequest, { }, ['requestHeaders','blocking']);

var plugin = document.getElementById('pluginId');

var obj = plugin.CreateObject("test");
/*console.log(obj);

var ret = plugin.push2Client("test","5501");
console.log(ret);*/












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
    this.notification.cancel();
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
  var title = 'test';
  var msg = 'time up';
  this.notification = webkitNotifications.createHTMLNotification(
      'notification.html?title='+escape(title)+'&msg='+escape(msg)
    );	
    this.notification.show();
};

/**
 * Updates badge text/color and show notification at specified time.
 */
Timer.prototype.updateBadge = function() {
  var sed = this.seconds;

  // Store local reference to current instance.
  var self = this;
  if (sed == 0) {
    // If session time up.
    this.notify('../views/alert_timeup.html');
    // Cancel notification and reset timer after 10 sec.
    this.notificationTimeout = setTimeout(function() {
      self.notification.cancel();
    }, NOTIFICATION_DURATION);
    this.reset();
  }
};

var timer = new Timer();
timer.setTime(10);
timer.restoreLastSession();

