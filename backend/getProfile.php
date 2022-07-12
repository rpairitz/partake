<?php

	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
		or die("<br>Couldn't connect to database");
	
	$username = $_POST['email'];

	$query = "select name, userId, bio from partUser where email='$username'";
	$stmt = oci_parse($conn, $query);
	oci_define_by_name($stmt, "NAME", $name);
	oci_define_by_name($stmt, "USERID", $uId);
	oci_define_by_name($stmt, "BIO", $bio);
	oci_execute($stmt);
	if(oci_fetch($stmt)){
		echo "$name~$uId~$bio~";
	}

	$query2 = "select hobbyId from hasHobby where userId=$uId";
	$stmt2 = oci_parse($conn, $query2);
	oci_execute($stmt2);
	while($row = oci_fetch_assoc($stmt2)){
		$hobbyId = $row['HOBBYID'];
		$query3 = "select name, icon from hobby where hobbyId=$hobbyId";
		$stmt3 = oci_parse($conn, $query3);
		oci_define_by_name($stmt3, "NAME", $hobbyName);
		oci_define_by_name($stmt3, "ICON", $icon);
		oci_execute($stmt3);
		oci_fetch($stmt3);
		echo "[$hobbyName~$icon~$hobbyId";
	}
	oci_close($conn);
?>
