<?php
    require_once "conn.php";

    $nametemplate = $_POST['nameTemplate'];
    $file_path = $_POST['file_path'];
    $type_template = $_POST['type_template'];
    $obj_fields = $_POST['obj_fields'];

    $sql = "INSERT INTO template (name_template, file_path, type_template, obj_fields) VALUES('$nametemplate','$file_path',$type_template, '$obj_fields')";

    if($mysqli->query($sql)){
      $response = array(
        "success" => true,
        "nametemplate" => $nametemplate,
        "file_path" => $file_path,
        "type_template" => $type_template,
        "obj_fields" => $obj_fields
      );
    } else {
      $response = array(
        "error" => true
      );
    }
    echo json_encode((object)$response);
?>