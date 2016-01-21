ContactManager.module("Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){

	Views.Loading = Marionette.ItemView.extend({
		template: "ContactManager.Common.Views.Templates.LoadingView",
		title: "Loading Data",
		message: "Please wait, data is loading.",
		serializeData: function() {
      		return {
        		title: Marionette.getOption(this, "title"),
        		message: Marionette.getOption(this, "message")
      		}
    	},
		onShow: function(){
			var opts = {
				lines: 13, // The number of lines to draw
				length: 20, // The length of each line
				width: 10, // The line thickness
				radius: 22, // The radius of the inner circle
				corners: 1, // Corner roundness (0..1)
				rotate: 0, // The rotation offset
				direction: 1, // 1: clockwise, -1: counterclockwise
				color: "#000", // #rgb or #rrggbb
				speed: 1, // Rounds per second
				trail: 80, // Afterglow percentage
				shadow: false, // Whether to render a shadow
				hwaccel: false, // Whether to use hardware acceleration
				className: "spinner", // The CSS class to assign to the spinner
				zIndex: 2e9, // The z-index (defaults to 2000000000)
				top: "990px", // Top position relative to parent in px
				left: "9999px" // Left position relative to parent in px
			};
			var spinner = new Spinner(opts).spin()
			$("#spinner").append(spinner.el)
		}
	});

});

