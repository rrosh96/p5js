let x = 0;
let y =0;
let adder = 1;

function setup() {
  // put setup code here
  createCanvas(600,600)
  x = width * 0.25 + 25;
  y = height * 0.25 + 25;
}

function draw() {
  // put drawing code here
  // ellipse(50, 50, 80, 80)
  // fill(0);
  // ellipse(x, height/2, 50,50)
  // ellipse(width/2, y, 50,50)
  // x +=1;
  // y +=1;

  // if(mouseIsPressed){
  //   ellipse(mouseX, mouseY, 100, 100);
  // }

  background(0);
  stroke (255);
  point (width * 0.5 , height * 0.5 )
  point (width * 0.5 , height * 0.25 )

  stroke (0, 155, 253);
  line (0, height * 0.33, width, height * 0.33)
  line (0, height * 0.66, width, height * 0.66)

  noFill();
  stroke (255, 123, 0)
  rect (width * 0.25, height * 0.25 , width * 0.5 , height * 0.5)

  fill (255, 123, 0);
  rect (width * 0.25, height * 0.33 , width * 0.5 , height * 0.33)

  stroke (0, 155, 253);
  fill (0, 155, 253)
  ellipse(x, height/2, 50,50)
  ellipse (x, (height/2 - height * 0.25), 25, 25 );
  ellipse (x, (height/2 + height * 0.25), 25, 25 );
  
  ellipse (width * 0.25 ,y, 25, 25) 
  ellipse (width * 0.75 ,y, 25, 25) 

  if(x >= width * 0.75 - 25){
    adder = -1;
  } else if(x <=width * 0.25 + 25){
    adder = 1;
  }
  x += adder;
  y += adder;


}

// function drawIcon(img){
//   image(img, 0, 0)
// }