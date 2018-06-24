<?php

  //Functions Lib GD
  $type_template = $_POST['type_template'];
  $uploadedfile = $_FILES['file']['tmp_name'];
  $src = imagecreatefromjpeg($uploadedfile); //creating new image from the upload
  list($width, $height) = getimagesize($uploadedfile); // get width and height from image upload

  if($type_template == 1) {
    $width_type_template = 800;
    $height_type_template = 312;
  } else {
    $width_type_template = 800;
    $height_type_template = 800;
  }

  $tmp = imagecreatetruecolor($width_type_template, $height_type_template); //create image true color
  
  //make name image
  $extension = strtolower(substr($_FILES['file']['name'], -4));
  $hashName = md5(time()) . $extension;
  $filename = 'upload/' . $hashName;

  //copy and resize part of image ($params: img_final, img_upload, positions of img_final & upload, width & height)
  imagecopyresampled($tmp, $src, 0, 0, 0, 0, $width_type_template, $height_type_template, $width, $height);
  imagejpeg($tmp, $filename, 100); //save image to folder
  
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