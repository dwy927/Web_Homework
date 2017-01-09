<?php
$input = filter_input_array(INPUT_POST);
$id = $input['username'];
$password = $input['password'];
$tb_name = "tb_course_$id" ;

$mysqli = new mysqli('localhost', 'root', 'root', 'mydb');

if (mysqli_connect_errno()) {
  echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
  exit;
}

$sql = "INSERT stu SET stu_id='$id' ,password=PASSWORD('$password')";
$result = $mysqli->query($sql);

if ($result) {
    $sql = "CREATE TABLE $tb_name (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        course_name VARCHAR(30) NOT NULL,
        course_week INT(3) NOT NULL,
        course_time INT(3) NOT NULL,
        course_score INT(3)
        )";
    $result = $mysqli->query($sql);
    if ($result) {
        echo "注册成功，即将跳转至登陆界面！";
        echo '<meta http-equiv="refresh" content="1;url=./login.html">';
    }
}else{
    echo "注册失败（有可能该学号已被注册）,请重新注册！";
    echo '<meta http-equiv="refresh" content="0.5;url=./register.html">';
}


mysqli_close($mysqli);
