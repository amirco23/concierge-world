import { Composition } from "remotion";
import { WalletExplainer } from "./WalletExplainer";
import { WalletExplainerV2 } from "./WalletExplainerV2";

// 30fps — scene durations calibrated to actual audio with 20f+ safety buffers
const FPS = 30;
// V1: 336+230+296+196+204 - 4×12 = 1214 frames (~40.5s)
const TOTAL_FRAMES = 1214;
// V2: 336+230+296+196+204+200 - 5×12 = 1402 frames (~46.7s)
const TOTAL_FRAMES_V2 = 1402;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WalletExplainer"
        component={WalletExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="WalletExplainerV2"
        component={WalletExplainerV2}
        durationInFrames={TOTAL_FRAMES_V2}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
