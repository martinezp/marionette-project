ContactManager.module("HeaderApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

    Show.Controller = {
        showHeader: function() {
            var links = ContactManager.request("header:entities");
            var headers = new Show.Headers({
                collection: links
            });

            headers.on("childview:navigate", function(childView, model) {
                var trigger = model.get("navigationTrigger");
                ContactManager.trigger(trigger);
            });

            ContactManager.regions.header.show(headers);
        },

        setActiveHeader: function(headerUrl) {
            var links = ContactManager.request("header:entities");
			var headerToSelect = links.find(function(header){
				return header.get("url") === headerUrl;
			});
			headerToSelect.select();
			links.trigger("reset");
        }
    }

});