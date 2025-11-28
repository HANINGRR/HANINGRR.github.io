import React, { useEffect, useState } from 'react';
import { Power } from 'lucide-react';

interface SplashScreenProps {
    onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const logMsgs = [
            "> MOUNTING_DRIVE_C...",
            "> DECRYPTING_ARCHIVE...",
            "> LOADING_NEURAL_MAPS...",
            "> OPTIMIZING_VRAM...",
            "> CONNECTION_ESTABLISHED..."
        ];
        
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < logMsgs.length) {
                setLogs(prev => [...prev, logMsgs[logIndex]]);
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 400);

        const progInterval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.floor(Math.random() * 8) + 1;
                if (next >= 100) {
                    clearInterval(progInterval);
                    setShowButton(true);
                    return 100;
                }
                return next;
            });
        }, 80);

        return () => {
            clearInterval(logInterval);
            clearInterval(progInterval);
        };
    }, []);

    return (
        <div id="splash-screen" className="fixed inset-0 bg-retro-black z-50 flex flex-col items-center justify-center text-retro-orange overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[600px] h-[600px] border-[20px] border-retro-orange rounded-full animate-pulse"></div>
            </div>

            <div className="z-20 w-full max-w-xl px-8 flex flex-col gap-6">
                {/* Title Box */}
                <div className="text-center mb-8 border-4 border-retro-orange p-6 bg-retro-black shadow-[10px_10px_0px_0px_#cc4400]">
                    <div className="flex justify-between items-center mb-4 text-xs tracking-widest">
                        <span>SYSTEM: WEB_DESIGN</span>
                        <span>V.1.0.4</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(255,85,0,0.5)] mb-2">WEB</h1>
                    <p className="tracking-[0.5em] text-retro-orange text-sm font-bold uppercase bg-black inline-block px-2">Design</p>
                </div>

                {/* Log Output */}
                <div className="h-32 flex flex-col justify-end text-xs md:text-sm space-y-1 mb-4 font-mono text-retro-green opacity-90 border-l-2 border-retro-green pl-2 bg-black/50 p-2">
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-retro-orange">
                        <span>System_Load</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full border-2 border-retro-orange h-6 p-1 relative">
                        <div 
                            className="h-full bg-retro-orange transition-all duration-300 ease-out" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Enter Button */}
                <div className={`flex justify-center mt-8 transition-opacity duration-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
                    <button 
                        onClick={onEnter}
                        className="font-mono text-xl px-12 py-4 bg-white text-black hover:bg-retro-orange hover:text-black hover:shadow-[0_0_20px_#ff5500] w-full font-black tracking-widest border-2 border-black uppercase flex items-center justify-center gap-2"
                    >
                        <Power className="w-5 h-5" /> 进入
                    </button>
                </div>
            </div>
        </div>
    );
};