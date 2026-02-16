import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface SubtitleCue {
  start: number; // global frame
  end: number;   // global frame
  text: string;
}

export const Subtitles: React.FC<{ cues: SubtitleCue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();

  // Find active cue
  const activeCue = cues.find((c) => frame >= c.start && frame < c.end);
  if (!activeCue) return null;

  const fadeIn = interpolate(
    frame,
    [activeCue.start, activeCue.start + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    frame,
    [activeCue.end - 6, activeCue.end],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const translateY = interpolate(
    frame,
    [activeCue.start, activeCue.start + 8],
    [-6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(14px)",
          borderRadius: 12,
          padding: "10px 28px",
          opacity: fadeIn * fadeOut,
          transform: `translateY(${translateY}px)`,
          maxWidth: 800,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 500,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: "0.01em",
          }}
        >
          {activeCue.text}
        </span>
      </div>
    </div>
  );
};
