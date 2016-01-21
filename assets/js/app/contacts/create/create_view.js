ContactManager.module("ContactsApp.Create", function(Create, ContactManager, Backbone, Marionette, $, _){

	Create.Contact = ContactManager.ContactsApp.Common.Views.ContactForm.extend({
		initialize: function() {
			this.title = "New contact";
		},
		onRender: function() {
			this.$(".js-submit").text("Create contact");
		}
	});

});