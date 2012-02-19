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
            //console.log(model);
			test();
			//console.log(auto_get_content_template);
			$('body').append(auto_get_content_template);
			_this = this;
			$('#get_button').bind('click', function() {	
				_this.getContent();
			});
        },
        getContent: function()
		{
			var row_xpath = strTrim($("#content_x").val(),"g");
			var cols = $("#content_y").val().split(',');
			var attr = $("#attr").val().split(',');
			//nodes
			var rows = getRows([row_xpath,cols,attr]);
			var str = '';
			for (var i=0, len=rows.length; i < len; i++) {
				str += rows[i].join(",")+'\n';
			}
			$('#submit_result').text(str);
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
