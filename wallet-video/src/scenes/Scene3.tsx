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
import { CoinIcon } from "../components/CoinIcon";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ALLOCATIONS = [
  {
    name: "AI Credits",
    icon: "coin",
    color: "#DAA520",
    gradFrom: "#DAA520",
    gradTo: "#F5D060",
    amount: 15000,
  },
  {
    name: "Vibe Apps",
    icon: "assets/icon-vibe.png",
    color: "#E17055",
    gradFrom: "#E17055",
    gradTo: "#FDCB6E",
    amount: 8000,
  },
  {
    name: "Sidekick",
    icon: "assets/icon-sidekick.png",
    color: "#F5B731",
    gradFrom: "#F5B731",
    gradTo: "#F7D060",
    amount: 5000,
  },
  {
    name: "AI Workflows",
    icon: "assets/icon-workflows.png",
    color: "#74B9FF",
    gradFrom: "#74B9FF",
    gradTo: "#A29BFE",
    amount: 7000,
  },
  {
    name: "AI Agents",
    icon: "assets/icon-agents.png",
    color: "#A29BFE",
    gradFrom: "#A29BFE",
    gradTo: "#74B9FF",
    amount: 10000,
  },
  {
    name: "Marketplace Apps",
    icon: "assets/icon-vibe.png",
    color: "#E17055",
    gradFrom: "#E17055",
    gradTo: "#FD79A8",
    amount: 5000,
  },
];

const MAX_AMOUNT = 15000;
const TOTAL_BUDGET = 50000;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade out content in last 18 frames to avoid overlap with next scene
  const exitFade = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline: blur/fade in 0-12
  const headlineOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * exitFade;
  const headlineBlur = interpolate(frame, [0, 12], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Allocation panel: spring scale + opacity from frame 6
  const panelSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 200 },
  });
  const panelScale = interpolate(panelSpring, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Total allocated counter
  const allocatedTotal = ALLOCATIONS.reduce((sum, item, i) => {
    const barStartFrame = 30 + i * 4;
    const barEndFrame = 72 + i * 4;
    const amount = Math.round(
      interpolate(frame, [barStartFrame, barEndFrame], [0, item.amount], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );
    return sum + amount;
  }, 0);

  const unallocated = TOTAL_BUDGET - allocatedTotal;

  // Budget balance bar
  const balancePct = (allocatedTotal / TOTAL_BUDGET) * 100;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
            fontSize: 38,
            fontWeight: 900,
            color: "rgba(255,255,255,0.95)",
          }}
        >
          Plan and allocate{" "}
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
          funds as you go
        </span>
      </div>

      {/* Main layout: sidebar + allocation panel */}
      <div
        style={{
          display: "flex",
          gap: 20,
          transform: `scale(${panelScale})`,
          opacity: panelOpacity * exitFade,
        }}
      >
        {/* Left sidebar - Balance summary */}
        <div
          style={{
            width: 200,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 18,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{ fontSize: 11, fontWeight: 600, color: "#A0A3B1", letterSpacing: "0.08em", textTransform: "uppercase" as const }}
          >
            Total Balance
          </div>
          <div
            style={{ fontSize: 32, fontWeight: 800, color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}
          >
            ${TOTAL_BUDGET.toLocaleString()}
          </div>

          {/* Balance bar */}
          <div>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: `${balancePct}%`,
                  height: "100%",
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #F5B731, #F7D060)",
                  transition: "width 0.1s",
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: "#A0A3B1" }}>
              {Math.round(balancePct)}% allocated
            </div>
          </div>

          {/* Unallocated */}
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(245,183,49,0.06)",
              borderRadius: 12,
              border: "1px solid rgba(245,183,49,0.1)",
            }}
          >
            <div style={{ fontSize: 10, color: "#A0A3B1", marginBottom: 4 }}>Unallocated</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#F5B731", fontVariantNumeric: "tabular-nums" }}>
              ${unallocated.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Allocation panel */}
        <div
          style={{
            width: 680,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 18,
            backdropFilter: "blur(20px)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>
              Budget Allocation
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #F5B731, #F7D060)",
                  color: "#0F1117",
                }}
              >
                + Add Funds
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.06)",
                  color: "#A0A3B1",
                }}
              >
                Transfer Back
              </span>
            </div>
          </div>

          {/* Allocation rows */}
          {ALLOCATIONS.map((item, i) => {
            const rowStartFrame = 10 + i * 2;
            const barStartFrame = 30 + i * 4;
            const barEndFrame = 72 + i * 4;

            const rowSpring = spring({
              frame: frame - rowStartFrame,
              fps,
              config: { damping: 200 },
            });
            const rowTranslateX = interpolate(rowSpring, [0, 1], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const rowOpacity = interpolate(rowSpring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const barWidthPct = interpolate(
              frame,
              [barStartFrame, barEndFrame],
              [0, (item.amount / MAX_AMOUNT) * 100],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const amountValue = Math.round(
              interpolate(frame, [barStartFrame, barEndFrame], [0, item.amount], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            );

            return (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "11px 24px",
                  gap: 14,
                  transform: `translateX(${rowTranslateX}px)`,
                  opacity: rowOpacity,
                  borderBottom: i < ALLOCATIONS.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon === "coin" ? (
                    <CoinIcon size={34} />
                  ) : (
                    <Img
                      src={staticFile(item.icon)}
                      style={{ width: 34, height: 34, objectFit: "cover" }}
                    />
                  )}
                </div>

                {/* Name */}
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FFFFFF",
                    width: 140,
                    flexShrink: 0,
                  }}
                >
                  {item.name}
                </span>

                {/* Bar */}
                <div
                  style={{
                    flex: 1,
                    height: 10,
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${barWidthPct}%`,
                      height: "100%",
                      borderRadius: 5,
                      background: `linear-gradient(90deg, ${item.gradFrom}, ${item.gradTo})`,
                    }}
                  />
                </div>

                {/* Amount */}
                <span
                  style={{
                    width: 80,
                    textAlign: "right" as const,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    color: item.color,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ${amountValue.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
