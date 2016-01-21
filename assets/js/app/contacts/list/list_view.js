ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {

	ContactsApp.List.Layout = Marionette.LayoutView.extend({
		template: "ContactManager.ContactsApp.List.Templates.ContactsListLayout",
		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	ContactsApp.List.Panel = Marionette.ItemView.extend({
		template: "ContactManager.ContactsApp.List.Templates.ContactListPanel",
		triggers: {
			"click button.js-create": "contact:create"
		},
		events: {
			"submit #filter-form": "filterContacts"
		},
		ui: {
			filterCriterion: "input.js-filter-criterion"
		},

		filterContacts: function(e){
			e.preventDefault();
			var criterion = this.$(".js-filter-criterion").val();
			this.trigger("contacts:filter", criterion);
		},

		onSetFilterCriterion: function(filterCriterion){
			this.ui.filterCriterion.val(filterCriterion);
		}
	});

	ContactsApp.List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "ContactManager.ContactsApp.List.Templates.ContactView",
		triggers: {
			"click td a.js-show": "contact:show",
			"click button.js-delete": "contact:delete",
			"click td a.js-edit": "contact:edit"
		},
		events: {
			"click": "highlightName"
		},

		remove: function(){
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

		flash: function(cssClass){
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, function(){
				setTimeout(function(){
					$view.toggleClass(cssClass)
				}, 500);
			});
		},

		alertCellText: function(e){
			alert($(e.target).text());
		}

	});

	ContactsApp.List.NoContacts = Marionette.ItemView.extend({
		tagName: "tr",
		template: "ContactManager.ContactsApp.List.Templates.ContactListNoContact",
		className: "alert alert-danger"
	});

	ContactsApp.List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "ContactManager.ContactsApp.List.Templates.ContactsView",
		childView: ContactsApp.List.Contact,
		emptyView: ContactsApp.List.NoContacts,
		childViewContainer: "tbody",

		initialize: function(){
			this.listenTo(this.collection, "reset", function(){
				this.attachHtml = function(collectionView, childView, index){
					collectionView.$el.append(childView.el);
				}
			});
		},

		onRenderCollection: function(){
			this.attachHtml = function(collectionView, childView, index){
				collectionView.$el.prepend(childView.$el);
			}
		},

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