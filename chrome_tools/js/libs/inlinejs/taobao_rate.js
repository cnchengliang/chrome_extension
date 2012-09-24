function init() {
	var bg = chrome.extension.getBackgroundPage();
	var auto_close = Number(bg.BG.common.getOption('close_tips'));
	document.querySelector('#rs').innerHTML = bg.BG.memory.taobao_rate;
	bg.BG.memory.taobao_rate = "";
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