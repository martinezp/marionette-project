ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){

	Show.Controller = {
		
		showContact: function(id) {
			// Loading page in between the data is loaded
			var loadingView = new ContactManager.Common.Views.Loading({
				title: "Artificial Loading Delay",
				message: "Data loading is delayed to demostrate using a loading view."
			});
			ContactManager.regions.main.show(loadingView);

			// Main page
			var fetchingContact = ContactManager.request("contact:entity", id);
			$.when(fetchingContact).done(function(contact){
				var contactView;

				if (contact !== undefined) {
					contactView = new ContactManager.ContactsApp.Show.Contact({
						model : contact
					});

					contactView.on("contact:edit", function(contact){
						ContactManager.trigger("contact:edit", contact.get("id"));
					});
				} else {
					contactView = new ContactManager.ContactsApp.Show.MissingContact();
				}

				ContactManager.regions.main.show(contactView);
			});
		}

	}

});