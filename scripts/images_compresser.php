<?php
/* 
* TO-DO
*   1) Read Exisiting Images in "img" folder
*   2) Read Existing Images in "placeholder" folder
*   3) Compare: 
*       question: Are they the same, and every image contains its compressed placeholder ? don't do anything : continue script
*   4) Take images that does not have their placeholders, and compress them
*   5) Save compressed image in "placeholders" folder 
*/

(function() {
    $imgs_count = getImgsCount();
    $placeholders_count = getPlaceholdersCount();//if those 2 match, then do nothing
    if($imgs_count != $placeholders_count) {
        /* 
            THOSE 2 foreach () result example: (if you echo $path);
                img/minimal-minimalistic-cup.png
                img/man-cave-nature.jpg
                img/minimal-minimalistic.jpg
                img/placeholders/palceholder_man-cave-nature.jpg.jpg
                img/placeholders/placeholder_minimal-minimalistic-cup.png.jpg
                img/placeholders/placeholder_minimal-minimalistic.jpg.jpg 
        */
        
        //get images names
        $imgs_names = array();
        $imgs_path = getImgsPath();
        foreach($imgs_path as $path) {
            $name = substr($path, 4); // it cuts "img/"
            array_push($imgs_names, $name);
        }

        //get placeholders names
        $placeholders_names = array ();
        $placeholders_path = getPlaceholdersPath();
        foreach($placeholders_path as $path) {
            $name = substr($path, 29); // it cuts "img/placeholders/placeholder_"
            $name = substr($name, 0, -4); // it cuts placeholder extension, so what we did: img/placeholders/palceholder_man-cave-nature.jpg.jpg ==> man-cave-nature.jpg
            array_push($placeholders_names, $name);
        }

        //check for every single image, if it has placeholder, if it does not, add that image to compress
        $to_compress = array();
        for($i = 0; $i < $imgs_count; $i++){
            $index = array_search($imgs_names[$i], $placeholders_names);
            if($index !== False){
                //it has placeholder
            } elseif($index === False) {
                array_push($to_compress, $imgs_names[$i]);
            }
        }

        //compress files
        for($z = 0; $z < count($to_compress); $z++){
            compress($to_compress[$z]);
        }
        header("Refresh:0");
    }
})();







function getImgsCount() {
    $img_dir = __DIR__ ."/../img/";
    $img_count = 0;
    $files_images = glob($img_dir . "*.{png,jpg}",GLOB_BRACE); //the GLOB_BRACE flag expands {a,b,c} to match 'a', 'b', or 'c'
    if ($files_images){
        $img_count = count($files_images);
    }
    
    return $img_count;
}
function getPlaceholdersCount() {
    $placeholder_dir = __DIR__ ."/../img/placeholders/";
    $placeholder_count = 0;
    $files_placeholders = glob($placeholder_dir . "*.{png,jpg}",GLOB_BRACE); //the GLOB_BRACE flag expands {a,b,c} to match 'a', 'b', or 'c'
    if ($files_placeholders){
        $placeholder_count = count($files_placeholders);
    }
    return $placeholder_count;
}
function getImgsPath() {
    $img_dir = glob('img/*.{png,jpg}',GLOB_BRACE);
    $names_of_imgs = array();
    foreach($img_dir as $img_name) {
        array_push($names_of_imgs, $img_name); //push to array path of file
       // $image = substr($file, 7); // It cuts string in $files till 7th character: Thing cut - "images/"
    }
    return $names_of_imgs;
}
function getPlaceholdersPath() {
    $placeholders_dir = glob('img/placeholders/*.{png,jpg}',GLOB_BRACE);
    $names_of_placeholders = array();
    foreach($placeholders_dir as $placeholder_name) {
        array_push($names_of_placeholders, $placeholder_name); //push to array path of file
       // $image = substr($file, 7); // It cuts string in $files till 7th character: Thing cut - "images/"
    }
    return $names_of_placeholders;
}
function compress($file) {
    $file_type = substr($file, -3);
    $file_path = "img/".$file;

    if($file_type == 'jpg') {
        //CASE FOR JPG
        $img = imagecreatefromjpeg($file_path);
      } elseif($file_type == 'png') {
        //CASE FOR PNG
        $img = imagecreatefrompng($file_path);
      } else {
        echo "INVALID FILE TYPE!";
      }

      ob_start();
      imagejpeg( $img, NULL, 10); //compress image
      imagedestroy( $img );
      $im = ob_get_clean();

      $im = base64_encode( $im );
      $data = 'data:image/jpeg;base64,'.$im;


      list($type, $data) = explode(';', $data);
      list(, $data) = explode(',', $data);
      $data = base64_decode($data);


      file_put_contents('img/placeholders/placeholder_'.$file.'.jpg', $data); //"placeholder_" is part of the name, because it was build for another app

}
?>