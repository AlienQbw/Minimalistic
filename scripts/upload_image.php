<?php
/* files uploader */

$validation_ok = false;
$target_dir = "../img/";
$file = basename($_FILES["fileToUpload"]["name"]);
$future_path = $target_dir.$file;
$file_info = pathinfo($future_path);

$file_extension = strtolower($file_info['extension']);

//we want to check if it's not a fake image:

    if(isset($_POST['submit'])){
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            $validation_ok = true;
        } else {
            $validation_ok = false;
            echo 'wrong file!';
            returnToMainPage();
        }
        /* LIMIT TYPE */
        if($file_extension == 'jpg' || $file_extension == 'png') {
            $validation_ok = true;
        } else {
            $validation_ok = false;
            echo 'wrong file type, supported only: jpg,png';
            returnToMainPage();
        }
        if($validation_ok == false) {
            echo "Can't upload an image.. ERROR";
            returnToMainPage();
        } else {
            generateName($target_dir, $file);
        }
    }

//Check if image with that name and a random generated key already exists, if yes, generate key again
function checkIfExists($new_path, $name, $old_path){
    if(file_exists($new_path)){
        generateName($old_path, $name);
    } else {
        uploadFile($new_path);
    }
}


//Function genereates random key and adds it at the begining of the name then sends it to checkIfExists() function
function generateName($path, $name){
    $key = rand(0, 1000);
    $old_path = $path;
    $path = $path.$key."-".$name;
    checkIfExists($path, $name, $old_path);
}

//Upload an image;
function uploadFile($path){
    move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $path);
    returnToMainPage();
}


function returnToMainPage() {
    $current = "/scripts/upload_image.php";
    $goto = "/index.php";
    $url = $_SERVER['REQUEST_URI'];
    $main = substr($url, 0, -(strlen($current)));
    $url = $main.$goto;
    echo $url;
    header("Location: $url");
}
?>