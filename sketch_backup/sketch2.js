function setup() {
    createCanvas(800, 600) 
}

function draw () {
    background(127);
    noStroke();
    for (let i =0; i < height ; i += 20){
        fill (220,20,60);
        rect (0 , i, width, 10) 
        fill (255);
        rect (i, 0, 10, height)
    }
}