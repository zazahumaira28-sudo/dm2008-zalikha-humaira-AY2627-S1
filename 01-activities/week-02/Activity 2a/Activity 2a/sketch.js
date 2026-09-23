// DM2008 — Activity 2a [Guided]
// Mode Switch (20 min)
//
// Keys 1, 2, 3 switch between modes — each one changes the background color.
// Try extending each mode to also change the fill, size, or speed of the ellipse.
// Keep it simple: one clear change per mode that's easy to see on screen.
//
// Stretch: add a 4th mode, or make the ellipse change shape between modes.

let x = 0;       // ellipse x-position
let size = 50;   // ellipse size
let bgColor; // background color, changed by key presses
let speed;

function setup() {
  createCanvas(400, 400);
  shapeColor = color(100)
  bgColor = color(220);
  speed = 2
}

function draw() {
  background(bgColor);
  noStroke()
  fill(shapeColor);
  
  
  // Draw the ellipse at its current position
ellipse(x, height / 2, size)
  // Move the ellipse
  x += speed;

  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
  
  }
}

// Keys 1, 2, 3 change the background color — this is your mode switch
function keyPressed() {
  switch (key) {
    case "1":
      shapeColor = color("#a2d31d");
      size = 80
      speed = 10
      bgColor = color("#e61484");
      break; // green on pink
    case "2":
      bgColor = color("#2f24c6");
      shapeColor = color("#ee7c11");
      size = 60
      speed = 20
      break; // orange on blue
    case "3":
      bgColor = color("#13c9aa");
      shapeColor = color("#f0e894");
      size = 20
      speed = 30
      break; // yellow on teal
    case "4":
      bgColor = color("#9915d5");
      shapeColor = color("#b3ffb4");
      size = 100
      speed = 40
      break;
    default:
      bgColor = color(220); // grey
  }
}