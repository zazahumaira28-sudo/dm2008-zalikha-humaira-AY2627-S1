function setup() {
  createCanvas(400, 400);
}

function draw() {
  //head
  background();
  fill (255,148,208)
  noStroke ()
  ellipse (200,200,200,200)
  //eyes
  fill (0)
  noStroke ()
  ellipse (160,190,25,30)
  ellipse (240,190,25,30)
  //cheeks
  fill (255,255,155)
  noStroke ()
  ellipse (130,230,40,50)
  ellipse (270,230,40,50)
  //mouth
  fill (68,19,15)
  strokeWeight (12)
  stroke (254,249,245)
  ellipse (200,250,50)
  //hair
  fill (245,110,168)
  noStroke ()
  ellipse (170,140,50,25)
  ellipse (230,140,50,25)
  //eyeliner
  fill (0)
  triangle(240, 200, 236, 178, 220, 170)
  triangle(135, 170, 152, 178, 150, 190)
}
  