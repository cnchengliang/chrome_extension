define([
	'order!libs/jquery/jquery',
	'order!libs/jquery/jlayout.border',
	'order!libs/jquery/jquery.jlayout',
	'order!libs/jquery/jquery.ui.totop',
	'order!libs/jquery/jquery.easing',
	'order!libs/jquery/jquery.hashchange.min',
	'order!libs/jquery/jquery.drilldownmenu',
	'order!libs/underscore/underscore', 
	'order!libs/backbone/backbone',
	'order!libs/bootstrap/bootstrap-typeahead',
	'order!libs/bootstrap/bootstrap-tab',
	'order!libs/bootstrap/bootstrap-tooltip',
	'order!libs/bootstrap/bootstrap-scrollspy',
	'order!libs/bootstrap/bootstrap-popover',	
	'order!libs/bootstrap/bootstrap-modal',
	'order!libs/bootstrap/bootstrap-dropdown',
	'order!libs/bootstrap/bootstrap-collapse',
	'order!libs/bootstrap/bootstrap-carousel',
	'order!libs/bootstrap/bootstrap-button',
	'order!libs/bootstrap/bootstrap-alert',
	'order!libs/bootstrap/bootstrap-transition',
	'order!libs/bootstrap/bootstrap-datepicker'
],
function(){
  return {
    Backbone: Backbone.noConflict(),
    _: _.noConflict(),
    $: jQuery.noConflict()
  };
});
