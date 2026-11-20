// DM2008 — Activity 3a [Guided]
// Array Sampler (20 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let ellipsePalette = ["#f91098", "#a1d510", "#1e67dc", "#ff9b3d"];
let rectPalette = ["#a1d510", "#1e67dc", "#ff9b3d", "#f91098"];
let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background("#000000");
  const spacing = width / (rectPalette.length + 1);

  for (let i = 0; i < rectPalette.length; i++) {
    // shift the lookup by currentIndex, wrapping around with %
    // assuming both rectPalette and ellipsePallete have the same lengths
    const index = (i + currentIndex) % rectPalette.length;

    // to reverse the direction of lookup
    // const index = (i - currentIndex + rectPalette.length) % rectPalette.length

    fill(rectPalette[index]);
    const x = (i + 1) * spacing;
    rect(x, height / 2, 60);

    fill(ellipsePalette[index]);
    const y = (i + 1) * spacing;
    ellipse(x, height / 2, 30);
  }
}

// Advance to the next color each time a key is pressed
function mousePressed() {
  currentIndex++; // shorthand for currentIndex += 1

  // Wrap back to the start when we reach the end
  if (currentIndex >= rectPalette.length) {
    currentIndex = 0;
  }

  // Draw the ellipse using the current color in the arra
}

function keyPressed() {
  if (key == "r" || key == "R") {
    // Remove the last color (if any)
    if (rectPalette.length > 0) {
      rectPalette.splice(rectPalette.length - 1, 1);
    }
    console.log("Current index:", currentIndex, "→", rectPalette[currentIndex]);
  }
  if (key == "a" || key == "A") {
    // Add a new random color to the end
    rectPalette.push(color(random(255), random(255), random(255)));
  }
}