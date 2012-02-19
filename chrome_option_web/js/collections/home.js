define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'models/home'
	], function ($, _, Backbone, homeModel) {
    var homeCollection = Backbone.Collection.extend({
        model: homeModel,
        initialize: function () {

        }

    });

    return new homeCollection;
});