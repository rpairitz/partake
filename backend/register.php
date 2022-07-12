<?php

	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
		or die("<br>Couldn't connect to database");

	$query = "select max(userId) as MAX from partUser";

	$stmt = oci_parse($conn, $query);
	oci_define_by_name($stmt, "MAX", $id);
	oci_execute($stmt);
	oci_fetch($stmt);
	
	$newId = $id + 1;

	$userEmail = $_POST['email'];
	$userPassword = $_POST['password'];

	$postQuery = "insert into partUser (userId, email, password) VALUES ($newId, '$userEmail', '$userPassword')";
	$stmt = oci_parse($conn, $postQuery);
	if(oci_execute($stmt)){
		echo 'Success';
	} else{
		echo 'Failure';
	}

	oci_close($conn);
?>
