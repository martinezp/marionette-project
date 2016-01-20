ContactManager.module("ContactsApp.Edit.Templates", function(Templates, ContactManager, Backbone, Marionette, $, _) {

	Templates.Contact = `
		<form>
			<div class="form-group">
				<label for="contact-firstName" class="control-label">First name:</label>
				<input class="form-control" id="contact-firstName" name="firstName" type="text" value="<%- firstName %>"/>
			</div>
			<div class="form-group">
				<label for="contact-lastName" class="control-label">Last name:</label>
				<input class="form-control" id="contact-lastName" name="lastName"type="text" value="<%- lastName %>"/>
			</div>
			<div class="form-group">
				<label for="contact-phoneNumber" class="control-label">Phone number:</label>
				<input class="form-control" id="contact-phoneNumber" name="phoneNumber" type="text" value="<%- phoneNumber %>"/>
			</div>
			<button class="btn btn-primary js-submit">Save</button>
		</form>
	`;

});