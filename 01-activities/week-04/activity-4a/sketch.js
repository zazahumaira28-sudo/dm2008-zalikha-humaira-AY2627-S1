let ball;

function setup() {
  createCanvas(400, 400);
  ball = new Ball(200, 200, 40);
  noStroke();
}

function draw() {
  background(230);

  ball.show();

  // check collision with mouse circle
  let d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y);
  if (d < ball.r + 20) {
    ball.alive = false; // update state
  }

  // draw mouse circle
  fill(255, 150, 80);
  ellipse(mouseX, mouseY, 40);
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.alive = true;
  }

  show() {
    if (this.alive) {
      fill(100, 180, 220);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
  }
}