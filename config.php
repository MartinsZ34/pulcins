<?php
$con = mysqli_connect("localhost","root","","pulcins");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}
mysqli_set_charset($con,"utf8");
date_default_timezone_set("Europe/Riga");
?>