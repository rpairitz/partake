<?php
	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
			or die("<br>Couldn't connect to database");

	$userSwipedOn = $_POST['userSwipedOn'];
	$userSwiping = $_POST['userSwiping'];
	
	echo "Your id: $userSwiping\n";
	echo "Their id: $userSwipedOn\n";

	$friendQuery = "select liked as MEH from hasSwiped where userGivingId=$userSwipedOn and userReceivingId=$userSwiping";

	$stmt2 = oci_parse($conn, $friendQuery);
	oci_define_by_name($stmt2, "MEH", $like);
	oci_execute($stmt2);
	if(!oci_fetch($stmt2)){
		echo "No rating yet\n";
	} else{
		echo "Rating: $like\n";
		if($like == 1){
			echo "Match!\n";
			$matchQuery = "insert into hasFriend (userId1, userId2) VALUES ($userSwiping, $userSwipedOn)";
			$stmt3 = oci_parse($conn, $matchQuery);
			oci_execute($stmt3);	
		} else{
			echo "Disliked.";
		}
	} 
	
	oci_close($conn);
?>
