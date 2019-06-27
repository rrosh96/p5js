let movers = [],
  contents = [];

let liquid;

// params - mass, xcoord, ycoord
function Movers(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
}

Movers.prototype.applyForce = function(force) {
  let a = p5.Vector.div(force, this.mass);
  this.acceleration.add(a);
};

Movers.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  this.acceleration.mult(0);
};

Movers.prototype.display = function(content) {
  stroke(107, 234, 255);
  strokeWeight(2);
  fill(232, 251, 255);
  ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  textFont("Coiny");
  textSize(20);
  fill(255);
  text(content, this.position.x - 50, this.position.y - 40, 120);
};

Movers.prototype.checkEdges = function() {
  if (this.position.y >= height - this.mass * 8) {
    this.velocity.y *= -0.9;
    this.position.y = height - this.mass * 8;
  }
};
function mousePressed() {
  reset();
}

function reset() {
  for (let i = 0; i < 4; i++) {
    movers[i] = new Movers(random(0.5, 3), 80 + (i * width*2) / 8, 0);
  }
}

function Liquid(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.c = c;
}

Liquid.prototype.contains = function(mover) {
  let m = mover.position;
  return (
    m.x >= this.x &&
    m.x < this.x + this.w &&
    m.y >= this.y &&
    m.y < this.y + this.h
  );
};

Liquid.prototype.calculateDrag = function(mover) {
  let speed = mover.velocity.mag();
  let dragMagnitude = this.c * speed * speed;

  let dragForce = mover.velocity.copy();
  dragForce.mult(-1);

  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};

Liquid.prototype.display = function() {
  noStroke();
  fill(18, 180, 206);
  rect(this.x, this.y, this.w, this.h);
};

function _slide6Setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  liquid = new Liquid(0, height / 2, width, height / 2, 0.15);
  reset();
}

function _slide6Draw() {
  background(175, 237, 247);

  liquid.display();
  contents = [
    "ARTIST friendly",
    "Developer friendly",
    "Active Community",
    "Easy-Peasy examples"
  ];

  for (let i = 0; i < movers.length; i++) {
    if (liquid.contains(movers[i])) {
      let dragForce = liquid.calculateDrag(movers[i]);
      movers[i].applyForce(dragForce);
    }

    let gravity = createVector(0, 0.1 * movers[i].mass);
    movers[i].applyForce(gravity);

    movers[i].update();
    movers[i].display(contents[i]);
    movers[i].checkEdges();
  }
}
