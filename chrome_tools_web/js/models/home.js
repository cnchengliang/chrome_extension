define([
	'Underscore', 
	'Backbone'
	], function (_, Backbone) {
    var homeModel = Backbone.Model.extend({
        defaults: {
            default_data: 'ok'
        },
        initialize: function () {}

    });
    return homeModel;

});