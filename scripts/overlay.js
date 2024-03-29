/* OVERLAY */

/*
 *UIOverlayController is responsible for storing DOM elements
 */
var UIOverlayController = (function () {
  var DOMstrings = {
    content: '.content',
    overlay: '.overlay',
    overlayImage: '.overlay__image',
    overlayDimensions: '.overlay__information__dimensions',
    overlayFormat: '.overlay__information__format',
    overlayTags: '.overlay__information__tags',
    overlayDownload: '.overlay__information__download',
  };
  return {
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();
/*
 *overlayController is responsible for all of the actions that are going on for the overlay
 */
var overlayController = (function (UICtrl) {
  var DOM = UICtrl.getDOMstrings();
  var currentlyOpenedImageId = '';
  var isOpened = false;
  var setupEventListeners = function () {
    document.querySelector(DOM.content).addEventListener('click', detectImage); //it listenes to all of the clicks on the content
    document.querySelector(DOM.overlay).addEventListener('click', closeOverlay); //if instead of image, overlay is being clicked, overlay is closed
    //close overlay on escape keydown
    document.addEventListener('keydown', closeOverlayEsc);
    document.addEventListener('keydown', nextImage);
  };

  /*
   *Function detect if image is being clicked, if yesm then it opens an overlay
   */
  var detectImage = function (event, nextId, newSrc) {
    if (nextId === undefined || nextId === '') {
      if (newSrc) {
        var imageSrc = newSrc;
        /* our placeholders have extensions of originals for example: placeholder_example.png.jpg | png is original one .jpg is placeholder */
        var imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1); //name of placeholder but with its extension .jpg
        var imageNameOnly = imageName.slice(0, imageName.length - 4); //we slice extension to get to the original one
        imageNameOnly = imageNameOnly.slice(12); //we slice 'placeholder_' part in front
        var originalImageSrc = imageSrc.replace(
          'placeholders/' + imageName,
          imageNameOnly
        );
        //console.log(originalImageSrc); //this is our original image source which we want to display
        if (imageSrc !== undefined) {
          openOverlay(originalImageSrc, currentlyOpenedImageId); //we pass imageId because we want to get information from data base
          //on
        }
      } else {
        if (event.target.nodeName !== 'DIV') {
          var imageSrc = event.target.src; //we deted an image placeholder src, now we need to find original one
          /* our placeholders have extensions of originals for example: placeholder_example.png.jpg | png is original one .jpg is placeholder */
          var imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1); //name of placeholder but with its extension .jpg
          var imageNameOnly = imageName.slice(0, imageName.length - 4); //we slice extension to get to the original one
          imageNameOnly = imageNameOnly.slice(12); //we slice 'placeholder_' part in front
          var originalImageSrc = imageSrc.replace(
            'placeholders/' + imageName,
            imageNameOnly
          );
          //console.log(originalImageSrc); //this is our original image source which we want to display
          var imageId = event.target.id;
          currentlyOpenedImageId = imageId;
          if (imageSrc !== undefined) {
            openOverlay(originalImageSrc, imageId); //we pass imageId because we want to get information from data base
            //on the image with that id
          }
        }
      }
    }
    if (nextId !== undefined) {
      //it means that one image is already opened and someone clicked arrow button to change to next one
      let nextOne = document.getElementById(nextId);
      currentlyOpenedImageId = nextId;
      detectImage(undefined, undefined, nextOne.src);
    }
  };
  var openOverlay = function (sourceImg, idImg) {
    /*         console.log('Overlay has been opened..'); */
    /*         console.log(idImg); */
    if (imagesData[idImg] === undefined) {
      console.log('Items not found'); //before images load database is not ready so it cannot access information on the image {database can be found in images.js as "imagesData"}
    } else {
      document.querySelector(DOM.overlayImage).src = sourceImg;
      document.querySelector(DOM.overlay).style.display = 'flex';
      document.querySelector(DOM.overlayDimensions).innerHTML =
        imagesData[idImg].dimensions;
      document.querySelector(DOM.overlayFormat).innerHTML =
        imagesData[idImg].format;
      document.querySelector(DOM.overlayTags).innerHTML =
        imagesData[idImg].tags;
      document.querySelector(DOM.overlayDownload).href = imagesData[idImg].link;
    }
    isOpened = true;
  };
  var closeOverlayEsc = function (e) {
    if (e.keyCode === 27) {
      //escape keycode 27
      document.querySelector(DOM.overlay).style.display = 'none';
      isOpened = false;
    }
  };
  var closeOverlay = function (event) {
    var clickArea = event.target.src;
    if (clickArea === undefined) {
      document.querySelector(DOM.overlay).style.display = 'none';
      document.querySelector(DOM.overlayImage).src = ''; //so when we open it again we don't have old image for a sec
      isOpened = false;
    }
    /*         console.log('Overlay has been closed..'); */
  };
  var nextImage = function (e) {
    if (isOpened) {
      if (e.keyCode === 39) {
        let nextId = parseInt(currentlyOpenedImageId) + 1;
        if (nextId <= imagesData.length - 1) {
          detectImage(undefined, nextId);
        }
      }
      if (e.keyCode === 37) {
        let nextId = parseInt(currentlyOpenedImageId) - 1;
        if (nextId >= 0) {
          detectImage(undefined, nextId);
        }
      }
    }
  };
  return {
    init: function () {
      setupEventListeners();
    },
  };
})(UIOverlayController);

overlayController.init();
