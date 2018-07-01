<?php
require_once "conn.php";

$sql = "SELECT * FROM template";

$response = [];
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($response, [
            'id' => $row["id"],
            'name_template' => $row["name_template"]
        ]);
    }
} else {
    $response = array(
        "error" => true
    );
}

// echo json_encode($response);
echo json_encode((object)$response);

$mysqli->close();