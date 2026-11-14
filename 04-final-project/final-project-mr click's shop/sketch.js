//images
let logo, backgroundImage, popup1, popup2, popup3, button, blueButton, blueButtonlong, subscribePopup, leftAd, rightAd, clickBuyImage, clickHappierImage, thumbsUpImage;

// SFX
let popupSound, clickSound;
let audioReady = false;

let cartImages = [];
let productImages = [];

let listings = [];
let popups = [];
let cart = [];

let gameState = "shopping";
let dealStart;
let dealLength = 5;

let popupsActivated = false;
let lastPopupTime = 0;
let cartStartTime = 0;
let listingsCreated = false;

// Cart
let productPrices = [3, 2, 12, 9, 5, 15];

let hiddenFees = [
  { name: "Processing Fee", price: 5, delay: 500 },
  { name: "Convenience Fee", price: 3, delay: 1000 },
  { name: "Packaging Fee", price: 4, delay: 1500 },
  { name: "Priority Handling Fee", price: 8, delay: 2000 }
];

// Subscribe popup
let showSubscribe = false;
let subscriptionShown = false;
let subscribed = false;

let subPopup = { x: 0, y: 0, w: 400, h: 240 };
let subBtn = { x: 0, y: 0, w: 140, h: 40 };
let noBtn = { x: 0, y: 0, w: 140, h: 40 };

async function setup() {
  createCanvas(windowWidth, windowHeight);

  //Load background & logo
  backgroundImage = await loadImage("assets/background.png");
  logo = await loadImage("assets/logo.png");

  //SFX
  popupSound = new Audio("assets/popup.mp3");
  clickSound = new Audio("assets/click.mp3");
  popupSound.volume = 0.25;
  clickSound.volume = 0.5;

  // Load popup images
  popup1 = await loadImage("assets/Popup 1.png");
  popup2 = await loadImage("assets/Popup 2.png");
  popup3 = await loadImage("assets/Popup 3.png");

  // Load buttons
  button = await loadImage("assets/Button.png");
  blueButton = await loadImage("assets/Blue Button.png");
  blueButtonlong = await loadImage("assets/Blue button.png");

  // Load subscription popup
  subscribePopup = await loadImage("assets/Subscribe popup.png");

  // Load advertisements
  clickBuyImage = await loadImage("assets/click-buy.png");
  clickHappierImage = await loadImage("assets/click-happier.png");
  leftAd = await loadImage("assets/Left Ad.png");
  rightAd = await loadImage("assets/Right Ad.png");
  thumbsUpImage = await loadImage("assets/thumbsup.jpg");

  // Load 6 product images
  productImages[0] = await loadImage("assets/bread.png");
  productImages[1] = await loadImage("assets/drinking cup.png");
  productImages[2] = await loadImage("assets/hairbrush.png");
  productImages[3] = await loadImage("assets/rubberduck.png");
  productImages[4] = await loadImage("assets/banana.png");
  productImages[5] = await loadImage("assets/flipflop.png");

  // Load individual objects for shopping cart
  cartImages[0] = await loadImage("assets/bread-item.jpeg");
  cartImages[1] = await loadImage("assets/drinking cup-item.png");
  cartImages[2] = await loadImage("assets/hairbrush-item.jpg");
  cartImages[3] = await loadImage("assets/duck-item.png");
  cartImages[4] = await loadImage("assets/banana-item.jpeg");
  cartImages[5] = await loadImage("assets/flipflop-item.webp");

  
  dealStart = millis();
  lastPopupTime = millis();

  textFont("Arial");
}

