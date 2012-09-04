define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/home', 
	'text!templates/home/main.html',
	'text!templates/home/auto_get_content.html',
	'libs/function.common'
	], function ($, _, Backbone, homeCollection, mainHomeTemplate,auto_get_content_template) {

    var mainHomeView = Backbone.View.extend({
        el: $("#page"),
        initialize: function () {
            this.collection = homeCollection;
            this.bind("auto_get_content", this.auto_get_content);
            //$('body').append(mainHomeTemplate);
			/*
            this.collection = homeCollection.add({
                name: "Twitter"
            });*/
        },
        auto_get_content: function (model) {
        	_this = this;
            //console.log(model);
			test();
			//console.log(auto_get_content_template);
			$('body').append(auto_get_content_template);
			
			$('#unget_path').bind('click', function(event) {
				_this.xpath_event(true);
			});
			
			$('#get_path').bind('click', function(event) {
				event.stopPropagation();
				_this.xpath_event(false);
			});			
			
			$('#get_button').bind('click', function() {	
				_this.getContent();
			});
			$('#save_button').bind('click', function() {	
				var row_xpath = strTrim($("#content_x").val(),"g");
				var cols = strTrim($("#content_y").val(),"g");
				var attr = strTrim($("#attr").val(),"g");
				chrome.extension.sendRequest({
						type:'set_mem_phantomjs_opt',
						url:location.href,
						opt:{'row_xpath':row_xpath,'cols':cols,'attr':attr}
					},
					function(response) {
				});
			});
        },
        xpath_event : function (undo)
    	{
        	var ae = this.get_nodes();
        	for (var i = 0; i < ae.length; i++) {
        		if($(ae[i]).parents("div#dashboard_div").length == 0 && $(ae[i]).attr('id') != 'dashboard_div' && ae[i].tagName != 'BODY' && ae[i].tagName != 'HTML')
        		{
        			if(undo == false)
        			{
        				$(ae[i]).bind('click', this.xpath_click_handler);
        				$(ae[i]).bind('mouseover', this.xpath_mouseover_handler);
        				$(ae[i]).bind('mouseout', this.xpath_mouseout_handler);
        			}else
        			{
        				$(ae[i]).unbind('click',this.xpath_click_handler);
        				$(ae[i]).unbind('mouseover',this.xpath_mouseover_handler);
        				$(ae[i]).unbind('mouseout',this.xpath_mouseout_handler);
        			}
        		}
        	}
    	},
    	xpath_click_handler : function (event) {

    		var useIdx = true, 
    			useId = true, 
    			useClass = false, 
    			callback = null, 
    			relative = true;
    		
    	    event.preventDefault();
    	    event.stopPropagation();
    	
    	    var e = this;
    	    
    	    for (var path = ''; e && e.nodeType == 1; e = e.parentNode) {
    	    	var predicate = [];
    	    	var brothers = e.parentNode.children;
    	    	var count = 0;
    	    	var unique = false;
    	    	for (var i = 0; brothers && (i < brothers.length); i++) {
    	    		if (brothers[i].tagName == e.tagName) {
    	    			count++;
    	    			if (brothers[i] == e) {
    	    				idx = count;
    	    			}
    	    		}
    	    	}
    	    	if (idx == 1 && count == 1) {
    	    		idx = null;
    	    	}
    	    	if (useId && e.id) {
    	    		predicate[predicate.length] = "@id='" + e.id + "'";
    	    		unique = true;
        		}
        		//console.debug(useId, useClass, e, e.class);
        		if (useClass && e.className) {
        			predicate[predicate.length] = "@class='" + e.className + "'";
        		}
        		idx = ( useIdx && idx && !unique ) ? ('[' + idx + ']') : '';
        		predicate = (predicate.length > 0) ? ('[' + predicate.join(' and ') + ']') : '';
        		path='/' + e.tagName.toLowerCase() + idx + predicate + path;
        		if (unique && relative) {
        			path = '/' + path;
        			break;
        		}
    	    }
    	    if (callback) {
    	    	callback(path);
    	    } else {
    	    	//console.log(path);
    	    	$("#content_x").val(path);
    	    }
    	    return true;
    	},
        xpath_mouseover_handler : function (event)
    	{
    		event.preventDefault();
    	    event.stopPropagation();
    	    
    		$(this).parents().map(function () { 
                $(this).removeClass('chrome_xpath_blue');
            });
    		if($(this).parents("div#dashboard_div").length == 0)
    		{
    			$(this).addClass('chrome_xpath_blue');
    		}
    	},
    	xpath_mouseout_handler : function(event)
    	{
    		event.preventDefault();
    	    event.stopPropagation();
    	    
    		$(this).removeClass('chrome_xpath_blue');
    	},
        get_nodes: function()
        {
        	var ae = [];
        	addNodes(ae, document.getElementsByTagName("*"));
        	for (var i = 0; i < ae.length; i++) {
        		if (ae[i].tagName == 'IFRAME') {
        			var d = ae[i].contentDocument;
        			if (d) {
        				addNodes(ae, d.getElementsByTagName("*"));
        			}
        		}
        	}
        	return ae;
        },
        getContent: function()
		{
			var row_xpath = $("#content_x").val().split(',');
			var cols = $("#content_y").val().split(',');
			var attr = $("#attr").val().split(',');
			var fn = function(rows) {
				var str = '';
				for (var i=0, len=rows.length; i < len; i++) {
					str += rows[i].join(",")+'\n';
				}
				$('#submit_result').text(str);
			}
			//nodes
			if(row_xpath.length == 1)
			{
				getRows([row_xpath,cols,attr],fn);
			}else
			{
				getRows_2([row_xpath,cols,attr],fn);
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
