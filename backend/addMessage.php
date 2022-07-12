<?php

  header('Access-Control-Allow-Origin: *');
  putenv("ORACLE_HOME=/u01/app/oracle/product/11.2.0/xe/");

  $conn = oci_connect("admin", "admin", "xe")
		  or die("<br>Couldn't connect to database");

  $messageID = $_POST['messageID'];
  $convoID = $_POST['convoID'];
  $senderID = $_POST['senderID'];
  $content = $_POST['content'];
  $sentDate = $_POST['sentDate'];
  $sentTime = $_POST['sentTime'];
  $createdAt = $_POST['createdAt'];

  $query = "insert into message (messageId, convoId, senderId, content, sentDate, sentTime, createdAt) VALUES ('$messageID', $convoID, $senderID, '$content', '$sentDate', '$sentTime', '$createdAt')";

  $stmt = oci_parse($conn, $query);
  $r = oci_execute($stmt, OCI_NO_AUTO_COMMIT);
  if(!$r) {
	echo "Failed adding this message to the db!";
	$err = oci_error($stmt);
	foreach($err as $e) {
	  echo "$e";
	}
  }
  else {
	echo "added to DB!";
  }

  $r = oci_commit($conn);

  oci_close($conn);
?>
