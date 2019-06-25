function setup(){
    createCanvas(800, 600) 
}

function draw () {
    background(90);
    noStroke();
    drawCircles(width * 0.5, height * 0.5 , 200, 10);
    drawCircles(width * 0.33, height * 0.33, 150, 9);
    drawCircles(width * 0.66, height * 0.66, 100, 6);
}

function drawCircles(xloc, yloc, size, steps){
    const greyScaleVal = 255 / steps;
    const radius = size /steps;
    for (let i = 0; i < steps ; i++){
        fill (i * greyScaleVal);
        ellipse(xloc, yloc, size  - i * radius, size - i * radius);
    }
}