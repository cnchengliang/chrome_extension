/*if(location.href.indexOf('https://dynamic.12306.cn/otsweb/passCodeAction.do?rand=lrand') != -1)
{
	setTimeout(function()
		{
			location.href='https://dynamic.12306.cn/otsweb/passCodeAction.do?rand=lrand';
		}
	,60000);
}*/
/*
chrome.extension.sendRequest({type:'tabs'}, 
		function(response) {
			var tabs = response.result;
			var tmpid = tabs[tabs.length-1];
			for(var i=0; i < tabs.length - 1; i++)
			{							
				if(tabs[i] == tmpid)
				{
					setTimeout(function()
						{
							location.href='https://dynamic.12306.cn/otsweb/passCodeAction.do?rand=lrand';
						}
					,60000);
					break;
				}									
			}					
			
		}
);
*/