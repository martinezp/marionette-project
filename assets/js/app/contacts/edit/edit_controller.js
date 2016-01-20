ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _) {

	Edit.Controller = {
		editContact: function(id) {
			// Loading page in between the data is loaded
			var loadingView = new ContactManager.Common.Views.Loading({
				title: "Contact data loading",
				message: "Please wait, data is loading."
			});
			ContactManager.regions.main.show(loadingView);

			// Main page
			var fetchingContact = ContactManager.request("contact:entity", id);
			$.when(fetchingContact).done( (contact) => {
				var view;
				if (contact !== undefined) {
					view = new Edit.Contact({
						model : contact
					});

					view.on("contact:submit", function(data){
						if (contact.save(data)) {
							ContactManager.trigger("contact:show", contact.get("id"));
						} else {
							view.triggerMethod("contact:submit:invalid", contact.validationError);
						}
					});
				} else {
					view = new ContactManager.ContactsApp.Show.MissingContact();
				}
				ContactManager.regions.main.show(view);
			});
		}
	}

});