let port; // Serial Communication port
let connectBtn;
let wasOpened = false; // tracks port state to update the button label

let sensorVal;

// Heart level display
const NUM_HEARTS = 5;
let heartLevel = 0;  // smoothed level, 0 (all empty) to 5 (all full)
let targetLevel = 0; // level the sensor is asking for

const HEART_R = 62;        // small heart "radius" (half the width)
const HEART_SPACING = 157; // distance between small heart centers

// Merge into one big heart
const BIG_R = 210;          // radius of the final big heart
const MERGE_THRESHOLD = 4.8; // level at which the hearts start merging (5 = max closeness)
let merge = 0;              // smoothed merge amount, 0 (five hearts) to 1 (one big heart)

// Heartbeat (only active once merged)
const BEAT_MS = 900;     // time for one full beat (lub-dub), in milliseconds
const BEAT_SCALE = 0.12; // how much the heart swells on each beat (0.12 = 12% bigger)

// Pink light trail left behind by each beat
const PINK = [231, 21, 164]; // same pink as the heart (#e715a4)
const PULSE_MS = 1100;       // how long each echo takes to fade out
const PULSE_GROW = 0.7;      // how far the echo expands (0.7 = up to 70% bigger than the big heart)
const MAX_GLOW = 45;         // blur of the glow around the heart on a beat
let pulses = [];             // active echoes: { born, strength }
let lastPhase = 0;           // previous position in the beat, to detect thumps

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(30, 26);
  connectBtn.mousePressed(connectBtnClick);
  styleConnectBtn(false);
}

function draw() {
  background("#d0e634");

  updateConnectBtn();

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      // Once you verify data is coming in,
      // disable logging to improve performance
      console.log(sensorVal);

      // use float() to convert the data from string to number
      // (Arduino must send ONE number per line, e.g. Serial.println(distVal))
      let val = float(sensorVal);

      // Ignore anything that isn't a number (e.g. stray text or a partial line)
      if (!isNaN(val)) {
        // map distance (5-100cm) to hearts: closer = more hearts filled
        targetLevel = map(val, 5, 100, NUM_HEARTS, 0, true);
      }
    }
  }

  // smooth the change (last value controls speed)
  heartLevel = lerp(heartLevel, targetLevel, 0.1);

  // when (almost) 100% close, merge the hearts into one big heart
  let mergeTarget = targetLevel >= MERGE_THRESHOLD ? 1 : 0;
  merge = lerp(merge, mergeTarget, 0.08);
  if (abs(merge - mergeTarget) < 0.001) merge = mergeTarget; // snap when done

  updatePulses();
  drawPulses();
  drawHearts();
}

// Returns 0-1: a "lub-dub" pulse that repeats every BEAT_MS
function heartbeat() {
  let t = (millis() % BEAT_MS) / BEAT_MS; // 0 to 1 through the beat
  let lub = exp(-pow((t - 0.08) / 0.05, 2));        // first, strong thump
  let dub = 0.65 * exp(-pow((t - 0.28) / 0.06, 2)); // second, softer thump
  return constrain(lub + dub, 0, 1);
}

// Spawns a new light echo each time the beat hits its "lub" and "dub" peaks
function updatePulses() {
  let phase = (millis() % BEAT_MS) / BEAT_MS;

  if (merge > 0.9) {
    if (lastPhase < 0.08 && phase >= 0.08) pulses.push({ born: millis(), strength: 1 });
    if (lastPhase < 0.28 && phase >= 0.28) pulses.push({ born: millis(), strength: 0.6 });
  }
  lastPhase = phase;

  // drop echoes that have fully faded
  pulses = pulses.filter(p => millis() - p.born < PULSE_MS);
}

// Draws the glowing pink echoes expanding out from the big heart
function drawPulses() {
  let ctx = drawingContext;
  let cx = width / 2;
  let cy = height / 2;

  for (let p of pulses) {
    let age = (millis() - p.born) / PULSE_MS; // 0 (just born) to 1 (gone)
    let fade = pow(1 - age, 2) * p.strength;  // fades quickly at first, then lingers
    let r = BIG_R * (1 + BEAT_SCALE + PULSE_GROW * age);

    ctx.save();
    heartPath(ctx, cx, cy, r);
    ctx.lineWidth = lerp(8, 2, age);
    ctx.strokeStyle = `rgba(${PINK[0]}, ${PINK[1]}, ${PINK[2]}, ${fade})`;
    ctx.shadowColor = `rgba(${PINK[0]}, ${PINK[1]}, ${PINK[2]}, ${fade})`;
    ctx.shadowBlur = 30 * fade;
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.restore();
  }
}

