let Flock = function() {
  this.boids = [];
};

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
};

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);
  }
};

let Boid = function(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 2;
  this.maxspeed = 2;
  this.maxforce = 0.05;
};

Boid.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};

Boid.prototype.flock = function(boids) {
  let sep = this.seperate(boids);
  let align = this.align(boids);
  let coh = this.cohesion(boids);

  sep.mult(1.5);
  align.mult(1);
  coh.mult(1);

  this.applyForce(sep);
  this.applyForce(align);
  this.applyForce(coh);
};

Boid.prototype.update = function() {
  this.velocity.add(this.acceleration);

  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);

  this.acceleration.mult(0);
};

Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target, this.position);
  desired.normalize();
  desired.mult(this.maxspeed);

  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);
  return steer;
};

Boid.prototype.render = function() {
  let theta = this.velocity.heading();
  fill(0);
  noStroke();
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  push();
  rotate(-PI / 2);
  translate(0, -9);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);
  pop();

  stroke(0);
  fill(255, 255, 0);
  ellipse(0, 0, 15, 10);
  stroke(0);
  strokeWeight(2);
  arc(0, 0, 5.75, 9.75, -PI / 2, PI / 2);
  arc(-3, 0, 4.75, 7.75, -PI / 2, PI / 2);
  arc(-6, 0, 2.75, 4.75, -PI / 2, PI / 2);
  noFill();
  strokeWeight(0.5);

  fill(224, 255, 255, 200);

  noStroke();
  ellipse(1.75, 3.75, 7.75, 10.75);
  ellipse(1.75, -3.75, 7.75, 10.75);
  ellipse(-3.75, 2.75, 3.75, 5.75);
  ellipse(-3.75, -2.75, 3.75, 5.75);
  pop();
};

Boid.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
};

Boid.prototype.seperate = function(boids) {
  let desiredSeperateion = 25.0;
  let steer = createVector(0, 0);
  let count = 0;

  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < desiredSeperateion) {
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);
      steer.add(diff);
      count++;
    }
  }
  if (count > 0) {
    steer.div(count);
  }
  if (steer.mag() > 0) {
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
};

Boid.prototype.align = function(boids) {
  let neighbourDist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < neighbourDist) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Boid.prototype.cohesion = function(boids) {
  let neighbourDist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if (d > 0 && d < neighbourDist) {
      sum.add(boids[i].position);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);
  } else {
    return createVector(0, 0);
  }
};

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
};

let boid;

let flock;

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

function _slide4Setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  flock = new Flock();
  for (let i = 0; i < 100; i++) {
    let boid = new Boid(width / 2, height / 2);
    flock.addBoid(boid);
  }

  boid = new Boid(width / 2, height / 2);
}

function _slide4Draw() {
  background(218, 165, 32, 200);
  push();
  textFont("Coiny");
  fill(0);
  textSize(100);
  textAlign(CENTER, CENTER);
  text("B", width / 2, height / 2);
  pop();

  fill(50, 100);
  beginShape();
  vertex(0, 0);
  vertex(width / 4, 0);
  vertex(width / 4, height / 4);
  vertex(width / 8, height / 4 + height / 8 + 10);
  vertex(0, height / 4 + 100);
  endShape(CLOSE);

  beginShape();
  vertex(width, height);
  vertex(width, height - height / 4);
  vertex(width - width / 8, height - 250);
  vertex(width - width / 4, height - height / 4);
  vertex(width - width / 4, height);
  endShape(CLOSE);
  flock.run();
  image(img, width / 2 - 274, 40, img.width / 2, img.height / 2);
}
