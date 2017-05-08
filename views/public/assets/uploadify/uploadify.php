<?php

	echo $_FILES["Filedata"]["name"];

	echo $_FILES["Filedata"]["tmp_name"];

	// echo file_exists($_FILES["Filedata"]["tmp_name"]);
	move_uploaded_file($_FILES["Filedata"]["tmp_name"],
      "c:/wamp/www/test/uploads/" . $_FILES["Filedata"]["name"]);

?>