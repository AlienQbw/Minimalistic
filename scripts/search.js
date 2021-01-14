/*
 * Searching algorithm on clicking search button
 */
function search() {
  returnAllItems();
  if (
    imagesData.length === numberOfTotalImages &&
    document.querySelector(".search__bar").value !== ""
  ) {
    //number of total images, is a number of img's in the container, we get that value from images_generator.js
    var keyword, numberOfTags;
    keyword = document.querySelector(".search__bar").value;
    for (var i = 0; i < imagesData.length; i++) {
      numberOfTags = imagesData[i].tags.length;
      for (var x = 0; x < imagesData[i].tags.length; x++) {
        if (keyword === imagesData[i].tags[x]) {
          /*                 console.log(imagesData[i]); */
        } else {
          numberOfTags -= 1;
          if (numberOfTags === 0) {
            var elements = document.getElementsByClassName("image__container");
            var elementsImage = document.getElementsByClassName("image");
            var numberOfelements =
              numberOfelements !== null ? elements.length : 0;
            elements[i].classList.add("hide");
            elementsImage[i].classList.add("hide");
          }
        }
      }
    }
    clearListElements();
    changeButtonFunction();
  } else {
    console.log("Page is loading..");
    changeButtonFunction();
  }
}

function changeButtonFunction() {
  var elements, buttonValueStatus;
  elements = document.getElementsByClassName("hide");
  buttonValueStatus = document.querySelector(".search__bar__btn");
  if (elements.length > 0) {
    buttonValueStatus.value = "Go Back";
    buttonValueStatus.style.background = "#db6161";
    buttonValueStatus.style.color = "white";
    buttonValueStatus.style.fontWeight = "Bold";
    buttonValueStatus.style.fontSize = "15px";
  } else {
    buttonValueStatus.value = "Search";
    buttonValueStatus.style.background = "rgba(146, 146, 146, 1)";
    buttonValueStatus.style.color = "black";
    buttonValueStatus.style.fontWeight = "lighter";
    buttonValueStatus.style.fontSize = "12px";
  }
}

var listTags = []; //array of tags in list, in order to skip duplicates

function autocompleteBox() {
  document.querySelector(".search__bar").value = "";
  if (imagesData.length === numberOfTotalImages) {
    //number of total images, is a number of img's in the container, we get that value from images_generator.js
    clearListElements();
    var keys = ""; //variable "keys" is the current input value

    document
      .querySelector(".search__bar")
      .addEventListener("input", function (e) {
        document.querySelector("body").addEventListener("click", function (ev) {
          if (e.target !== ev.target) {
            keys = "";
          }
        }); /* https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event */
        /*         console.log(e); */ /*
         * itemBox - is a DIV that we create that will store our matching "Tag" from list
         * a - is a div .autocomplete that has our search bar and inside of which we want to generate our list items
         * div - is just createElement('DIV') which we will append to "a" variable. Inside of that dive we will have our "tag"
         */
        var itemBox, a, div;

        if (e.inputType === "deleteContentBackward") {
          keys = document.querySelector(".search__bar").value;
          keys = keys.toLowerCase();
          var el = document.getElementsByClassName("autocomplete-items");
          while (el[0]) {
            el[0].parentNode.removeChild(el[0]);
          }
          clearSearches();
        } else {
          keys += e.data.toLowerCase();
        }

        if (keys.length >= 1) {
          for (var i = 0; i < imagesData.length; i++) {
            for (var x = 0; x < imagesData[i].tags.length; x++) {
              if (keys === imagesData[i].tags[x].substring(0, keys.length)) {
                addDiv(i, x, imagesData[i].tags[x]);
              } else {
                dropDiv(i, x, imagesData[i].tags[x]);
              }
            }
          }
        }

        function addDiv(i, x, tag) {
          var checkIfTagAlreadyInList = 0;
          for (var z = 0; z < listTags.length; z++) {
            if (listTags[z] === tag) {
              checkIfTagAlreadyInList++;
            }
          }
          if (
            document.getElementById("created" + (i + x) + tag) === null &&
            checkIfTagAlreadyInList === 0
          ) {
            itemBox = document.createElement("DIV");
            itemBox.setAttribute("id", "created" + (i + x) + tag);
            itemBox.setAttribute("class", "autocomplete-items");
            itemBox.setAttribute(
              "onClick",
              'choice("' + imagesData[i].tags[x] + '")'
            ); //HERE I STOPTED
            a = document.querySelector(".autocomplete");
            div = document.createElement("DIV");
            div.innerHTML = imagesData[i].tags[x];
            a.appendChild(itemBox).appendChild(div);
            listTags.push(tag);
          }
        }
        function dropDiv(i, x, tag) {
          var id = i + x;
          var el = document.getElementById("created" + id + tag);
          if (el !== null) {
            el.remove();
          } else {
            /*                 console.log('there is nothing to delete'); */
          }
        }
      });
  } else {
    console.log("Wait for database...");
  }
}

function choice(tag) {
  document.querySelector(".search__bar").value = tag;
  search();
  clearListElements();
}

function clearListElements() {
  var el = document.getElementsByClassName("autocomplete-items");
  document.querySelector(".search__bar").value = "";
  while (el[0]) {
    el[0].parentNode.removeChild(el[0]);
  }
  clearSearches();
}

function returnAllItems() {
  var elements = document.getElementsByClassName("hide");
  while (elements[0]) {
    elements[0].classList.remove("hide");
  }
  clearSearches();
}

function clearSearches() {
  listTags = [];
}
