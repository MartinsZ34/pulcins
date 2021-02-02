<?php
require_once 'config.php';

if($_POST['action'] == 'load_results'){
    $load_results_query = "SELECT * FROM students ORDER BY name ASC LIMIT 10";
    $results = mysqli_query($con, $load_results_query);
    while($row = mysqli_fetch_assoc($results))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}

if($_POST['action'] == 'update_row'){
    //var_dump($received_data);//1. step
    $output = array();
    $student_id = $_POST['student_id'];
    $name = $_POST['name'];
    $class_id = $_POST['class_id'];

    $insert_query = "UPDATE students SET name = '$name', class_id = $class_id WHERE id = '$student_id'";

    $result = mysqli_query($con, $insert_query);
    

    $output = array(
        //"last_id" => mysqli_insert_id($con)//Šādi der uz INSERT, ne UPDATE
        "last_id" => $student_id
    );
    echo json_encode($output);
    
}
?>