import React from "react";
import { COLORS } from "../theme";

export const Background: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.bg,
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs — static */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(245,183,49,0.18), transparent 70%)`,
          filter: "blur(80px)",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(247,208,96,0.12), transparent 70%)`,
          filter: "blur(80px)",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(162,155,254,0.08), transparent 70%)`,
          filter: "blur(60px)",
          opacity: 0.3,
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
};
