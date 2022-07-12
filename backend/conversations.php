<?php

  header('Access-Control-Allow-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
		  or die("<br>Couldn't connect to database");

  $username = $_POST['username'];
  $convos = array();

  $query = "select userId from partUser where email='$username'";
  $stmt = oci_parse($conn, $query);

  oci_define_by_name($stmt, "USERID", $uID);

  oci_execute($stmt);
  $ret = oci_fetch($stmt);

  if($ret) {

	$convoQuery = "select convoId from conversation where userId=$uID";
	$stmt2 = oci_parse($conn, $convoQuery);

	oci_execute($stmt2);
	
	while($row = oci_fetch_assoc($stmt2)) {
		$convoId = $row['CONVOID'];
		$userArray = array();

		$convoUsersQuery = "select userId from conversation where convoId=$convoId and userId!=$uID";
  		$stmt3 = oci_parse($conn, $convoUsersQuery);
  		oci_execute($stmt3);
		
		while($ur = oci_fetch_assoc($stmt3)){
			$usrId = $ur['USERID'];
			$getNameQuery = "select name, profilePicture from partUser where userId=$usrId";
  			$stmt4 = oci_parse($conn, $getNameQuery);
			oci_define_by_name($stmt4, "NAME", $usrName);
			oci_define_by_name($stmt4, "PROFILEPICTURE", $profPic);
  			oci_execute($stmt4);
			oci_fetch($stmt4);
			array_push($userArray, $usrName);
		}
		
		$numConvoMembers = count($userArray);
		//echo "$numConvoMembers,";
		echo "$convoId~";
		for($x = 0; $x < $numConvoMembers; $x++){
			echo $userArray[$x];
			if($x == $numConvoMembers-1){
				echo "~";
			} else{
				echo ", ";
			}
		}
		if($numConvoMembers > 1){
			echo "generic\n";
		} else{
			echo "$profPic\n";
		}
	}
  }

  oci_close($conn);
?>
