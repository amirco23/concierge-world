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

const GoldCoinSvg: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="url(#coinGrad)" />
    <path
      d="M12 6 L13.5 10 L18 10.5 L14.5 13 L15.5 17 L12 14.5 L8.5 17 L9.5 13 L6 10.5 L10.5 10 Z"
      fill="url(#coinStar)"
    />
    <defs>
      <linearGradient id="coinGrad" x1="4" y1="4" x2="20" y2="20">
        <stop offset="0%" stopColor="#F5D060" />
        <stop offset="50%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id="coinStar" x1="8" y1="6" x2="16" y2="18">
        <stop offset="0%" stopColor="#FFF8DC" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
    </defs>
  </svg>
);

const TABLE_ROWS = [
  { name: "AI Agents", icon: "assets/icon-agents.png", alloc: "$8,000", spent: "$5,320", cap: "$10,000", status: "ok" as const },
  { name: "Sidekick", icon: "assets/icon-sidekick.png", alloc: "$6,500", spent: "$5,890", cap: "$7,000", status: "near" as const },
  { name: "Vibe Coding", icon: "assets/icon-vibe.png", alloc: "$12,000", spent: "$7,140", cap: "$15,000", status: "ok" as const },
  { name: "AI Workflows", icon: "assets/icon-workflows.png", alloc: "$4,200", spent: "$2,100", cap: "$5,000", status: "ok" as const },
  { name: "AI Credits", icon: null, alloc: "$9,800", spent: "$8,610", cap: "$10,000", status: "near" as const },
];

const SPEND_BY_EXP = [
  { name: "AI Credits", pct: 92 },
  { name: "AI Agents", pct: 64 },
  { name: "Workflows", pct: 50 },
  { name: "Apps", pct: 38 },
];

