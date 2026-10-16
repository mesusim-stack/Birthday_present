const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

// Paths
const rootDir = path.resolve(__dirname, '..');
const yamlPath = path.join(rootDir, 'animations.yaml');
const scssPath = path.join(rootDir, 'animations.scss');
const cssPath = path.join(rootDir, 'animations.css');

console.log('[yaml-to-scss] Reading animations.yaml...');
const fileContents = fs.readFileSync(yamlPath, 'utf8');
const data = yaml.load(fileContents);

// Helper to convert snake_case or camelCase to kebab-case
function toKebabCase(str) {
  return str.replace(/_/g, '-').toLowerCase();
}

// Build SCSS Content
let scss = `// ==============================================================================
// AUTO-GENERATED from animations.yaml. DO NOT EDIT DIRECTLY.
// Any manual changes will be overwritten when running "npm run build".
// ==============================================================================

`;

// Generate individual variables for each section
for (const [sectionKey, sectionValues] of Object.entries(data)) {
  if (sectionKey === 'colors') continue;
  scss += `// ${sectionKey.replace(/_/g, ' ').toUpperCase()} SETTINGS\n`;
  if (typeof sectionValues === 'object' && sectionValues !== null) {
    for (const [propKey, propVal] of Object.entries(sectionValues)) {
      const varName = `$${toKebabCase(sectionKey)}-${toKebabCase(propKey)}`;
      scss += `${varName}: ${propVal};\n`;
    }
  } else {
    scss += `$${toKebabCase(sectionKey)}: ${sectionValues};\n`;
  }
  scss += '\n';
}

// Generate colors map and variables
if (data.colors) {
  scss += `// COLORS MAP\n$colors: (\n`;
  for (const [colorName, colorVal] of Object.entries(data.colors)) {
    scss += `  ${toKebabCase(colorName)}: ${colorVal},\n`;
  }
  scss += `);\n\n`;

  scss += `// Individual color variables\n`;
  for (const [colorName, colorVal] of Object.entries(data.colors)) {
    scss += `$color-${toKebabCase(colorName)}: ${colorVal};\n`;
  }
  scss += '\n';
}

// Add Keyframes and Animation Classes
scss += `// ==============================================================================
// KEYFRAMES & UTILITY CLASSES
// ==============================================================================

// Glow Pulse Animation
@keyframes glowPulse {
  0%, 100% {
    box-shadow: $glow-pulse-min-shadow;
  }
  50% {
    box-shadow: $glow-pulse-max-shadow;
  }
}

.anim-glow-pulse {
  animation: glowPulse $glow-pulse-duration $glow-pulse-easing infinite;
}

// Float Animation
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-#{$float-distance});
  }
}

.anim-float {
  animation: float $float-duration ease-in-out infinite;
}

// Flap Open Animation
@keyframes flapOpen {
  0% {
    transform: rotateX(0deg);
    z-index: 35;
  }
  49% {
    z-index: 35;
  }
  50% {
    z-index: 5;
  }
  100% {
    transform: rotateX($flap-open-angle);
    z-index: 5;
  }
}

// Flap Close Animation
@keyframes flapClose {
  0% {
    transform: rotateX($flap-open-angle);
    z-index: 5;
  }
  50% {
    z-index: 35;
  }
  100% {
    transform: rotateX(0deg);
    z-index: 35;
  }
}

.anim-flap-open {
  animation: flapOpen $flap-open-duration ease-in-out forwards;
  transform-origin: top center;
}

.anim-flap-close {
  animation: flapClose $flap-open-duration ease-in-out forwards;
  transform-origin: top center;
}

// Letter Rise Animation (Centered in viewport & envelope)
@keyframes letterRise {
  0% {
    transform: translate(-50%, 60px) scale(0.9);
    opacity: 0;
    z-index: 15;
  }
  25% {
    opacity: 1;
  }
  50% {
    z-index: 15;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    z-index: 50;
  }
}

// Letter Lower Animation
@keyframes letterLower {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    z-index: 50;
  }
  50% {
    z-index: 15;
    opacity: 1;
  }
  85% {
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, 60px) scale(0.9);
    opacity: 0;
    z-index: 15;
  }
}

.anim-letter-rise {
  animation: letterRise $letter-rise-duration ease-out $letter-rise-delay forwards;
}

.anim-letter-lower {
  animation: letterLower $letter-rise-duration ease-in forwards;
}

// Page Fade Transitions
@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pageFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.anim-fade-in {
  animation: pageFadeIn $page-fade-duration ease-in-out forwards;
}

.anim-fade-out {
  animation: pageFadeOut $page-fade-duration ease-in-out forwards;
}

// Twinkle Animation (Stationary stars)
@keyframes twinkle {
  0%, 100% {
    opacity: 0.25;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.anim-twinkle {
  animation: twinkle $twinkle-duration ease-in-out infinite;
}

// Star Drift Animation (Moving stars)
@keyframes starDrift {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate($star-drift-distance, -#{$star-drift-distance * 0.5});
  }
  100% {
    transform: translate(0, 0);
  }
}

.anim-star-drift {
  animation: starDrift $star-drift-duration ease-in-out infinite;
}

// Star Sparkle Animation (For prominent big stars)
@keyframes starSparkle {
  0%, 100% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0.45;
  }
  50% {
    transform: scale(1.3) rotate(15deg);
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(245, 201, 106, 0.95));
  }
}

.anim-star-sparkle {
  animation: starSparkle $star-sparkle-duration ease-in-out infinite;
}

// Shooting Star Animation
@keyframes shootingStar {
  0% {
    transform: translateX(0) translateY(0) rotate(-42deg) scaleX(0);
    opacity: 0;
  }
  5% {
    transform: translateX(20px) translateY(18px) rotate(-42deg) scaleX(1);
    opacity: 1;
  }
  18% {
    transform: translateX(320px) translateY(288px) rotate(-42deg) scaleX(1);
    opacity: 0;
  }
  100% {
    transform: translateX(320px) translateY(288px) rotate(-42deg) scaleX(0);
    opacity: 0;
  }
}

.anim-shooting-star {
  animation: shootingStar 10s ease-in-out infinite;
}
`;

console.log('[yaml-to-scss] Writing animations.scss...');
fs.writeFileSync(scssPath, scss, 'utf8');

console.log('[yaml-to-scss] Compiling animations.scss to animations.css with Sass CLI...');
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
try {
  execSync(`${npxCmd} sass animations.scss animations.css`, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
  });
  console.log('[yaml-to-scss] Compilation successful -> animations.css generated!');
} catch (err) {
  console.error('[yaml-to-scss] Failed to compile with Sass CLI:', err.message);
  process.exit(1);
}
