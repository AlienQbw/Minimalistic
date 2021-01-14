/*
 * imageGenerator function recives "names" variable which is an array containing all of the images names
 * Then based on the number of images on the site, it gets DOM element, img, and sends it to downloadImage function
 *
 * downloadImage function recives img DOM element.
 * Then it creates variable that will create new image
 * Then downloadingImage function, grabs url of new image and loads it, and only when image is downloaded,
 * it is being displaied on the website.
 */
var numberOfTotalImages;
function imageGenerator(names) {
  for (let i = 0; i < document.images.length - 1; i++) {
    var image = document.images[i + 1]; //This is supposed to be i + 1 because there is one extra image as overlay image
    var count = i;
    numberOfTotalImages = i + 1;
    /*         console.log('Generated image number: ' + (i + 1)); */
    downloadImage(image, names[i], count);
  }

  function downloadImage(image, name, currentCount) {
    var downloadingImage = new Image();
    downloadingImage.onload = function () {
      image.src = this.src;
      image.id = this.id;
      /*             console.log('Image dimensions: ' + this.width + 'x' + this.height + 'px'); */ //console.logs width and height of the image
    };
    downloadingImage.src = "./img/placeholders/" + name;
    downloadingImage.id = currentCount;
  }
}
