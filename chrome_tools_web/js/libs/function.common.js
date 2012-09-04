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

function getRows(args,fn)
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
				if(strTrim(cols[j],"g") != '')
				{
					var args = [row_xpath,"["+i+"]",strTrim(cols[j],"g"),strTrim(attr[j],"g")];
					var tmp = getNodeDetail(args);
					if(typeof tmp == 'undefined' || tmp == 'null')
						colStr[colStr.length] = getNodeAttr(args);
					else
						colStr[colStr.length] = tmp;
				}else
				{
					var tmp_attr = strTrim(attr[j],"g");
					var tmp = result.snapshotItem(i-1)[tmp_attr];
					if(typeof tmp == 'undefined')
						colStr[colStr.length] = 'null';
					else
						colStr[colStr.length] = tmp;
				}
				colStr[colStr.length-1] = colStr[colStr.length-1].replace(/[\r\t\n]/g, "");
			}						
			arrStr[arrStr.length] = colStr;
			colStr = null;
		}
	}
	if(typeof(fn) != 'undefined')
		fn(arrStr);
}

function getRows_2(args,fn)
{
	var rows = args[0],cols = args[1],attr = args[2];
	var arrStr = [];
	var colStr = [];
	//nodes
	for (var i=0, len=rows.length; i < len; i++) {
		var args = [strTrim(rows[i],"g"),"[1]",strTrim(cols[i],"g"),strTrim(attr[i],"g")];
		var tmp = getNodeDetail(args);
		if(typeof tmp == 'undefined' || tmp == 'null')
			colStr[colStr.length] = getNodeAttr(args);
		else
			colStr[colStr.length] = tmp;
		colStr[colStr.length-1] = colStr[colStr.length-1].replace(/[\r\t\n]/g, "");					

	}
	arrStr[arrStr.length] = colStr;
	if(typeof(fn) != 'undefined')
		fn(arrStr);
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


function exportFile(filename,content)
{
	var BlobBuilder = BlobBuilder || WebKitBlobBuilder || MozBlobBuilder;
	var URL = URL || webkitURL || window;
	 
	function saveAs(blob, filename) {
	    var type = blob.type;
	    var force_saveable_type = 'application/octet-stream';
	    if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
	        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
	        blob = slice.call(blob, 0, blob.size, force_saveable_type);
	    }
	 
	    var url = URL.createObjectURL(blob);
	    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	    save_link.href = url;
	    save_link.download = filename;
	 
	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    save_link.dispatchEvent(event);
	    URL.revokeObjectURL(url);
	}
	 
	var bb = new BlobBuilder;
	bb.append(content);
	saveAs(bb.getBlob('text/plain;charset=utf-8'), filename);
}

function addNodes(array, collection) {
	for (var i = 0; collection && collection.length && i < collection.length; i++) {
		array.push(collection[i]);
	}
}
