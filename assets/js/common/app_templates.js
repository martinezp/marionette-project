ContactManager.module("Common.Views.Templates", function(Templates, ContactManger, Backbone, Marionette, $, _){

	Templates.LoadingView = `
		<h1><%- title %></h1>
		<p><%- message %></p>
		<div id='spinner'></div>
	`;

});