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
        el: $("#page"),
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
        },
        exampleBind: function (model) {
            //console.log(model);
        },
        render: function () {
            var data = {
                arr: this.collection.models,
                _: _
            };
            var compiledTemplate = _.template(mainHomeTemplate, data);
            //this.el.html(mainHomeTemplate);
            console.log(compiledTemplate);
        }
    });
    return new mainHomeView;
});