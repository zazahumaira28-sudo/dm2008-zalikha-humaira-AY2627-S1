// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

const spacing = 50
let size;

function setup() {
  createCanvas(400, 400);
  size = 40
  noStroke ()
}

function draw() {
  background("#515335");

  for (let i = 0; i < width; i += spacing) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed) {
      fill("#a0964c");
    } else if (i % 100 == 0) {
      fill("#90414d");
      size = 50
    } else {
      fill("#e1bcbf");
      size = 30
    }

    
    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
    ellipse(i + 25, height / 2, size);

    for (let i = 0; i < width; i += spacing) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed) {
      fill("#a0964c");
    } else if (i % 100 == 0) {
      fill("#90414d");
      size = 50
    } else {
      fill("#e1bcbf");
      size = 30
    }

    
    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
    ellipse(i + 25, height / 3, size);

  }
  }
}