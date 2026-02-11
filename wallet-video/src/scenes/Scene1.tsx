import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PRODUCTS = [
  { name: "Vibe Apps", icon: "assets/icon-vibe.png" },
  { name: "AI Agents", icon: "assets/icon-agents.png" },
  { name: "AI Workflows", icon: "assets/icon-workflows.png" },
  { name: "Sidekick", icon: "assets/icon-sidekick.png" },
  { name: "Notetaker", icon: "assets/icon-automations.png" },
];

const CHAOS_TAGS = ["Subscriptions", "Credits", "Add-ons", "Usage", "Seats"];

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline: fade/blur in 0-20
  const headlineOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const headlineBlur = interpolate(
    frame,
    [0, 20],
    [8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle: slide up from frame 48
  const subtitleSpring = spring({
    frame: frame - 48,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const subtitleTranslateY = interpolate(
    subtitleSpring,
    [0, 1],
    [24, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitleOpacity = interpolate(
    subtitleSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        fontFamily,
      }}
    >
      {/* Headline */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "0.25em",
          opacity: headlineOpacity,
          filter: `blur(${headlineBlur}px)`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "rgba(255,255,255,0.95)",
          }}
        >
          More products. More{" "}
        </span>
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            background: "linear-gradient(135deg, #F5B731, #F7D060)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          consumption.
        </span>
      </div>

      {/* Product chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {PRODUCTS.map((product, i) => {
          const chipStartFrame = 21 + i * 3;
          const chipSpring = spring({
            frame: frame - chipStartFrame,
            fps,
            config: { damping: 200 },
          });
          const translateY = interpolate(
            chipSpring,
            [0, 1],
            [14, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const opacity = interpolate(
            chipSpring,
            [0, 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={product.name}
              style={{
                padding: "8px 18px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transform: `translateY(${translateY}px)`,
                opacity,
              }}
            >
              <Img
                src={staticFile(product.icon)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  overflow: "hidden",
                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {product.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 18,
          color: "#A0A3B1",
          textAlign: "center",
          transform: `translateY(${subtitleTranslateY}px)`,
          opacity: subtitleOpacity,
        }}
      >
        But budgeting and controlling them is{" "}
        <strong style={{ color: "#fff", fontWeight: 700 }}>fragmented.</strong>
      </div>

      {/* Chaos tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        {CHAOS_TAGS.map((tag, i) => {
          const tagStartFrame = 84 + i * 3;
          const tagSpring = spring({
            frame: frame - tagStartFrame,
            fps,
            config: { damping: 200 },
          });
          const translateY = interpolate(
            tagSpring,
            [0, 1],
            [10, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const opacity = interpolate(
            tagSpring,
            [0, 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <span
              key={tag}
              style={{
                padding: "8px 22px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                background: "rgba(245,183,49,0.08)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(245,183,49,0.12)",
                transform: `translateY(${translateY}px)`,
                opacity,
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};
