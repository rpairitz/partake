<?php
	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  	$conn = oci_connect("admin", "admin", "xe")
		or die("<br>Couldn't connect");

	#$userEmail = $_POST['email'];
	$userEmail = "imoore1098@example.com";
	$friendId = 382;

	# Get a users id based on their email
	$uIdQuery = "select userId from partUser where email='$userEmail'";

  	$stmt = oci_parse($conn, $uIdQuery);
	oci_define_by_name($stmt, "USERID", $uId); 
  	oci_execute($stmt);
	oci_fetch($stmt);

	# Get the friends name based on their id
	$friendNameQuery = "select name from partUser where userId=$friendId";
  	$stmt = oci_parse($conn, $friendNameQuery);
	oci_define_by_name($stmt, "NAME", $friendName); 
  	oci_execute($stmt);
	oci_fetch($stmt);

	echo "$friendName~";

	# Get a list of a users hobbies based on their id
	$getHobbiesQuery = "select hobbyId from hasHobby where userId=$uId";

	$userOneHobbies = array();
	$matchedHobbies = array();
	$matchedHobbyNames = array();
	$stmt2 = oci_parse($conn, $getHobbiesQuery);
	oci_execute($stmt2);
	while(($row = oci_fetch_row($stmt2)) != false){
		$matchQuery = "select hobbyId from hasHobby where userId=$friendId and hobbyId=$row[0]";
		$stmt3 = oci_parse($conn, $matchQuery);
		oci_define_by_name($stmt3, "HOBBYID", $matchedHobby);
		oci_execute($stmt3);
		oci_fetch($stmt3);
		if($matchedHobby){
			$getHobbyNameQuery = "select name from hobby where hobbyId=$matchedHobby";
			$stmt4 = oci_parse($conn, $getHobbyNameQuery);
			oci_define_by_name($stmt4, "NAME", $hobbyName);
			oci_execute($stmt4);
			oci_fetch($stmt4);
			echo "$hobbyName~";
			$matchedHobby = null;
		} else{
		}
	}

	
  	oci_close($conn);
	
?>