function draw() {
  image(backgroundImage, 0, 0, width, height);

  if (gameState == "shopping") {

      drawWelcomeText();
      drawClickHappier();
      drawThumbsUp();

      // Random popups begin only after the first click
  if (popupsActivated && millis() >= nextPopupTime) {

    createClickPopup();

    // Next popup appears randomly after 1 to 4 seconds
    nextPopupTime = millis() + random(1000, 4000);
  }
    
    // Create 6 listings in 2 columns and 3 rows
    if (!listingsCreated && productImages.length == 6) {

      let count = 6;

      let gapX = 30;
      let gapY = 20;

      // Reserve space for logo and flash deal
      let logoW = 300;
      let logoH = logoW * (logo.height / logo.width);
      let topSpace = 10 + logoH + 10 + 55 + 25;

      // Fit products into remaining space
      let size = min(
        500,
        (width - 100 - gapX) / 2,
        (height - topSpace - 30 - gapY * 2) / (3 * 0.55)
      );

      let productHeight = size * 0.55;

      // Centre products horizontally
      let totalWidth = size * 2 + gapX;
      let startX = (width - totalWidth) / 2;

      // Position products below logo and flash deal
      let totalHeight = productHeight * 3 + gapY * 2;
      let startY = topSpace +
        (height - topSpace - totalHeight) / 2;

      for (let i = 0; i < count; i++) {

        let col = i % 2;
        let row = floor(i / 2);

        listings.push({
          x: startX + col * (size + gapX),
          y: startY + row * (productHeight + gapY),
          size: size,
          id: i,
          startTime: millis() + i * 2000
        });
      }

      listingsCreated = true;
    }


    // Draw product listings
    for (let i = listings.length - 1; i >= 0; i--) {

      let list = listings[i];

      // Products disappear after 5 seconds
      if (millis() >= list.startTime + 5000) {
        listings.splice(i, 1);
      } else {

        image(
          productImages[list.id],
          list.x,
          list.y,
          list.size,
          list.size * 0.55
        );
      }
    }

    // Remove closed popups
    popups = popups.filter(popup => !popup.closed);
    
    // Draw logo and flash deal
    drawDealBar();

    // Draw popups
    for (let popup of popups) {
      popup.display();
    }
    
    drawCartButton("CART (" + cart.length + ")");
  }

  if (gameState == "cart") {

    drawCartPage();

    // Show subscription popup after 3 seconds
    if (millis() - cartStartTime >= 3000 && !subscriptionShown) {
      openSubscribePopup();
      subscriptionShown = true;
    }

    if (showSubscribe) {
      dodgeNoButton();
      drawSubscribePopup();
    }
  }
}

// CART PAGE
function drawCartPage() {
  background("#c0c0c0");

  image(leftAd, 0, height - 800, 310, 800);
  image(rightAd, width - 310, 0, 310, height);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  textStyle(BOLD);
  textFont("Comic Sans MS");
  text("YOUR SHOPPING CART", width / 2, 60);
  textStyle(NORMAL);

  drawCartButton("BACK");

  // Cart items
  if (cart.length == 0) {

    textSize(20);
    textFont("Comic Sans MS");
    text("Your cart is empty!", width / 2, 150);

  } else {

    let itemSize = 70;
    let gap = 20;
    let totalWidth = cart.length * itemSize + (cart.length - 1) * gap;
    let startX = (width - totalWidth) / 2;

    for (let i = 0; i < cart.length; i++) {

      fill(255);
      stroke(0);

      rect(
        startX + i * (itemSize + gap),
        130,
        itemSize,
        itemSize
      );
      let item = cart[i];
      let x = startX + i * (itemSize + gap);
      let y = 130;
      image(
        cartImages[item.id],
        x + 5,
        y + 5,
        itemSize - 10,
        itemSize - 10
      );
      

      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(14);

      text(
          "$" + productPrices[cart[i].id].toFixed(2),
          startX + i * (itemSize + gap) + itemSize / 2,
          220
        );
    }
  }

  drawHiddenFees();

  // Checkout button
  image(
    blueButtonlong,
    width / 2 - 120,
    600,
    240,
    50
  );

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  textFont("Arial");

  text("COMPLETE PURCHASE", width / 2, 625);
  textStyle(NORMAL);
}

