// Filename: router.js
define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'views/home/main'
	], function ($, _, Backbone, mainHomeView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '/projects': 'showProjects',

            // Default
            '*actions': 'defaultAction'
        },
        showProjects: function () {
            // Call render on the module we loaded in via the dependency array
            // 'views/projects/list'
            projectListView.render();
        },
        defaultAction: function (actions) {
            // We have no matching route, lets display the home page 
            mainHomeView.render();
        }
    });

    var initialize = function () {
            var app_router = new AppRouter;
            Backbone.history.start();
        };
    return {
        initialize: initialize
    };
});