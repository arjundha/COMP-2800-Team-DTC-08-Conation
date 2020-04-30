<?php 
  $db = mysqli_connect('localhost', 'root', 'root', 'conation');

  // Check usernames in customer table
  if (isset($_POST['username_check'])) {
  	$username = $_POST['username'];
  	$sql = "SELECT * FROM customers WHERE username='$username'";
  	$results = mysqli_query($db, $sql);
  	if (mysqli_num_rows($results) > 0) {
  	  echo "taken";	
  	}else{
  	  echo 'not_taken';
  	}
  	exit();
  }

  // Check usernames in business_owners table
  if (isset($_POST['username_check'])) {
	$username = $_POST['username'];
	$sql = "SELECT * FROM business_owners WHERE username='$username'";
	$results = mysqli_query($db, $sql);
	if (mysqli_num_rows($results) > 0) {
	  echo "taken";	
	}else{
	  echo 'not_taken';
	}
	exit();
	}

  // Check emails in customers table
  if (isset($_POST['email_check'])) {
  	$email = $_POST['email'];
  	$sql = "SELECT * FROM customers WHERE email='$email'";
  	$results = mysqli_query($db, $sql);
  	if (mysqli_num_rows($results) > 0) {
  	  echo "taken";	
  	}else{
  	  echo 'not_taken';
  	}
  	exit();
  }

  // Check emails in business_owners table
  if (isset($_POST['email_check'])) {
	$email = $_POST['email'];
	$sql = "SELECT * FROM business_owners WHERE email='$email'";
	$results = mysqli_query($db, $sql);
	if (mysqli_num_rows($results) > 0) {
	  echo "taken";	
	}else{
	  echo 'not_taken';
	}
	exit();
	}

  // Final check and submit to database
  if (isset($_POST['save'])) {
  	$username = $_POST['username'];
  	$email = $_POST['email'];
	$password = $_POST['password'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$phone = $_POST['phone'];

  	$sqlCustomerUsername = "SELECT * FROM customers WHERE username='$username'";
	$resultsCustomerUsername = mysqli_query($db, $sqlCustomerUsername);
	$sqlCustomerEmail = "SELECT * FROM customers WHERE email='$email'";
	$resultsCustomerEmail = mysqli_query($db, $sqlCustomerEmail);

	$sqlBusinessUsername = "SELECT * FROM business_owners WHERE username='$username'";
	$resultsBusinessUsername = mysqli_query($db, $sqlBusinessUsername);
	$sqlBusinessEmail = "SELECT * FROM business_owners WHERE email='$email'";
	$resultsBusinessEmail = mysqli_query($db, $sqlBusinessEmail);

	if (mysqli_num_rows($resultsCustomerUsername) > 0 && 
		mysqli_num_rows($resultsCustomerEmail) > 0 && 
		mysqli_num_rows($resultsBusinessUsername) > 0 &&
		mysqli_num_rows($resultsBusinessEmail) > 0) {
		echo "exists";	
		exit();
  	} else {
		$query = "CALL create_customer ('$username', '".md5($password)."', '$firstName', '$lastName', '$email', '$phone')";
		// $query = "INSERT INTO users (username, email, password) 
		// 		VALUES ('$username', '$email', '".md5($password)."')";
		$results = mysqli_query($db, $query);
		echo 'Saved!';
		exit();
  	}
  }

?>