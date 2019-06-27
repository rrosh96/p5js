
let angleStart;
let angleEnd;
let trees = [];
let r, g, b;
let gradient = 3;

function _slide1Setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleStart = 20;
  angleEnd = 23;
  r = 255;
  g = 140;
  b = 0;

  for (let i = 0; i < 5; i++) {
    trees.push(new tree(angleStart, angleEnd));
  }
}

function tree(angleStart, angleEnd) {
  this.angleMultiplier = 0.01;
  this.tall = random(window.innerHeight/2 - 300, window.innerHeight/2 );
  // this.rootpos = sqrt(random(pow(width/2, 2)));
  this.rootpos = random(width / 2 - 200, width / 2 + 200);
  this.treeAngle = random(-10, 10);
  this.count = 5;
  this.updater = 5;

  this.render = function() {
    let currentAngle = angleStart + this.angleMultiplier * this.count;
    let theta = radians(currentAngle);
    stroke(255);
    push();
    translate(this.rootpos, height);
    // rotate(radians(this.treeAngle));
    line(0, 0, 0, -this.tall);
    push();
    translate(0, -this.tall);
    this.branch(this.tall, theta);
    pop();
    if (currentAngle > angleEnd) {
      this.updater = -5;
    } else if (currentAngle < angleStart) {
      this.updater = 5;
    }
    // console.log(updater)
    this.count += this.updater;
    pop();
  };

  this.branch = function(h, theta) {
    h *= 0.6;
    // console.log(theta);
    if (h > 2) {
      push();
      rotate(theta);
      line(0, 0, 0, -h);
      translate(0, -h);
      this.branch(h, theta);
      pop();

      push();
      rotate(-theta);
      line(0, 0, 0, -h);
      translate(0, -h);
      this.branch(h, theta);
      pop();
    }
  };
}

function _slide1Draw() {
  if (g < 215 && r === 255) {
    g = g + gradient;
  } else {
    r = r - gradient;
    g = g - gradient;
  }
  // r = r - gradient;
  // g = g + gradient;
  // background(r,g,b);
  background(0, 10);
  frameRate(60);
  for (let tree of trees) {
    // console.log(tree.rootpos)
    tree.render();
  }

  if (r < 0 && g < 0) {
    for (let i = 0; i < 10; i++) {
      ellipse(random(width), random(0, height / 3), random(1, 5), random(1, 5));
    }
  }
  textFont("Coiny");
  textSize(120);
  textAlign(CENTER, CENTER);
  translate(window.innerWidth / 2, window.innerHeight / 2 );
  fill(255);
  text("To Infinity and Beyond", 0, 0);


}
