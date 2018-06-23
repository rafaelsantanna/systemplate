<?php

  //Functions Lib GD

  $uploadedfile = $_FILES['file']['tmp_name'];
  $src = imagecreatefromjpeg($uploadedfile);
  list($width, $height) = getimagesize($uploadedfile);

  $tmp = imagecreatetruecolor(800, 312);
  
  $extension = strtolower(substr($_FILES['file']['name'], -4));
  $hashName = md5(time()) . $extension;
  $filename = 'upload/' . $hashName;

  imagecopyresampled($tmp, $src, 0, 0, 0, 0, 800, 600, $width, $height);
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