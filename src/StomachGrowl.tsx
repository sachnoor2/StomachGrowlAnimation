import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from 'remotion';

const DeepNavy = '#0E1117';
const AcidGreen = '#A3E635';
const CoralRed = '#FF4D4D';

export const StomachGrowl: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ADVANCED PHYSICS: Continuous Camera Motion
  const cameraZoom = interpolate(frame, [0, 1800], [1, 1.3], { extrapolateRight: 'clamp' });
  const cameraPanX = interpolate(frame, [0, 1800], [0, 50]);

  // Spring animations for elements
  const labelSpring = (startFrame: number) => 
    spring({ frame: frame - startFrame, fps, config: { stiffness: 100, damping: 10 } });

  return (
    <AbsoluteFill style={{ backgroundColor: DeepNavy }}>
      <Audio src={staticFile('audio/suresh_full.mp3')} />
      
      <div style={{ 
        transform: `scale(${cameraZoom}) translateX(${cameraPanX}px)`,
        width: '100%',
        height: '100%'
      }}>
        
        {/* SCENE 1: Introduction (0-3s) */}
        <Sequence from={0} durationInFrames={180}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
             <h1 style={{ color: 'white', fontSize: 80, textAlign: 'center', fontFamily: 'Bebas Neue' }}>
                <span style={{ transform: `scale(${labelSpring(10)})`, display: 'inline-block' }}>
                   PET KYUN <br/> GURGURATA HAI?
                </span>
             </h1>
          </AbsoluteFill>
        </Sequence>

        {/* More complex physics-based animation logic would continue here... */}
        {/* Adding placeholder for active development */}
        <AbsoluteFill style={{ border: `10px solid ${AcidGreen}`, opacity: 0.1 }} />
      </div>
    </AbsoluteFill>
  );
};
