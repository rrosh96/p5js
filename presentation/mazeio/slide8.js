var slider;
function _slide8Setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  slider = createSlider(0, 255, 100);
  slider.position(width/2 - 93, height/2 + 50);
  slider.style('width', '183px');
}

function _slide8Draw() {
  var val = slider.value();
  background(val);
  textFont("Coiny");
  fill(255 - val);
  textSize(80);
  textAlign(CENTER, CENTER)
  text("DOM", width/2, height/2); 
}