/*
If you use a verification link instead of a code (Cognito/MessageCustumizations) you 
have to set up a domain under Cognito/AppIntegration
*/

//signing up user
document.getElementById("signup-btn").addEventListener("click", (e) => {
	e.preventDefault();

	var email = document.getElementById("email-signup").value;
	var password = document.getElementById("password-signup").value;

	localStorage.setItem("email", email);
	localStorage.setItem("password", password);

	// attributeList is an array of the required attributes
	var attributeList = [];

	var dataEmail = {
		Name : 'email',
		Value : email
	}


	attributeList.push(dataEmail);

	userPool.signUp(email, password, attributeList, null, function(err, result){
		if(err){
			alert(err);
			return;
		}

	cognitoUser = result.user;
	console.log("username is: " + cognitoUser.getUsername());
	// window.location.replace("home-page.html");

	showConfirmationModalSession();


	});

});


//confirming user from session confirm
document.getElementById("confirmation-btn").addEventListener("click", (e) => {
	e.preventDefault();

	var confirmationCode = document.getElementById("confirmation-code-input").value;
	var email = document.getElementById("confirmation-email-input").value;

	var userData = {
		Username : email,
		Pool : userPool
	}

	var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

	cognitoUser.confirmRegistration(confirmationCode, true, function(err, result){
		if(err){
			alert(err);
			return;
		}

		var authenticationData = {
			Username : localStorage.getItem("email"),
			Password : localStorage.getItem("password")
		};

		localStorage.clear();

		var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function(result){
				//I guess tokens just get automatically sent to local storage
				console.log('access token : ' + result.getAccessToken().getJwtToken());

				window.location.replace("home.html");
			},

			onFailure: function(err){
				alert(err);
			}
		});

		console.log("call result: " + result);
	});
});


//confirming user (that returns to the site)
document.getElementById("confirmation-btn2").addEventListener("click", (e) => {
	e.preventDefault();

	var confirmationCode = document.getElementById("confirmation-code-input2").value;
	var email = document.getElementById("confirmation-email-input2").value;

	var userData = {
		Username : email,
		Pool : userPool
	}

	var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

	cognitoUser.confirmRegistration(confirmationCode, true, function(err, result){
		if(err){
			alert(err);
			return;
		}

		var authenticationData = {
			Username : localStorage.getItem("email"),
			Password : localStorage.getItem("password")
		};

		localStorage.clear();

		var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function(result){
				//I guess tokens just get automatically sent to local storage
				console.log('access token : ' + result.getAccessToken().getJwtToken());

				window.location.replace("home.html");
			},

			onFailure: function(err){
				alert(err);
			}
		});

		console.log("call result: " + result);
	});
});


//logging in user
document.getElementById("login-btn").addEventListener("click", (e) => {
	e.preventDefault();

	var email = document.getElementById("inputEmailLogin").value;
	var password = document.getElementById("inputPasswordLogin").value;
	console.log("email: " + email);
	console.log("password: " + password);
	var authenticationData = {
		Username : email,
		Password : password
	};

	// attributeList is an array of the required attributes
	var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

	var userData = {
		Username : email,
		Pool : userPool
	}

	var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
	// var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.cognitoUser(userData);

	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: function (result){
			console.log('access token + ' + result.getAccessToken().getJwtToken());
			window.location.replace("home.html");
		},

		onFailure: function(err){
			alert(err);
		}
	});

});

// document.getElementById("loguot-submit-button").addEventListener("click", (e) => {
// 	e.preventDefault();
// 	var cognitoUser = userPool.getCurrentUser();
// 	if(cognitoUser){
// 		cognitoUser.signOut();
// 	}
// });




