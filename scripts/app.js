AWSCognito.config.region = 'us-east-1';

var poolData = {
	UserPoolId : 'us-east-1_6BtY82EfC',
	ClientId : '6heg0pgol84lfctc666063q3rv'
}

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);


function closeConfirmationModal(){
	$('#confirmationModalSession').modal("hide");
}

function closeConfirmationModalSession(){
	$('#confirmationModal').modal("hide");
}


function closeLoginModal(){
	$('#loginModal').modal("hide");
}

function closeMenuModal(){
	$('#menuModal').modal("hide");
}


function showLoginModal(){
	closeMenuModal();
	$('#loginModal').modal("show");
}

function showConfirmationModal(){
	closeMenuModal();
	$('#confirmationModal').modal("show");
}

function showConfirmationModalSession(){
	closeLoginModal();
	var email = localStorage.getItem("email");
	console.log("email 443: " + email);
	$('#confirmation-email-input').val(email);
	$('#confirmationModalSession').modal("show");
}

