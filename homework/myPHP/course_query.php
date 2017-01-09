<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/6
 * Time: 下午1:17
 */

header('Content-Type: application/json');
$stu_id = $_GET['stu_id'];
$tb_name = "tb_course_$stu_id" ;

$mysqli = new mysqli('127.0.0.1', 'root', 'root', 'mydb');

if (mysqli_connect_errno()) {
    echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit;
}
$count = count($_GET);
$i=0;
$query_question="select * from $tb_name where ";
foreach ($_GET as $key => $value) {
    if($key == "stu_id"){
        $i++;
        continue;
    }
    if($i == 0){
        $query_question .= "$key = '$value'";
    }
    else{
        $query_question .= " and $key = '$value'";
    }
    $i++;
}
$result=$mysqli->query($query_question);
$t=0;
$arr=array();
while ($row = $result->fetch_row()){
    $arr[$t] = $row;
    $t++;
}

if($t>0){
    $result_arr=array("data"=>$arr,"msg"=>"SUCCESS");
}else{
    $result_arr=array("data"=>$arr,"msg"=>"NONE");
}
mysqli_close($mysqli);
echo json_encode($result_arr);