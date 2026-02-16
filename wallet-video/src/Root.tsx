import { Composition } from "remotion";
import { WalletExplainer } from "./WalletExplainer";
import { WalletExplainerV2 } from "./WalletExplainerV2";

// 30fps — scene durations calibrated to actual audio with 20f+ safety buffers
const FPS = 30;
// V1: 174+230+296+196+204 - 4×12 = 1052 frames (~35.1s)
const TOTAL_FRAMES = 1052;
// V2: 174+230+296+196+204+200 - 5×12 = 1240 frames (~41.3s)
const TOTAL_FRAMES_V2 = 1240;

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