// Hidden feees
function drawHiddenFees() {

  let elapsedTime = millis() - cartStartTime;

  let subtotal = 0;
  for (let item of cart) {
  subtotal += productPrices[item.id];
}
  let total = subtotal;

  let x = width / 2 - 180;
  let y = 290;

  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(18);
  textFont("Comic Sans MS");

  text("Subtotal: $" + subtotal, x, y);

  for (let fee of hiddenFees) {

    if (elapsedTime >= fee.delay) {

      y += 40;

      fill(200, 0, 0);
      text(fee.name + ": +$" + fee.price, x, y);

      total += fee.price;
    }
  }

  if (subscribed) {

    y += 40;

    fill(200, 0, 0);
    text("VIP Membership: +$9.99", x, y);

    total += 9.99;
  }

  y += 55;

  fill(0);
  textSize(24);
  textStyle(BOLD);

  text("TOTAL: $" + total.toFixed(2), x, y);
  textStyle(NORMAL);
}

// SUBSCRIBE POPUP
function openSubscribePopup() {

  showSubscribe = true;

  subPopup.x = width / 2 - subPopup.w / 2;
  subPopup.y = height / 2 - subPopup.h / 2;

  subBtn.x = subPopup.x + 40;
  subBtn.y = subPopup.y + subPopup.h - 70;

  noBtn.x = subPopup.x + subPopup.w - noBtn.w - 40;
  noBtn.y = subPopup.y + subPopup.h - 70;
}

function drawSubscribePopup() {

  image(
    subscribePopup,
    subPopup.x,
    subPopup.y,
    subPopup.w,
    subPopup.h
  );

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  textFont("Comic Sans MS");

  text(
    "Subscribe to our newsletter!",
    width / 2,
    subPopup.y + 70
  );

  textSize(14);

  text(
    "Get 10% off your first order.",
    width / 2,
    subPopup.y + 110
  );

  // Subscribe button
  image(
    blueButton,
    subBtn.x,
    subBtn.y,
    subBtn.w,
    subBtn.h
  );

  fill(255);
  noStroke();
  textSize(16);

  text(
    "Subscribe",
    subBtn.x + subBtn.w / 2,
    subBtn.y + 20
  );

  // No thanks button
  image(
    button,
    noBtn.x,
    noBtn.y,
    noBtn.w,
    noBtn.h
  );

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);

  text(
    "No thanks",
    noBtn.x + noBtn.w / 2,
    noBtn.y + noBtn.h / 2
  );
}

// RUNAWAY BUTTON
function dodgeNoButton() {

  if (overRect(noBtn)) {

    let centerX = noBtn.x + noBtn.w / 2;
    let centerY = noBtn.y + noBtn.h / 2;

    let d = dist(mouseX, mouseY, centerX, centerY);

    if (d > 0) {
      noBtn.x += (centerX - mouseX) / d * 50;
      noBtn.y += (centerY - mouseY) / d * 50;
    }

    noBtn.x = constrain(
      noBtn.x,
      subPopup.x + 10,
      subPopup.x + subPopup.w - noBtn.w - 10
    );

    noBtn.y = constrain(
      noBtn.y,
      subPopup.y + 10,
      subPopup.y + subPopup.h - noBtn.h - 10
    );
  }
}

function overRect(r) {
  return (
    mouseX > r.x &&
    mouseX < r.x + r.w &&
    mouseY > r.y &&
    mouseY < r.y + r.h
  );
}

// SHOPPING POPUP CLASS
class Popup {

  constructor(x, y, startTime) {

    this.x = x;
    this.y = y;
    this.w = 400;
    this.h = 240;

    this.startTime = startTime;
    this.closed = false;

    // Random popup image
    this.img = random([popup1, popup2, popup3]);
  }

  isVisible() {
    return millis() >= this.startTime && !this.closed;
  }

