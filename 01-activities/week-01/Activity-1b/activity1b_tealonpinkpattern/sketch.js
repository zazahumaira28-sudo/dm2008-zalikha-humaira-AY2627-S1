let x;
let y;
let w;

function mousePressed() {
  w = random(10,80);
}

function setup () {
createCanvas (600,600)
background ("deeppink")
}

function draw (){
  x = random(width);
  y = random(height);

  stroke ("#00fbec");
  noFill();
  strokeWeight(random (0.5,2));
  ellipse (x,y,w,w);
}

function keyPressed () {
  saveCanvas("activity1b-image", "png")
}