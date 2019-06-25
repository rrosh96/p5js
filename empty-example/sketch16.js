function setup(){
    createCanvas(800, 800, WEBGL);
}

function draw(){
    background(220,20,60);
    // rotateY(frameCount * 0.0)
    translate(0,-height/2,0)
    // rotateY(frameCount * 0.001);
    // rotateX(frameCount * 0.001);
    fill(255)
    noStroke()
    for (let i =0; i < 5; i++){
        push ()
        for(let j =0; j < 200; j++){
            translate((frameCount * 0.001 + i)* 100, (frameCount * 0.001 +i) * 100, j * 0.1 );
            rotateZ(frameCount * 0.002)
            push()
            sphere (4,8,8);
            pop()
        }
        pop();
    }
    // sphere(8,6,4)
    // // rotateZ(3)
    // rotateX(.1)
    // translate(150,40,400)
    // sphere (8,6,4)
}