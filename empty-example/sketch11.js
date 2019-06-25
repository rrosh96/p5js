let t = 0;
function setup() {
    createCanvas(800, 800);
    noStroke();
    fill (255)
}

function draw(){
    background(0 , 10);
    for (let i = 0; i < width ; i = i + 30){
        for(let j =0; j< height;j = j + 30){

            // let degCentreX = width/2;
            // let degCentreY = height/2;
            // degCentreX = degCentreX + width/4 * cos (2 * PI * t);
            // degCentreY = degCentreY + height/4 * sin (2 * PI * t);

            let X = map(width * t * 0.1, 0, width, -4 * PI , 4 * PI, true);
            let Y = map(height * t * 0.1 , 0, height, -4 * PI, 4 + PI, true);
            const angle = (X * i / width)  + (Y * j/ height)
            
            let Xpos = i + 20 * cos (2 * PI * t + angle);
            let Ypos = j + 20 * sin (2 * PI * t + angle);

            ellipse(Xpos, Ypos, 15, 15);
        }
    }
    // let X = map(width/2, 0, width, -4 * PI , 4 * PI, true);
    // let Y = map(height/2, 0, height, -4 * PI, 4 + PI, true);
    // const angle = (X * 0 / width)  + (Y * 0/ height)
    // let Xpos = width/2 + 20 * cos (2 * PI * t + angle);
    // let Ypos = height/2 + 20 * sin (2 * PI * t + angle);
    // ellipse (Xpos, Ypos, 15, 15);

    t = t + 0.01;
    // console.log(t)
}