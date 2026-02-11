import { Composition } from "remotion";
import { WalletExplainer } from "./WalletExplainer";

// 30fps, scene durations: 5.5 + 5.2 + 6.0 + 6.2 + 5.8 + 7.3 = 36s = 1080 frames
// With 5 fade transitions of ~15 frames each, subtract ~75 frames ≈ 1005 frames
// Let's use 1080 frames (36s) total, transitions handled internally
const FPS = 30;
const TOTAL_FRAMES = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WalletExplainer"
      component={WalletExplainer}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
