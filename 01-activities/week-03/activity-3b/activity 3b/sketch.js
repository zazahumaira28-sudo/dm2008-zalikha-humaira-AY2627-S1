// DM2008 — Activity 3b
// One Function Wonder (30 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern.
const spacing = 45

function setup() {
  createCanvas(400, 400);
  noStroke()
  rectMode(CENTER)
}

function draw() {
  background("#f5e6c2");

  // Call your function here with different values each time
  //for(let i = 0; i < height; i += spacing) {
  for(let i = 0; i < height; i += spacing)
    myShape(i+20,20,30)

  for(let i = 0; i < height; i += spacing)
    myShape(20,i+20,30)

  for(let i = 0; i < height; i += spacing)
    myShape(380,i+20,30)

  for(let i = 0; i < height; i += spacing)
    myShape(i+20,380,30)

  myShape(200,200,200)
  }
  
  
  

// Define your function outside draw()
// It can be called from anywhere in your sketch

function myShape (x, y, size) {
  fill("#4c479a")
  ellipse (x,y,size)
  fill("#eeb95d")
  ellipse (x - size/4,y,size - size/1.6)
  ellipse (x + size/4 ,y,size - size/1.6)
  ellipse (x,y - size/4,size - size/1.6)
  ellipse (x,y + size/4,size - size/1.6)
}