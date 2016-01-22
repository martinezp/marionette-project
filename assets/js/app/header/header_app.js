ContactManager.module("HeaderApp", function(HeaderApp, ContactManager, Backbone, Marionette, $, _){

	var API = {
		showHeader: function(){
			HeaderApp.Show.Controller.showHeader();
		}
	}

	ContactManager.commands.setHandler("set:active:header", function(name){
		ContactManager.HeaderApp.Show.Controller.setActiveHeader(name);
	});

	HeaderApp.on("start", function(){
		API.showHeader();
	});

});