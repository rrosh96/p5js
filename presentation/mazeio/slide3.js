//Snowflakes
let snowflakes = [];

function Snowflake() {
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialAngle = random(0, 2 * PI);
  this.size = random(2, 20);

  this.radius = sqrt(random(pow(width / 2, 2)));
  this.r = random(1, 255);
  this.g = random(1, 255);
  this.b = random(1, 255);
  this.update = function(time) {
    let w = 0.6; //angular velocity
    let angle = w * time + this.initialAngle;
    this.posX = width / 2 + this.radius * sin(angle);

    this.posY += pow(this.size, 0.5);

    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.posX, this.posY, this.size, this.size);
  };
}

function _slide3Setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function _slide3Draw() {
  background("white");
  let t = frameCount / 60;

  for (let i = 0; i < random(3); i++) {
    snowflakes.push(new Snowflake());
  }

  for (let flake of snowflakes) {
    flake.update(t);
    flake.display();
  }
  textFont("Coiny");
  textSize(120);
  textAlign(CENTER, CENTER);
  translate(window.innerWidth / 2, window.innerHeight / 2);
  fill(this.r, this.g, this.b);
  text("The Origins", 0, 0);
}
