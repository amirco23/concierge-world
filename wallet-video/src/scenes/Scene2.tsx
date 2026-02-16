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

  // Glow: fades in 0-20
  const glowOpacity = interpolate(frame, [0, 20], [0, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow ring pulse
  const ringPulse = 1 + Math.sin(frame * 0.1) * 0.08;

  // Wallet hero: scale + rotation from frame 4
  const walletSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 18, stiffness: 180 },
  });
  const walletScale = interpolate(walletSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const walletRotation = interpolate(walletSpring, [0, 1], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline: spring blur/fade from frame 14
  const headlineSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 200 },
  });
  const headlineBlur = interpolate(headlineSpring, [0, 1], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle: spring slide-up from frame 30
  const subtitleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const subtitleTranslateY = interpolate(subtitleSpring, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating coin particles around the wallet icon
  const particles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2 + frame * 0.03;
    const radius = 80 + Math.sin(frame * 0.05 + i) * 15;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const particleOpacity = interpolate(frame, [10, 30], [0, 0.4], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { x, y, opacity: particleOpacity, size: 4 + (i % 3) * 2 };
  });

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
            "radial-gradient(ellipse, rgba(245,183,49,0.1) 0%, rgba(247,208,96,0.04) 30%, transparent 55%)",
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
          gap: 24,
        }}
      >
        {/* Wallet hero icon with particles */}
        <div style={{ position: "relative" }}>
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 160,
              height: 160,
              marginLeft: -80,
              marginTop: -80,
              borderRadius: "50%",
              border: "1px solid rgba(245,183,49,0.15)",
              transform: `scale(${ringPulse})`,
              opacity: glowOpacity * 0.5,
            }}
          />

          {/* Floating particles */}
          {particles.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: "#F5B731",
                transform: `translate(${p.x}px, ${p.y}px)`,
                opacity: p.opacity,
                filter: "blur(1px)",
              }}
            />
          ))}

          <div
            style={{
              width: 120,
              height: 120,
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 40%, #4C9AFF 100%)",
              borderRadius: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${walletScale}) rotate(${walletRotation}deg)`,
              boxShadow: "0 20px 60px rgba(255,138,71,0.3)",
            }}
          >
            <svg viewBox="0 0 48 48" style={{ width: 56, height: 56 }}>
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
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.2em",
            opacity: headlineOpacity,
            filter: `blur(${headlineBlur}px)`,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Introducing
          </span>
          {/* Inline wallet logo icon */}
          <div
            style={{
              width: 52,
              height: 52,
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 40%, #4C9AFF 100%)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8,
              marginRight: 2,
              boxShadow: "0 4px 16px rgba(255,138,71,0.3)",
            }}
          >
            <svg viewBox="0 0 48 48" style={{ width: 28, height: 28 }}>
              <rect x="4" y="12" width="40" height="28" rx="6" fill="#fff" opacity="0.9" />
              <rect x="4" y="12" width="40" height="10" rx="4" fill="#fff" />
              <rect x="4" y="8" width="32" height="8" rx="4" fill="#fff" opacity="0.6" />
              <rect x="30" y="22" width="14" height="12" rx="4" fill="rgba(255,255,255,0.4)" />
              <circle cx="36" cy="28" r="3" fill="#fff" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 50%, #4C9AFF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.01em",
            }}
          >
            monday{" "}Wallet
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#A0A3B1",
            lineHeight: 1.6,
            maxWidth: 580,
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
            gap: 12,
            justifyContent: "center",
          }}
        >
          {TAG_CHIPS.map((tag, i) => {
            const tagStartFrame = 48 + i * 3;
            const tagSpring = spring({
              frame: frame - tagStartFrame,
              fps,
              config: { damping: 200 },
            });
            const translateY = interpolate(tagSpring, [0, 1], [10, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const opacity = interpolate(tagSpring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <span
                key={tag}
                style={{
                  padding: "10px 26px",
                  borderRadius: 100,
                  fontSize: 15,
                  fontWeight: 700,
                  background: "rgba(245,183,49,0.1)",
                  color: "#F5B731",
                  border: "1px solid rgba(245,183,49,0.15)",
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
