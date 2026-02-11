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
  { name: "Marketplace Apps", icon: "assets/icon-vibe.png", color: "#E17055", gradFrom: "#E17055", gradTo: "#FD79A8", amount: 5000 },
];

// Scene durations in seconds (at 30fps)
export const SCENE_DURATIONS = {
  scene1: 5.5,
  scene2: 5.2,
  scene3: 6.0,
  scene4: 6.2, // Controls
  scene5: 5.8, // Visibility
  scene6: 7.3, // Platform
};

export const FPS = 30;
