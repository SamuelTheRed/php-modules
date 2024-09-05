<?php
// Retrieve Items
ini_set("display_errors", 1);

$_ROOT = explode("/public", __DIR__)[0];

// require $_ROOT."/private/api/api.php";
// use Your\API;
// $api = new API();

$query = "SELECT * FROM Users ORDER BY object_name, attribute;";

if($api->query($query, $rtn)) {
    $api->data["role_based_return"] = $rtn;
} else {
    $api->close("No View Grants");
}

$api->data = $data;
// Close API and sets data
$api->close();