import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
  AbsoluteFill,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { Background } from "../components/Background";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const TEAM_CHIPS = [
  { name: "Sales", color: "#F5B731" },
  { name: "CS", color: "#F7D060" },
  { name: "R&D", color: "#A29BFE" },
  { name: "Marketing", color: "#FD79A8" },
  { name: "Finance", color: "#FDCB6E" },
];

const SPEND_BY_TEAM = [
  { name: "Sales", pct: 85, val: "$12.4k", gradFrom: "#F5B731", gradTo: "#F7D060" },
  { name: "R&D", pct: 70, val: "$10.2k", gradFrom: "#A29BFE", gradTo: "#74B9FF" },
  { name: "CS", pct: 56, val: "$8.3k", gradFrom: "#F7D060", gradTo: "#F5B731" },
  { name: "Marketing", pct: 44, val: "$6.3k", gradFrom: "#FD79A8", gradTo: "#FDA7DF" },
  { name: "Finance", pct: 26, val: "$3.6k", gradFrom: "#FDCB6E", gradTo: "#FFEAA7" },
];

const SPEND_BY_EXPERIENCE = [
  { name: "AI Credits", pct: 92, val: "$14.8k", gradFrom: "#DAA520", gradTo: "#F5D060" },
  { name: "AI Agents", pct: 64, val: "$9.1k", gradFrom: "#A29BFE", gradTo: "#74B9FF" },
  { name: "AI Workflows", pct: 50, val: "$7.0k", gradFrom: "#74B9FF", gradTo: "#A29BFE" },
  { name: "Apps", pct: 38, val: "$5.6k", gradFrom: "#E17055", gradTo: "#FDCB6E" },
  { name: "Sidekick", pct: 30, val: "$4.1k", gradFrom: "#F5B731", gradTo: "#F7D060" },
];

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline: blur/fade in 0-12
  const headlineOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineBlur = interpolate(frame, [0, 12], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left card: slide from left at frame 36
  const leftCardSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 200 },
  });
  const leftCardTranslateX = interpolate(leftCardSpring, [0, 1], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftCardOpacity = interpolate(leftCardSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right card: slide from right at frame 42
  const rightCardSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 200 },
  });
  const rightCardTranslateX = interpolate(rightCardSpring, [0, 1], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightCardOpacity = interpolate(rightCardSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA: spring scale-up + translateY at frame 120
  const ctaSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 18, stiffness: 180 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaTranslateY = interpolate(ctaSpring, [0, 1], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA pulse glow
  const ctaGlow = frame > 135 ? 0.3 + Math.sin((frame - 135) * 0.12) * 0.15 : 0;

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
          gap: 22,
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
              fontSize: 38,
              fontWeight: 900,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Company-Wide{" "}
          </span>
          <span
            style={{
              fontSize: 38,
              fontWeight: 900,
              background: "linear-gradient(135deg, #F5B731, #F7D060)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Visibility
          </span>
        </div>

        {/* Team chips row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {TEAM_CHIPS.map((chip, i) => {
            const chipStartFrame = 18 + i * 2;
            const chipSpring = spring({
              frame: frame - chipStartFrame,
              fps,
              config: { damping: 200 },
            });
            const chipTranslateY = interpolate(chipSpring, [0, 1], [10, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const chipOpacity = interpolate(chipSpring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={chip.name}
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0F1117",
                  background: chip.color,
                  transform: `translateY(${chipTranslateY}px)`,
                  opacity: chipOpacity,
                }}
              >
                {chip.name}
              </div>
            );
          })}
        </div>

        {/* Two-card grid */}
        <div style={{ display: "flex", gap: 20 }}>
          {/* Left card - Spend by Team */}
          <div
            style={{
              width: 340,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 24,
              transform: `translateX(${leftCardTranslateX}px)`,
              opacity: leftCardOpacity,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Spend by Team
            </div>
            {SPEND_BY_TEAM.map((row, i) => {
              const barStartFrame = 42 + i * 3;
              const barEndFrame = barStartFrame + 18;
              const barWidthPct = interpolate(
                frame,
                [barStartFrame, barEndFrame],
                [0, row.pct],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={row.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: i < SPEND_BY_TEAM.length - 1 ? 12 : 0,
                  }}
                >
                  <div
                    style={{
                      width: 65,
                      fontSize: 12,
                      color: "#A0A3B1",
                      textAlign: "right" as const,
                    }}
                  >
                    {row.name}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 12,
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.04)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${barWidthPct}%`,
                        height: "100%",
                        borderRadius: 6,
                        background: `linear-gradient(90deg, ${row.gradFrom}, ${row.gradTo})`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: 55,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#A0A3B1",
                      textAlign: "right" as const,
                    }}
                  >
                    {row.val}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right card - Spend by Experience */}
          <div
            style={{
              width: 340,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 24,
              transform: `translateX(${rightCardTranslateX}px)`,
              opacity: rightCardOpacity,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Spend by Experience
            </div>
            {SPEND_BY_EXPERIENCE.map((row, i) => {
              const barStartFrame = 48 + i * 3;
              const barEndFrame = barStartFrame + 18;
              const barWidthPct = interpolate(
                frame,
                [barStartFrame, barEndFrame],
                [0, row.pct],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={row.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: i < SPEND_BY_EXPERIENCE.length - 1 ? 12 : 0,
                  }}
                >
                  <div
                    style={{
                      width: 65,
                      fontSize: 12,
                      color: "#A0A3B1",
                      textAlign: "right" as const,
                    }}
                  >
                    {row.name}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 12,
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.04)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${barWidthPct}%`,
                        height: "100%",
                        borderRadius: 6,
                        background: `linear-gradient(90deg, ${row.gradFrom}, ${row.gradTo})`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: 55,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#A0A3B1",
                      textAlign: "right" as const,
                    }}
                  >
                    {row.val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale}) translateY(${ctaTranslateY}px)`,
            position: "relative",
          }}
        >
          {/* Glow behind CTA */}
          <div
            style={{
              position: "absolute",
              inset: -20,
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
              gap: 10,
              padding: "18px 44px",
              background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 40%, #4C9AFF 100%)",
              color: "#FFFFFF",
              borderRadius: 14,
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 8px 32px rgba(255,138,71,0.35)",
              position: "relative",
            }}
          >
            {/* Mini wallet logo in button */}
            <div
              style={{
                width: 30,
                height: 30,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 48 48" style={{ width: 18, height: 18 }}>
                <rect x="4" y="12" width="40" height="28" rx="6" fill="#fff" opacity="0.9" />
                <rect x="4" y="12" width="40" height="10" rx="4" fill="#fff" />
                <rect x="4" y="8" width="32" height="8" rx="4" fill="#fff" opacity="0.6" />
                <rect x="30" y="22" width="14" height="12" rx="4" fill="rgba(255,255,255,0.4)" />
                <circle cx="36" cy="28" r="3" fill="#fff" />
              </svg>
            </div>
            Discover monday Wallet
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: ctaOpacity,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            background: "linear-gradient(135deg, #FFB800 0%, #FF8A47 50%, #4C9AFF 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Standardize. Govern. Scale.
        </div>
      </div>
    </AbsoluteFill>
  );
};
