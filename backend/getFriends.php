<?php
	header('Access-Control-Allow-Origin: *');
	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
			or die("<br> Couldn't connect to database");

	$friends = array();
	$username = $_POST['username'];

	$query = "select userId from partUser where email='$username'";
	$stmt = oci_parse($conn, $query);

	oci_define_by_name($stmt, "USERID", $uID);
	oci_execute($stmt);
	oci_fetch($stmt);

	$friendQuery = "select name, userId from partUser where userId in (select userId1 from hasFriend where userId2=$uID UNION select userId2 from hasFriend where userId1=$uID)";
	$stmt2 = oci_parse($conn, $friendQuery);
	if(oci_execute($stmt2)) {
		while($row = oci_fetch_assoc($stmt2)) {
			$friends[] = $row['NAME'] . "~" . $row['USERID'] . "\n";
		}
	}
	else {
		echo "execute failed";
	}

	foreach($friends as $f) {
		echo "$f";
	}

	oci_close($conn);
?>
