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
        getGoodsData: function()
        {
        	_this = this;
        	var page = parseInt(getParam("offset"));
			if(!isNaN(page))
				page += 15;
			else
				page = 15;
        	var row_xpath = "//ol[contains(@class,'subbd')]/li";
        	var cols_name = ["goodname","goodurl","goodimg","goodprice","sale","upgrade","shopInfo"];
			var cols = ["/a/img","/a","/a/img","/span[1]","/span[2]","/div/span","/div/s[2]"];
			var attr = ["alt","href","src","textContent","textContent","textContent","dataurl"];			
			
			var fn = function(rows) {
				var rows_object = [];
	
				for (var i=0, len=rows.length; i < len; i++) {
					rows_object[rows_object.length] = new Object();
					for(var j=0, m=cols_name.length; j<m;j++)
					{
						if(cols_name[j] == 'sale')
						{
							var tmp = rows[i][j].replace("本月销售:","");
							rows[i][j] = parseInt(tmp);
						}else if(cols_name[j] == 'upgrade')
						{
							var tmp = rows[i][j].replace(" 升降幅度：","");
							rows[i][j] = parseInt(tmp);
						}
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
					{
						var url = "http://127.0.0.1/slim/taobao/top/goods/add";
					    $.ajax({
					        url:url,
					        type: 'POST',
					        data:{"rows":JSON.stringify(rows_object)},
					        dataType:"json",
					        success:function () {
					        	setTimeout(function(){_this._jump_page();}, 2000);
					        }
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
        	var el = getNodeDetail(["//div[@class='page-bottom']/a[position()>1][contains(@class,'page-next')]",'','','']);
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
