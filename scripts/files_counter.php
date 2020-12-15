<?php
/*
* Code below, gets directory "imag/placholders/" and counts number of files in it.
*/
    $directory = __DIR__ ."/../img/placeholders/";
    $filecount = 0;
    $files = glob($directory . "*.{png,jpg}",GLOB_BRACE); //the GLOB_BRACE flag expands {a,b,c} to match 'a', 'b', or 'c'
    if ($files){
        $filecount = count($files);
    }

/* 
* In html we have 3 colummns that contain images, in order to know how many images generate in each column we do this:
*/
    if($filecount % 3 == 1) {
        $filecount_col1 = (($filecount - 1) / 3) + 1;
        $filecount_col2 = ($filecount - 1) / 3;
        $filecount_col3 = ($filecount - 1) / 3;
    } elseif($filecount % 3 == 2){
        $filecount_col1 = (($filecount - 2) / 3) + 1;
        $filecount_col2 = (($filecount - 2) / 3) + 1;
        $filecount_col3 = ($filecount - 2) / 3;
    } else {
        $filecount_col1 = $filecount / 3;
        $filecount_col2 = $filecount / 3;
        $filecount_col3 = $filecount / 3;
    }

?>
