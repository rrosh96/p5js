let pg;

function setup(){
    createCanvas(800, 600);
    pg = createGraphics(400, 300);
}


function draw(){
    background(0);

    pg.background(255);

    image(pg, width/2, height/2)
}