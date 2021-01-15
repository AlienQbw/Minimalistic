# Minimalistic

[Live Version](http://bwladyka.com/attachments/minimalistic/index.php)

![](presentation.gif)

## General Info

---

Minimalistic is one of my first projects. I wanted to have a little bit of fun in JS with a help of php.

This project is a simple wallpaper app, that allows you to upload images to the local folder, then it reads them, creates a new compressed placeholder for them, and displays them.

## Technologies used:

---

Project is created with:

- HTML
- CSS
- Javascript
- PHP 7.2.10

## Setup

---

- To run this app you will need web server for example "Xampp"
- Download .zip source code, and launch it on your local server, and you are good to go!

## How does it work? (in details)

---

At first, application was only supposed to read images from the local folder and display them. But due to large amounts of big size images, page was loading extremely long. So I decided to swap original images, with their placeholder, with way much less size and worse quality. In order to do that, I wrote creator of those placeholders in php using imagecreatefromjpeg()/png. Now app, on the start:

- Reads images in the local folder
- Checks if every image has its placeholder, if not it creates such one
- Creates for every image an object containing base data about the image:
  -- Dimension
  -- Tags (are based on the name of file)
  -- Format
  -- Link to it
- Displays a placeholder of that image on the page (so that original is not required to unnecessarily load)

If you go to an upload page:
You have to choose a new file to upload. When you click upload, and the file is valid, then "/scripts/upload.php" uploads that file to the local folder, with a unique key in the name (so that images will not have the same names). Then it heads to main website. Website creates placeholder for new image, and displays it. Placeholder is a compressed version of original, so that it minimizes a loading time of the page.

> I know that I could use Database to store details about images but I wanted to achive that using JS.
