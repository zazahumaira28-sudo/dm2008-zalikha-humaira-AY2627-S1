
let x;
let w;

function setup() {
  createCanvas(600,600);
  background(255);
  noStroke();
  fill(0);
}

function draw() {
  background(255, 10);
  
  x = random(width);
  w = random(1, 10);
  fill(random(['#6382ba','#69c6b0','#98b538']))
  rect(x, 0, w, height/2);
  
  x = random(width);
  rect(x, height/2, w, height/2);
}

function keyPressed() {
  saveCanvas("activity1b-image", "jpg");
}