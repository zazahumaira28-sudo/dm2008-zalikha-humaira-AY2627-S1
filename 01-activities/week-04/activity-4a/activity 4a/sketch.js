// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("chocolate", 80, width / 2, height / 2);
}

function draw() {
  background(230);
  cookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    // this. binds each value to this specific cookie object
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  show() {
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        break;
      case "vanilla":
        fill(255, 223, 150);
        break;
      case "strawberry":
        fill(255, 150, 170);
        break;
      case "matcha":
        fill(150, 190, 110);
        break;
      default:
        fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);
  }

  // Moves the cookie 20px depending on which arrow key was pressed
  move() {
    if (key === "ArrowLeft") {
      this.x -= 20;
    } else if (key === "ArrowRight") {
      this.x += 20;
    } else if (key === "ArrowUp") {
      this.y -= 20;
    } else if (key === "ArrowDown") {
      this.y += 20;
    }
  }

  // Picks a random flavor from the list
  randomFlavor() {
    let flavors = ["chocolate", "vanilla", "strawberry", "matcha", "oatmeal"];
    this.flavor = random(flavors);
  }
}

// Call cookie.move() when an arrow key is pressed
function keyPressed() {
  cookie.move();
  return false; // stops the arrow keys from scrolling the page
}

// Call cookie.randomFlavor() when the mouse is clicked
function mousePressed() {
  cookie.randomFlavor();
}