<?php
	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
			or die("<br>Couldn't connect to database");

	$query0 = "select max(convoId) as MAX from conversation";
	$stmt0 = oci_parse($conn, $query0);
	oci_define_by_name($stmt0, "MAX", $maxConvoId);
	oci_execute($stmt0);
	oci_fetch($stmt0);

	$newId = $maxConvoId + 1;

	$currentUser = $_POST['userID'];
	$friendID = $_POST['friendID'];

	$query = "insert into conversation (convoId, userId) VALUES ($newId, $currentUser)";
	$stmt = oci_parse($conn, $query);

	$r = oci_execute($stmt);
	if(!$r) {
		echo "Failed adding current user to a conversation";
		$err = oci_error($stmt);
		foreach($err as $e) {
			echo "$e";
		}
	}
	else {
		echo "$newId~";
	}

	$query2 = "insert into conversation (convoId, userId) VALUES ($newId, $friendID)";
	$stmt2 = oci_parse($conn, $query2);

	$r = oci_execute($stmt2);
	if(!$r) {
		echo "Failed adding other user to a new conversation";
		$err = oci_error($stmt2);
		foreach($err as $e) {
			echo "$e";
		}
	}
	else {
		echo "$newId";
	}

	oci_close($conn);
?>
