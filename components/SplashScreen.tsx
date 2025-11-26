import React, { useEffect, useState } from 'react';
import { LoadingBar, RetroButton } from './RetroComponents';
import { Power, Disc } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

const LOG_MESSAGES = [
  "> MOUNTING_DRIVE_C...",
  "> DECRYPTING_ARCHIVE...",
  "> LOADING_NEURAL_MAPS...",
  "> OPTIMIZING_VRAM...",
  "> CONNECTION_ESTABLISHED..."
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let currentLog = 0;
    
    // Simulate log typing
    const logInterval = setInterval(() => {
      if (currentLog < LOG_MESSAGES.length) {
        setLogs(prev => [...prev, LOG_MESSAGES[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1;
      });
    }, 80);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-retro-black flex flex-col items-center justify-center text-retro-orange font-mono relative overflow-hidden">
      <div className="noise-overlay"></div>
      
      {/* Background graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
         <div className="w-[600px] h-[600px] border-[20px] border-retro-orange rounded-full animate-pulse"></div>
      </div>

      <div className="z-20 w-full max-w-xl px-8 flex flex-col gap-6">
        {/* Title Block */}
        <div className="text-center mb-8 border-4 border-retro-orange p-6 bg-retro-black shadow-[10px_10px_0px_0px_#cc4400]">
            <div className="flex justify-between items-center mb-4 text-xs tracking-widest">
                <span>SYSTEM: WEB_DESIGN</span>
                <span>V.1.0.4</span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(255,85,0,0.5)] mb-2">WEB</h1>
            <p className="tracking-[0.5em] text-retro-orange text-sm font-bold uppercase bg-black inline-block px-2">Design</p>
        </div>

        {/* Logs */}
        <div className="h-32 flex flex-col justify-end text-xs md:text-sm space-y-1 mb-4 font-mono text-retro-green opacity-90 border-l-2 border-retro-green pl-2 bg-black/50 p-2">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
          {!ready && <span className="animate-pulse">_</span>}
        </div>

        {/* Progress System */}
        <div className="w-full space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-widest text-retro-orange">
                <span>System_Load</span>
                <span>{progress}%</span>
            </div>
            <LoadingBar progress={progress} />
        </div>

        {/* Enter Button */}
        <div className={`flex justify-center mt-8 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <RetroButton 
            onClick={onEnter} 
            className="text-xl px-12 py-4 bg-white text-black hover:bg-retro-orange hover:text-black hover:shadow-[0_0_20px_#ff5500] w-full"
          >
            <div className="flex items-center justify-center gap-3 animate-pulse">
                <Power size={20} />
                <span className="font-black tracking-widest">进入</span>
            </div>
          </RetroButton>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;