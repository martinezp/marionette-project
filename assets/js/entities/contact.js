ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

	Entities.Contact = Backbone.Model.extend({
		urlRoot: "contacts",
		// defaults: {
		// 	firstName: "",
		// 	lastName: "",
		// 	phoneNumber: "No phone number"
		// },
		validate: function(attrs, options) {
			var errors = {};
			if (! attrs.firstName) {
				errors.firstName = "can't be blank";
			}
			if (! attrs.lastName) {
				errors.lastName = "can't be blank";
			} else {
				if (attrs.lastName.length < 2) {
					errors.lastName = "is too short"
				}
			}
			if (! _.isEmpty(errors)) {
				return errors;
			}
		}
	});

	Entities.configureStorage("ContactManager.Entities.Contact");

	Entities.ContactCollection = Backbone.Collection.extend({
		url: "contacts",
		model: Entities.Contact,
		comparator: "firstName"
	});

	Entities.configureStorage("ContactManager.Entities.ContactCollection");

	var initializeContacts = function() {
		var contacts = new Entities.ContactCollection([
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

		contacts.forEach( contact => {
			contact.save();
		});

		return contacts.models;
	}

	var API = {
		getContactEntity: (contactId) => {
			var contact = new Entities.Contact({id: contactId});
			var defer = $.Deferred();
			setTimeout( () => {
				contact.fetch({
					success: data => { defer.resolve(data); }
				});
			}, 500);
			return defer.promise();
		},

		getContactEntities: () => {
			var contacts = new Entities.ContactCollection();
			var defer = $.Deferred();
			contacts.fetch({
				success: data => { defer.resolve(data); }
			});
			var promise = defer.promise();
			$.when(promise).done( fetchedContacts => {
				if (fetchedContacts.length === 0) {
					var models = initializeContacts();
					contacts.reset(models);
				}	
			});
			return promise;
		}
	};

	ContactManager.reqres.setHandler("contact:entity", function(id){
		return API.getContactEntity(id);
	});

	ContactManager.reqres.setHandler("contact:entities", function(){
		return API.getContactEntities();
	});

});