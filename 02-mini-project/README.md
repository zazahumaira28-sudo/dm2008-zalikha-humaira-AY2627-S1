# Mini Project — Medieval Pong

<!-- Replace "Title" with the name of your project, e.g. "Mini Project — Pong Remix" -->

---

### The Project

We reimagined Pong as a medieval battlefield. But instead of knights and knights we added a mythical creature - the devil. We used medieval sounds, sprites and background to bring the idea to life.

<!-- What did you build and what makes it yours? A few sentences is enough.
     What did you change, add, or push beyond the scaffold? -->

---

### Output

![screenshot](readme-assets/screenshot-01.png)

<!-- Drop a screenshot or GIF of your finished project.
     Save it to a readme-assets/ folder inside this project folder.
     Got more than one good screenshot? Add them. -->

/02-mini-project/documentation/pong-still01.png
/02-mini-project/documentation/pong-still02.png


[Watch Online] https://drive.google.com/file/d/1qkzrG9l5W2drixkXk54xjN7kbJgp_3GQ/view?usp=sharing

<!-- Replace the link above with a URL to a screen recording or video of your project.
     ⚠️ Make sure the file or page is set to public before submitting. -->

---

### ✍️ Reflection

<!-- 200–300 words on your process. Write freely — this isn't an essay.
     Some prompts to get you started:
     — What did you set out to make, and how did the result compare?
     — What inputs does your sketch respond to, and how did you approach that?
     — What was your biggest challenge, and how did you work through it?
     — What would you push further if you had more time? -->

This is my first time learning and working with code so naturally, when I first started the project I was very nervous. It is a new language that I can’t say I’m fully comfortable with yet. However, as I slowly did it step by step, it became much easier. We experienced times where we had to troubleshoot such as the images clipping, where I found that the solution was to remove imageMode (CENTER) as the scaffold was not built with recMode (CENTER). As we wanted two different sprites for left and right, we separated the left and right paddles to lPaddle and rPaddle. 

Our biggest struggle with working with the p5.js web was when the images on one of our file versions expired. The preview was stuck on loading. Furthermore, when I downloaded the files, the .png files were empty and it was downloaded an old version of the sketch.js file. We could not save the file to my account either as it kept failing. Our solution was to copy the code to another p5.js project then re-upload our assets again and save it.  

Overall, it was very satisfying to see the assets I drew came to life. Before taking this class, my intention was to learn how to create experiences to static assets, I’m glad that I get to learn it here as it adds another layer to my creative practice. I would want to learn more ways to combine programming with visual communication.

---

<!-- ─────────────────────────────────────────────────────
     GOING FURTHER — want to document more? Try any of these:

     ### ✨ What I Changed
     A short list of the additions and modifications you made to the scaffold.
     - Changed the paddle to use mouse tracking instead of keyboard
     - Redesigned the visual language with a retro CRT aesthetic

     ### 🔍 Code Structure
     Briefly explain how your files are organised.
     - `sketch.js` — main game loop
     - `Ball.js` — ball class with collision logic
     - `assets/` — sprites and sounds

     ### 🧩 Something I'm Proud Of
     A snippet of code, a design decision, a moment where it clicked.
     ```js
     // your code here
     ```

     ### 🔗 References
     Anything that helped or inspired you — tutorials, artworks, tools.
     ───────────────────────────────────────────────────── -->
