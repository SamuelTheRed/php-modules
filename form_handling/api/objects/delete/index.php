<?php
// Delete an Object
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

$query = "DELETE FROM Objects WHERE Objects.uuid='$uuid'";

if($api->query($query, $rtn)) {
    $data_push = array("Delete Complete"=>"True");
    array_push($data, $data_push);
} else {
    $api->close("Delete Object Invalid");
}

$api->data = $data;
// Close API and sets data
$api->close();