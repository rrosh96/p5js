
let  Particle = function (position){
    this.acceleration = createVector(random(0, 0.05), random(-0.05,0.03));
    this.velocity = createVector(random(0,5), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 350;
}

Particle.prototype.run = function(){
    this.update();
    this.display();
}

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -=2;
}

Particle.prototype.display = function(){
    // stroke(0, this.lifespan);
    // strokeWeight(2);
    noStroke();
    fill ( 255 );
    ellipse(this.position.x, this.position.y, 30 * this.lifespan/350, 30 * this.lifespan/350);
}

Particle.prototype.isDead = function(){
    return this.lifespan <= 0;
}

let ParticleSystem = function(position){
    this.origin = position.copy();
    this.particles = [];
}

ParticleSystem.prototype.addParticle = function(){
    this.particles.push(new Particle(this.origin));
}

ParticleSystem.prototype.run = function(){
    for (let i = this.particles.length -1; i >=0; i--){
        let p = this.particles[i];
        p.run();
        if(p.isDead()){
            this.particles.splice(i, 1);
        }
    }
}

let particleSystems = [];

const psCount = 1;

let start = false;

function mousePressed(){
    start = true;
}

function setup(){
    createCanvas(800, 800);
    
    for(let i = 0; i < psCount; i++){
        particleSystems[i] = new ParticleSystem(createVector(0, height-10))
    }
    // system = new ParticleSystem(createVector(width/2, 50))

}

function draw(){
    background(0);
    if(start){
        for (let i = 0; i < particleSystems.length; i++){
            let system = particleSystems[i];
            system.addParticle();
            system.run();
        }
    }
}