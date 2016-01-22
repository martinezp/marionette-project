ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {

    Entities.Header = Backbone.Model.extend({
        initialize: function() {
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,
        initialize: function() {
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

	var initializeHeaders = function() {
		Entities.Headers = new Entities.HeaderCollection([
			{ name: "Contacts", url: "contacts", navigationTrigger: "contacts:list" },
			{ name: "About", url: "about", navigationTrigger: "about:show" }
		]);
	};

    var API = {
        getHeaders: function() {
            if (Entities.Headers === undefined) {
            	initializeHeaders();
            }
            return Entities.Headers;
        }
    };

    ContactManager.reqres.setHandler("header:entities", function(){
    	return API.getHeaders();
    });

});