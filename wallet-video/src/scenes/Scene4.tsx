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

const TOGGLE_ROWS = [
  { label: "Monthly caps", onFrame: 21 },
  { label: "Auto top-up", onFrame: 39 },
  { label: "Alerts at 80%", onFrame: 57 },
  { label: "Approval required above threshold", onFrame: 75 },
];

export const Scene4: React.FC = () => {
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

  // Control panel: spring scale in at frame 9
  const panelSpring = spring({
    frame: frame - 9,
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

  // Warning toast: slides up from bottom at frame 117
  const warningSpring = spring({
    frame: frame - 117,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const warningTranslateY = interpolate(
    warningSpring,
    [0, 1],
    [80, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const warningOpacity = interpolate(
    warningSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // OK toast: slides up at frame 150
  const okSpring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const okTranslateY = interpolate(
    okSpring,
    [0, 1],
    [80, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const okOpacity = interpolate(
    okSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
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
          Control &{" "}
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
          Governance
        </span>
      </div>

      {/* Control panel */}
      <div
        style={{
          width: 520,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 18,
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          transform: `scale(${panelScale})`,
          opacity: panelOpacity,
          padding: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              background: "linear-gradient(135deg, #F5B731, #F7D060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F1117"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Budget Controls
          </span>
        </div>

        {/* Toggle rows */}
        {TOGGLE_ROWS.map((row) => {
          const toggleSpring = spring({
            frame: frame - row.onFrame,
            fps,
            config: { damping: 200 },
          });
          const isOn = toggleSpring > 0.5;
          const knobX = interpolate(
            toggleSpring,
            [0, 1],
            [2, 20],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {/* Left: check circle + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    border: isOn ? "none" : "2px solid rgba(255,255,255,0.3)",
                    background: isOn
                      ? "linear-gradient(135deg, #F5B731, #F7D060)"
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isOn && (
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0F1117"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#A0A3B1",
                  }}
                >
                  {row.label}
                </span>
              </div>

              {/* Right: toggle switch */}
              <div
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  background: isOn
                    ? "linear-gradient(135deg, #F5B731, #F7D060)"
                    : "rgba(255,255,255,0.08)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: knobX,
                    top: 3,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    background: "#FFFFFF",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast container */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
        }}
      >
        {/* Warning toast */}
        <div
          style={{
            background: "rgba(245,183,49,0.08)",
            border: "1px solid rgba(245,183,49,0.2)",
            color: "#F5B731",
            borderRadius: 14,
            padding: "14px 24px",
            transform: `translateY(${warningTranslateY}px)`,
            opacity: warningOpacity,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ⚠️ Agents reached 80% of budget
        </div>

        {/* OK toast - success feel */}
        <div
          style={{
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "#22C55E",
            borderRadius: 14,
            padding: "14px 24px",
            transform: `translateY(${okTranslateY}px)`,
            opacity: okOpacity,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ⬆️ Auto-top-up triggered: +$2,000
        </div>
      </div>
    </div>
  );
};
