ContactManager.module("ContactsApp.List.Templates", function(Templates, ContactManger, Backbone, Marionette, $, _){

	Templates.ContactView = `
		<td><%- firstName %></td>
		<td><%- lastName %></td>
		<td>

			<a href='#' class='btn btn-primary js-show' role="button">
				<span class='glyphicon glyphicon-eye-open' aria-hidden="true"></span>
				Show
			</a>

			<a href='#' class='btn btn-primary js-edit' role="button">
				<span class='glyphicon glyphicon-pencil' aria-hidden="true"></span>
				Edit
			</a>
			
			<button class='btn btn-danger js-delete'>
				<span class='glyphicon glyphicon-trash' aria-hidden="true"></span>
				Delete
			</button>
		</td>
	`;

	Templates.ContactsView = `
		<thead>
			<tr><th>First Name</th> <th>Last Name</th> <th></th></tr>
		</thead>
		<tbody></tbody>
	`;

	Templates.ContactsListLayout = `
		<div id="panel-region"></div>
		<div id="contacts-region"></div>
	`

	Templates.ContactListPanel = `
		<button class="btn btn-primary js-create">New contact</button>
		<form id="filter-form" class="form-search form-inline pull-right">
			<div class="input-group">
				<input type="text" class="form-control js-filter-criterion" placeholder="Filter for...">
				<span class="input-group-btn">
					<button class="btn btn-default" type="submit">
						<span class='glyphicon glyphicon-filter' aria-hidden="true"></span>
					</button>
				</span>
			</div>
		</form>
	`
	Templates.ContactListNoContact = `
		<td colspan="3">No contacts to display.</td>
	`

	// Using a list instead of table, unused after page 50
	// Templates.contactView = [
	// 	"<%- firstName %> <%- lastName %>"
	// ].join("\n");

	// Templates.contactsView = [
	// 	"<p>Here is the list of all the contacts we have information for:</p>",
	// 	"<ul></ul>"
	// ].join("\n");

});
