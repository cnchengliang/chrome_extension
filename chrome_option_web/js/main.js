// Filename: main.js
require.config({
    paths: {
        loader: 'libs/loader',
        jQuery: 'libs/jquery/loader',
        Underscore: 'libs/underscore/loader',
        Backbone: 'libs/backbone/loader',
        templates: '../templates'
    }

});

require([

	// Load our app module and pass it to our definition function
	'app',

	// Some plugins have to be loaded in order due to their non AMD compliance
	// Because these scripts are not "modules" they do not pass any values to the definition function below
	], function (App) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});