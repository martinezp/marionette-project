ContactManager.module("ContactsApp.List.Templates", function(Templates, ContactManger, Backbone, Marionette, $, _){

	Templates.contactView = [
		"<td><%- firstName %></td>",
		"<td><%- lastName %></td>",
		"<td>",
			"<button class='btn btn-small js-delete'>",
				"<i class='icon-remove'>Delete</i>",
			"</button>",
		"</td>"
	].join("\n");

	Templates.contactsView = [
		"<thead>",
			"<tr><th>First Name</th> <th>Last Name</th> <th></th></tr>",
		"</thead>",
		"<tbody></tbody>"
	].join("\n");

	// Using a list instead of table, unused after page 50
	// Templates.contactView = [
	// 	"<%- firstName %> <%- lastName %>"
	// ].join("\n");

	// Templates.contactsView = [
	// 	"<p>Here is the list of all the contacts we have information for:</p>",
	// 	"<ul></ul>"
	// ].join("\n");

});