const TOP_TEAMS = [
  { name: "Sales", val: "$12.4k" },
  { name: "R&D", val: "$10.2k" },
  { name: "CS", val: "$8.3k" },
  { name: "Marketing", val: "$6.3k" },
];

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline: blur/fade 0-18
  const headlineOpacity = interpolate(
    frame,
    [0, 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const headlineBlur = interpolate(
    frame,
    [0, 18],
    [8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sub-headline: spring slide-up at frame 18
  const subHeadSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 200 },
  });
  const subHeadTranslateY = interpolate(
    subHeadSpring,
    [0, 1],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subHeadOpacity = interpolate(
    subHeadSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Platform mock: spring scale + translateY at frame 42
  const mockSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 200 },
  });
  const mockScale = interpolate(
    mockSpring,
    [0, 1],
    [0.95, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const mockTranslateY = interpolate(
    mockSpring,
    [0, 1],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const mockOpacity = interpolate(
    mockSpring,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // CTA: spring scale-up + translateY at frame 90
  const ctaSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const ctaScale = interpolate(
    ctaSpring,
    [0, 1],
    [0.9, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ctaTranslateY = interpolate(
    ctaSpring,
    [0, 1],
    [15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ctaOpacity = interpolate(
    ctaSpring,
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
          gap: 24,
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
              fontSize: 46,
              fontWeight: 900,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            One wallet for your entire{" "}
          </span>
          <span
            style={{
              fontSize: 46,
              fontWeight: 900,
              background: "linear-gradient(135deg, #F5B731, #F7D060)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Work OS.
          </span>
        </div>

        {/* Sub-headline */}
        <div
          style={{
            opacity: subHeadOpacity,
            transform: `translateY(${subHeadTranslateY}px)`,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            background: "linear-gradient(135deg, #F5B731, #F7D060)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Standardize. Govern. Scale.
        </div>

        {/* Platform mock */}
        <div
          style={{
            opacity: mockOpacity,
            transform: `scale(${mockScale}) translateY(${mockTranslateY}px)`,
          }}
        >
          <div
            style={{
              width: 880,
              borderRadius: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              transform: "perspective(1200px) rotateX(4deg)",
              overflow: "hidden",
            }}
          >
          {/* Browser header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 20px",
              background: "rgba(0,0,0,0.2)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FDBB2E" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27CA40" }} />
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#A0A3B1",
              }}
            >
              monday Wallet — Admin Dashboard
            </span>
          </div>

          {/* 3-column body */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr 170px",
              minHeight: 320,
            }}
          >
            {/* Left sidebar */}
            <div
              style={{
                padding: 20,
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: "#A0A3B1",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginBottom: 6,
                }}
              >
                Total Balance
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: 12,
                }}
              >
                $50,000
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.04)",
                  overflow: "hidden",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: "64%",
                    height: "100%",
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #F5B731, #F7D060)",
                  }}
                />
              </div>
              <div style={{ fontSize: 10, color: "#A0A3B1", marginBottom: 16 }}>
                64% allocated
              </div>
              {["AI Credits", "Vibe Apps", "Sidekick"].map((name, i) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 0",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {name === "AI Credits" ? (
                      <GoldCoinSvg size={16} />
                    ) : (
                      <Img
                        src={staticFile(name === "Vibe Apps" ? "assets/icon-vibe.png" : "assets/icon-sidekick.png")}
                        style={{ width: 16, height: 16, objectFit: "contain" }}
                      />
                    )}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF" }}>{name}</span>
                </div>
              ))}
            </div>

            {/* Center: table */}
            <div style={{ padding: 20, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" as const, color: "#A0A3B1", fontWeight: 600, paddingBottom: 12 }}>Offering</th>
                    <th style={{ textAlign: "right" as const, color: "#A0A3B1", fontWeight: 600, paddingBottom: 12 }}>Allocated</th>
                    <th style={{ textAlign: "right" as const, color: "#A0A3B1", fontWeight: 600, paddingBottom: 12 }}>Spent</th>
                    <th style={{ textAlign: "right" as const, color: "#A0A3B1", fontWeight: 600, paddingBottom: 12 }}>Cap</th>
                    <th style={{ textAlign: "left" as const, color: "#A0A3B1", fontWeight: 600, paddingBottom: 12 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row, i) => {
                    const rowStartFrame = 42 + i * 4;
                    const rowSpring = spring({
                      frame: frame - rowStartFrame,
                      fps,
                      config: { damping: 200 },
                    });
                    const rowOpacity = interpolate(
                      rowSpring,
                      [0, 1],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    const rowTranslateX = interpolate(
                      rowSpring,
                      [0, 1],
                      [15, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    return (
                      <tr
                        key={row.name}
                        style={{
                          opacity: rowOpacity,
                          transform: `translateX(${rowTranslateX}px)`,
                        }}
                      >
                        <td style={{ padding: "10px 0", color: "#FFFFFF" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 6,
                                background: "rgba(255,255,255,0.06)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {row.icon ? (
                                <Img
                                  src={staticFile(row.icon)}
                                  style={{ width: 14, height: 14, objectFit: "contain" }}
                                />
                              ) : (
                                <GoldCoinSvg size={14} />
                              )}
                            </div>
                            {row.name}
                          </div>
                        </td>
                        <td style={{ padding: "10px 0", color: "#A0A3B1", textAlign: "right" as const }}>{row.alloc}</td>
                        <td style={{ padding: "10px 0", color: "#A0A3B1", textAlign: "right" as const }}>{row.spent}</td>
                        <td style={{ padding: "10px 0", color: "#A0A3B1", textAlign: "right" as const }}>{row.cap}</td>
                        <td style={{ padding: "10px 0" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: 100,
                              fontSize: 10,
                              fontWeight: 600,
                              background: row.status === "ok" ? "rgba(0,202,114,0.15)" : "rgba(253,171,61,0.15)",
                              color: row.status === "ok" ? "#00CA72" : "#FDAB3D",
                            }}
                          >
                            {row.status === "ok" ? "On track" : "Near cap"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Right panel */}
            <div
              style={{
                padding: 20,
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: 12,
                }}
              >
                Spend by Experience
              </div>
              {SPEND_BY_EXP.map((item) => (
                <div key={item.name} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, color: "#A0A3B1", marginBottom: 4 }}>{item.name}</div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.04)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.pct}%`,
                        height: "100%",
                        borderRadius: 3,
                        background: "linear-gradient(90deg, #F5B731, #F7D060)",
                      }}
                    />
                  </div>
                </div>
              ))}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginTop: 16,
                  marginBottom: 12,
                }}
              >
                Top Teams
              </div>
              {TOP_TEAMS.map((t) => (
                <div
                  key={t.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "#A0A3B1",
                    padding: "4px 0",
                  }}
                >
                  <span>{t.name}</span>
                  <span style={{ fontWeight: 600 }}>{t.val}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* CTA - sibling of platform mock */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale}) translateY(${ctaTranslateY}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 44px",
              background: "linear-gradient(135deg, #F5B731, #F7D060)",
              color: "#0F1117",
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Discover Monday Wallet
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
