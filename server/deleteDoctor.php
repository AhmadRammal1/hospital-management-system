<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if(!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

$userId = $_POST["userId"];

$delete_query = $mysqli->prepare("DELETE FROM doctors WHERE UserID = ?");
$delete_query->bind_param("i", $userId);
$delete_done1 = $delete_query->execute();

$delete_query = $mysqli->prepare("DELETE FROM users WHERE UserID = ?");
$delete_query->bind_param("i", $userId);
$delete_done2 = $delete_query->execute();

if($delete_done1 && $delete_done2){
    echo json_encode("User Deleted successfully.");
}
else{
    echo json_encode("Error Deleting Doctor");
}
