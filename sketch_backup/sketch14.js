let circleSize = 20;
let phase = 0; speed = 0.02;
let numberofRows = 10;



function render(x,y,ellipseSize){
    push()
    translate(x, y);
    scale (ellipseSize/20)
    ellipse(0,-3,10,3)
    ellipse(0,0,5,15)
    ellipse(0,3,25,5);
    pop ();
}
function setup(){
    createCanvas(800,800)
}

function draw(){
    background(0, 50);
    fill(255);
    noStroke();
    phase = frameCount * speed;
    let ellipseSize = (cos(phase)+1)  * circleSize;
    for (let i = 0; i < 20; i++){
        let x = i * 50 ;
        let y = height / 2 + sin(phase) * 300;
        render(x,y,ellipseSize)
    }
    // render(width/2, height/2,40)
}