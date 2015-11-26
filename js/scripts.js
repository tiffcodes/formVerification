var emailVerification = {};

// API key for google autocomplete cities
emailVerification.apiKey = "AIzaSyAr40CiaTdqSlsyPDqmaV7NT3HDVvYcN1w";


// Google autocomplete cities
emailVerification.getLocations = function(){
	 var autocomplete = new google.maps.places.Autocomplete(
	 		(document.getElementById('autocomplete')),
      {types: ['geocode']});
}



// Verify inputs and store values
emailVerification.getResults = function(){
	$("form").on("submit", function(e){
		e.preventDefault();

		// Store values of the inputs
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var password2 = $('#password2').val();
		var city = $('#autocomplete').val();

		// Validate First Name Value to ensure the user inputed more than 2 characters
		if (firstName.length < 2 || lastName.length < 2) {
			$(".nameError").empty(); // Empty the div so we don't get repeat error messages
			$(".nameError").html("<p>").append("<i class='fa fa-exclamation-triangle'>").append("Please enter a name with at least 2 characters").removeClass("hide");
			$("#firstName").focus(); // Put the field with the error in focus so the user can easily retry
			return false;
		}
		else {
			$(".nameError").empty(); // Empty the div so in the case there was a previous error message it is removed
		}

		// Validate Email Value to ensure the user inputed only alphanumeric characters then the @ symbol followed by more alphanumeric characters then . no less than 2 letters
		var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (re.test(email) === false) {
			$(".emailError").empty(); // Empty the div so we don't get repeat error messages
			$(".emailError").append("<p>").append("<i class='fa fa-exclamation-triangle'>").append("Please enter a valid email address");
			$("#email").focus(); // Put the field with the error in focus so the user can easily retry
			return false;
		}
		else {
			$(".emailError").empty(); // Empty the div so in the case there was a previous error message it is removed
		}

		// Check to see if the password has only alphanumeric characters and is at least 8 characters long
		var reg = /^[A-Z0-9._%+-]/;
		if (password.length < 8 && reg.test(password) === false) {
			$(".passwordError").empty(); // Empty the div so we don't get repeat error messages
			$(".passwordError").append("<p>").append("<i class='fa fa-exclamation-triangle'>").append("Please enter a password with at least 8 characters");
			$("#password").focus(); // Put the field with the error in focus so the user can easily retry
			return false;
		}
		else {
			$(".passwordError").empty(); // Empty the div so in the case there was a previous error message it is removed
		}

		// Check to see if the passwords match
		if (password != password2) {
			$(".passwordMatchError").empty(); // Empty the div so we don't get repeat error messages
			$(".passwordMatchError").append("<p>").append("<i class='fa fa-exclamation-triangle'>").append("Oops! Looks like your passwords don't match");
			$("#password2").focus(); // Put the field with the error in focus so the user can easily retry
			return false;
		}
		else {
			$(".passwordMatchError").empty(); // Empty the div so in the case there was a previous error message it is removed
		}

		// Check to see if there is anything typed in the city input
		if (city === "") {
			$(".cityError").empty(); // Empty the div so we don't get repeat error messages
			$(".cityError").append("<p>").append("<i class='fa fa-exclamation-triangle'>").append("Please let us know the city you're interested in");
			$("#autocomplete").focus(); // Put the field with the error in focus so the user can easily retry
			return false;
		}
		else {
			$(".cityError").empty(); // Empty the div so in the case there was a previous error message it is removed
		}


		// Ensure the information is being stored by showing it int he console
		console.log(firstName, lastName, email, password, city);


		// Send the information by posting it via AJAX to a url (url not supplied) and confirm to the user the form is sent
		var details = $("#form").serialize();
		$.post("sendToThisURL", details, function() {
			$(".success").html("The form has submitted successfully");
		});

	});
};

// Call getLocations and getResults functions
emailVerification.init = function() {
	emailVerification.getLocations();
	emailVerification.getResults();
};


// Document ready function 
$(function(){
	emailVerification.init();
});
