//python ../pyphantomjs.py --cookies-file=cookies.txt --load-images=no --ignore-ssl-errors=yes init.js taobao.comment

var url = '',params = {},cur_option = {},send;

if (phantom.args.length === 0) {
    console.log('Try to pass some args when invoking this script!');
    phantom.exit();
} else {
	params = JSON.parse(phantom.args[0]);
	url = params.url;
	cur_option = params.option;
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
	}
};

//alert
page.onAlert = function (msg) {
     if(msg.indexOf('timeout') != -1)
     {
     	//proxy_cur++;
     	//var cur = proxy_cur%proxy.length;
     	//phantom.setProxy(proxy[cur]);
     	//console.log('proxy_cur> ' + proxy[cur]);page.open(urls[url_cur]);
    	push(JSON.stringify({'sys_result':'timeout'}));
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
	return page.evaluate(fstr)
}

page.onLoadFinished = function (status) {
    console.log('status :'+status);
	if (status !== 'success') {
        //console.log('Unable to access network');
        //phantom.exit();
    } else if(!loaded){
    	loaded = true;
    	console.log('loading js...');
		evaluateWithVars(
			page,
			function() { document.phantomjs_option = JSON.parse(_VARS_option); },
			{ "option": JSON.stringify(cur_option) }
		);
		page.injectJs('libs/require/myrequire.js');
		page.injectJs('main_built.js');
    }
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

var port = 9080;
var listening = server.listen(port, function (request, response) {
	// we set the headers here
	response.statusCode = 200;
	if(request.url == '/exit')
	{		
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write('bye~');
	    response.close();
	    var fs = require("fs");
	    fs.remove("data/cookies.txt");
		phantom.exit();
	}else if(request.url == '/test')
	{		
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write('test');
	    response.close();
	}else if(request.url == '/cookies' && request.method == 'POST')
	{
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write('cookies');
	    response.close();
	    write2file("data/cookies.txt",request.post+"\n");	    
		
	}else if(request.url == '/route' && request.method == 'POST')
	{
		response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
		response.write('route');
	    response.close();
	    
	    
		data = JSON.parse(request.post);
		cur_option = data.option?data.option:cur_option;
		if(data.url)
		{			
			page.open(data.url);
		}else
		{
			evaluateWithVars(
				page,
				function() { document.phantomjs_option = JSON.parse(_VARS_option);document.location.hash = '#' + (new Date()).getTime(); },
				{ "option": JSON.stringify(cur_option) }
			);
		}		
	}else if(request.url == '/result')
	{
		response.headers = {"Cache": "no-cache", "Content-Type": "text/event-stream;"};
		send = response;
		//response.close();
	}else
	{
		response.statusCode = 404;
		response.headers = {"Status": "404 Not Found", "Content-Type": "text/html"};
		response.write('404 Not Found');
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
	} catch (e) {
		console.log(e);
	}
}

function fillZero(v)
{
	if(v<10){v='0'+v;}
	return v;
}

function push(content,timeout)
{
	if(send)
	{
		var myDate = new Date();
		try {
			var id = myDate.getTime();
			send.write("id:"+id+"\ndata:"+escape(content.replace(/\"/g, "\""))+"\n\n");
			//console.log('ok');
			//send.close();
		}catch (e){
			//console.log('error');				
			var timeStr = myDate.getFullYear() + '-' + fillZero(myDate.getMonth() + 1) + '-' + fillZero(myDate.getDate()) + ' ' + fillZero(myDate.getHours()) + ':' + fillZero(myDate.getMinutes()) + ':' + fillZero(myDate.getSeconds());
			var filename = [myDate.getFullYear(), fillZero(myDate.getMonth() + 1)].join('-');
			write2file("log/"+filename+".txt",timeStr + '    ' + content+"\n");
		}
	}else
	{
		if(!timeout)
		{
			setTimeout(function(){push(content,true);},3000); 
		}
	}
}
/*
"{\"url\":\"http://www.baidu.com\",\"option\":{\"route\":\"other.tool\",\"row_xpath\":\"//title\",\"cols\":\"\",\"attr\":\"textContent\"}}"

document.write('<script src="http://code.jquery.com/jquery-1.8.0.min.js"></script>');
var data = {'option':{'route':'other.tool','row_xpath':"//p[@id='lk']/a[3]",'cols':'','attr':'textContent'}};
data = JSON.stringify(data);
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:9080/route",
  data: data
}).done(function( msg ) {
  console.log( "Data Saved: " + msg );
});
*/
