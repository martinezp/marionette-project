ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

	Entities.Contact = Backbone.Model.extend({
		defaults: {
			firstName: "",
			lastName: "",
			phoneNumber: "No phone number"
		}
	});

	Entities.ContactCollection = Backbone.Collection.extend({
		model: Entities.Contact,
		comparator: "firstName"
	});

	var contacts;

	var initializeContacts = function() {
		contacts = new Entities.ContactCollection([
			{
				id:1,
				firstName: "Bob",
				lastName: "Brigham",
				phoneNumber: "555-0163"
			},
			{
				id:2,
				firstName: "Alice",
				lastName: "Arten",
				phoneNumber: "555-0184"
			},
			{
				id:3,
				firstName: "Pablo",
				lastName: "Martínez",
				phoneNumber: "555-6854"
			},
			{
				id:4,
				firstName: "Zacarías",
				lastName: "Barceló",
				phoneNumber: "555-9984"
			}
		]);
	}

	var API = {
		getContactEntities: function(){
			if(contacts === undefined)
				initializeContacts();
			return contacts;
		}
	};

	ContactManager.reqres.setHandler("contact:entities", function(){
		return API.getContactEntities();
	});

});