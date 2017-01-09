<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/5
 * Time: 下午9:40
 */

header('Content-Type: application/json');

$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'mydb');
$stu_id = $_GET['stu_id'];
$tb_name = "tb_course_$stu_id";
if (mysqli_connect_errno()) {
    echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit;
}
$result_arr=array();
$arr=array();
$i=0;

$result=$mysqli->query("select * from $tb_name");
while ($row = $result->fetch_row()){
    $arr[$i] = $row;
    $i++;
}


$result_arr=array("data"=>$arr,"msg"=>"SUCCESS");

mysqli_close($mysqli);
echo json_encode($result_arr);
