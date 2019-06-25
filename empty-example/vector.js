function setup(){
    createCanvas(800, 800);
}

function draw(){
    background(255);
    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width/2, height/2);
    mouse.sub(center);
    mouse.mult(0.5);
    translate(width/2, height/2);
    line (0,0,mouse.x, mouse.y);
}