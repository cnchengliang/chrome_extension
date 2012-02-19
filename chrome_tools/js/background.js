
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
	if (reqtype == 'get_temp_data') {
		var temp_data = JSON.parse(window.localStorage.getItem('temp_data'));
		sendResponse({result:temp_data});
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
