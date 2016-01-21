ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){

	Show.Controller = {
		showAbout: function() {
			// var view = new ContactManager.Common.Views.Loading();
			var view = new ContactManager.AboutApp.Show.AboutMessage();
			ContactManager.regions.main.show(view);
		}
	}

});