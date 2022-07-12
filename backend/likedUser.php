<?php
	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
			or die("<br>Couldn't connect to database");

	$userSwipedOn = $_POST['userSwipedOn'];
	$userSwiping = $_POST['userSwiping'];
	$userSwipe = $_POST['liked'];
	
	$query = "insert into hasSwiped (userGivingId, userReceivingId, liked) VALUES ($userSwiping, $userSwipedOn, $userSwipe)";

	$stmt = oci_parse($conn, $query);
	$r = oci_execute($stmt, OCI_NO_AUTO_COMMIT);

	if(!$r) {
		echo "failed inserting into db";
		$err = oci_error($stmt);
		foreach($err as $e) {
			echo "$e";
		}
	}
	else {
		echo "inserted swipe in db!";
	}

	$r = oci_commit($conn);

	if($userSwipe === "1") {
		$query2 = "select liked from hasSwiped where userGivingId=$userSwipedOn and userReceivingId=$userSwiping";
		$stmt2 = oci_parse($conn, $query2);
		oci_define_by_name($stmt2, "LIKED", $like);
		oci_execute($stmt2);
		if(!oci_fetch($stmt2)) {
			echo "no rating yet\n";
		}
		else {
			echo "$like\n";
			if($like == 1) {
				echo "Match!\n";
				$matchQuery = "insert into hasFriend (userId1, userId2) VALUES ($userSwiping, $userSwipedOn)";
				$stmt3 = oci_parse($conn, $matchQuery);
				$r = oci_execute($stmt3, OCI_NO_AUTO_COMMIT);
				if(!$r) {
					echo "Failed adding to hasFriend";
					$err = oci_error($stmt3);
					foreach($err as $e) {
						echo "$e";
					}
				}
				else {
					echo "inserted match in db!";
				}
			}
		}
	}

	$r = oci_commit($conn);
		
	oci_close($conn);
?>
