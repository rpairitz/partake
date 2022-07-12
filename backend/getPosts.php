<?php

	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
			or die("<br>Couldn't connect to database");

	$hobbyID = $_POST['hobbyID'];

	$query = "select postId, senderId, content, createdAt from post where hobbyId=$hobbyID";

	$stmt = oci_parse($conn, $query);

	oci_execute($stmt);
	while($row = oci_fetch_assoc($stmt)) {
		echo $row['POSTID'] . "~" . $row['SENDERID'] . "~" . $row['CONTENT'] . "~" . $row['CREATEDAT'] . "\n";
	}

	oci_close($conn);
?>
