let x, y;
let currentAngle = 0;
let step = 40;
let angle = 90;


//LindenMayer System
let numberOfLoops = 5;
let theString = 'A';
let theRules = [];
// theRules[0] = ['A', '-BF+AFA+FB-'];
// theRules[1] = ['B', '+AF-BFB-FA+'];
// theRules[0] = ['A', '-BFA+'];
// theRules[1] = ['B', '+ASB-']
// theRules[0] = ['A', '---BF+++AFA++FB---']
// theRules[1] = ['A', '---AF+++BFB++FA---']
theRules[0] = ['A', 'F[-F][+F']

let whereInString = 0;

function lindenmayer(s){
    let outputString = '';
    for (let i =0; i < s.length; i++){
        let isMatch = 0;
        for(let j =0; j < theRules.length; j++){
            if(s[i] === theRules[j][0]){
                outputString += theRules[j][1];
                isMatch =1;
                break;
            }
        }

        if(!isMatch){
             outputString += s[i]
        }
    }

    return outputString;
}

function drawTurtles (letter) {
    if(letter === 'F'){
        let x1 = x - step * cos (radians(currentAngle));
        let y1 = y - step * sin (radians(currentAngle));
        stroke(255)
        line (x, y , x1, y1);
        
        x = x1;
        y = y1;
    }

    if(letter === 'S'){
        let x1 = x + step * cos (radians(currentAngle));
        let y1 = y + step * sin (radians(currentAngle));
        stroke(255)
        line (x, y , x1, y1);
        
        x = x1;
        y = y1;
    }
    if(letter === '['){
        push ();
    }

    if(letter === ']'){
        pop ();
    }

    if (x > width-1) x = 0;
    if (y > height-1) y = 0;
    if ( y < 0) y = height;
    if (x < 0) x  = width;

    if(letter === '+'){
        currentAngle += 25;
    } else if(letter === '-'){
        currentAngle -= 25;
    }

    let r = random(128, 255);
    let g = random(1, 50);
    let b = random (50, 128);

    let radius = random(0, 15);
    radius += random(0, 15);
    radius += random(0, 15);
    radius /= 3; 
    noStroke ()
    // fill (r, g, b);
    fill(0)
    ellipse(x, y, radius, radius);  
}

function setup(){
    createCanvas(800, 800);
    background(255,20,147);
    x = width/2;
    y = height/2;

    for (let i = 0; i < numberOfLoops; i++){
        theString = lindenmayer(theString);
    }

}


function draw(){
    drawTurtles(theString[whereInString]);

    whereInString++;
    if(whereInString > theString.length - 1){
        whereInString = 0;
    }
}