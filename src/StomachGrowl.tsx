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
const Gold = '#FDCB6E';
const Teal = '#00CEC9';

const Subtitle: React.FC<{text: string; frame: number}> = ({text, frame}) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: 200,
      width: '100%',
      textAlign: 'center',
      fontFamily: 'JetBrains Mono',
      fontSize: 48,
      color: 'white',
      padding: '0 50px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    }}>
      {text}
    </div>
  );
};

export const StomachGrowl: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scene01 = frame >= 15 && frame < 180;
  const scene02 = frame >= 220 && frame < 480;
  const scene03 = frame >= 520 && frame < 800;
  const scene04 = frame >= 840 && frame < 1100;
  const scene05 = frame >= 1140 && frame < 1400;
  const scene06 = frame >= 1440 && frame < 1700;
  const scene07 = frame >= 1740 && frame < 2050;
  const scene08 = frame >= 2090 && frame < 2350;
  const scene09 = frame >= 2390 && frame < 2650;

  const bgShake = (scene01 || scene02) ? Math.sin(frame) * 1 : 0;

  return (
    <AbsoluteFill style={{backgroundColor: DeepNavy, transform: `translateX(${bgShake}px)`}}>
      <Audio src={staticFile('audio/narration_final.mp3')} />

      {/* Scene 1: Hook */}
      {scene01 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <h1 style={{fontFamily: 'Bebas Neue', fontSize: 120, color: Gold, textAlign: 'center'}}>
             WHY DOES YOUR<br/>STOMACH GROWL? 🤰
           </h1>
           <Subtitle frame={frame} text="क्या पेट की गुड़गुड़ाहट का मतलब सिर्फ भूख है?" />
        </AbsoluteFill>
      )}

      {/* Scene 2: Borborygmus */}
      {scene02 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <div style={{
             fontSize: 120, 
             fontFamily: 'Bebas Neue', 
             color: Teal,
             textAlign: 'center'
           }}>
             BORBORYGMUS
           </div>
           <Subtitle frame={frame} text="इसे 'Borborygmus' कहते हैं, सफाई का शोर!" />
        </AbsoluteFill>
      )}

      {/* Scene 3: Muscles */}
      {scene03 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <div style={{
             width: 500, height: 100, backgroundColor: 'red', borderRadius: 50,
             transform: `scale(${1 + Math.sin(frame/5)*0.2})`
           }} />
           <Subtitle frame={frame} text="मांसपेशियां एक सफाई अभियान शुरू करती हैं।" />
        </AbsoluteFill>
      )}

      {/* Scene 4: Bacteria */}
      {scene04 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <div style={{fontSize: 200}}>🦠 🧹</div>
           <Subtitle frame={frame} text="ये बचे हुए खाने और बैक्टीरिया को धकेलती हैं।" />
        </AbsoluteFill>
      )}

      {/* Scene 5 & 6: Empty Cave */}
      {(scene05 || scene06) && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <div style={{
             width: 400, height: 400, border: '5px solid white', borderRadius: 20,
             display: 'flex', justifyContent: 'center', alignItems: 'center'
           }}>
             <div style={{fontSize: 100}}>🌬️</div>
           </div>
           <Subtitle frame={frame} text={scene05 ? "खाना नहीं होता, सिर्फ हवा होती है..." : "तो वो एक खाली गुफा की तरह गूंजते हैं।"} />
        </AbsoluteFill>
      )}

      {/* Scene 7: Sound */}
      {scene07 && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <div style={{fontSize: 200}}>🔊</div>
           <Subtitle frame={frame} text="यही वो आवाज़ है जो आपको सुनाई देती है।" />
        </AbsoluteFill>
      )}

      {/* Scene 8 & 9: Outro */}
      {(scene08 || scene09) && (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
           <h1 style={{fontFamily: 'Bebas Neue', fontSize: 120, color: Gold, textAlign: 'center'}}>
             CLEANING MODE! ✨
           </h1>
           <Subtitle frame={frame} text={scene08 ? "आपकी बॉडी क्लीनिंग मोड में है।" : "सब्सक्राइब करें ऐसी और जानकारी के लिए!"} />
        </AbsoluteFill>
      )}
      
    </AbsoluteFill>
  );
};
