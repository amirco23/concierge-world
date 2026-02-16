import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { Background } from "../components/Background";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const VALUE_PROPS = [
  { label: "Business Agility", gradFrom: "#F5B731", gradTo: "#FF8A47" },
  { label: "Optimized Scale", gradFrom: "#4C9AFF", gradTo: "#A29BFE" },
];

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hero "This is" — subtle fade in 0-10
  const heroSmallOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hero "monday Wallet" — spring in at frame 6
  const heroSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const heroScale = interpolate(heroSpring, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heroOpacity = interpolate(heroSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wallet icon — spring scale from frame 3
  const iconSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 16, stiffness: 180 },
  });
  const iconScale = interpolate(iconSpring, [0, 1], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconOpacity = interpolate(iconSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow ring pulse behind wallet icon
  const glowPulse = frame > 15 ? 0.3 + Math.sin((frame - 15) * 0.08) * 0.12 : 0;

  // Value prop pills — staggered entrance
  const pill0Spring = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const pill1Spring = spring({ frame: frame - 50, fps, config: { damping: 200 } });
  const pillSprings = [pill0Spring, pill1Spring];

  // Divider line
  const dividerWidth = interpolate(frame, [30, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Closing tagline
  const taglineSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 200 },
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button
  const ctaSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 16, stiffness: 160 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaGlow = frame > 100 ? 0.3 + Math.sin((frame - 100) * 0.1) * 0.15 : 0;

  return (
    <AbsoluteFill>
      <Background />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          fontFamily,
        }}
      >
        {/* Wallet icon */}
        <div
          style={{
            position: "relative",
            marginBottom: 28,
            opacity: iconOpacity,
            transform: `scale(${iconScale})`,
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,183,49,0.25), transparent 70%)",
              filter: "blur(16px)",
              opacity: glowPulse,
            }}
          />
          <div
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 40%, #4C9AFF 100%)",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 40px rgba(255,138,71,0.35)",
              position: "relative",
            }}
          >
            <svg viewBox="0 0 48 48" style={{ width: 40, height: 40 }}>
              <rect x="4" y="12" width="40" height="28" rx="6" fill="#fff" opacity="0.9" />
              <rect x="4" y="12" width="40" height="10" rx="4" fill="#fff" />
              <rect x="4" y="8" width="32" height="8" rx="4" fill="#fff" opacity="0.6" />
              <rect x="30" y="22" width="14" height="12" rx="4" fill="rgba(255,255,255,0.4)" />
              <circle cx="36" cy="28" r="3" fill="#fff" />
            </svg>
          </div>
        </div>

        {/* "This is" */}
        <div
          style={{
            opacity: heroSmallOpacity,
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            marginBottom: 8,
          }}
        >
          This is
        </div>

        {/* "monday Wallet" */}
        <div
          style={{
            opacity: heroOpacity,
            transform: `scale(${heroScale})`,
            fontSize: 62,
            fontWeight: 900,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.95)" }}>monday </span>
          <span
            style={{
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 50%, #4C9AFF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Wallet
          </span>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: `${dividerWidth * 3}px`,
            maxWidth: 300,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(245,183,49,0.4), transparent)",
            marginBottom: 24,
          }}
        />

        {/* Value prop pills */}
        <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
          {VALUE_PROPS.map((vp, i) => {
            const s = pillSprings[i];
            const pillY = interpolate(s, [0, 1], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const pillOpacity = interpolate(s, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={vp.label}
                style={{
                  padding: "12px 28px",
                  borderRadius: 50,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  transform: `translateY(${pillY}px)`,
                  opacity: pillOpacity,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${vp.gradFrom}, ${vp.gradTo})`,
                    boxShadow: `0 0 8px ${vp.gradFrom}40`,
                  }}
                />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${vp.gradFrom}, ${vp.gradTo})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {vp.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Closing tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 32,
          }}
        >
          Standardize &middot; Govern &middot; Scale
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -24,
              borderRadius: 30,
              background: "radial-gradient(ellipse, rgba(245,183,49,0.3), transparent 70%)",
              filter: "blur(20px)",
              opacity: ctaGlow,
            }}
          />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 48px",
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 40%, #4C9AFF 100%)",
              color: "#FFFFFF",
              borderRadius: 14,
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 12px 40px rgba(255,138,71,0.35)",
              position: "relative",
            }}
          >
            Discover monday Wallet
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
