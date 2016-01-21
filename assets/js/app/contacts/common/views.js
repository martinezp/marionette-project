ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){

	Views.ContactForm = Marionette.ItemView.extend({
		template: "ContactManager.ContactsApp.Edit.Templates.Contact",
		events: {
			"click button.js-submit": "submitClicked"
		},
		submitClicked: function(e){
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("contact:submit", data);
		},
		// onRender: function(){
		// 	if ( !this.options.asModal ) {
		// 		var $title = $("<h1>", { text: this.title });
		// 		this.$el.prepend($title);
		// 	}
		// },
		// onShow: function(){
		// 	if ( this.options.asModal ) {
		// 		this.$el.dialog({
		// 			modal: true,
		// 			title: this.title,
		// 			width: "500"
		// 		});
		// 	}		
		// },
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