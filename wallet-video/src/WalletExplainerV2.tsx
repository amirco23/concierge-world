import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "./components/Background";
import { Subtitles } from "./components/Subtitles";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import {
  SCENE_FRAMES,
  TRANSITION_FRAMES,
  NARRATION,
} from "./theme";

// V2 scene durations — same as V1 for scenes 1-5, plus new Scene 6
const SCENE6_FRAMES = 200; // ~6.7 seconds — closing with narration

const SCENES_V2 = [
  SCENE_FRAMES.scene1,
  SCENE_FRAMES.scene2,
  SCENE_FRAMES.scene3,
  SCENE_FRAMES.scene4,
  SCENE_FRAMES.scene5,
  SCENE6_FRAMES,
];

const SCENE_COMPONENTS = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

// Compute global start frame for each scene (accounting for transitions)
function getSceneStarts(): number[] {
  const starts: number[] = [0];
  for (let i = 1; i < SCENES_V2.length; i++) {
    starts.push(starts[i - 1] + SCENES_V2[i - 1] - TRANSITION_FRAMES);
  }
  return starts;
}

const SCENE_STARTS = getSceneStarts();

// Build global subtitle cues from per-scene narration + new Scene 6 text cues
function buildGlobalCues() {
  const cues: Array<{ start: number; end: number; text: string }> = [];

  // Scenes 1-5 keep their original narration subtitles
  for (const n of NARRATION) {
    const globalOffset = SCENE_STARTS[n.scene - 1];
    for (const sub of n.subtitles) {
      cues.push({
        start: globalOffset + sub.start,
        end: globalOffset + sub.end,
        text: sub.text,
      });
    }
  }

  // Scene 6 subtitle cues — synced with narration-6 (~3.5s = 105 frames)
  const s6Start = SCENE_STARTS[5];
  cues.push(
    { start: s6Start + 6, end: s6Start + 54, text: "Built for business agility." },
    { start: s6Start + 54, end: s6Start + 111, text: "Optimized for scale." },
  );

  return cues;
}

const GLOBAL_CUES = buildGlobalCues();

