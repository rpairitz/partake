<?php

  header('Access-Control-Allow-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
  		  or die("<br>Couldn't connect to database");

  $hobbies = array();

  $query = "select name from hobby where hobbyId in (select hobbyId from hasHobby where userId=1235)";

  $stmt = oci_parse($conn, $query);
  if(oci_execute($stmt)) {
	while($row = oci_fetch_assoc($stmt)) {
	  $hobbies[] = $row['NAME'] . "\n";
	}
  }

  else {
	echo "failed";
  }

  foreach($hobbies as $hob) {
	echo "$hob";
  }
?>
