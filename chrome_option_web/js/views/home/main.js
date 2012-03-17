define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/home', 
	'text!templates/home/main.html',
	//'text!templates/home/auto_get_content.html'
	], function ($, _, Backbone, homeCollection, mainHomeTemplate) {

    var mainHomeView = Backbone.View.extend({
        el: $("#main-content"),
        initialize: function () {
            this.collection = homeCollection;
            this.collection.bind("add", this.exampleBind);
            this.collection = homeCollection.add({
                name: "Twitter"
            });
            this.collection = homeCollection.add({
                name: "Facebook",
                score: 20
            });

            this.relayout();
			$().UItoTop({ easingType: 'easeOutQuart' });
			$('.show-menubar').click(function(){
				var c = $("#left_menu").width();
				if($(this).hasClass("hide1")){
				$(this).removeClass("hide1");

				$("#center_content").animate({ "margin-left": c }, "slow"); 
				$("#left_menu").animate({"left":"0"},"slow");
			 }else{
				$(this).addClass("hide1"); 
				$("#left_menu").animate({"left":-c},"slow");
				$("#center_content").animate({"margin-left":"0"},"slow"); 
				}
			});
			var cur = $('.current')
			$("#wrapper > section > aside > nav").length && $("#wrapper > section > aside > nav").each(function(){
				var base = $(this);
				$(this).drillDownMenu();
			});
			if(!location.hash)
				cur.addClass('current');
				
        },
        relayout: function() {
        	var container = $('.layout');
			container.layout({resize: false});
			var wlayout=$('.layout').css('width');
			var wleft=$('#left_menu').css('width');
			$('.center').css('margin-left',wleft);
			
		},
        exampleBind: function (model) {
            //console.log(model);
        },        
        render: function (pageDownloaded) {
            var data = {
                arr: this.collection.models,
                _: _
            };
            var compiledTemplate = _.template(mainHomeTemplate, data);
            //this.el.html(mainHomeTemplate);
            pageDownloaded(compiledTemplate,function(){});
        }
    });
    return new mainHomeView;
});
