<?php
  header('Access-Control-Allow-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
		  or die("<br>Couldn't connect to database");

  $convoID = $_POST['convoID'];
  $messages = array();

  $newQuery = "select * from message where senderId in (select userId from conversation where convoId=$convoID) and convoId=$convoID order by sentDate desc, sentTime desc";
  $stmt2 = oci_parse($conn, $newQuery);
  if(oci_execute($stmt2)) {
	while($row = oci_fetch_assoc($stmt2)) {
	  $messages[] = $row['MESSAGEID'] . "|" . $row['CONVOID'] . "|" . $row['SENDERID'] . "|" . $row['CONTENT'] . "|" . $row['SENTDATE'] . "|" . $row['SENTTIME'] . "|" . $row['CREATEDAT'] . "\n";
  	}
  }
	else {
	  echo "failed";
	  $err = oci_error($stmt2);
	  foreach($err as $e) {
	    echo "$e";
	  }
	}

  foreach($messages as $mes) {
	echo "$mes";
  }

  oci_close($conn);
?>