  display() {

    if (!this.isVisible()) return;

    image(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  containsMouse() {
    return (
      this.isVisible() &&
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  }

  checkClick() {

    if (!this.isVisible()) return false;

    let buttonX = this.x + this.w - 15;
    let buttonY = this.y + 15;

    if (dist(mouseX, mouseY, buttonX, buttonY) < 10) {
      this.closed = true;
      return true;
    }

    return false;
  }
}

// MOUSE INTERACTIONS
function mousePressed() {

  audioReady = true;
  playSound(clickSound);

  if (gameState == "shopping") {
    
  // Activate automatic popups on the first click
  if (!popupsActivated) {
    popupsActivated = true;
    nextPopupTime = millis() + random(500, 2000)
  }

  // Create a popup whenever the user clicks
  createClickPopup();

    // Open cart
    if (overCartButton()) {

      gameState = "cart";
      cartStartTime = millis();

      showSubscribe = false;
      subscriptionShown = false;
      subscribed = false;

      return;
    }

    // Close popups
    for (let i = popups.length - 1; i >= 0; i--) {

      if (popups[i].checkClick()) return;
      if (popups[i].containsMouse()) return;
    }

    // Add product to cart
    for (let i = listings.length - 1; i >= 0; i--) {

      let list = listings[i];

      if (
        mouseX > list.x &&
        mouseX < list.x + list.size &&
        mouseY > list.y &&
        mouseY < list.y + list.size * 0.55
      ) {

        cart.push(listings.splice(i, 1)[0]);
        break;
      }
    }

  } 
  else if (gameState == "cart") {

    // Subscription buttons
    if (showSubscribe) {

      if (overRect(subBtn)) {
        subscribed = true;
        showSubscribe = false;
      }

      return;
    }

    // Back button
    if (overCartButton()) {

      gameState = "shopping";
      lastPopupTime = millis();

      return;
    }

    // Complete purchase
    if (
      mouseX > width / 2 - 120 &&
      mouseX < width / 2 + 120 &&
      mouseY > 600 &&
      mouseY < 650
    ) {

      if (subscriptionShown) {

        // Restart shopping
        gameState = "shopping";

        listings = [];
        popups = [];
        cart = [];

        listingsCreated = false;

        dealStart = millis();
        lastPopupTime = millis();

        showSubscribe = false;
        subscriptionShown = false;
        subscribed = false;
      }
    }
  }
}

// CART BUTTON
function overCartButton() {
  return (
    mouseX > width - 160 &&
    mouseX < width - 20 &&
    mouseY > 60 &&
    mouseY < 100
  );
}

function drawCartButton(label) {

  image(button, width - 160, 60, 140, 40);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  textFont("Arial");

  text(label, width - 90, 80);
}

// FLASH DEAL COUNTDOWN
function drawDealBar() {

  let secondsLeft = ceil(
    dealLength - (millis() - dealStart) / 1000
  );

  secondsLeft = max(secondsLeft, 0);

  // LOGO - keep original proportions
  let logoW = 300;
  let logoH = logoW * (logo.height / logo.width);

  image(
    logo,
    width / 2 - logoW / 2,
    10,
    logoW,
    logoH
  );

  // FLASH DEAL - below logo
  let flashY = 10 + logoH + 10;
  let flashW = 450;
  let flashH = 55;

  fill(220, 30, 30);
  noStroke();

  rect(
    width / 2 - flashW / 2,
    flashY,
    flashW,
    flashH
  );

  // Countdown text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  textStyle(BOLD);
  textFont("Comic Sans MS");

  if (secondsLeft > 0) {

    text(
      "FLASH DEAL ENDS IN " +
      secondsLeft +
      " SECOND" +
      (secondsLeft == 1 ? "" : "S"),
      width / 2,
      flashY + flashH / 2
    );

  } else {

    text(
      "FLASH DEAL ENDED",
      width / 2,
      flashY + flashH / 2
    );
  }

  textStyle(NORMAL);
}


function createClickPopup() {
  popups.push(new Popup(
    random(max(0, width - 400)),
    random(max(0, height - 240)),
    millis()
  ));

  playSound(popupSound);
}

  // Homepage Right
function drawClickHappier() {
  if (!clickHappierImage || clickHappierImage.width <= 0) return;
  let imageW = 400;
  let imageH = 250;
  let imageX = width - imageW - 20;
  let imageY = 300;

  image(clickHappierImage, imageX, imageY, imageW, imageH);
}

  //Smiley Face
function drawThumbsUp() {
  if (!thumbsUpImage || thumbsUpImage.width <= 0) return;
  let imageW = 190;
  let imageH = 180;
  let imageX = width - imageW - 30;
  let imageY = 650;

  image(thumbsUpImage, imageX, imageY, imageW, imageH);
}

  // Homepage Left
function drawWelcomeText() {
  let mainW = min(950, width - 80);
  let mainX = (width - mainW) / 2;
  let x = 15;
  let y = 30;
  let w = mainX - 30;

  // Yellow background
  fill(255, 255, 153, 200);
  noStroke();
  rect(x, y, w, height - 300);

  // Heading
  fill("red");
  textFont("Comic Sans MS");
  textStyle(BOLD);
  textSize(28);
  textAlign(CENTER, TOP);
  text("WELCOME!!!", x + 8, y + 15, w - 16);

  // Long paragraph
  let paragraph =
    "CONGRATULATIONS!!! YOU HAVE OFFICIALLY ENTERED " +
    "THE WORLD'S MOST AMAZING ONLINE SHOPPING EXPERIENCE!!! " +
    "HERE AT MR. CLICK'S SHOP, WE BELIEVE THAT SHOPPING " +
    "SHOULD BE FAST, EASY, EXCITING AND COMPLETELY UNNECESSARY!!! " +
    "WHY WASTE YOUR TIME THINKING ABOUT WHETHER YOU ACTUALLY " +
    "NEED SOMETHING WHEN YOU CAN SIMPLY CLICK BUY NOW??? " +
    "OUR PRODUCTS HAVE BEEN CAREFULLY SELECTED BY ABSOLUTELY " +
    "NOBODY IN PARTICULAR!!! WHETHER YOU WANT A SLICE OF BREAD, " +
    "A RUBBER DUCK OR A SINGLE RIGHT FLIP-FLOP, WE HAVE " +
    "EVERYTHING YOU NEVER KNEW YOU NEEDED!!! BUT WAIT!!! " +
    "THERE'S MORE!!! EVERY SECOND YOU SPEND READING THIS " +
    "PARAGRAPH IS ANOTHER SECOND YOU COULD BE SPENDING MONEY!!! " +
    "DON'T QUESTION THE PRICES, DON'T READ THE FINE PRINT " +
    "AND DEFINITELY DON'T CLOSE THIS WEBSITE!!! " +
    "YOUR HAPPINESS IS OUR PRIORITY!!! YOUR MONEY IS ALSO " +
    "OUR PRIORITY!!! ACTUALLY, YOUR MONEY IS OUR MAIN PRIORITY!!! " +
    "THANK YOU FOR SHOPPING!!! CLICK CLICK CLICK CLICK!!!";

  fill(0);
  textSize(12);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  text(paragraph, x + 10, y + 55, w - 20);
  if (clickBuyImage && clickBuyImage.width > 0) {
         let imageW = w - 20;
         let imageH = 600;
         let imageX = x + 10;
         let imageY = y + 400;

        image(clickBuyImage, imageX, imageY, imageW, imageH);
  }
}



  if (gameState == "shopping") {
    listings = [];
    listingsCreated = false;
  }

function playSound(sound) {
  if (!audioReady || !sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

