let speed = 2;
let value = 0.0;
let MAX = 255;
let showP5 = true;

let Particle = function(position) {
  this.acceleration = createVector(random(0, 0.05), random(-0.05, 0.03));
  this.velocity = createVector(random(0, 5), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 350;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  // stroke(0, this.lifespan);
  // strokeWeight(2);
  noStroke();
  fill(255);
  ellipse(
    this.position.x,
    this.position.y,
    (30 * this.lifespan) / 350,
    (30 * this.lifespan) / 350
  );
};

Particle.prototype.isDead = function() {
  return this.lifespan <= 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

let particleSystems = [];

const psCount = 1;

let start = false;

function mousePressed() {
  start = true;
}

function _slide5Setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < psCount; i++) {
    particleSystems[i] = new ParticleSystem(createVector(0, height - 10));
  }
  // system = new ParticleSystem(createVector(width/2, 50))
  start = true;
  timePast = millis();
  timeInterval = 2;
}

function _slide5Draw() {
  background(252, 55, 108);
  if (start) {
    for (let i = 0; i < particleSystems.length; i++) {
      let system = particleSystems[i];
      system.addParticle();
      system.run();
    }
  }
  textFont("Coiny");
  textSize(160);
  textAlign(CENTER, CENTER);
  translate(window.innerWidth / 2, window.innerHeight / 2);
  fill(255);

  value += speed;
  let fade = ((sin(radians(value)) + 1) / 2) * MAX;
  fill(255, fade);
  if (fade === 0) {
    showP5 = !showP5;
  }
  if (showP5) {
    text("P5.js", 0, 0);
  } else {
    text("Processing.org", 0, 0);
  }
}
