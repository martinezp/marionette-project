ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.Controller = {
		listContacts: function(filterCriterion){
			// Loading page in between the data is loaded
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.regions.main.show(loadingView);

			// Main page
			var contactsListLayout = new List.Layout();
			var contactsListPanel = new List.Panel();

			var fetchingContacts = ContactManager.request("contact:entities");

			$.when(fetchingContacts).done( contacts => {

				var filteredContacts = ContactManager.Entities.FilteredCollection({
					collection: contacts,
					filterFunction: function(filterCriterion){
						var criterion = filterCriterion.toLowerCase();
						return function(contact){
							if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1
								|| contact.get("lastName").toLowerCase().indexOf(criterion) !== -1
								|| contact.get("phoneNumber").toLowerCase().indexOf(criterion) !== -1) {
									return contact;
							}
						};
					}
				});

				var contactsListView = new ContactManager.ContactsApp.List.Contacts({
					collection: filteredContacts
				});

				if (filterCriterion) {
					filteredContacts.filter(filterCriterion);
					contactsListPanel.once("show", function(){
						contactsListPanel.triggerMethod("set:filter:criterion", filterCriterion);
					});
				}

				contactsListLayout.on("show", function(){
					contactsListLayout.panelRegion.show(contactsListPanel);
					contactsListLayout.contactsRegion.show(contactsListView);
				});

				contactsListPanel.on("contact:create", function(){
					var newContact = new ContactManager.Entities.Contact();
					var view = new ContactManager.ContactsApp.Create.Contact({
						model: newContact
					});
					view.on("contact:submit", function(data){
						if(contacts.length > 0){
							var highestId = contacts.max(function(c){ return c.id; } ).get("id");
							data.id = highestId + 1;
						} else {
							data.id = 1;
						}
						if (newContact.save(data)) {
							contacts.add(newContact);
							// Two ways to close the dialog, but we have create our own
							// ContactManager.regions.dialog.empty();
							// view.$el.dialog("close");
							view.trigger("dialog:close");
							var newContactView = contactsListView.children.findByModel(newContact);
							if (newContactView) {
								newContactView.flash("success");
							}
						} else {
							view.triggerMethod("contact:submit:invalid", model.validationError);
						}
					});
					ContactManager.regions.dialog.show(view);
				});

				contactsListPanel.on("contacts:filter", function(filterCriterion){
					filteredContacts.filter(filterCriterion);
					ContactManager.trigger("contacts:filter", filterCriterion);
				});

				contactsListView.on("childview:contact:delete", function(childView, args){
					args.model.destroy();
				});

				contactsListView.on("childview:contact:show", function(childView, args){
					ContactManager.trigger("contact:show", args.model.get("id"));
				});

				contactsListView.on("childview:contact:edit", function(childView, args){
					var model = args.model;
					var view = new ContactManager.ContactsApp.Edit.Contact({
						model: model
					});
					view.on("contact:submit", function(data){
						if (model.save(data)) {
							childView.render();
							// Two ways to close the dialog, but we have create our own
							// ContactManager.regions.dialog.empty();
							// view.$el.dialog("close");
							view.trigger("dialog:close");
							childView.flash("success");
						} else {
							view.triggerMethod("contact:submit:invalid", model.validationError);
						}
					});
					ContactManager.regions.dialog.show(view);
				});

				ContactManager.regions.main.show(contactsListLayout);
			});
			

		}
	}

});