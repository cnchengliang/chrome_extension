function getParam( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
	    return "";
	} else {
	    return unescape(results[1]);
	}
}

function init() {
	var bg = chrome.extension.getBackgroundPage();
	var auto_close = Number(bg.BG.common.getOption('close_tips'));
	var title = getParam('title');
	var msg = getParam('msg');

	document.querySelector('.message-timeup b').innerText = title + '  ' + msg;
	if(auto_close != 0)
	{
		closeWindow(auto_close);
	}
}

function closeWindow(seconds) {
	window.setTimeout(function() {
		window.close();
	}, seconds*1000);
}
init();