ContactManager.module("HeaderApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

    Show.Header = Marionette.ItemView.extend({
        template: "ContactManager.HeaderApp.Show.Templates.Header",
        tagName: "li",
        events: {
            "click a": "navigate"
        },
        navigate: function(e) {
            e.preventDefault();
            this.trigger("navigate", this.model);
        },
        onRender: function() {
            if (this.model.selected) {
                this.$el.addClass("active");
            } 
            // else {
            // 	this.$el.attr("class");
            // 	// alert("pablo");
            // }
        }
    });

    Show.Headers = Marionette.CompositeView.extend({
        template: "ContactManager.HeaderApp.Show.Templates.Headers",
        childView: Show.Header,
        childViewContainer: "ul"

    });

});