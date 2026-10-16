# Birthday Surprise Website for Tita Anne

A magical two-page birthday surprise web experience featuring a custom SCSS animation pipeline powered by YAML, styled with Tailwind CSS, and embellished with interactive envelope animations and confetti fireworks.

---

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Build Animations (YAML -> SCSS -> CSS):**
   ```bash
   npm run build
   ```

3. **Open the Website:**
   - Open `index.html` in any modern web browser (e.g. double-click or serve locally).

---

## ⚙️ How It Works

### The Animation Pipeline
All animation timings, easings, distances, shadows, and colors are defined in one central configuration file: **`animations.yaml`**.

When you run `npm run build`:
1. `scripts/yaml-to-scss.js` parses `animations.yaml` with `js-yaml`.
2. It auto-generates `animations.scss` with SCSS variables, the `$colors` map, and CSS keyframe animations.
3. It invokes the Sass CLI (`npx sass animations.scss animations.css`) to compile the final `animations.css`.

> [!WARNING]
> Do not edit `animations.scss` directly. It is overwritten whenever `npm run build` runs. Always make animation tweaks in `animations.yaml`.

---

## 🎨 How to Customize

### 1. Customizing Animation Timings & Colors
Edit `animations.yaml`:
```yaml
glow_pulse:
  duration: 2s
  easing: ease-in-out
  min_shadow: 0 0 10px rgba(255, 215, 0, 0.3)
  max_shadow: 0 0 30px rgba(255, 215, 0, 0.8)

float:
  duration: 3s
  distance: 10px

flap_open:
  duration: 0.8s
  angle: -160deg

letter_rise:
  duration: 1s
  delay: 0.6s
  distance: 120px

page_fade:
  duration: 0.6s

twinkle:
  duration: 3s

colors:
  midnight: "#0b1026"
  lavender: "#b9a7e0"
  silver: "#c0c6d4"
  gold: "#f5c96a"
```

After modifying any value, rebuild the animations:
```bash
npm run build
```

---

### 2. Customizing the Birthday Letter Message
Open `main.html` and scroll to the clearly marked section at the top of the `<script>` tag:
```javascript
const LETTER_CONTENT = {
  recipient: "Dear [Aunt's Name],",
  body: "Happy Birthday! I hope your day is as wonderful as you are. Thank you for always being there for me.",
  closing: "Love,",
  sender: "[Your Name]"
};
```
Change the aunt's name, message, and your name, then save the file. No build step is required for letter text edits!

---

## 📁 Project Structure

```
.
├── animations.yaml         # Single source of truth for animation settings and colors
├── animations.scss         # Auto-generated SCSS file (do not edit directly)
├── animations.css          # Compiled CSS linked in HTML files
├── index.html              # Page 1: Surprise intro with glowing pulse button
├── main.html               # Page 2: Birthday celebration, floating envelope & confetti
├── package.json            # npm configuration and build scripts
├── scripts/
│   └── yaml-to-scss.js     # Script converting YAML to SCSS and compiling via Sass
└── README.md               # Project documentation
```
