<?php

  header('Access-Control-Allow-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
		  or die("<br>Couldn't connect to database");

  $name = $_POST['name'];
  $convoID = $_POST['convoID'];

  $query = "select userId from partUser where name='$name'";
  $stmt = oci_parse($conn, $query);
  oci_define_by_name($stmt, "USERID", $us);
  oci_execute($stmt);
  $ret = oci_fetch($stmt);

  if($ret) {
	echo "$us\n";
	$insertQuery = "insert into conversation (convoId, userId) VALUES ($convoID, $us)";
	$stmt2 = oci_parse($conn, $insertQuery);
	$r = oci_execute($stmt2, OCI_NO_AUTO_COMMIT);
	 
	if(!$r) {
		echo "failed to add this person to the conversation\n";
		$err = oci_error($stmt2);
		foreach($err as $e) {
			echo "$e";
		}
	}
	else {
		echo "added person to conversation!";
	}

	$r = oci_commit($conn);
  }


  oci_close($conn);
?>
