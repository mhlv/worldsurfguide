<?php
$link=mysqli_connect("localhost", "user", "passwords", "db_name");

	if (!$link) {
		die('ERROR' . mysql_error());
	}
?>
