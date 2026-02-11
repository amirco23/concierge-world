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
const UNALLOCATED = 51000;

export const Scene3: React.FC = () => {
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

  // Allocation panel: spring scale + opacity from frame 6
  const panelSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 200 },
  });
  const panelScale = interpolate(
    panelSpring,
    [0, 1],
    [0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const panelOpacity = interpolate(
    panelSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Unallocated count: 0 -> 51000 over frames 72-114
  const unallocatedValue = Math.round(
    interpolate(
      frame,
      [72, 114],
      [0, UNALLOCATED],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
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
        gap: 36,
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
          Plan and allocate{" "}
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
          funds as you go
        </span>
      </div>

      {/* Allocation panel */}
      <div
        style={{
          width: 800,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 18,
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          transform: `scale(${panelScale})`,
          opacity: panelOpacity,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Budget Allocation
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#A0A3B1",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            Unallocated: ${unallocatedValue.toLocaleString()}
          </span>
        </div>

        {/* Allocation rows */}
        {ALLOCATIONS.map((item, i) => {
          const rowStartFrame = 12 + i * 3;
          const barStartFrame = 36 + i * 5;
          const barEndFrame = 90 + i * 5;

          const rowSpring = spring({
            frame: frame - rowStartFrame,
            fps,
            config: { damping: 200 },
          });
          const rowTranslateX = interpolate(
            rowSpring,
            [0, 1],
            [30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const rowOpacity = interpolate(
            rowSpring,
            [0, 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const barWidthPct = interpolate(
            frame,
            [barStartFrame, barEndFrame],
            [0, (item.amount / MAX_AMOUNT) * 100],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const amountValue = Math.round(
            interpolate(
              frame,
              [barStartFrame, barEndFrame],
              [0, item.amount],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          );

          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 28px",
                gap: 16,
                transform: `translateX(${rowTranslateX}px)`,
                opacity: rowOpacity,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon === "coin" ? (
                  <CoinIcon size={36} />
                ) : (
                  <Img
                    src={staticFile(item.icon)}
                    style={{
                      width: 36,
                      height: 36,
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* Name */}
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  width: 160,
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
                  textAlign: "right",
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  color: item.color,
                  fontSize: 15,
                }}
              >
                ${amountValue.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
