<?php
// Add a Object
ini_set("display_errors", 1);

$_ROOT = explode("/public", __DIR__)[0];

// require $_ROOT."/private/api/api.php";
// use Your\API;
// $api = new API();

$uuid = $api->UUID();
$data = array();

// Object Name Check
try {
    if ($api->check("POST", "object_name", "/\w*/", [0, 254], $return)) {
        $object_name = $return;
    }
} catch (Exception $e) {
    $api->close($e->getMessage());
}

// Object Attribute Check
try {
    if ($api->check("POST", "attribute", "/\w*/", [0, 254], $return)) {
        $attribute = $return;
    }
} catch (Exception $e) {
    $api->close($e->getMessage());
}

// Object Visibility Check
try {
    if ($api->check("POST", "visibility", "/\w*/", [0, 254], $return)) {
        $visibility = $return;
    }
} catch (Exception $e) {
    $api->close($e->getMessage());
}

$query = "INSERT INTO Objects (uuid, object_name, attribute, visibility)
VALUES ('$uuid', '$object_name', '$attribute', $visibility);";

if($api->query($query, $rtn)) {
    $data_push = array("Insert Complete"=>"True");
    array_push($data, $data_push);
} else {
    $api->close("Insert Object Invalid");
}

$api->data = $data;

// Close API and sets data
$api->close();