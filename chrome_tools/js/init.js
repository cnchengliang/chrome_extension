//python ../pyphantomjs.py --cookies-file=cookies.txt --load-images=no --ignore-ssl-errors=yes init.js taobao.comment

var url = '',port = 9080,params = {},next_option = {},cur_option = {},send,cur_action = 0;

if (phantom.args.length === 0) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
} else {
	//write2file("data/log.txt",unescape(phantom.args[0])+"\n");
	params = JSON.parse(unescape(phantom.args[0]));
	url = params.url;
	port = params.port?params.port:port;
	next_option = params.option;
}

/*
var options = getOptions("options.js");
eval('var cur_option = options.'+route);
phantom.setPort(cur_option.port);


var proxy = get_vars(cur_option.proxy_file);
var proxy_cur = 0;
phantom.setProxy(proxy[proxy_cur]);
var urls = cur_option.urls;
//urls = get_vars('tmp_urls');
var url_cur = 0;*/
var page = require('webpage').create();
var server = require('webserver').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7';
var loaded = false;

//错误提示
page.onError = function (msg, trace) {
    console.log('error> ' + msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
}

//消息提示console
page.onConsoleMessage = function (msg, line, source) {
	var content = msg;
	if(content.indexOf('phantomjs_finished') != -1)
	{
		console.log('finished');
		//phantom.exit();
		push(JSON.stringify({'sys_result':'finished'}));
	}else if(content.indexOf("zmq_result") != -1)
	{
		content = content.replace("zmq_result","");
		//console.log('content> ' + content);
		phantom.push2Client(content);
	}else if(content.indexOf("file_result") != -1)
	{
		content = content.replace("file_result","");
		write2file("data/temp.txt",content+"\n");
	}else if(content.indexOf("sse_result") != -1)
	{
		push(content);		
	}else
	{
		console.log('console> ' + content);
		//write2file("data/log.txt",content+"\n");
	}
};

//alert
page.onAlert = function (msg) {
     if(msg.indexOf("sse_result") != -1)
	 {
		push(msg);
	 }else if(msg.indexOf('timeout') != -1)
     {
     	//proxy_cur++;
     	//var cur = proxy_cur%proxy.length;
     	//phantom.setProxy(proxy[cur]);
     	//console.log('proxy_cur> ' + proxy[cur]);page.open(urls[url_cur]);
    	push(JSON.stringify({'sys_result':'timeout'}));
     }else if(msg == "action_finished")
     {
    	//do_action(cur_action);
     }else if(msg == "action_error")
     {
    	push(JSON.stringify({'sys_result':'action_error'}));
    	do_log("action_error:" + JSON.stringify(cur_option.action));
     }else if(msg == "quit")
     {/*
     	//第一个站点采集完成后处理
     	if(urls.length == url_cur+1)
     	{
     		console.log('finished');
			phantom.exit();
		}else
		{
			url_cur++;
			console.log("url_cur:"+url_cur);			
			page.open(urls[url_cur]);
		}*/
    	push(JSON.stringify({'sys_result':'finished'}));
     }else
     {
     	console.log(msg);
    	push(JSON.stringify({'sys_result':'alert_other'}));
    	do_log("action_other:" + JSON.stringify(cur_option.action));
     }
 };

var evaluateWithVars = function(page, func, vars)
{
	var fstr = func.toString();
	for(var v in vars)
	{
		switch(typeof(vars[v]))
		{
			case "string":
				var tmp = vars[v].replace(/[']/g, "\\'");
				fstr = fstr.replace("_VARS_"+v, "'"+tmp+"'");
				break;
			default:
				fstr = fstr.replace("_VARS_"+v, vars[v]);
		}
	}
	return page.evaluate(fstr);
}

page.onLoadFinished = function (status) {
    console.log('status :'+status);
	if (status !== 'success') {
        do_log('Unable to access network:'+url);
        phantom.exit();       
    } else if(!loaded){
    	loaded = true;
    	console.log('loading js...');
    	cur_option = next_option;
    	do_action(0,'init');
		page.injectJs('libs/require/myrequire.js');
		page.injectJs('main_built.js');
    }
    /*
    var title = page.evaluate(function () {
        return document.title;
    });
    console.log('Page title is ' + title);*/
};

page.onInitialized = function () {
    loaded = false;
};
/*
page.onResourceRequested = function (request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function (response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
*/

//var port = 9080;
var listening = server.listen(port, function (request, response) {
	// we set the headers here
	response.statusCode = 200;
	if(request.url == '/exit')
	{		
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write(port+':bye~');
	    response.close();
	    //var fs = require("fs");
	    //fs.remove("data/cookies_"+port+".txt");
		phantom.exit();
	}else if(request.url == '/test')
	{		
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write(port+':test');
	    response.close();
	}else if(request.url == '/write2file' && request.method == 'POST')
	{
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write(port+':write2file');
	    response.close();
		content = JSON.parse(request.post);
	    write2file(content.filename,content.data+"\n");	    
		
	}else if(request.url == '/route' && request.method == 'POST')
	{
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write(port+':route');
	    response.close();

		
	    try{
			//write2file("data/log.txt",unescape(request.post)+"\n");
			data = JSON.parse(unescape(request.post));
			cur_option = {};
			if(data.url)
			{
				url = data.url;
				evaluateWithVars(
					page,
					function() { document.location.href = _VARS_url; },
					{ "url": url }
				);
				next_option = data.option;
			}else
			{
				cur_option = data.option?data.option:cur_option;
				do_action(0);
			}
		}catch (e){
			//console.log('error');				
			do_log(request.post);
		}
	}else if(request.url == '/reset')
	{
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write(port+':reset');
	    response.close();
	    next_option = {};
	    cur_option = {};
	}else if(request.url == '/result')
	{
		response.headers = {"Cache": "no-cache", "Content-Type": "text/event-stream;"};
		send = response;
		//response.close();
	}else
	{
		response.statusCode = 404;
		response.headers = {"Status": "404 Not Found", "Content-Type": "text/html"};
		response.write(port+':404 Not Found');
		response.close();
	}
});
if (!listening) {
    console.log("could not create web server listening on port " + port);
    phantom.exit();
}

page.open(url);


function getOptions(filename)
{
	var result = {};
	var fs = require("fs");
	try {
		f = fs.open(filename, "r");
		content = f.read();
		result = JSON.parse(content);
		f.close();
	} catch (e) {
		console.log(e);
	}
	return result;
}

function get_vars(filename)
{
	var result = [];
	var fs = require("fs");
	try {
		f = fs.open(filename, "r");
		content = f.read();
		//console.log(content);
		content = content.split("\n");
		//result = content.splice(0,1);
		
		for(var i=0,n=content.length;i<n;i++)
			if(content[i] != '')
				result[result.length] = content[i];
		f.close();
		/*
		f = fs.open('urls.txt', "w");
		f.write(content.join("\n"));
		f.close();*/
	} catch (e) {
		console.log(e);
	}
	return result;
}

function write2file(filename,content)
{
	var fs = require("fs");
	try {
		f = fs.open(filename, "a+");
		f.write(content);
		f.close();
		console.log('write2file:'+filename);
	} catch (e) {
		console.log(e);
	}
}

function fillZero(v)
{
	if(v<10){v='0'+v;}
	return v;
}

function push(content,timeout,fn)
{
	if(send)
	{
		var myDate = new Date();
		try {
			var id = myDate.getTime();
			if(content.indexOf("sys_result") != -1)
			{
				send.write("id:"+id+"\ndata:"+escape(content.replace(/\"/g, "\""))+"\n\n");
			}
			else if(cur_option.result_type != 'file')
			{
				send.write("id:"+id+"\ndata:"+escape(content.replace(/\"/g, "\""))+"\n\n");
			}else
			{
				send.write("id:"+id+"\ndata:ok\n\n");
				var filename = [myDate.getFullYear(), fillZero(myDate.getMonth() + 1)].join('-');
				
				var tmp = url+',',data = JSON.parse(content).sse_result;
				for(var i=0,n=data.length;i<n;i++)
				{
					for(var j=0,m=data[i].length;j<m;j++)
					{
						tmp += data[i][j] + ',';
					}
					tmp += '\n';
				}
				if(data.length == 0) tmp += '\n';
				write2file("data/"+filename+"_"+port+".txt",tmp);
				//do_log(JSON.stringify(cur_option));
			}
			//console.log('ok');
			//send.close();
		}catch (e){
			//console.log('error');				
			do_log(content);
		}
		do_action(cur_action);
		if(fn) fn();
	}else
	{
		do_log('send object:'+send);
		if(!timeout)
		{
			timeout = 1;
		}else if(timeout > 3)
		{
			return;
		}
		timeout++;
		setTimeout(function(){push(content,timeout);},1000);
	}
}

function do_action(cur,type)
{	
	//执行系列操作
	if(cur_option.type == 'action' && toString.apply(cur_option.actions) === '[object Array]' && cur_option.actions.length > 0)
	{
		cur_action = cur;
		if(cur_action == cur_option.actions.length) return;
		cur_option.action = cur_option.actions[cur_action];
		cur_action++;
	}else
	{
		cur_option = {'route':''};
	}

	var func = function() { document.phantomjs_option = JSON.parse(_VARS_option);document.location.hash = '#' + (new Date()).getTime() + Math.floor(Math.random()*10+1); };
	if(type == 'init')
	{
		func = function() { document.phantomjs_option = JSON.parse(_VARS_option); };
	}

	evaluateWithVars(
		page,
		func,
		{ "option": JSON.stringify(cur_option) }
	);
	
}

function do_log(content)
{
	var myDate = new Date();
	var timeStr = myDate.getFullYear() + '-' + fillZero(myDate.getMonth() + 1) + '-' + fillZero(myDate.getDate()) + ' ' + fillZero(myDate.getHours()) + ':' + fillZero(myDate.getMinutes()) + ':' + fillZero(myDate.getSeconds());
	var filename = [myDate.getFullYear(), fillZero(myDate.getMonth() + 1)].join('-');
	write2file("log/"+filename+"_"+port+".txt",timeStr + '    ' + content+"\n");
}
/*
"{\"url\":\"http://www.baidu.com\",\"option\":{\"route\":\"other.tool\",\"type\":\"action\",\"result_type\":\"file\",\"actions\":[{\"action\":\"auto_get_content\",\"row_xpath\":\"//title\",\"cols\":\"\",\"attr\":\"textContent\"}]}}"

document.write('<script src="http://code.jquery.com/jquery-1.8.0.min.js"></script>');
var data = {'option':{'route':'other.tool','row_xpath':"//p[@id='lk']/a[3]",'cols':'','attr':'textContent'}};
{"route":"other.tool","type":"action","result_type":"file","actions":[{"action":"auto_get_content","row_xpath":"//div[@class='th_footer_l']","cols":"","attr":"textContent"}]}
data = JSON.stringify(data);
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:9080/route",
  data: data
}).done(function( msg ) {
  console.log( "Data Saved: " + msg );
});
*/
