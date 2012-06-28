define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	'text!templates/home/main.html',
	'libs/function.common'
	], function ($, _, Backbone, mainHomeTemplate) {

    var mainHomeView = Backbone.View.extend({
        opts: {
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
        getContent: function()
        {
        	_this = this;
        	var row_xpath = "//div[@id='topsites-countries' and @class='module']/div[1]/ul/li";
        	var cols_name = ["no","siteInfoUrl","siteName","siteUrl","siteDesc"];
			var cols = ["/div[1]","/div[2]/h2/a","/div[2]/h2/a","/div[2]/span","/div[2]/div"];
			var attr = ["textContent","href","textContent","textContent","textContent"];			
			
			var fn = function(rows) {
				var rows_object = [];
	
				for (var i=0, len=rows.length; i < len; i++) {
					rows_object[rows_object.length] = new Object();
					for(var j=0, m=cols_name.length; j<m;j++)
					{						
						rows_object[rows_object.length-1][cols_name[j]] = rows[i][j];
					}
				}
				if(rows_object.length > 0)
				{				
					if(typeof chrome == "undefined")
					{
						str = JSON.stringify(rows);
						console.log(str);
					}else
					{/*
						var url = "http://127.0.0.1/slim/alexa/top/site/add";
					    $.ajax({
					        url:url,
					        type: 'POST',
					        data:{"rows":JSON.stringify(rows_object)},
					        dataType:"json",
					        success:function () {
					        	setTimeout(function(){_this._jump_page();}, 2000);
					        }
					    });*/
						chrome.extension.sendRequest({
								type:'set_mem_array',
								temp_data:rows_object
								},
								function(response) {
									setTimeout(function(){_this._jump_page();}, 2000);
						});
					}
					
				}
			}
			//nodes
			getRows([row_xpath,cols,attr],fn);
        },
        _jump_page: function()
        {
        	_this = this;
        	var el = getNodeDetail(["//div[@class='alexa-pagination']/a[position()>1][contains(@class,'next')]",'','','']);
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
						type:'get_mem_array'
						},
						function(response) {
							var data = response.result;
							var content = '';
							for (var i=0, len=data.length; i < len; i++)
							{
								var obj = data[i];
								for (var prop in obj) {
									content += obj[prop]+','
								}
								content += '\n';
							}
							exportFile('alexa.csv',content);
				});
				
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
