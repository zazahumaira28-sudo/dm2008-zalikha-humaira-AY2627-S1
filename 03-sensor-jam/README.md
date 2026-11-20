# Sensor Jam — 8a, 8b, 9a & coding jam

<!-- Replace "Title" with the name of your project, e.g. "Sensor Jam — Theremin Visualiser" -->

---

### The Project

For Activity 8a, I wired an LED with a resistor to an Arduino and controlled it three ways. Type 1 stays always on through the 5V rail, type 2 blinks using digitalWrite on pin 13, and type 3 fades smoothly using PWM on pin 9.

For Activity 8b, I connected a phototransistor to pin A0 and used analogRead() to print light values to the Serial Monitor. Covering or shining light on the sensor made the numbers go down or up.

For Activity 9a, I wired an ultrasonic sensor to an Arduino analog pin and used map() to convert distance readings into a usable range. constrain() kept values within limits, so the sensor’s input could drive visuals smoothly

For my coding jam, I connected an Arduino ultrasonic sensor to p5.js through serial. Distance maps to five hearts that fill with pink liquid as you move closer. At full closeness, the hearts merge into one big heart that beats, sending glowing pink echoes outward.


### Output

![screenshot](readme-assets/screenshot-01.png)

<!-- Drop a screenshot or GIF of your sketch in action.
     Got a photo of your physical setup too? Throw it in.
     Save everything to a readme-assets/ folder inside this project folder. -->

[Watch Online](https://your-link-here)

<!-- Replace the link above with a URL to a video of your project in action.
     ⚠️ Make sure the file or page is set to public before submitting. -->

---

<!-- ─────────────────────────────────────────────────────
     GOING FURTHER — want to document more? Try any of these:

     ### ✍️ Reflection
     A short write-up of your process — what worked, what didn't,
     and what you'd take further if you had more time.

     ### 🛠️ Hardware
     List the physical components you used.
     - Arduino Uno
     - Ultrasonic sensor (HC-SR04)

     ### 🔍 Sensor Mapping
     How does your sensor data map to visual or sonic output?
     e.g. "Distance (0–400cm) → circle size (10–400px) using map()"

     ### 🧩 Something I Found Interesting
     A snippet, a technique, a happy accident.
     ```js
     // your code here
     ```

     ### 🔗 References
     Anything that helped — tutorials, datasheets, examples.
     ───────────────────────────────────────────────────── -->
