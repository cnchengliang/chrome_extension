define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/log', 
	'templates/home/log.compiled',
	'templates/home/logitem.compiled'
	], function ($, _, Backbone, logCollection) {

    var view = Backbone.View.extend({
        el: "",
        fn: "",
        initialize: function () {
        	this.collection = logCollection;
        	this.collection = logCollection.add({
        		id: 1,
                content: "Facebook",
                cdate: 20,
                url: 123,
                img:''
            });
            this.collection.bind("init", this.getData,this);
            this.collection.bind("find", this.getDataBySearch,this);
            this.collection.bind("update", this.collection.getLogs,this);

        },
        bindEvents: function(){
        	_this = this;
        	_this.el = $('#sc_form');

            $('#previous').bind('click', function() {
                var page = $('#cur_page').val();
                var start = Number(page)-1;
                start = start < 1?1:start;
                _this.collection.getLogs((start-1)*30);
                $('#cur_page').val(start);
            });

            $('#next').bind('click', function() {
                var page = $('#cur_page').val();
                var start = Number(page)+1;
                start = start < 1?1:start;
                _this.collection.getLogs((start-1)*30);
                $('#cur_page').val(start);
            });

			$('#gosubmit').bind('click', function() {

                var source = $('#source').val();
                if($('#searchtype').val() == 1)
                {
                    _this.collection.findLog($('#query_text').val(),source);
                }
				if($('#query_text').val() != '')
                {
                    if($('#searchtype').val() == 2)
                    {
                        _this.collection.filterLog($('#query_text').val(),source);
                    }
                }
					
			});
			$('#act_del').bind('click', function() {
                var ids = [];
                $('input[name=logs]').each(function () {
                    if(this.checked)
                    {
                        $("#tr_"+$(this).val()).remove();
                        ids[ids.length] = $(this).val();
                    }
                });
                if(ids.length != 0)
                    _this.collection.updateLog(ids);
			});

            $('#checkall').bind('click', function() {
                var selected = this.checked;
                // Iterate each checkbox
                $('input[name=logs]').each(function () {this.checked = selected;});
            });

        },
        render: function (callback) {
        	this.fn = callback;
			this.collection.getLogs();
        },
        findLog: function (query,callback) {
        	this.collection.findLog(query);
        	this.fn = callback;
        },
        getDataBySearch: function () {
        	if($("#table_result").length > 0)
        	{
				//var list = _.template(logItemTemplate, {rows:this.collection.toJSON()});
                var list = '';
                _.each(this.collection.toJSON(), function(row){
                    list += home_logItemTemplate({row:row});
                });
				$("#table_result > tbody").html(list);
			}else
			{
				this.getData();
			}
        },
        getData: function () {
        	_this = this;
        	//var list = _.template(logItemTemplate, {rows:this.collection.toJSON()});
            var list = '';
            _.each(this.collection.toJSON(), function(row){
                list += home_logItemTemplate({row:row});
            });
			//var template = _.template( logTemplate, {content:list} );
            var url_titles = ['51job','zhaopin','job58','house58','soufun'];
            var source = '';
            for(i=0,n=url_titles.length;i<n;i++)
                source += '<option value="'+url_titles[i]+'">'+url_titles[i]+'</option>';
            var template = home_logTemplate({content:list,source:source});
            this.fn(template, function(){_this.bindEvents();});
            
        }
    });
    return new view;
});
