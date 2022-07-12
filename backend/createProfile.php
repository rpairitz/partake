<?php

	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
		or die("<br>Couldn't connect to database");

	
	$username = $_POST['username'];
	$fullName = $_POST['name'];
	$bio = $_POST['bio'];
	$zipCode = $_POST['zipCode'];

	$postQuery = "UPDATE partUser SET name='$fullName', bio='$bio', zipcode='$zipCode' where email='$username'";
	$stmt = oci_parse($conn, $postQuery);
	if(oci_execute($stmt)){
		echo 'Success';
	} else{
		echo 'Failure';
	}

	oci_close($conn);
?>
