//DM2008 — Mini Project
// PONG (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. Get both paddles moving — controls are the first thing to nails
// 2. Get the ball moving — uncomment the velocity in the Ball constructor
// 3. Add scoring when the ball passes a paddle, then reset the ball
// 4. Add game states — at minimum a playing state and a game over state
//
// Stretch: add a start screen, a win condition, or angle variation on paddle hits.

/* ----------------- Globals ------s----------- */
let leftPaddle, rightPaddle, ball, spiral, leftEye, rightEye;
let leftScore = 0;
let rightScore = 0;
let knight, devil, court;
let winSound, hitSound;


// Game states: "playing" or "gameover" — add more if you need them
let gameState = "playing";

/* ----------------- Setup & Draw ----------------- */

async function setup() {
  createCanvas(640, 360);
  noStroke()
  font = await loadFont ("UnifrakturMaguntia-Regular.ttf")
  court = await loadImage("court.png")
  knight = await loadImage("knight.png")
  devil = await loadImage("devil.png")
  devilWins = await loadImage("devilWins.png")
  knightWins = await loadImage("knightWins.png")
  leftEye = await loadImage("eye (face left).png");
  rightEye = await loadImage("eye (face right).png");
  
  winSound = await loadSound("win.mp3");
  hitSound = await loadSound("hit.mp3");
  
  leftPaddle = new lPaddle(30, height / 2 - 30, 25, 60);
  rightPaddle = new rPaddle(width - 80, height / 2 - 30, 40, 60);
  ball = new Ball(width / 2, height / 2, 8);

  
  
}

function draw() {
  background("#a1d611");
  image(court, 0,0, width, height);
  // Show images

  //Play game
  if (gameState == "playing") {
    handleInput();

    leftPaddle.update();
    rightPaddle.update();
    ball.update();

    //collision
    ball.checkWallBounce();
    ball.checkPaddleBounce(leftPaddle);
    ball.checkPaddleBounce(rightPaddle);

    //show artwork
    drawCourt();
    leftPaddle.show();
    rightPaddle.show();
    ball.show();
    textFont(font)
    textSize(30);
    stroke("#000000")
    fill("#e53596")
    text(leftScore, width / 4, 50);
    text(rightScore, width * 3 / 4, 50);


    // Display scores — look up textAlign() and textSize() in the p5.js reference
  }

  if (leftScore >= 5 || rightScore >= 5) {
      gameState = "gameover";
    
    }
    drawCourt();
    leftPaddle.show();
    rightPaddle.show();
    ball.show();
  
 if (gameState == "gameover") {
   
  if (leftScore == 5) {
    image(knightWins, 0,0, width, height);
 }
      

  if (rightScore == 5) {
    image(devilWins, 0,0, width, height);
 }

  }
}
  


/* ----------------- Input ----------------- */
function mousePressed() {
  if (gameState == "gameover") {
    leftScore = 0;
    rightScore = 0;
    ball.reset();
    gameState = "playing"
  }
}
    
function handleInput() {
  // Left paddle: W (up) and S (down) — use keyIsDown() with the key's character
  if (keyIsDown("w")) {
    leftPaddle.vy = -leftPaddle.speed;
  }
  if (keyIsDown("s")) {
    leftPaddle.vy = leftPaddle.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    rightPaddle.vy = -rightPaddle.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.vy = rightPaddle.speed;
  }

  // Right paddle: UP_ARROW and DOWN_ARROW — same pattern as left paddle
}

function keyReleased() {
  leftPaddle.vy = 0;
  rightPaddle.vy = 0;
}

/* ----------------- Classes ----------------- */
class rPaddle {
  constructor(x, y, w, h, img) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.speed = 9;
  }

  update() {
    this.pos.y += this.vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
  }

  show() {
  image(devil, this.pos.x, this.pos.y, this.w, this.h);
  }
}

class lPaddle {
  constructor(x, y, w, h, img) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.speed = 9;
  }

  update() {
    this.pos.y += this.vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
  }

  show() {
    image(knight, this.pos.x, this.pos.y, this.w, this.h);
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.xSpeed = 3;
    this.ySpeed = 3;

    // Give the ball a random starting direction to get it moving
    this.vel = createVector(
      random([-1, 2]) * this.xSpeed,
      random([-1, 2]) * this.ySpeed
    );
  }

  update() {
    this.pos.add(this.vel);
  }

  checkWallBounce() {
    // Bounce off top and bottom walls
    if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= height) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.r, height - this.r);
    }

    // When the ball passes the left or right edge, a player scores
    if (this.pos.x - this.r <= 0) {
      this.reset();
      rightScore += 1;
      console.log("right:", rightScore);
    }
    if (this.pos.x + this.r >= width) {
      this.reset();
      leftScore += 1;
      console.log("left:", leftScore);
    }
    // Increment the correct score, then call this.reset()
  }

  checkPaddleBounce(paddle) {
    const withinY =
      this.pos.y > paddle.pos.y && this.pos.y < paddle.pos.y + paddle.h;
    const withinX =
      this.pos.x + this.r > paddle.pos.x &&
      this.pos.x - this.r < paddle.pos.x + paddle.w;

    if (withinX && withinY) {
      if (this.vel.x < 0) {
        this.pos.x = paddle.pos.x + paddle.w + this.r;
      } else {
        this.pos.x = paddle.pos.x - this.r;
      }
      this.vel.x *= -1;
      hitSound.play();

      // Stretch: add angle variation based on where the ball hits the paddle
      // this.vel.y += (this.pos.y - paddle.pos.y - paddle.h / 2) * 0.1;
    }
  }

  show() {
    if (this.vel.x < 0) {
      image(leftEye, this.pos.x, this.pos.y, 40, 40);
    } else {
      image(rightEye, this.pos.x, this.pos.y, 40, 40);
  }
}
  

  reset() {
    this.pos.set(width / 2, height / 2);
    // random([-1, 1]) picks randomly from an array — a handy pattern for direction
    this.vel.set(random([-1, 2]) * this.xSpeed, random([-1, 2]) * this.ySpeed);
  }
}


/* ----------------- UI Helpers ----------------- */
function drawCourt() {
  stroke(80);
  strokeWeight(2);
  for (let y = 10; y < height; y += 18) {
    line(width / 2, y, width / 2, y + 8);
  }
  noStroke();
}
  