<?php
	
	session_start();

	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  	$conn = oci_connect("admin", "admin", "xe")
		or die("<br>Couldn't connect");

	$userEmail = $_POST['email'];
	$userPassword = $_POST['password'];

	$query = "select email, password from partUser where email='$userEmail'";

  	$stmt = oci_parse($conn, $query);
	oci_define_by_name($stmt, "EMAIL", $email); 
	oci_define_by_name($stmt, "PASSWORD", $password); 
  	oci_execute($stmt);

  	if(oci_fetch($stmt)){
		if($password == $userPassword){
			echo 'Success';
			$_SESSION["loggedin"] = true;
			$_SESSION["username"] = $userEmail;
		} else{
			echo 'Password';
		}
	} else{
		echo 'User';
	}

  	oci_close($conn);
	
?>
