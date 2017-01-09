<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/6
 * Time: 下午10:08
 */


header('Content-Type: application/json');

$input = filter_input_array(INPUT_POST);
$course_score = $input['score'];
$course_id = $input['id'];
$stu_id = $_COOKIE['stu_id'];
$tb_name = "tb_course_$stu_id" ;
$mysqli = new mysqli('localhost', 'root', 'root', 'mydb');

if (mysqli_connect_errno()) {
    echo json_encode(array('state' =>'FAIL','mysqli' => mysqli_connect_error()));
    exit;
}

$sql = "UPDATE $tb_name SET course_score=$course_score WHERE id=$course_id";

if ($result=$mysqli->query($sql) == TRUE) {
    echo json_encode($result);
} else {
    echo json_encode(array('state' =>'FAIL','mysqli' => $mysqli->error));
}
mysqli_close($mysqli);

