<?php
  header('Access-Allow-Control-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
  		  or die("<br>Couldn't connect to database");

  $email = $_POST['username'];

  $query = "select userId from partUser where email='$email'";

  $stmt = oci_parse($conn, $query);
  oci_define_by_name($stmt, "USERID", $uID);

  oci_execute($stmt);
  oci_fetch($stmt);

  echo "$uID";

  oci_close($conn);
?>
