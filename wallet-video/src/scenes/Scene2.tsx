import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const TAG_CHIPS = ["Fund", "Allocate", "Control", "Scale"];

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glow: fades in 0-30
  const glowOpacity = interpolate(
    frame,
    [0, 30],
    [0, 0.8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Wallet hero: scale + rotation from frame 6
  const walletSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const walletScale = interpolate(
    walletSpring,
    [0, 1],
    [0.4, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const walletRotation = interpolate(
    walletSpring,
    [0, 1],
    [-12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Headline: spring blur/fade from frame 18
  const headlineSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 200 },
  });
  const headlineBlur = interpolate(
    headlineSpring,
    [0, 1],
    [6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const headlineOpacity = interpolate(
    headlineSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle: spring slide-up from frame 36
  const subtitleSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const subtitleTranslateY = interpolate(
    subtitleSpring,
    [0, 1],
    [20, 0],
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
        position: "relative",
        fontFamily,
      }}
    >
      {/* Subtle glow behind everything */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse, rgba(245,183,49,0.07) 0%, rgba(247,208,96,0.03) 30%, transparent 55%)",
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Wallet hero icon */}
        <div
          style={{
            width: 110,
            height: 110,
            background: "linear-gradient(135deg, #F5B731, #F7D060)",
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${walletScale}) rotate(${walletRotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 48 48"
            style={{ width: 52, height: 52 }}
          >
            <rect
              x="4"
              y="12"
              width="40"
              height="28"
              rx="6"
              fill="#fff"
              opacity="0.9"
            />
            <rect x="4" y="12" width="40" height="10" rx="4" fill="#fff" />
            <rect
              x="4"
              y="8"
              width="32"
              height="8"
              rx="4"
              fill="#fff"
              opacity="0.6"
            />
            <rect
              x="30"
              y="22"
              width="14"
              height="12"
              rx="4"
              fill="rgba(245,183,49,0.35)"
            />
            <circle cx="36" cy="28" r="3" fill="#fff" />
          </svg>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "baseline",
            gap: "0.2em",
            opacity: headlineOpacity,
            filter: `blur(${headlineBlur}px)`,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Introducing{" "}
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              background: "linear-gradient(135deg, #F5B731, #F7D060)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Monday Wallet
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 19,
            color: "#A0A3B1",
            lineHeight: 1.6,
            maxWidth: 560,
            textAlign: "center",
            transform: `translateY(${subtitleTranslateY}px)`,
            opacity: subtitleOpacity,
          }}
        >
          One place to fund, allocate and control every work experience across
          your organization.
        </div>

        {/* Tag chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {TAG_CHIPS.map((tag, i) => {
            const tagStartFrame = 60 + i * 4;
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
                  color: "#F5B731",
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
    </div>
  );
};
