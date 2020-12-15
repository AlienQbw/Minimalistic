<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/overlay.css">
    <link rel="icon" href="resources/favicon.png" type="image/png" sizes="16x16">
    <script src="scripts/images_generator.js"></script>
    <script src="scripts/images.js"></script>
    <script src="scripts/search.js"></script>
    <title>Minimalistic</title>
</head>
<body>
<?php include 'scripts/files_counter.php'?>
<?php include 'scripts/images_compresser.php'?>
    <div class="overlay">
        <img class="overlay__image" src="" alt="">
        <table class="overlay__information__table">
                <tr>
                        <th>Dimensions:</th>
                        <td class="overlay__information__dimensions">%1920x1080%px</td>
                </tr>
                <tr>
                        <th>Format:</th>
                        <td class="overlay__information__format">%JPG%</td>
                </tr>
                <tr>
                        <th>Tags:</th>
                        <td class="overlay__information__tags">"%Trees%",<br> "%Cave%", <br>"%Nature%"</td>
                </tr>
                <tr>
                        <th>Download:</th>
                        <td><a class="overlay__information__download" href="" target="_blank">Link</a></td>
                </tr>
        </table>
    </div>
    <!-- HEADER -->
    <div class="top__header">
        <div class="header">
            <h1 class="welcome__header">Welcome To Minimalistic</h1>
            <p>The perfect place, to discover a perfect wallpaper.</p>
        </div>
        <div class="search">
                <div class="autocomplete">
                        <input class="search__bar__btn" type="button" value="Search" onClick="search()">
                        <input class="search__bar" type="text" placeholder="Search for wallpapers.." onClick="autocompleteBox()">
                        <div class="search__bar__help" title="Type a letter in order to find matching keywords, if you don't see tag it means it was not added yet'"><span title="">?</span></div>
                </div>
        </div>
        <div class="upload__button">
                <button><a href="upload.php">Upload</a></button>
        </div>
    </div>
    <!-- MAIN CONTAINER -->
    <div class="content">
        <div class="col" id="col1">
        <!--
            <div class="image__container" id="image-1">
                    <img class="image" src="img/example (1).jpg" alt="404">
            </div>
        -->
        <?php
        /*
        * Code below, creates img tags in html with img inside based on the number of images in the "img/" directory
        * @param $filecount is from the file "scripts/script.php", it stores number of files in "img/" directory
        * It is repeated in every column
        */
                $element = "
                        <div class='image__container'>
                        <img loading='lazy' class='image' src='preload.jpg' alt='404'>
                        </div>
                ";      //Image containes 'pixel.png' very low quality picture in order to
                        //later on swap it with a high quality one
                for ($i = 0; $i < $filecount_col1; $i++){
                echo $element; //create img tag
                }
        ?>
        </div>
        <div class="col" id="col2">

        <?php
                $element = "
                        <div class='image__container'>
                        <img loading='lazy' class='image' src='preload.jpg' alt='404'>
                        </div>
                ";
                for ($i = 0; $i < $filecount_col2; $i++){
                echo $element; //create img tag
                }
        ?>

        </div>
        <div class="col" id="col3">

        <?php
                $element = "
                        <div class='image__container'>
                        <img loading='lazy' class='image' src='preload.jpg' alt='404'>
                        </div>
                ";
                for ($i = 0; $i < $filecount_col3; $i++){
                echo $element; //create img tag
                }
        ?>

        </div>
    </div>
    <div class="bot__footer">
        <p>I do not own rights to the pictures on this website, this is just a project for my personal usage. If you have any question please contact me trough: <a href="http://www.bwladyka.com" style="text-decoration: none; color: white; font-weight: bold;">bwladyka.com</a></p>
    </div>
    <?php
        /*
        * Code below, reads directory "images/" and looks for .jpg files.
        * @param $files is an array with stored strings: "images/%FILENAME%.jpg"
        * @param $namesOfFiles is an array that was created to store just file names
        */
                $files = glob('img/placeholders/*.{jpg,png}',GLOB_BRACE); //the GLOB_BRACE flag expands {a,b,c} to match 'a', 'b', or 'c'
                $namesOfFiles = array();
                foreach($files as $file) {
                $file = substr($file, 17); // It cuts string in $files till 17th character: Thing cut - "img/placerholders/"
                array_push($namesOfFiles, $file); //We push what's left which is file name to our array $namesOfFiles
        /*             echo "filename: ".$file."<br />"; */
                }
        ?>
    <script>
        /*
        * Code below, creates array fileNamesArray that store all of the file names in the "images/" directory
        * Then this variable is being send to imageGenerator function which is located in scritp.js
        */
        var fileNamesArray = <?php echo(json_encode($namesOfFiles)); ?>;
        imageGenerator(fileNamesArray);
    </script>
<script src="scripts/overlay.js"></script>
</body>
</html>