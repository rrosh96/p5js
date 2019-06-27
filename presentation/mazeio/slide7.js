function _slide7Setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function _slide7Draw() {
  background(127);
  noStroke();
  for (let i = 0; i < height; i += 20) {
    fill(220, 20, 60);
    rect(0, i, width, 10);
    fill(255);
    rect(i, 0, 10, height);
  }
  textFont("Coiny");
  textSize(120);
  textAlign(CENTER, CENTER);
  translate(window.innerWidth / 2 + 200, 80);
  fill(255);
  text("What P5.js Can be??!", 0, 100, 200);
}
