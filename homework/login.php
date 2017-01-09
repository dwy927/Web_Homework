<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/7
 * Time: 下午12:12
 */

$input = filter_input_array(INPUT_POST);
$id = $input['username'];
$password = $input['password'];


$mysqli = new mysqli('localhost', 'root', 'root', 'mydb');

if (mysqli_connect_errno()) {
    echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
    exit;
}

$sql = "SELECT stu_id FROM stu WHERE stu_id='$id' AND password=PASSWORD('$password')";
$result = $mysqli->query($sql);
mysqli_close($mysqli);

if ($result->num_rows!=0){
    $res=setcookie("stu_id", $id, 0, "/", "localhost", 0);
    echo '<meta http-equiv="refresh" content="1;url=./myPage/homepage.html">';
}else{
    echo "登陆错误，用户名不存在或密码错误，请重新登陆";
    echo '<meta http-equiv="refresh" content="1;url=./login.html">';
}




