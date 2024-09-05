<?php
// Update an Object
ini_set("display_errors", 1);

$_ROOT = explode("/public", __DIR__)[0];

// require $_ROOT."/private/api/api.php";
// use Your\API;
// $api = new API();

$data = array();

// UUID Check
try {
    if ($api->check("POST", "uuid", "/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/", [36, 36], $return, true)) {
        $uuid = $return;
    }
} catch (Exception $e) {
    $api->close($e->getMessage());
}

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

$query = "UPDATE Objects SET object_name='$object_name', 
attribute='$attribute', visibility=$visibility
WHERE uuid='$uuid';";

if($api->query($query, $rtn)) {
    $data_push = array("Update Complete"=>"True");
    array_push($data, $data_push);
} else {
    $api->close("Update Object Invalid");
}

$api->data = $data;

// Close API and sets data
$api->close();