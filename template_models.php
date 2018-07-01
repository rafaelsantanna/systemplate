<?php
require_once "conn.php";

if($_GET["type_of_query"] == 1) {
    $sql = "SELECT * FROM template";

    $response = [];
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, [
                "id" => $row["id"],
                "name_template" => $row["name_template"]
            ]);
        }
    } else {
        $response = array(
            "error" => true
        );
    }
    echo json_encode((object)$response);
}
if($_GET["type_of_query"] == 2) {
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

$mysqli->close();