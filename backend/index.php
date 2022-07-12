<html>
<?php
	session_start();
	if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
		echo "You're already logged in";
	}

	putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

	$conn = oci_connect("admin", "admin", "xe")
		or die("<br>Couldn't connect");

	echo "Connected to Oracle!";

	$query = "select user from dual";

	$stmt = oci_parse($conn, $query);
	oci_define_by_name($stmt, "USER", $u);
	oci_execute($stmt);
	oci_fetch($stmt);

	echo "The user is: $u";

	oci_close($conn);
?>
</html>


