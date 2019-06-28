//sine wave
let xspacing = 16;
let amplitude = 100;
let w ;
let period = 400;

let yValues;
let theta = 0.0;
let dx;
let incX = 5
function calcWave(){
    theta+=0.05
    let x = theta;
    for(let i =0; i < yValues.length; i++){
        yValues[i] = sin(x) * amplitude;
        x+=dx;
    }
}

function renderWave (){
    for (let i = 0; i < yValues.length; i++){ 
        // for(let j = 0; j < 5; j++){

        //     ellipse (i * xspacing, j*height/4 + yValues[i], 16 * yValues[i]/amplitude , 16 * yValues[i]/amplitude);
        // }
        fill (255,20,147)
        ellipse (i * xspacing, height/2 + yValues[i], 16, 16);
        fill("blue")
        ellipse (i * xspacing, height/2 - yValues[i], 16, 16);
    }

}


function setup(){
    createCanvas(800, 800);
    noStroke();
    dx = (TWO_PI / period) * xspacing;
    w = width + 16;
    let numberOfEllipse = w/xspacing;
    yValues = new Array(numberOfEllipse);
    
}

function draw() {
    // rotate (PI/2)
    background(0, incX);
    calcWave();
    renderWave();
    incX += 0.01
}