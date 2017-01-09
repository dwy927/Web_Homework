<?php
/**
 * Created by PhpStorm.
 * User: dwy
 * Date: 2017/1/3
 * Time: 下午9:17
 */

header('Content-Type: application/json');

define('ROOT',dirname(__FILE__).'/');

$input = filter_input_array(INPUT_POST);
$username = $input['name'];
$class = $input['class'];
$email = $input['email'];
$stu_id = $input['stu_id'];
$photoPath = "../upload/" . $_FILES["photo"]["name"];
/*
 * 上传照片的格式检查（后缀，大小）
 * 错误类型的返回没做
 */
if ($_FILES["photo"]["error"] > 0)
{
    echo json_encode("Return Code: " . $_FILES["photo"]["error"]);
}
else
{

    if (file_exists("upload/" . $_FILES["photo"]["name"]))
    {
        echo json_encode($_FILES["photo"]["name"] . " already exists. ");
    }
    else
    {
        $srcPath = $_FILES["photo"]["tmp_name"];
        $res =  move_uploaded_file($srcPath,$photoPath);
        if ($res == false){
            echo json_encode("FAIL" . $_FILES["photo"]["error"]);
        }
    }
}
$mysqli = new mysqli('localhost', 'root', 'root', 'mydb');
if (mysqli_connect_errno()) {
  echo json_encode(array('mysqli' => 'Failed to connect to MySQL: ' . mysqli_connect_error()));
  exit;
}
$INSERT = "UPDATE stu SET name='" . $username . "',class='" . $class . "',email= '". $email . "',photo='". $photoPath ."' WHERE stu_id='" . $stu_id . "'";
$mysqli->query($INSERT);
echo json_encode($stu_id);