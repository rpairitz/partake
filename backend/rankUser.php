<?php
	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  	$conn = oci_connect("admin", "admin", "xe")
			or die("<br>Couldn't connect");

	$username = $_POST['username'];
	# Get a users id based on their email
	#$username = "imoore1098@example.com";
	$uIdQuery = "select userId, zipcode from partUser where email='$username'";

  	$stmt = oci_parse($conn, $uIdQuery);
	oci_define_by_name($stmt, "USERID", $uId); 
	oci_define_by_name($stmt, "ZIPCODE", $zip);
  	oci_execute($stmt);
	if(oci_fetch($stmt)) {
		
	}
	else {
		echo "fail\n";
	}

	#echo "Got the id: $uId\n";
	#echo "Got the zip: $zip\n";

	# Get a list of a users hobbies based on their id
	$allHobbies = "select hobbyId from hasHobby where userId=$uId";

	$hobbyArray = array(0=>null);
	$stmt2 = oci_parse($conn, $allHobbies);
	oci_execute($stmt2);
	while(($row = oci_fetch_row($stmt2)) != false){
		array_push($hobbyArray, $row[0]);
	}
	
	$hobbyKeys = array();
	$hobbyIds = array();
	#Iterate through a users hobbies and find all other users who share those hobbies
	foreach($hobbyArray as $hobby){
		$sharedHobbyQuery = "select distinct hasHobby.userId from hasHobby, partUser where partUser.userId = hasHobby.userId and hobbyId=$hobby and partUser.userId!=$uId and zipcode=$zip";
		$stmt3 = oci_parse($conn, $sharedHobbyQuery);
		oci_execute($stmt3);

		#Gets all users who share a given hobby
		while(($row = oci_fetch_row($stmt3)) != false){
			$checkQuery1 = "select liked from hasSwiped where userGivingId=$uId and userReceivingId=$row[0]";
			$stmt4 = oci_parse($conn, $checkQuery1);
			oci_define_by_name($stmt4, "LIKED", $liked);
			oci_execute($stmt4);
			
			#Checks to see if user has already seen/rated this person
			if(!oci_fetch($stmt4)){
				$rowString = strval($row[0]);
				if(isset($hobbyKeys[$rowString])){
					$hobbyKeys[$rowString] = $hobbyKeys[$rowString] + 1;
				} else{
					$hobbyKeys[$rowString] = 1;
				}
				if(isset($hobbyIds[$rowString])){
					array_push($hobbyIds[$rowString], $hobby);
				} else{
					$hobbyIds[$rowString] = array($hobby);
				}
			}	
		}
	}
	
	arsort($hobbyKeys);

	foreach($hobbyKeys as $key => $value){
		
		$numHobbies = count($hobbyIds[$key]);
		echo "$numHobbies,";
		foreach($hobbyIds[$key] as $hobby){
			$hobbyNameQuery = "select name, icon from hobby where hobbyId = $hobby";
			$stmt4pt5 = oci_parse($conn, $hobbyNameQuery);
			oci_define_by_name($stmt4pt5, "NAME", $hobbyName);
			oci_define_by_name($stmt4pt5, "ICON", $icon);
			oci_execute($stmt4pt5);
			oci_fetch($stmt4pt5);

			echo "$hobbyName,$icon,";
		}
		
		$userQuery = "select userId, name, bio, profilePicture from partUser where userId=$key";
		$stmt5 = oci_parse($conn, $userQuery);
		oci_define_by_name($stmt5, "USERID", $uid);
		oci_define_by_name($stmt5, "NAME", $n);
		oci_define_by_name($stmt5, "BIO", $b);
		oci_define_by_name($stmt5, "PROFILEPICTURE", $p);
		oci_execute($stmt5);
		oci_fetch($stmt5);
		echo ",$uid,$n,$b,$p\n";

		/*$numHobbies = count($hobbyIds[$key]);
		echo "$numHobbies,";
		foreach($hobbyIds[$key] as $hobby){
			$hobbyNameQuery = "select name, icon from hobby where hobbyId = $hobby";
			$stmt4pt5 = oci_parse($conn, $hobbyNameQuery);
			oci_define_by_name($stmt4pt5, "NAME", $hobbyName);
			oci_define_by_name($stmt4pt5, "ICON", $icon);
			oci_execute($stmt4pt5);
			oci_fetch($stmt4pt5);
			echo "[$hobbyName~$icon~";
		}*/

	}

  	oci_close($conn);
	
?>