// Draws the row of hearts, filling them left to right,
// and pulling them together into one big heart as `merge` goes to 1
function drawHearts() {
  let startX = width / 2 - ((NUM_HEARTS - 1) * HEART_SPACING) / 2;
  let cx = width / 2;
  let cy = height / 2;

  // ease the merge so it starts and ends gently
  let m = merge * merge * (3 - 2 * merge);

  // the beat fades in only as the hearts finish merging
  let beat = heartbeat() * constrain(map(merge, 0.8, 1, 0, 1), 0, 1);

  for (let i = 0; i < NUM_HEARTS; i++) {
    // how full this particular heart is (0 to 1)
    let fill = constrain(heartLevel - i, 0, 1);
    // during the merge, make sure every heart ends up completely full
    fill = lerp(fill, 1, m);

    let x = lerp(startX + i * HEART_SPACING, cx, m);
    let r = lerp(HEART_R, BIG_R, m) * (1 + BEAT_SCALE * beat);
    drawHeart(x, cy, r, fill, MAX_GLOW * beat);
  }
}

// Traces the heart outline as a canvas path centered on (cx, cy)
function heartPath(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + 0.95 * r); // bottom tip
  ctx.bezierCurveTo(cx - 0.3 * r, cy + 0.65 * r, cx - r, cy + 0.1 * r, cx - r, cy - 0.35 * r);
  ctx.bezierCurveTo(cx - r, cy - 0.8 * r, cx - 0.4 * r, cy - 1.0 * r, cx, cy - 0.55 * r);
  ctx.bezierCurveTo(cx + 0.4 * r, cy - 1.0 * r, cx + r, cy - 0.8 * r, cx + r, cy - 0.35 * r);
  ctx.bezierCurveTo(cx + r, cy + 0.1 * r, cx + 0.3 * r, cy + 0.65 * r, cx, cy + 0.95 * r);
  ctx.closePath();
}

// One heart: pink liquid fill (0-1) clipped to the heart shape + outline (with optional glow)
function drawHeart(cx, cy, r, level, glow = 0) {
  let ctx = drawingContext;
  let top = cy - 0.9 * r;
  let bottom = cy + 0.95 * r;
  let fillY = bottom - level * (bottom - top);

  // pink fill, clipped to the heart shape
  if (level > 0) {
    ctx.save();
    heartPath(ctx, cx, cy, r);
    ctx.clip();
    ctx.fillStyle = "#e715a4";
    ctx.fillRect(cx - r - 2, fillY, r * 2 + 4, bottom - fillY + 2);
    ctx.restore();
  }

  // outline (scales a little with the heart so the big one looks right)
  ctx.save();
  heartPath(ctx, cx, cy, r);
  ctx.lineWidth = constrain(map(r, HEART_R, BIG_R, 3, 6), 3, 7);
  ctx.strokeStyle = "#e715a4";
  if (glow > 0) {
    ctx.shadowColor = "#e715a4";
    ctx.shadowBlur = glow;
  }
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

// DO NOT REMOVE THIS FUNCTION
function connectBtnClick() {
  // If port is not already open, open on click,
  // otherwise close the port
  // (the button label is updated in updateConnectBtn())
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
  } else {
    port.close();
  }
}

// Keeps the button in sync with the real port state, since opening is
// asynchronous and can fail (picker cancelled, port busy, board unplugged)
function updateConnectBtn() {
  let isOpened = port.opened();
  if (isOpened === wasOpened) return;
  wasOpened = isOpened;

  connectBtn.html(isOpened ? "Disconnect Arduino" : "Connect to Arduino");
  if (isOpened) {
    connectBtn.addClass("connected");
  } else {
    connectBtn.removeClass("connected");
  }
  styleConnectBtn(isOpened);
}

// Green rounded button like the reference (slightly darker when connected)
function styleConnectBtn(isOpened) {
  connectBtn.style("background-color", isOpened ? "#3a9d5d" : "#4cba6b");
  connectBtn.style("color", "white");
  connectBtn.style("border", "none");
  connectBtn.style("border-radius", "6px");
  connectBtn.style("padding", "12px 24px");
  connectBtn.style("font-family", "Arial, sans-serif");
  connectBtn.style("font-size", "18px");
  connectBtn.style("font-weight", "bold");
  connectBtn.style("cursor", "pointer");
}