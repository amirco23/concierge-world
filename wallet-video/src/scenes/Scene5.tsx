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

  // Headline: blur/fade in 0-15
  const headlineOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const headlineBlur = interpolate(
    frame,
    [0, 15],
    [8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Left card: slide from left at frame 51
  const leftCardSpring = spring({
    frame: frame - 51,
    fps,
    config: { damping: 200 },
  });
  const leftCardTranslateX = interpolate(
    leftCardSpring,
    [0, 1],
    [-30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Right card: slide from right at frame 55
  const rightCardSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 200 },
  });
  const rightCardTranslateX = interpolate(
    rightCardSpring,
    [0, 1],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle: spring slide-up at frame 108
  const subtitleSpring = spring({
    frame: frame - 108,
    fps,
    config: { damping: 200 },
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
          gap: 28,
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
              fontSize: 34,
              fontWeight: 900,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Company-Wide{" "}
          </span>
          <span
            style={{
              fontSize: 34,
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
            const chipStartFrame = 27 + i * 3;
            const chipSpring = spring({
              frame: frame - chipStartFrame,
              fps,
              config: { damping: 200 },
            });
            const chipTranslateY = interpolate(
              chipSpring,
              [0, 1],
              [10, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const chipOpacity = interpolate(
              chipSpring,
              [0, 1],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={chip.name}
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  fontSize: 12,
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
        <div
          style={{
            display: "flex",
            gap: 20,
          }}
        >
          {/* Left card - Spend by Team */}
          <div
            style={{
              width: 320,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 24,
              transform: `translateX(${leftCardTranslateX}px)`,
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
              const barStartFrame = 51 + i * 4;
              const barEndFrame = barStartFrame + 20;
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
                      width: 60,
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
                      width: 50,
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
              width: 320,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: 24,
              transform: `translateX(${rightCardTranslateX}px)`,
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
              const barStartFrame = 55 + i * 4;
              const barEndFrame = barStartFrame + 20;
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
                      width: 60,
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
                      width: 50,
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

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            fontSize: 18,
            color: "#A0A3B1",
            textAlign: "center" as const,
          }}
        >
          Finance, IT and Ops finally{" "}
          <span style={{ fontWeight: 700, color: "#FFFFFF" }}>
            speak the same language.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
