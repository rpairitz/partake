<?php

  header('Access-Control-Allow-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
		  or die("<br>Couldn't connect to database");

  $hobbies = $_POST['hobbies'];
  $username = $_POST['username'];

  $query = "select userId from partUser where email='$username'";
  $stmt = oci_parse($conn, $query);

  oci_define_by_name($stmt, "USERID", $us);

  oci_execute($stmt);
  $ret = oci_fetch($stmt);

  if($ret) {
	echo "$us\n";
	foreach ($hobbies as $hob) {
	  echo "$hob\n";
	  $hobbyQuery = "select hobbyId from hobby where name='$hob'";
	  $stmt2 = oci_parse($conn, $hobbyQuery);
	  oci_define_by_name($stmt2, "HOBBYID", $id);
	  oci_execute($stmt2);
	  oci_fetch($stmt2);

	  echo "Hobby ID is: $id\n";
	  $postQuery = "insert into hasHobby (userId, hobbyId) VALUES ($us, $id)";
	  $stmt3 = oci_parse($conn, $postQuery);
	  if(oci_execute($stmt3)) {
		echo "Success adding hobbies to user account";
	  }
	}
  }

  oci_close($conn);
?>
