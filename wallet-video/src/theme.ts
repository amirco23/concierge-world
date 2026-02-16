// Gold / Amber palette — matching the wallet-explainer
export const COLORS = {
  bg: "#0F1117",
  bgElevated: "#181B25",
  card: "#1A1D2B",
  cardBorder: "rgba(255,255,255,0.06)",
  accent: "#F5B731",
  accentDim: "rgba(245,183,49,0.15)",
  accentGlow: "rgba(245,183,49,0.25)",
  green: "#F7D060",
  pink: "#FD79A8",
  orange: "#E17055",
  gold: "#FDCB6E",
  purple: "#A29BFE",
  blue: "#74B9FF",
  text: "#FFFFFF",
  textSec: "#A0A3B1",
  textMuted: "#5A5E72",
};

export const GRADIENTS = {
  accent: "linear-gradient(135deg, #F5B731, #F7D060)",
  brand: "linear-gradient(135deg, #F5B731, #F7D060, #FDCB6E)",
};

export const PRODUCTS = [
  { name: "Vibe Apps", icon: "assets/icon-vibe.png", color: "#E17055" },
  { name: "AI Agents", icon: "assets/icon-agents.png", color: "#A29BFE" },
  { name: "AI Workflows", icon: "assets/icon-workflows.png", color: "#74B9FF" },
  { name: "Sidekick", icon: "assets/icon-sidekick.png", color: "#F5B731" },
  { name: "Notetaker", icon: "assets/icon-automations.png", color: "#F7D060" },
];

export const ALLOCS = [
  { name: "AI Credits", icon: "coin", color: "#DAA520", gradFrom: "#DAA520", gradTo: "#F5D060", amount: 15000 },
  { name: "Vibe Apps", icon: "assets/icon-vibe.png", color: "#E17055", gradFrom: "#E17055", gradTo: "#FDCB6E", amount: 8000 },
  { name: "Sidekick", icon: "assets/icon-sidekick.png", color: "#F5B731", gradFrom: "#F5B731", gradTo: "#F7D060", amount: 5000 },
  { name: "AI Workflows", icon: "assets/icon-workflows.png", color: "#74B9FF", gradFrom: "#74B9FF", gradTo: "#A29BFE", amount: 7000 },
  { name: "AI Agents", icon: "assets/icon-agents.png", color: "#A29BFE", gradFrom: "#A29BFE", gradTo: "#74B9FF", amount: 10000 },
];

export const FPS = 30;

// ─── Scene timing ────────────────────────────────────────────────────────
// Duration = audio_frames + 6 (start delay) + 20+ safety buffer
// Audio varies slightly per ElevenLabs generation; these accommodate up to ~10% overshoot.
// V1 total: 174+230+296+196+204 - 4×12 = 1052 frames (~35.1s)
export const SCENE_FRAMES = {
  scene1: 174,  // 5.8s — audio ~148f, need 154, buffer 20f
  scene2: 230,  // 7.7s  — audio ~202f, need 208, buffer 22f
  scene3: 296,  // 9.9s  — audio ~268f, need 274, buffer 22f
  scene4: 196,  // 6.5s  — audio ~166f, need 172, buffer 24f
  scene5: 204,  // 6.8s  — audio ~175f, need 181, buffer 23f
};

export const TRANSITION_FRAMES = 12;

// ─── Subtitle / narration cue data ────────────────────────────────────
// Timings are scene-local frames. The WalletExplainer maps them to global time.
// Subtitle timings are scene-local frames, calibrated to audio durations.
// Each narration starts at frame 6 of its scene (globalOffset + 6).
export const NARRATION = [
  {
    scene: 1,
    audio: "audio/narration-1.wav",
    // ~4.6s = 138 frames of audio
    subtitles: [
      { start: 0, end: 66, text: "Your monday platform is growing fast." },
      { start: 66, end: 144, text: "Now, there's one smart way to power it all." },
    ],
  },
  {
    scene: 2,
    audio: "audio/narration-2.wav",
    // 6.91s = 208 frames of audio
    subtitles: [
      { start: 0, end: 62, text: "That's why we built monday Wallet!" },
      { start: 62, end: 214, text: "Load your funds once, and flexibly allocate them across any experience." },
    ],
  },
  {
    scene: 3,
    audio: "audio/narration-3.wav",
    // ~8.95s = 268 frames of audio
    subtitles: [
      { start: 0, end: 67, text: "AI Agents, Vibe Apps, Sidekick..." },
      { start: 67, end: 160, text: "you decide where every dollar goes." },
      { start: 160, end: 274, text: "Move funds between products as your needs change." },
    ],
  },
  {
    scene: 4,
    audio: "audio/narration-4.wav",
    // ~5.55s = 166 frames of audio
    subtitles: [
      { start: 0, end: 75, text: "Spending caps, auto top-up, real-time alerts..." },
      { start: 75, end: 172, text: "you're always in the driver's seat." },
    ],
  },
  {
    scene: 5,
    audio: "audio/narration-5.wav",
    // ~5.84s = 175 frames of audio
    subtitles: [
      { start: 0, end: 96, text: "And the best part? Total visibility across your entire company." },
      { start: 96, end: 181, text: "This is monday Wallet." },
    ],
  },
];
