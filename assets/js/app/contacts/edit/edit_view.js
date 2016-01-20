ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){

	Edit.Contact = Marionette.ItemView.extend({
		template: "ContactManager.ContactsApp.Edit.Templates.Contact",
		initialize: function() {
			this.title = "Edit " + this.model.get("firstName");
			this.title += " " + this.model.get("lastName");
		},
		events: {
			"click button.js-submit": "submitClicked"
		},
		onRender: function(){
			if ( !this.options.asModal ) {
				var $title = $("<h1>", { text: this.title });
				this.$el.prepend($title);
			}
		},

		onShow: function(){
			if ( this.options.asModal ) {
				this.$el.dialog({
					modal: true,
					title: this.title,
					width: "500"
				});
			}		
		},

		submitClicked: function(e){
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("contact:submit", data);
		},

		onContactSubmitInvalid: function(errors) {
			var $view = this.$el;

			var clearFormErrors = () => {
				$view.find(".help-block.error").each(function(){
					$(this).remove();
				});
				$view.find(".form-group.has-error").each(function(){
					$(this).removeClass("has-error");
				});
			}

			var markErrors = (value, key) => {
				var $controlGroup = $view.find("#contact-" + key).parent();
				var $errorEl = $("<span>", {class: "help-block error", text: value});
				$controlGroup.append($errorEl).addClass("has-error");
			};
			clearFormErrors();
			_.each(errors, markErrors);
		}		

	});

});