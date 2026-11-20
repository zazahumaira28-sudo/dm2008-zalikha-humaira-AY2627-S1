

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  //head
  fill (141, 255, 221)
  noStroke ()
  ellipse (200,230,220,200)
  //ears
  ellipse (150,150,80,150)
  ellipse (250,150,80,150)
  //eyes
  fill (0)
  stroke (255)
  strokeWeight (5)
  ellipse (150,120,50,50)
  ellipse (250,120,50,50)
  //pupil
  fill (230,115,72)
  noStroke ()
  ellipse (150,120,30)
  ellipse (250,120,30)
  //pupil highlight
  fill (255)
  noStroke ()
  ellipse (140,120,28,30)
  ellipse (240,120,28,30)
  //bottom half of face
  fill (255, 252, 212)
  ellipse (200,270,190,120)
  //blush
  fill (255, 175, 169)
  noStroke ()
  ellipse (120,250,60,80)
  ellipse (280,250,60,80)
  //mouth
  fill (165, 48, 40)
  noStroke ()
  ellipse (200,250,40,40)
}