<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/upload.css">
    <link rel="icon" href="resources/favicon.png" type="image/png" sizes="16x16">
    <title>Minimalistic</title>
</head>
<body>
    <div class="upload__content">
        <form action="scripts/upload_image.php" method="post" enctype="multipart/form-data">
            <p>Select Image to upload: (supported: jpg,png)</p>
            <p>Name file like this: <i>'tag1-tag2-tag3-tag4.jpg / .png'</i></p>
            <p>Example: "trees-forest-nature-green.png"</p>
            <input class="form__input" type="file" name="fileToUpload" id="fileToUpload">
            <input class="form__input" style="width: 100px; color: white;" type="submit" value="Upload Image" name="submit">
        </form>
    </div>
</body>
</html>