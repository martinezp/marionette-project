ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.Controller = {
		listContacts: function(){
			var contacts = ContactManager.request("contact:entities");

			var contactsListView = new ContactManager.ContactsApp.List.Contacts({
				collection: contacts
			});

			contactsListView.on("childview:contact:delete", function(childView, model){
				contacts.remove(model);
			});

			ContactManager.regions.main.show(contactsListView);

		}
	}

});