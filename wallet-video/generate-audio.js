#!/usr/bin/env node
/**
 * Generate professional voice narration (ElevenLabs) + polished SFX.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_... node generate-audio.js
 *
 * Or create a .env file with ELEVENLABS_API_KEY=sk_...
 */

const fs = require("fs");
const path = require("path");

const AUDIO_DIR = path.join(__dirname, "public", "audio");
const SR = 44100;

// ── Try loading .env ────────────────────────────────────────────────────
try {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const [key, ...val] = line.split("=");
      if (key && val.length) process.env[key.trim()] = val.join("=").trim();
    }
  }
} catch {}

// ── WAV writer ──────────────────────────────────────────────────────────
function writeWav(filepath, samples, sampleRate = SR) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  fs.writeFileSync(filepath, buf);
  console.log(`  ✓ ${path.basename(filepath)} (${(n / sampleRate).toFixed(2)}s)`);
}

// ── Helpers ─────────────────────────────────────────────────────────────
function lowPass(samples, windowSize) {
  const out = new Float64Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    let sum = 0, count = 0;
    for (let j = Math.max(0, i - windowSize); j <= Math.min(samples.length - 1, i + windowSize); j++) {
      sum += samples[j]; count++;
    }
    out[i] = sum / count;
  }
  return out;
}

function addReverb(samples, delayMs = 40, decay = 0.25, mix = 0.3) {
  const d = Math.floor((delayMs / 1000) * SR);
  const out = new Float64Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    out[i] = samples[i];
    if (i >= d) out[i] += out[i - d] * decay;
  }
  for (let i = 0; i < samples.length; i++) out[i] = samples[i] * (1 - mix) + out[i] * mix;
  return out;
}

function smoothEnvelope(samples, attackMs = 5, releaseMs = 10) {
  const a = Math.floor((attackMs / 1000) * SR);
  const r = Math.floor((releaseMs / 1000) * SR);
  const out = new Float64Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    let e = 1;
    if (i < a) e = i / a;
    if (i > samples.length - r) e = (samples.length - i) / r;
    out[i] = samples[i] * e;
  }
  return out;
}

// ── Professional Sound Effects ──────────────────────────────────────────

function generateSoftSwoosh(duration = 0.55) {
  const n = Math.floor(SR * duration);
  const raw = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR, p = i / n;
    // Smoother, wider envelope with gentle bell curve
    const env = Math.pow(Math.sin(p * Math.PI), 2.2) * 0.22;
    const noise = Math.random() * 2 - 1;
    // Lower, warmer sweep — feels more cinematic
    const sweep = Math.sin(2 * Math.PI * (80 + p * 350) * t) * 0.12;
    const sub = Math.sin(2 * Math.PI * 45 * t) * Math.exp(-t * 5) * 0.15;
    // Subtle shimmer overtone
    const shimmer = Math.sin(2 * Math.PI * (800 + p * 400) * t) * Math.exp(-t * 12) * 0.03;
    raw[i] = (noise * 0.15 + sweep + sub + shimmer) * env;
  }
  return addReverb(smoothEnvelope(lowPass(raw, 12), 8, 30), 55, 0.22, 0.35);
}

function generateSoftClick(duration = 0.14) {
  const n = Math.floor(SR * duration);
  const raw = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    // Softer, warmer decay — less harsh click, more like a gentle tap
    const env = Math.exp(-t * 40);
    const body = Math.sin(2 * Math.PI * 800 * t) * 0.2;
    const warmth = Math.sin(2 * Math.PI * 400 * t) * 0.12;
    const air = Math.sin(2 * Math.PI * 1600 * t) * Math.exp(-t * 80) * 0.04;
    raw[i] = (body + warmth + air) * env;
  }
  return addReverb(smoothEnvelope(raw, 2, 12), 35, 0.18, 0.25);
}

function generateNotificationTone(duration = 0.7) {
  const n = Math.floor(SR * duration);
  const raw = new Float64Array(n);
  // Modern two-note chime with warmer harmonic structure
  const notes = [
    { freq: 523.25, start: 0, gain: 0.18 },     // C5 — warmer base
    { freq: 659.25, start: 0.06, gain: 0.14 },   // E5 — gentle resolve
    { freq: 784, start: 0.10, gain: 0.06 },       // G5 — airy overtone
  ];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let s = 0;
    for (const note of notes) {
      if (t >= note.start) {
        const lt = t - note.start;
        // Longer, smoother decay for modern feel
        const env = Math.exp(-lt * 3.2) * Math.min(lt * 250, 1);
        s += (Math.sin(2 * Math.PI * note.freq * lt) + Math.sin(2 * Math.PI * note.freq * 2 * lt) * 0.04) * env * note.gain;
      }
    }
    raw[i] = s;
  }
  return addReverb(smoothEnvelope(raw, 4, 40), 70, 0.25, 0.35);
}

function generateSuccessChord(duration = 0.9) {
  const n = Math.floor(SR * duration);
  const raw = new Float64Array(n);
  // Richer, more cinematic success chord — major 7th voicing
  const notes = [
    { freq: 392, start: 0, gain: 0.16 },       // G4 — warm base
    { freq: 493.88, start: 0.05, gain: 0.14 },  // B4
    { freq: 587.33, start: 0.10, gain: 0.12 },  // D5
    { freq: 739.99, start: 0.14, gain: 0.09 },  // F#5
    { freq: 987.77, start: 0.18, gain: 0.04 },  // B5 — airy shimmer
  ];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let s = 0;
    for (const note of notes) {
      if (t >= note.start) {
        const lt = t - note.start;
        // Longer sustain for modern cinematic feel
        const env = Math.exp(-lt * 2.2) * Math.min(lt * 300, 1);
        s += (Math.sin(2 * Math.PI * note.freq * lt) + Math.sin(2 * Math.PI * note.freq * 2 * lt) * 0.03) * env * note.gain;
      }
    }
    raw[i] = s;
  }
  return addReverb(smoothEnvelope(raw, 4, 50), 80, 0.25, 0.4);
}

