<?php

$rand=rand(10,999999);
$temp = explode(".", $_FILES["file"]["name"]);
$img = $_POST['type']=='image' ? $_POST['path']."/".$rand. $_FILES["file"]["name"] : 
		$_POST['path']."/".$rand. $_FILES["file"]["name"].'.'.$_POST['ext'];
 move_uploaded_file($_FILES["file"]["tmp_name"],
  $img);

 echo json_encode(array('img_url'=> $img)); 

?>

