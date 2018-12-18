const radiobuttons = document.querySelectorAll('input[type="radio"]');
const colorpicker = document.getElementById("custom-color-picker");
const infoLayer = document.getElementById("overlay-info");

function getAverageColor(image) {
  const fastAverageColor = new FastAverageColor();
  let averageColorObject = fastAverageColor.getColor(image);
  let averageColor = averageColorObject.hex;
  return averageColor;
}

function stealDominantColor(sourceImage) {
  const colorThief = new ColorThief();
  var dominantColor = colorThief.getColor(sourceImage);
  return dominantColor;
}

function stealImagePalette(sourceImage) {
  const colorThief = new ColorThief();
  var imagePalette = colorThief.getPalette(sourceImage);
  return imagePalette;
}

function setBodyBackgroundColor(color) {
  document.body.style.backgroundColor = `rgba(${color[0]},${color[1]},${
    color[2]
  },1)`;
}

function checkBackgroundContrast(color) {
  const result = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
  return result < 160; //128
}

function setTextColorForContrast() {
  let currentBackgroundColor = colorValues(document.body.style.backgroundColor);
  let isItDark = checkBackgroundContrast(currentBackgroundColor);
  document.body.style.color = isItDark ? "#fff" : "#111";
}

function updateCustomColor() {
  customColorFromInput = colorpicker.value;
  document.body.style.backgroundColor = customColorFromInput;
}

function handleCheck(e) {
  infoLayer.style.opacity = 0;
  let currentImage = document.getElementById("hero-image");
  let averageColor = getAverageColor(currentImage);
  let stolenPalette = stealImagePalette(currentImage);
  let stolenDominantColor = stealDominantColor(currentImage);
  let customColorFromInput = colorpicker.value;

  console.log(e);
  const checked = e.target.id;

  switch (checked) {
    case "average-color":
      document.body.style.backgroundColor = averageColor;
      break;

    case "dominant-color":
      setBodyBackgroundColor(stolenDominantColor);
      break;

    case "stolen-color-1":
      setBodyBackgroundColor(stolenPalette[1]);
      break;

    case "stolen-color-2":
      setBodyBackgroundColor(stolenPalette[2]);
      break;

    case "stolen-color-3":
      setBodyBackgroundColor(stolenPalette[3]);
      break;

    case "stolen-color-4":
      setBodyBackgroundColor(stolenPalette[4]);
      break;

    case "stolen-color-5":
      setBodyBackgroundColor(stolenPalette[5]);
      break;

    case "stolen-color-6":
      setBodyBackgroundColor(stolenPalette[6]);
      break;

    case "stolen-color-7":
      setBodyBackgroundColor(stolenPalette[7]);
      break;

    case "stolen-color-8":
      setBodyBackgroundColor(stolenPalette[8]);
      break;

    case "custom-color-radio":
      document.body.style.backgroundColor = customColorFromInput;
      break;

    default:
      document.body.style.backgroundColor = "#141517";
      break;
  }
  setTextColorForContrast();
}

radiobuttons.forEach(radiobutton =>
  radiobutton.addEventListener("click", handleCheck)
);

colorpicker.addEventListener("change", updateCustomColor);

infoLayer.addEventListener("click", function() {
  infoLayer.style.opacity = 0;
});

// DRAG AND DROP LOCAL IMAGE
// https://codepen.io/esausilva/pen/RKVoQw

if (window.FileReader) {
  var drop;
  addEventHandler(window, "load", function() {
    drop = document.getElementById("drop");

    function cancel(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }

    // Tells the browser that we *can* drop on this target
    addEventHandler(drop, "dragover", cancel);
    addEventHandler(drop, "dragenter", cancel);

    drop.addEventListener("dragleave", function(e) {
      document.getElementById("hero-image").classList.remove("highlight");
    });

    drop.addEventListener("dragover", function(e) {
      infoLayer.style.opacity = 0;
      document.getElementById("hero-image").classList.add("highlight");
    });

    addEventHandler(drop, "drop", function(e) {
      e = e || window.event; // get window.event if e argument missing (in IE)
      if (e.preventDefault) {
        e.preventDefault();
      } // stops the browser from redirecting off to the image.

      var dt = e.dataTransfer;
      var files = dt.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        //attach event handlers here...

        reader.readAsDataURL(file);
        addEventHandler(
          reader,
          "loadend",
          function(e, file) {
            var bin = this.result;
            var img = document.createElement("img");
            img.file = file;
            img.src = bin;
            document.getElementById("hero-image").src = `${img.src}`;
          }.bindToEventHandler(file)
        );
      }
      setTimeout(doSomething, 500);
      function doSomething() {
        document.getElementById("dominant-color").click();
      }
      document.getElementById("hero-image").classList.remove("highlight");
      return false;
    });
    Function.prototype.bindToEventHandler = function bindToEventHandler() {
      var handler = this;
      var boundParameters = Array.prototype.slice.call(arguments);
      console.log(boundParameters);
      //create closure
      return function(e) {
        e = e || window.event; // get window.event if e argument missing (in IE)
        boundParameters.unshift(e);
        handler.apply(this, boundParameters);
      };
    };
  });
} else {
  document.getElementById("status").innerHTML =
    "Your browser does not support the HTML5 FileReader.";
}

function addEventHandler(obj, evt, handler) {
  if (obj.addEventListener) {
    // W3C method
    obj.addEventListener(evt, handler, false);
  } else if (obj.attachEvent) {
    // IE method.
    obj.attachEvent("on" + evt, handler);
  } else {
    // Old school method.
    obj["on" + evt] = handler;
  }
}
