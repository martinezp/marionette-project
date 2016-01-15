ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "ContactManager.ContactsApp.List.Templates.contactView",
		events: {
			"click": "highlightName",
			"click td": "alertCellText",
			"click button.js-delete": "deleteContact"
		},
		remove: function(){
			// this.$el.fadeOut();
			var self = this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		},
		highlightName: function(e){
			e.preventDefault();
			var object = this.$el.attr('class');
			if (typeof object === "undefined" || object.indexOf("warning") <0 ) {
				this.$el.addClass("warning");
			} else {
				this.$el.removeClass("warning");
			}
		},
		alertCellText: function(e){
			alert($(e.target).text());
		},
		deleteContact: function(e){
			e.stopPropagation();
			this.trigger("contact:delete", this.model);
		}
	});

	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "ContactManager.ContactsApp.List.Templates.contactsView",
		childView: List.Contact,
		childViewContainer: "tbody",
		onChildviewContactDelete: function(){
			this.$el.fadeOut(1000, function(){
			$(this).fadeIn(1000);
			});
		}
	});

	// Using a list instead of table, unused after page 50
	// List.Contact = Marionette.ItemView.extend({
	// 	tagName: "li",
	// 	template: "ContactManager.ContactsApp.List.Templates.contactView",
	// 	events: {
	// 		"click": "highlightName"
	// 	},
	// 	highlightName: function() {
	// 		alert(this);
	// 	}
	// });

	// List.Contacts = Marionette.CompositeView.extend({
	// 	tagName: "div",
	// 	className: "table table-hover",
	// 	template: "ContactManager.ContactsApp.List.Templates.contactsView",
	// 	childView: List.Contact,
	// 	childViewContainer: "ul"
	// });

});