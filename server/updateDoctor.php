<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if(!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

try {
    $userIdToUpdate = $_POST["userId"];
    $username = $_POST["username"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $spec = $_POST["specialization"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $update_user_query = $mysqli->prepare("UPDATE users SET Username = ?, Full_Name = ?, Phone_Number = ?, Password = ? WHERE UserID = ?");
    $update_user_query->bind_param("ssisi", $username, $name, $phone, $password, $userIdToUpdate);
    $update_user_done = $update_user_query->execute();

    $userId = $mysqli->insert_id;

    $update_doctor_query = $mysqli->prepare("UPDATE doctors SET Specialization = ? WHERE UserID = ?");
    $update_doctor_query->bind_param("si", $spec, $userIdToUpdate);
    $update_doctor_done = $update_doctor_query->execute();
} catch (\Throwable $th) {
    throw $th;
}

if ($update_user_done && $update_doctor_done) {
    echo json_encode("User Updated successfully.");
} else {
    echo json_encode("Error Adding Doctor");
}
