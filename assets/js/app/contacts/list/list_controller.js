ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.Controller = {
		listContacts: function(){
			// Loading page in between the data is loaded
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);

			// Main page
			var fetchingContacts = ContactManager.request("contact:entities");
			$.when(fetchingContacts).done( contacts => {
				var contactsListView = new ContactManager.ContactsApp.List.Contacts({
				collection: contacts
				});

				contactsListView.on("childview:contact:delete", function(childView, model){
					model.destroy();
				});

				contactsListView.on("childview:contact:show", function(childView, model){
					ContactManager.trigger("contact:show", model.get("id"));
				});

				contactsListView.on("childview:contact:edit", function(childView, model){
					var view = new ContactManager.ContactsApp.Edit.Contact({
						model: model,
						asModal: true
					});
					view.on("contact:submit", function(data){
						if (model.save(data)) {
							childView.render();
							// Two ways to close the dialog
							// ContactManager.regions.dialog.empty();
							view.$el.dialog("close");
							childView.flash("success");
						} else {
							view.triggerMethod("contact:submit:invalid", model.validationError);
						}
					});
					ContactManager.regions.dialog.show(view);
				});

				ContactManager.regions.main.show(contactsListView);
			});
			

		}
	}

});