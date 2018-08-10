<?php
	
	$img_url = $_POST['img_url'] || "images/download.png";
	$id = $_POST['openid'];
	$time = $_POST['time'];

	echo $img_url.'-'.$id.'-'.$time;
?>