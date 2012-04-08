define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'text!templates/home/main.html',
	'libs/function.common'
	], function ($, _, Backbone, mainHomeTemplate) {

    var mainHomeView = Backbone.View.extend({
        opts: {
        	port:5500,
        	scroll_tags:[],
        	cur_tag:0,
		    page: 1,
		    jump_flag:true,
		    fn:function(){}
        },
        initialize: function () {

        },
        setOptions: function (cfg) {
        	this.opts = $.extend({}, this.opts, cfg);
        },
        getMyContent: function()
        {
        	_this = this;
        	chrome.extension.sendRequest({
					type:'get_temp_flag'
				},
				function(response) {
					if(parseInt(response.result) != 1)
						_this._getRelation();
					else
					{
						_this.fn = function(){
							chrome.extension.sendRequest({
									type:'pop_temp_data'
								},
								function(response) {
									if(response.result != '')
										location.href = 'http://weibo.com/'+response.result;
									else
										console.log("finished");
							});
						}
						_this.getContent();
					}
			});
        	//this._getRelation();
        	//this.getContent();
        	
        },
        _getRelation: function()
        {
        	_this = this;
        	var page = parseInt(getParam("page"));
			if(!isNaN(page))
				page += 1;
			else
				page = 2;
        	var row_xpath = "//ul[@class='cnfList']/li";
        	var cols_name = ["userid"];
			var cols = ["/div[2]/div[2]/p[1]/a"];
			var attr = ["usercard"];
			//nodes		
			
			var fn = function(rows) {
				var rows_object = [];
	
				for (var i=0, len=rows.length; i < len; i++) {
					for(var j=0, m=cols_name.length; j<m;j++)
					{
						if(cols_name[j] == 'userid')
						{
							var tmp = rows[i][j].replace("id=","");
							rows[i][j] = parseInt(tmp);
						}
						rows_object[rows_object.length] = rows[i][j];
					}
				}
				if(rows_object.length > 0)
				{				
					if(typeof chrome == "undefined")
					{
						str = JSON.stringify(rows);
						console.log(str);
					}else
					{
						chrome.extension.sendRequest({
								type:'append_temp_data',
								temp_data:rows_object
								},
								function(response) {
									console.log(response.result);
									//userid = getParam2("weibo.com");
									//location.href = "http://weibo.com/"+userid+"/follow?t=1&page="+page;
									_this._relation_jump_page();
						});
					}
					
				}else
				{
					chrome.extension.sendRequest({
							type:'set_temp_flag',
							temp_flag:'1'
						},
						function(response) {
							_this.getMyContent();
					});				
				}
			}
			getRows([row_xpath,cols,attr],fn);
        },
        _relation_jump_page: function()
        {
        	_this = this;
        	var el = getNodeDetail(["//div[@id='pl_relation_follow']/div[@class='W_pages W_pages_comment']/a[position()>1][contains(@class,'W_btn_a')]",'','','']);
			if(el != 'null')
			{
				var ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', // type
								  false, // canBubble
								  false, // cancelable
								  window, // view
								  1, // detail (number of clicks)
								  0, // screenX
								  0, // screenY
								  0, // clientX
								  0, // clientY
								  false, // ctrlKey
								  false, // altKey
								  false, // shiftKey
								  false, // metaKey
								  0, // button
								  null); // relatedTarget
				el.dispatchEvent(ev);
			}else
			{
				chrome.extension.sendRequest({
						type:'set_temp_flag',
						temp_flag:'1'
					},
					function(response) {
						_this.getMyContent();
				});	
			}
        },
        _getPersonContent: function(page)
        {
        	var row_xpath = "//div[@id='pl_content_hisFeed']/div[@class='feed_lists']/dl";
        	var cols_name = ["postid","ori_content","content","cdate","from_url","from_custom","retwitter_num","comment_num","userid","username"];
			var cols = ["","/dd[1][@class='content']/dl[1]/dt/em","/dd[@class='content']/p[1]","/dd[@class='content']/p[2]/a[@class='date']","/dd[@class='content']/p[2]/a[@class='date']","/dd[@class='content']/p[2]/a[2]","/dd[@class='content']/p[2]/span/a[1]","/dd[@class='content']/p[2]/span/a[3]","/dd[@class='content']/p[2]/a[@class='date']","/dd[@class='content']/p[2]/span/a[1]"];
			var attr = ["mid","textContent","textContent","title","href","textContent","textContent","textContent","href","action-data"];
			
			var fn = function(rows) {
				var userid = '';
				var str = '';
				var rows_object = [];
				for (var i=0, len=rows.length; i < len; i++) {
					rows_object[rows_object.length] = new Object();
					for(var j=0, m=cols_name.length; j<m;j++)
					{
						if(cols_name[j] == 'userid')
						{
							var tmp = rows[i][j].replace("http://weibo.com/","");
							rows[i][j] = parseInt(tmp);
							userid = rows[i][j];
						}else if(cols_name[j] == 'username')
						{
							var regexS = "[\\&]name=([^&#]*)";
							var regex = new RegExp( regexS );
							var results = regex.exec( rows[i][j] );
							if( results != null ) {
								rows[i][j] = unescape(results[1]);
							}
						}else if(cols_name[j] == 'cdate')
						{
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
					if(typeof chrome.extension == "undefined")
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
														if(rows.length != rows_object.length)
															_this.fn();
														else
															location.href = "http://weibo.com/"+userid+"?is_search=0&visible=0&is_tag=0&page="+page;
													}
						);
					}
					
				}else
				{
					_this.fn();
				}
			}
			//nodes
			getRows([row_xpath,cols,attr],fn);
//postid,parentid,ori_content,content,userid,username,cdate,from_url,from_custom,retwitter_num,comment_num,state

        },
        is_person_bottom_page: function(args)
        {
        	var row_xpath = "//div[@id='pl_content_hisFeed']/div[2]/div[@class='W_loading']";
			var el = getNodeDetail([row_xpath,'','','']);
			window.scrollTo(0,el.offsetTop);
			var ret = 'null';
			ret = getNodeDetail(args);
			return ret;
        },
        _getCompanyContent: function()
        {
        	var row_xpath = "//ul[@id='feed_list']/li";
			var cols_name = ["postid","ori_content","content","cdate","from_url","from_custom","retwitter_num","comment_num","userid","username"];
			var cols = ["/div[@class='MIB_feed_c']/p[@class='sms']","/div[@class='MIB_feed_c']/div/div[3]/p[@class='source']","/div[@class='MIB_feed_c']/p[@class='sms']","/div[@class='MIB_feed_c']/div/div[1]/cite/a/strong","/div[@class='MIB_feed_c']/div/div[1]/cite[1]/a","/div[@class='MIB_feed_c']/div/div[1]/cite[2]/a","/div[@class='MIB_feed_c']/div/div[2]/a[1]/strong[2]","/div[@class='MIB_feed_c']/div/div[2]/a[3]/strong[2]","/div[@class='MIB_feed_c']/div[contains(@class,'feed_att')]/div[2]/a","/div[@class='MIB_feed_c']/div[contains(@class,'feed_att')]/div[2]/a"];
			var attr = ["mid","textContent","textContent","date","href","textContent","textContent","textContent","lastforwarder","lastforwardername"];
			
			var fn = function(rows) {
				var userid = '';
				var str = '';
				var rows_object = [];
				for (var i=0, len=rows.length; i < len; i++) {
					rows_object[rows_object.length] = {};
					for(var j=0, m=cols_name.length; j<m;j++)
					{
						if(cols_name[j] == 'cdate')
						{
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
					if(typeof chrome.extension == "undefined")
					{
						str = JSON.stringify(rows);
						console.log(str);
					}else
					{
						//console.log(JSON.stringify(rows));
						chrome.extension.sendRequest(
						{
							type:'push2Client',
							data:rows_object,
							port:_this.opts.port
							},
							 
							function(response) {
								
								var el = getNodeDetail(["//div[@id='epfeedlist']/div[@class='MIB_bobar']/div/a[position()>1][contains(@class,'btn_numWidth')]",'','','']);
								if(el != 'null')
								{
									var ev = document.createEvent('MouseEvents');
									ev.initMouseEvent('click', // type
													  false, // canBubble
													  false, // cancelable
													  window, // view
													  1, // detail (number of clicks)
													  0, // screenX
													  0, // screenY
													  0, // clientX
													  0, // clientY
													  false, // ctrlKey
													  false, // altKey
													  false, // shiftKey
													  false, // metaKey
													  0, // button
													  null); // relatedTarget
									$('#feed_list').html('');
									el.dispatchEvent(ev);
									if(rows.length != rows_object.length)
										_this.fn();
									else
										_this.getContent();
								}							
							}
						);
					}
				}else
				{
					_this.fn();
				}
			}
			//nodes
			getRows([row_xpath,cols,attr],fn);
//postid,parentid,ori_content,content,userid,username,cdate,from_url,from_custom,retwitter_num,comment_num,state

        },
        is_company_bottom_page: function(args)
        {
        	var rows = _this.opts.scroll_tags,cur = _this.opts.cur_tag,tag='',ret = 'null';

        	if(cur < rows.length)
        	{
        		tag = 'num_'+rows[cur];
        		var row_xpath = "//strong[@id='"+tag+"']";
				var el = getNodeDetail([row_xpath,'','','']);
				window.scrollTo(0,el.offsetTop);
				_this.opts.cur_tag++;
        	}else if(rows.length == 0)
        	{
        		var fn = function(rows) {
        			_this.opts.scroll_tags = rows;
        		}
        		getRows(["//ul[@id='feed_list']/li",["/div[@class='MIB_feed_c']/p[@class='sms']"],["mid"]],fn);
        	}else if(rows.length != 0)
        	{
        		if(0 && _this.opts.jump_flag == true)
        		{
        			_this.opts.jump_flag = false;
        			_this.opts.scroll_tags = [];
        			_this.opts.cur_tag = 0;
        			_this._company_jump_page(116);
        		}else
        		{
        			ret = 'ok';
        		}
        	}
			return ret;
        },
        _company_jump_page: function(page)
        {
        	$('#feed_list').html('');
        	$('a.btn_numWidth:last').attr('onclick','App.eploadBlogPage('+page+');return false;');
        	var el = getNodeDetail(["//div[@id='epfeedlist']/div[@class='MIB_bobar']/div/a[position()>1][contains(@class,'btn_numWidth')]",'','','']);
			if(el != 'null')
			{
				var ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', // type
								  false, // canBubble
								  false, // cancelable
								  window, // view
								  1, // detail (number of clicks)
								  0, // screenX
								  0, // screenY
								  0, // clientX
								  0, // clientY
								  false, // ctrlKey
								  false, // altKey
								  false, // shiftKey
								  false, // metaKey
								  0, // button
								  null); // relatedTarget
				$('#feed_list').html('');
				el.dispatchEvent(ev);
			}
        },
        getContent: function()
		{
			_this = this;
			//企业和个人微博
			if(getNodeDetail(["//div[@id='pl_content_hisFeed']","","",""]) != "null")
			{
				var page = parseInt(getParam("page"));
				if(!isNaN(page))
					page += 1;
				else
					page = 2;
				window.scrollTo(0,document.body.scrollTop);
				waitFor(_this.is_person_bottom_page,["//div[@id='pl_content_hisFeed']/div[2]/div[@class='W_pages W_pages_comment']","","",""],_this._getPersonContent,page,30000,100,_this.fn);
			}else
			{
				var tmp_url = "http://a.weibo.com/profile.php?uid=";
				if(getNodeDetail(["//div[@id='loading']","","",""]) != 'null' && location.href.indexOf(tmp_url) == -1)
				{
					var tmp = location.href.replace("http://weibo.com/", "");
					location.href = tmp_url + tmp;
				}else
				{
					window.scrollTo(0,document.body.scrollTop);
					var fn = function(rows) {
	        			_this.opts.scroll_tags = rows;
	        			_this.opts.cur_tag = 0;
	        			waitFor(_this.is_company_bottom_page,["//div[@class='MIB_bobar']","","",""],_this._getCompanyContent,"",30000,500,_this.fn);
	        		}
					getRows(["//ul[@id='feed_list']/li",["/div[@class='MIB_feed_c']/p[@class='sms']"],["mid"]],fn);
					
					
				}
			}
		},
        render: function () {
            var data = {
                arr: this.collection.models,
                _: _
            };
            //var compiledTemplate = _.template(mainHomeTemplate, data);
            //this.el.html(mainHomeTemplate);
            //console.log(compiledTemplate);            
        }
    });
    return new mainHomeView;
});
