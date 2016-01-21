ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){

	Show.AboutMessage = Marionette.ItemView.extend({
		template: "ContactManager.AboutApp.Show.Templates.AboutMessage"
	});

});