let size = [];
let coord = [];
let numberOfPlanets;
function setup(){
    createCanvas(800, 800);
    background(0);
    numberOfPlanets = 6
    stroke(255, 255, 255, 50)
    for (let i = 0; i < numberOfPlanets; i++){
        size[i] = random(10,200);
        coord[i] = [random(0,width), random(0, height)];
    }
    console.log(coord);
}

function draw(){

    for (let i = 0; i < numberOfPlanets; i++){
        let s = size[i]
        stroke(255, 255, 255, s * 0.25)
        push ()
        translate (coord[i][0], coord[i][1]);
        randomChord(s);
        randomChord(s);
        pop ();
    }
}

function randomChord (size){
    // push()
    let angle1 = random(0, 2 * PI);
    let xpos1 = size + size * cos (angle1);
    let ypos1 = size + size * sin (angle1);

    let angle2 = random(0, 2 * PI);
    let xpos2 = size + size * cos(angle2);
    let ypos2 = size + size * sin(angle2);
    line (xpos1, ypos1, xpos2, ypos2);
    // pop ()
}