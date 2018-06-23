<?php

  //Functions Lib GD
  $type_template = $_POST['type_template'];
  $uploadedfile = $_FILES['file']['tmp_name'];
  $src = imagecreatefromjpeg($uploadedfile);
  list($width, $height) = getimagesize($uploadedfile);

  if($type_template == 1) {
    $width_type_template = 800;
    $height_type_template = 312;
  } else {
    $width_type_template = 800;
    $height_type_template = 800;
  }

  $tmp = imagecreatetruecolor($width_type_template, $height_type_template);
  
  $extension = strtolower(substr($_FILES['file']['name'], -4));
  $hashName = md5(time()) . $extension;
  $filename = 'upload/' . $hashName;

  imagecopyresampled($tmp, $src, 0, 0, 0, 0, $width_type_template, $height_type_template, $width, $height);
  imagejpeg($tmp, $filename, 100);
  
  if ($uploadedfile) {
    $response = array(
      "success" => true,
      "file" => $filename
    );
    echo json_encode((object)$response);
  } else {
    $response = array("error" => true);
    echo json_encode((object)$response);
  }
?>