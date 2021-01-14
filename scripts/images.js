function imageObject(id, dimensions, name, tags, format, link) {
  this.id = id;
  this.dimensions = dimensions;
  this.name = name;
  this.tags = tags;
  this.format = format;
  this.link = link;
}
/* Data structure, to store all of the images */
var imagesData = [];

/* wait for the window to load before reading images information */
window.addEventListener("load", newImageObject);
//remember that [0] image is an overlay image
function newImageObject() {
  for (var i = 0; i < document.images.length - 1; i++) {
    var id, dimensions, name, tags, format, link;
    id = getImageId(i + 1); //because overlay image is id [0] in htmlCollection
    dimensions = getImageDimensions(i + 1);
    name = getImageName(i + 1);
    tags = getImageTags(i + 1);
    format = getImageFormat(i + 1);
    link = getImageLink(i + 1);

    var newImage = new imageObject(id, dimensions, name, tags, format, link);
    imagesData.push(newImage);
  }
  function getImageId(idNumber) {
    return idNumber;
  }
  function getImageDimensions(idNumber) {
    var x, y, dimensions;
    x = document.images[idNumber].naturalWidth;
    y = document.images[idNumber].naturalHeight;
    dimensions = x + "x" + y + "px";
    return dimensions;
  }
  function getImageName(idNumber) {
    var baseUrl, baseUrlLength, src, name, placeholdersPath;
    baseUrl = document.images[idNumber].baseURI;
    placeholdersPath = "img/placeholders/placeholder_";
    baseUrlLength = baseUrl.length + placeholdersPath.length - 9; //for the server is - 9 becasuse of index.php part
    src = document.images[idNumber].src;
    name = src.slice(baseUrlLength);
    name = name.slice(0, name.length - 4); //our placeholders have differenet extenssion than original so we cut it | example.png.jpg (placeholder) => example.png (original)
    return name;
  }
  function getImageTags(idNumber) {
    var name, tags;
    name = getImageName(idNumber);
    if (name.indexOf("%") >= 0) {
      tags = [];
      tags[0] = "untagged";
    } else {
      tags = name.split("-");
      tags.shift(); //in order to get rid of image id that is at the beginig of it
      tags[tags.length - 1] = tags[tags.length - 1].split(".")[0];
    }
    return tags;
  }
  function getImageFormat(idNumber) {
    var url, name, format;
    url = document.images[idNumber].src;
    name = url.split(".");
    format = name[name.length - 2]; //-2 because we have double like example.png.jpg => .png is original one
    return format;
  }
  function getImageLink(idNumber) {
    var name, link;
    name = getImageName(idNumber);
    link = document.images[idNumber].src;
    link = link.replace("placeholders/placeholder_" + name + ".jpg", name);
    //link to original: minimalistic/img/example.png [this one we want]
    //link to placeholder: minimalistic/img/placeholders/placeholder_example.png.jpg
    return link;
  }
}
