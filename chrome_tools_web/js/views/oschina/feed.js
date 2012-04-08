define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'libs/function.common'
	], function ($, _, Backbone) {

    var mainView = Backbone.View.extend({
        opts: {
        	port:5500,
        	scroll_tags:[],
        	cur_tag:0,
		    page: 1,
		    jump_flag:true
        },
        initialize: function () {

        },
        setOptions: function (cfg) {
        	this.opts = $.extend({}, this.opts, cfg);
        },
        _getContent: function(page)
        {
        	var row_xpath = "//div[@id='OSC_Content' and @class='CenterDiv']/table/tbody/tr/td[1][@class='left']/div[@class='HomeRecommArea']/div[@class='TABBODY']/div[2][@class='ArticleList']/ul[not(contains(@class, 'pager'))]/li";
        	var cols_name = ["content","cdate","from_url"];
			var cols = ["/table/tbody/tr/td/h3/a","/table/tbody/tr/td[1]/p[1][@class='date']","/table/tbody/tr/td/h3/a"];
			var attr = ["textContent","textContent","href"];
			
			var fn = function(rows) {				
				var userid = '';
				var str = '';
				var rows_object = [];
				for (var i=0, len=rows.length; i < len; i++) {
					rows_object[rows_object.length] = new Object();
					for(var j=0, m=cols_name.length; j<m;j++)
					{
						if(cols_name[j] == 'cdate')
						{
							var regexS = /([\(])+(.*?)+([\)])/g;
							var regex = new RegExp( regexS );
							var results = regex.exec( rows[i][j] );
							if( results != null ) {
								rows[i][j] = unescape(results[0].replace(new RegExp("([\(|\)])", "g"),""));
							}
							var time_stamp1 = Date.parse(rows[i][j].replace(/\./g,"/"));
							var time_stamp2 = Date.parse(_this.opts.cdate.replace(/\./g,"/"));
							if(!isNaN(time_stamp1) && !isNaN(time_stamp2) && time_stamp1 < time_stamp2)
							{
								j = cols_name.length;
								rows_object.pop();
								break;
							}
						}
						rows_object[rows_object.length-1][cols_name[j]] = rows[i][j];
					}				
				}
				if(rows_object.length > 0)
				{				
					if(typeof chrome == "undefined")
					{
						str = JSON.stringify(rows_object);
						console.log(str);
					}else
					{
						chrome.extension.sendRequest({type:'push2Client',
													data:rows_object,
													port:_this.opts.port
	
													},
													 
													function(response) {
														console.log(response.result);
														if(rows.length == rows_object.length)
															location.href = "http://www.oschina.net/news/list?p="+page;
													}
						);
					}
	
				}
			}
			//nodes
			getRows([row_xpath,cols,attr],fn);
        },
        getContent: function()
		{
			_this = this;
			var page = parseInt(getParam("p"));
			if(!isNaN(page))
				page += 1;
			else
				page = 1;
			_this._getContent(page);
		}
    });
    return new mainView;
});
