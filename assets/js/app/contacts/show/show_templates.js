ContactManager.module("ContactsApp.Show.Templates", function(Templates, ContactManger, Backbone, Marionette, $, _){

	Templates.ContactView = `
		<h1><%- firstName %> <%- lastName %></h1>
		<!-- Button disabled cause we supposed to use the menu -->
		<!-- <a href='#' class='btn btn-default js-list-contacts'>Display contacts list</a> --> 
		<a href='#' class="btn btn-primary js-edit">
			<span class="glyphicon glyphicon-pencil"></span>
			Edit
		</a>
		<p><strong>Phone number:</strong> <%- phoneNumber %></p>
	`;

	Templates.MissingContactView = [
		"<div class='bg-danger'>This contact doesn't exist !</div>"
	].join("\n");

});