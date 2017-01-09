<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/5
 * Time: 下午2:28
 */

header('Content-Type: application/json');

$input = filter_input_array(INPUT_POST);
$course_name = $input['name'];
$course_week = $input['week'];
$course_time = $input['time'];
$course_id = $input['id'];
$stu_id = $_COOKIE['stu_id'];
$tb_name = "tb_course_$stu_id" ;
$mysqli = new mysqli('localhost', 'root', 'root', 'mydb');

if (mysqli_connect_errno()) {
    echo json_encode(array('state' =>'FAIL','mysqli' => mysqli_connect_error()));
    exit;
}

if ($input['action'] === 'edit') {
    $sql = "SELECT * FROM $tb_name WHERE course_week=$course_week AND course_time=$course_time";
    if($mysqli->query($sql) === FALSE){
        echo json_encode(array('state' =>'FAIL','mysqli' => $mysqli->error));
        exit;
    }else if($mysqli->affected_rows != 0){
        echo json_encode(array('state' =>'FAIL','mysqli' => "该时段以有课程,请先确认删除该课程"));
        exit;
    }
    $sql = "INSERT INTO $tb_name (course_name, course_week,course_time) VALUES ('$course_name',$course_week,$course_time)";
}else if ($input['action'] === 'delete') {
    $sql = "delete from $tb_name WHERE id= $course_id" ;
}
if ($result=$mysqli->query($sql) == TRUE) {
    echo json_encode($result);
} else {
    echo json_encode(array('state' =>'FAIL','mysqli' => $mysqli->error));
}
mysqli_close($mysqli);

