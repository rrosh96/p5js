let customFont,
  slideCount = 0,
  isSetupDone = false;
// Pre loading
function preload() {
  customFont = loadFont("assets/fonts/Shadows_Into_Light/ShadowsIntoLight.ttf");
  img = loadImage("assets/whatsapp.jpg");
  song = loadSound("./assets/cheapthrills");
}

// Draw the changes
function draw() {
  switch (slideCount) {
    case 0:
      if (!isSetupDone) {
        clear();
        _slide1Setup();
        isSetupDone = true;
      }
      _slide1Draw();
      break;
    case 1:
      if (!isSetupDone) {
        clear();
        _slide2Setup();
        isSetupDone = true;
      }
      _slide2Draw();
      break;
    case 2:
      if (!isSetupDone) {
        clear();
        _slide3Setup();
        isSetupDone = true;
      }
      _slide3Draw();
      break;
    case 3:
      if (!isSetupDone) {
        clear();
        _slide4Setup();
        isSetupDone = true;
      }
      _slide4Draw();
      break;
    case 4:
      if (!isSetupDone) {
        clear();
        _slide5Setup();
        isSetupDone = true;
      }
      _slide5Draw();
      break;
    case 5:
      if (!isSetupDone) {
        clear();
        _slide6Setup();
        isSetupDone = true;
      }
      _slide6Draw();
      break;
    case 6:
      if (!isSetupDone) {
        if (slider) {
          slider.remove();
        }
        clear();
        _slide7Setup();
        isSetupDone = true;
      }
      _slide7Draw();
      break;
    case 7:
      if (!isSetupDone) {
        clear();
        _slide8Setup();
        isSetupDone = true;
      }
      _slide8Draw();
      break;
    case 8:
      if (!isSetupDone) {
        if (slider) {
          slider.remove();
        }
        clear();
        _slide9Setup();
        isSetupDone = true;
      }
      _slide9Draw();
      break;
  }
}

function keyPressed() {
  switch (keyCode) {
    case 37:
      slideCount--;
      isSetupDone = false;
      break;
    case 39:
      slideCount++;
      isSetupDone = false;
      break;
  }
}