export const WalletExplainerV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Monday logo — fade in over first 20 frames
  const logoOpacity = interpolate(frame, [0, 20], [0, 0.7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />

      {/* ─── Scene transitions (6 scenes) ─── */}
      <TransitionSeries>
        {SCENES_V2.map((dur, i) => {
          const SceneComponent = SCENE_COMPONENTS[i];
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({
                    durationInFrames: TRANSITION_FRAMES,
                  })}
                />
              )}
              <TransitionSeries.Sequence durationInFrames={dur}>
                <AbsoluteFill
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SceneComponent />
                </AbsoluteFill>
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>

      {/* ─── Ambient background music (very quiet, loops) ─── */}
      <Audio
        src={staticFile("audio/ambient.wav")}
        volume={0.12}
        startFrom={0}
      />

      {/* ─── Voice narration per scene (1-5) ─── */}
      {NARRATION.map((n) => {
        const globalStart = SCENE_STARTS[n.scene - 1] + 6;
        return (
          <Sequence key={n.scene} from={globalStart}>
            <Audio src={staticFile(n.audio)} volume={0.85} />
          </Sequence>
        );
      })}

      {/* ─── Scene 6 narration ─── */}
      <Sequence from={SCENE_STARTS[5] + 6}>
        <Audio src={staticFile("audio/narration-6.wav")} volume={0.85} />
      </Sequence>

      {/* ─── Transition swoosh sounds ─── */}
      {SCENE_STARTS.slice(1).map((startFrame, i) => (
        <Sequence key={`swoosh-${i}`} from={startFrame - 4}>
          <Audio src={staticFile("audio/swoosh.wav")} volume={0.25} />
        </Sequence>
      ))}

      {/* ─── UI pop sounds at key moments ─── */}
      {/* Scene 1: product chips appearing */}
      <Sequence from={21}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.15} />
      </Sequence>
      <Sequence from={30}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.12} />
      </Sequence>

      {/* Scene 2: wallet hero icon */}
      <Sequence from={SCENE_STARTS[1] + 6}>
        <Audio src={staticFile("audio/ding.wav")} volume={0.18} />
      </Sequence>

      {/* Scene 3: allocation bars filling */}
      <Sequence from={SCENE_STARTS[2] + 36}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.10} />
      </Sequence>
      <Sequence from={SCENE_STARTS[2] + 60}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.10} />
      </Sequence>

      {/* Scene 4: toggles activating */}
      <Sequence from={SCENE_STARTS[3] + 21}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.12} />
      </Sequence>
      <Sequence from={SCENE_STARTS[3] + 39}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.12} />
      </Sequence>
      {/* Alert toast */}
      <Sequence from={SCENE_STARTS[3] + 117}>
        <Audio src={staticFile("audio/ding.wav")} volume={0.15} />
      </Sequence>
      {/* Success toast */}
      <Sequence from={SCENE_STARTS[3] + 140}>
        <Audio src={staticFile("audio/success.wav")} volume={0.18} />
      </Sequence>

      {/* Scene 5: CTA */}
      <Sequence from={SCENE_STARTS[4] + 90}>
        <Audio src={staticFile("audio/success.wav")} volume={0.2} />
      </Sequence>

      {/* Scene 6: wallet icon entrance */}
      <Sequence from={SCENE_STARTS[5] + 3}>
        <Audio src={staticFile("audio/ding.wav")} volume={0.14} />
      </Sequence>
      {/* Value prop pills */}
      <Sequence from={SCENE_STARTS[5] + 40}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.10} />
      </Sequence>
      <Sequence from={SCENE_STARTS[5] + 50}>
        <Audio src={staticFile("audio/pop.wav")} volume={0.10} />
      </Sequence>
      {/* Final CTA success chime */}
      <Sequence from={SCENE_STARTS[5] + 85}>
        <Audio src={staticFile("audio/success.wav")} volume={0.20} />
      </Sequence>

      {/* ─── Subtitles overlay ─── */}
      <Subtitles cues={GLOBAL_CUES} />

      {/* ─── Wallet icon — top left ─── */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          opacity: logoOpacity,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background:
              "linear-gradient(135deg, #FFB800 0%, #FF8A47 40%, #4C9AFF 100%)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(255,138,71,0.3)",
          }}
        >
          <svg viewBox="0 0 48 48" style={{ width: 20, height: 20 }}>
            <rect x="4" y="12" width="40" height="28" rx="6" fill="#fff" opacity="0.9" />
            <rect x="4" y="12" width="40" height="10" rx="4" fill="#fff" />
            <rect x="4" y="8" width="32" height="8" rx="4" fill="#fff" opacity="0.6" />
            <rect x="30" y="22" width="14" height="12" rx="4" fill="rgba(255,255,255,0.4)" />
            <circle cx="36" cy="28" r="3" fill="#fff" />
          </svg>
        </div>
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          monday Wallet
        </span>
      </div>

      {/* ─── Progress bar at bottom ─── */}
      <ProgressBar />

      {/* ─── Audio waveform visualizer ─── */}
      <WaveformIndicator />
    </AbsoluteFill>
  );
};

// ─── Progress Bar ───────────────────────────────────────────────────────

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = (frame / durationInFrames) * 100;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        background: "rgba(255,255,255,0.04)",
        zIndex: 90,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #F5B731, #F7D060)",
        }}
      />
    </div>
  );
};

// ─── Waveform Indicator (decorative) ────────────────────────────────────

const WaveformIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  const barCount = 24;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const phase = i * 0.4 + frame * 0.15;
    const height =
      4 + Math.abs(Math.sin(phase)) * 12 + Math.abs(Math.cos(phase * 0.7)) * 6;
    return height;
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 14,
        right: 36,
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        opacity: 0.35,
        zIndex: 90,
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: h,
            borderRadius: 1,
            background:
              "linear-gradient(180deg, #F5B731, rgba(245,183,49,0.3))",
          }}
        />
      ))}
    </div>
  );
};
