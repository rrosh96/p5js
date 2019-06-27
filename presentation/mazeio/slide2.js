function _slide2Setup(){
    createCanvas(800,800);
    frameRate(60);
}

function _slide2Draw(){
    background(0);
    let gridSize = 40;
    for (let i = gridSize; i < width ; i = i + gridSize){
        for (let j = gridSize; j < height; j = j + gridSize){
            fill (255);
            ellipse (i,j, 4,4);
        }
    }
    stroke(255,50)
    strokeWeight(2)
    for (let i = 0; i < width/gridSize; i ++){
        for (let j = 0; j < height/gridSize;j ++){
            let xend  = gridSize + i*gridSize;
            let yend  = gridSize + j*gridSize;
            fill(random(0,255),random(0,255),random(0,255));
            ellipse(xend, yend, 12,12);
            line (width/2, height/2, xend, yend);
        }
    }
    textFont("Coiny");
    fill(255);
    textSize(80);
    textAlign(CENTER, CENTER)
    text("Creative Coding", width/2, height/2); 
}