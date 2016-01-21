ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){

	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts",
			"contacts/:id": "showContact",
			"contacts/:id/edit": "editContact",
			"contacts/filter/criterion::filterCriterion": "listContacts"
		}
	});

	var API = {
		listContacts: function(filterCriterion){
			ContactsApp.List.Controller.listContacts(filterCriterion);
		},

		showContact: function(id){
			ContactsApp.Show.Controller.showContact(id);
		},

		editContact: function(id){
			ContactsApp.Edit.Controller.editContact(id);
		}
	};

	ContactManager.on("contacts:list", function(){
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactManager.on("contact:show", function(id){
		ContactManager.navigate("contacts/" + id);
		API.showContact(id);
	});

	ContactManager.on("contact:edit", function(id){
		ContactManager.navigate("contacts/" + id + "/edit");
		API.editContact(id);
	});

	ContactManager.on("contacts:filter", function(filterCriterion){
		if (filterCriterion) {
			ContactManager.navigate("contacts/filter/criterion:" + filterCriterion );
		} else {
			ContactManager.navigate("contacts");
		}
	});

	ContactsApp.on("start", function(){
		new ContactsApp.Router({
			controller: API
		});
	});

});