function generateAmbientPad(duration = 45) {
  const n = Math.floor(SR * duration);
  const raw = new Float64Array(n);
  // Richer, more modern pad — cinematic & warm with subtle movement
  const layers = [
    { freq: 55, detune: 0.3, gain: 0.30 },      // Sub bass
    { freq: 82.41, detune: 0.2, gain: 0.22 },    // Low warmth
    { freq: 110, detune: 0.4, gain: 0.18 },       // Body
    { freq: 164.81, detune: 0.3, gain: 0.10 },    // Mid warmth
    { freq: 220, detune: 0.5, gain: 0.06 },       // Presence
    { freq: 329.63, detune: 0.2, gain: 0.03 },    // Shimmer
    { freq: 440, detune: 0.15, gain: 0.015 },     // Air
  ];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const fadeIn = Math.min(t / 4, 1);
    const fadeOut = Math.min((duration - t) / 4, 1);
    const masterEnv = fadeIn * fadeOut * 0.05;
    // Slow volume swell for movement
    const swell = 1 + Math.sin(t * 0.08) * 0.15;
    let s = 0;
    for (const l of layers) {
      const wobble = Math.sin(t * 0.1 + l.freq * 0.008) * l.detune;
      // Add subtle chorus-like doubling
      const main = Math.sin(2 * Math.PI * (l.freq + wobble) * t);
      const chorus = Math.sin(2 * Math.PI * (l.freq + wobble + 0.7) * t) * 0.4;
      s += (main + chorus) * l.gain;
    }
    raw[i] = s * masterEnv * swell;
  }
  return lowPass(raw, 10);
}

// ── ElevenLabs Voice Narration ──────────────────────────────────────────

const NARRATION_LINES = [
  {
    id: "narration-1",
    text: "Your monday platform is growing fast. Now, there's one smart way to power it all.",
  },
  {
    id: "narration-2",
    text: "That's why we built monday Wallet! Load your funds once, and flexibly allocate them across any experience, anytime.",
  },
  {
    id: "narration-3",
    text: "AI Agents, Vibe Apps, Sidekick... you decide where every dollar goes. Move funds between products as your needs change.",
  },
  {
    id: "narration-4",
    text: "Spending caps, auto top-up, real-time alerts... you're always in the driver's seat.",
  },
  {
    id: "narration-5",
    text: "And the best part? Total visibility across your entire company. This is monday Wallet.",
  },
  {
    id: "narration-6",
    text: "Built for business agility. Optimized for scale.",
  },
];

async function generateNarrationElevenLabs() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("\n❌ ELEVENLABS_API_KEY not set!");
    console.error("   Set it as an environment variable or create a .env file:");
    console.error("   ELEVENLABS_API_KEY=sk_your_key_here\n");
    console.error("   Get a free API key at https://elevenlabs.io\n");
    process.exit(1);
  }

  console.log("\n🎙️  Generating voice narration via ElevenLabs...");

  // First, list available voices and pick a good one
  // Jessica — "Playful, Bright, Warm" — naturally energetic and human
  let voiceId = "cgSgspJ2msm6clMCkdW9";
  let voiceName = "Jessica";
  console.log(`  Using voice: ${voiceName} (bright, energetic, human delivery)`);

  for (const line of NARRATION_LINES) {
    const mp3Path = path.join(AUDIO_DIR, `${line.id}.mp3`);
    const wavPath = path.join(AUDIO_DIR, `${line.id}.wav`);

    console.log(`  Generating ${line.id}...`);

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text: line.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.2,          // very low = natural variation, human-like
          similarity_boost: 0.65,
          style: 0.9,             // max expressiveness — excited, real person energy
          use_speaker_boost: true,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`  ❌ Error for ${line.id}: ${res.status} ${err}`);
      continue;
    }

    // Save MP3
    const arrayBuf = await res.arrayBuffer();
    fs.writeFileSync(mp3Path, Buffer.from(arrayBuf));

    // Convert MP3 to WAV using afconvert (macOS)
    const { execSync } = require("child_process");
    execSync(`afconvert -f WAVE -d LEI16@44100 "${mp3Path}" "${wavPath}"`);
    fs.unlinkSync(mp3Path);

    const stats = fs.statSync(wavPath);
    const dur = ((stats.size - 44) / (44100 * 2)).toFixed(2);
    console.log(`  ✓ ${line.id}.wav (${dur}s)`);
  }
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  console.log("🔊 Generating polished sound effects...");
  writeWav(path.join(AUDIO_DIR, "swoosh.wav"), generateSoftSwoosh(0.4));
  writeWav(path.join(AUDIO_DIR, "whoosh.wav"), generateSoftSwoosh(0.5));
  writeWav(path.join(AUDIO_DIR, "pop.wav"), generateSoftClick(0.08));
  writeWav(path.join(AUDIO_DIR, "ding.wav"), generateNotificationTone(0.55));
  writeWav(path.join(AUDIO_DIR, "success.wav"), generateSuccessChord(0.7));
  writeWav(path.join(AUDIO_DIR, "ambient.wav"), generateAmbientPad(32));

  await generateNarrationElevenLabs();

  console.log("\n✅ All audio generated in public/audio/");
  console.log("   Run 'npm run build' to render the video.\n");
}

main().catch(console.error);
