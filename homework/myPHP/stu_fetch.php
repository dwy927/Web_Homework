<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/4
 * Time: 下午9:25
 */

header('Content-Type: application/json');

$stu_id = $_GET["stu_id"];
$ret = array();

$mysqli = new mysqli('localhost', 'root', 'root', 'mydb');
if (mysqli_connect_errno()) {
    echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit;
}
$QUERY = "SELECT name,class,email,photo FROM stu WHERE stu_id='" . $stu_id . "'";
$result = $mysqli->query($QUERY)->fetch_array();
$ret = array(
    "username"=>$result['name'],
    "class" => $result['class'],
    "email" => $result['email'],
    "photoPath" => $result['photo']);

echo json_encode($ret);