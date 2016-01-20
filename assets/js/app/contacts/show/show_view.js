ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

	Show.Contact = Marionette.ItemView.extend({
		tagName: "div",
		template: "ContactManager.ContactsApp.Show.Templates.ContactView",
		events: {
			"click a.js-list-contacts": "listContactsClicked",
			"click a.js-edit": "editClicked"
		},

		listContactsClicked: function(e){
			e.preventDefault();
			ContactManager.trigger("contacts:list");
		},
		editClicked: function(e) {
			e.preventDefault();
			this.trigger("contact:edit", this.model);
		}
	});

	Show.MissingContact = Marionette.ItemView.extend({
		tagName: "div",
		template: "ContactManager.ContactsApp.Show.Templates.MissingContactView"
	});

});