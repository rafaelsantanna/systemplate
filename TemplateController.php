<?php
require_once "conn.php";

/*
    type_of_query
    1 - Select all
    2 - Select Where
    3 - Delete
    4 - Insert
    5 - Update
    6 - Duplicate Template
*/

$type_get = isset($_GET["type_of_query"]) ? $_GET["type_of_query"] : 0;
$type_post = isset($_POST["type_of_query"]);

$type_of_query = $type_get != 0 ? $type_get : $type_post;

//Select all
if($type_of_query == 1) {
    $sql = "SELECT * FROM template";
    
    $response = [];
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, [
                "id" => $row["id"],
                "name_template" => $row["name_template"],
                "file_path" => $row["file_path"],
                "type_template" => $row["type_template"],
                "obj_fields" => $row["obj_fields"]
            ]);
        }
    } else {
        $response = array(
            "error" => true,
            "msg" => "not exists data"
        );
    }
    echo json_encode((object)$response);
}

//Select Where
if($type_of_query == 2) {
    $id = $_GET["id"];
    $sql = "SELECT * FROM template WHERE id = $id";
    
    $response = [];
    $result = $mysqli->query($sql);
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, [
                "id" => $row["id"],
                "name_template" => $row["name_template"],
                "file_path" => $row["file_path"],
                "type_template" => $row["type_template"],
                "obj_fields" => $row["obj_fields"]
            ]);
        }
    } else {
        $response = array(
            "error" => true
        );
    }
    echo json_encode((object)$response);
}

//Delete
if($type_of_query == 3) {
    $id = $_POST["id"];
    $sql = "DELETE FROM template WHERE id = $id";
    $response = [];
    
    if($mysqli->query($sql) === TRUE){
        array_push($response, [
            "success" => true
        ]);
    } else {
        array_push($response, [
            "error" => true
        ]);
    }
    echo json_encode((object)$response);
}

//Insert
if($type_of_query == 4) {
    $nametemplate = $_POST["nameTemplate"];
    $file_path = $_POST["file_path"];
    $type_template = $_POST["type_template"];
    $obj_fields = $_POST["obj_fields"];

    $sql = "INSERT INTO template (name_template, file_path, type_template, obj_fields) VALUES('$nametemplate','$file_path',$type_template, '$obj_fields')";

    if($mysqli->query($sql)){
      $response = array(
        "success" => true,
        "nametemplate" => $nametemplate,
        "file_path" => $file_path,
        "type_template" => $type_template,
        "obj_fields" => $obj_fields,
        "insert" => true
      );
    } else {
      $response = array(
        "error" => true
      );
    }
    echo json_encode((object)$response);
}

//Update
if($type_of_query == 5) {
    $nametemplate = $_POST["nameTemplate"];
    $file_path = $_POST["file_path"];
    $type_template = $_POST["type_template"];
    $obj_fields = $_POST["obj_fields"];
    $id = $_POST["id"];

    $sql = "UPDATE template SET name_template = '$nametemplate', file_path = '$file_path', type_template = $type_template, obj_fields = '$obj_fields' WHERE id = $id";
    
    if($mysqli->query($sql)){
      $response = array(
        "success" => true,
        "nametemplate" => $nametemplate,
        "file_path" => $file_path,
        "obj_fields" => $obj_fields,
        "updated" => true
      );
    } else {
      $response = array(
        "error" => true
      );
    }
    echo json_encode((object)$response);
}

if($type_of_query == 6) {
    $id = $_GET["id"];

    $sql = "INSERT INTO template(name_template, file_path, type_template, obj_fields) SELECT name_template, file_path, type_template,obj_fields FROM template WHERE id = $id";

    if($mysqli->query($sql)) {
        $response = array(
            "success" => true,
            "duplicated" => true
        );
    } else {
        $response = array(
            "error" => true
        );
    }
    echo json_encode((object)$response);
}

unset($type_of_query);
$mysqli->close();