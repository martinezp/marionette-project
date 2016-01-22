ContactManager.module("HeaderApp.Show.Templates", function(Templates, ContactManager, Backbone, Marionette, $, _){

	Templates.Headers = `
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
			    <div class="navbar-header">
			   		<a class="navbar-brand" href="#">ContactManager</a>
			    </div>
			    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			   		<ul class="nav navbar-nav">
			   		</ul>
			    </div>
			</div>
		</nav>
	`;

	Templates.Header = `
		<a href="#" class="outline"><%- name %></a>
	`;

});