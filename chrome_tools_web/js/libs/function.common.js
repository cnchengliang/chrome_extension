function test()
{
	console.log("function.common.js");
}

function waitFor(testFx, test_args, onReady, ready_args, timeOutMillis, timeCheckMillis, timeOutFx) {
	var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 10000, //< Default Max Timout is 10s
		timeCheckMillis = timeCheckMillis ? timeCheckMillis : 100, //< Default check is 100ms
		start = new Date().getTime(),
		condition = false;
		var interval = null;
		interval = setInterval(
			function() {
				if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
					// If not time-out yet and condition not yet fulfilled
					condition = (typeof(testFx) === "string" ? eval(testFx) : testFx(test_args) != 'null'); //< defensive code
					
				} else {
					if(condition) {
						// Condition fulfilled (timeout and/or condition is 'true')
						typeof(onReady) === "string" ? eval(onReady) : onReady(ready_args); //< Do what it's supposed to do once the condition is fulfilled
						
					}else
					{
						if(typeof(timeOutFx) != 'undefined')
							timeOutFx();
						console.log('waitfor_timeout');
					}					
					clearInterval(interval); //< Stop this interval
					interval = null;					
				}
			}
		, timeCheckMillis); //< repeat check every 100ms
};

function getNodeDetail(args)
{
	var row_xpath = args[0],row_num = args[1],col_xpath = args[2],attr = args[3];
	var tmp = 'null';
	var evaluator = new XPathEvaluator();
	var result = evaluator.evaluate(row_xpath+row_num+col_xpath, document.documentElement, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(result && result.singleNodeValue)
	{
		if(attr === '')
		{
			tmp = result.singleNodeValue;
		}else
		{
			tmp = result.singleNodeValue[attr];
		}
	}
	return tmp;
}

function getNodeAttr(args)
{
	var row_xpath = args[0],row_num = args[1],col_xpath = args[2],attr = args[3];
	var tmp = 'null';
	var evaluator = new XPathEvaluator();
	var result = evaluator.evaluate(row_xpath+row_num+col_xpath, document.documentElement, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(result && result.singleNodeValue)
	{
		if(attr === '')
		{
			tmp = result.singleNodeValue;
		}else
		{
			for(var i=0,len=result.singleNodeValue.attributes.length;i<len;i++)
			{
				if(result.singleNodeValue.attributes[i]['nodeName'] == attr)
				{
					tmp = result.singleNodeValue.attributes[i]['nodeValue'];
					break;
				}
			}
		}
	}
	return tmp;
}

function getRows(args)
{
	var row_xpath = args[0],cols = args[1],attr = args[2];
	var arrStr = [];
	//nodes
	var result = document.evaluate(row_xpath, document.documentElement, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		
	if (result){		
		for (var i=1, len=result.snapshotLength; i <= len; i++) {
			var colStr = [];
			for(var j=0, n=cols.length;j<n;j++)
			{
				var args = [row_xpath,"["+i+"]",strTrim(cols[j],"g"),strTrim(attr[j],"g")];
				var tmp = getNodeDetail(args);
				if(typeof tmp == 'undefined' || tmp == 'null')
					colStr[colStr.length] = getNodeAttr(args);
				else
					colStr[colStr.length] = tmp;
				colStr[colStr.length-1] = colStr[colStr.length-1].replace(/[\r\t\n]/g, "");
			}						
			arrStr[arrStr.length] = colStr;
			colStr = null;
		}
	}
	return arrStr;
}

//?param=test
function getParam( name ) {
	var res = "";
    //name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results != null ) {
        res = unescape(results[1]);
    }
	return res;
}
//param/test
function getParam2( name ) {
	var res = "";
    var regexS = "[\/]"+name+"\/([^\/#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results != null ) {
        res = unescape(results[1]);
    }
	return res;
}


function strTrim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") result = result.replace(/\s/g, "");
    return result;
}

function injectJavaScriptResource(scriptResource) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.charset = "utf-8";
	script.innerHTML = scriptResource;
	(document.body || document.head || document.documentElement).appendChild(script);
}
