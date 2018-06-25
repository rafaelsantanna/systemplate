<?php
    require_once "conn.php";

    $nametemplate = $_POST['nameTemplate'];
    $file_path = $_POST['file_path'];
    $type_template = $_POST['type_template'];
    $positions = $_POST['positions'];

    

    $sql = "INSERT INTO template (name_template, file_path, type_template, positions) VALUES('$nametemplate','$file_path',$type_template, '$positions')";

    if($mysqli->query($sql)){
      $response = array(
        "success" => true,
        "nametemplate" => $nametemplate,
        "file_path" => $file_path,
        "type_template" => $type_template,
        "positions" => $positions,
      );
    } else {
      $response = array(
        "error" => true
      );
    }
    echo json_encode((object)$response);
?>