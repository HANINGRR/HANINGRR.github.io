import React, { useState, useRef, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import TopicDetail from './components/TopicDetail';
import { ViewState, Topic } from './types';
import { TOPICS } from './constants';
import { Volume2, VolumeX, Monitor, Globe, Layers, Disc } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('SPLASH');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [crtEnabled, setCrtEnabled] = useState(true);
  
  // Audio State
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const schedulerLookahead = 25.0; // ms
  const scheduleAheadTime = 0.1; // s
  const beatCountRef = useRef<number>(0);

  const handleEnter = () => {
    setViewState('DASHBOARD');
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setViewState('DETAIL');
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setViewState('DASHBOARD');
  };

  // Sidebar Menu Logic
  const handleMenuClick = (topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (topic) {
        handleSelectTopic(topic);
    }
  };

  // --- CASSETTE FUTURISM AUDIO ENGINE ---

  // Instruments
  const playKick = (ctx: AudioContext, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + 0.5);
  };

  const playSnare = (ctx: AudioContext, time: number) => {
    // Noise Burst
    const bufferSize = ctx.sampleRate * 0.2; // 0.2s
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    // Envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    
    noiseSource.connect(filter).connect(gain).connect(ctx.destination);
    noiseSource.start(time);

    // Tonal snap
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, time);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.2, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    osc.connect(oscGain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.15);
  };

  const playHiHat = (ctx: AudioContext, time: number) => {
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6000;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
    
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(time);
  };

  const playBass = (ctx: AudioContext, time: number, freq: number) => {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    
    // Tape Wow (Pitch instability)
    const wow = ctx.createOscillator();
    wow.type = 'sine';
    wow.frequency.value = 0.5 + Math.random(); // Slow wobble
    const wowGain = ctx.createGain();
    wowGain.gain.value = 2; // +/- 2Hz
    wow.connect(wowGain).connect(osc.detune);
    wow.start(time);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, time);
    filter.frequency.linearRampToValueAtTime(200, time + 0.2);
    filter.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.setTargetAtTime(0, time, 0.1);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.3);
  };

  const playSynthChord = (ctx: AudioContext, time: number, freqs: number[]) => {
    freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, time);

        // Tape Flutter (Faster instability)
        const flutter = ctx.createOscillator();
        flutter.type = 'triangle';
        flutter.frequency.value = 6 + Math.random() * 2; 
        const flutterGain = ctx.createGain();
        flutterGain.gain.value = 4; 
        flutter.connect(flutterGain).connect(osc.detune);
        flutter.start(time);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

        // Panning to widen stereo field
        const panner = ctx.createStereoPanner();
        panner.pan.value = (Math.random() * 2 - 1) * 0.5;

        osc.connect(gain).connect(panner).connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.7);
    });
  };

  // Tape Noise Floor
  const startTapeNoise = (ctx: AudioContext) => {
      const bufferSize = ctx.sampleRate * 2; // 2 seconds loop
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.03; // Low level noise
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      
      const gain = ctx.createGain();
      gain.gain.value = 0.05;

      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start();
      return { stop: () => noise.stop() };
  };

  // Scheduler
  const scheduleNote = (beatNumber: number, time: number, ctx: AudioContext) => {
    // 105 BPM - Cheerful, Rhythmic
    // Chord Progression: Cmaj -> Gmaj -> Amin -> Fmaj (I - V - vi - IV)
    // 4 beats per chord, 16 beat loop

    const patternIndex = Math.floor(beatNumber / 4) % 4;
    
    // Bass Frequencies (Octave 2)
    const bassMap = [65.41, 49.00, 55.00, 43.65]; // C2, G1, A1, F1
    // Chord Frequencies (Octave 4)
    const chordMap = [
        [261.63, 329.63, 392.00], // C Maj
        [196.00, 246.94, 293.66], // G Maj
        [220.00, 261.63, 329.63], // A Min
        [174.61, 220.00, 261.63]  // F Maj
    ];

    // Drums
    // Kick on 1, 3 (and sometimes "and" of 3)
    if (beatNumber % 4 === 0) playKick(ctx, time);
    if (beatNumber % 4 === 2 && Math.random() > 0.3) playKick(ctx, time); // Syncopated kick

    // Snare on 2, 4
    if (beatNumber % 4 === 1 || beatNumber % 4 === 3) playSnare(ctx, time); // Adjusting for 0-index (0,1,2,3 -> 1 is beat 2)
    
    // HiHats every 0.5 beats (8th notes)
    playHiHat(ctx, time);
    playHiHat(ctx, time + (60/105)/2);

    // Bass line (Every beat)
    playBass(ctx, time, bassMap[patternIndex]);
    // Off-beat bass 8th
    playBass(ctx, time + (60/105)/2, bassMap[patternIndex]);

    // Chords / Melody (Arpeggiated feel on beat)
    if (beatNumber % 1 === 0) {
       playSynthChord(ctx, time, chordMap[patternIndex]);
    }
  };

  const nextNote = () => {
    const secondsPerBeat = 60.0 / 105.0; // 105 BPM
    nextNoteTimeRef.current += secondsPerBeat;
    beatCountRef.current++;
  };

  const scheduler = () => {
    if (!audioCtxRef.current) return;
    
    // While there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + scheduleAheadTime) {
        scheduleNote(beatCountRef.current, nextNoteTimeRef.current, audioCtxRef.current);
        nextNote();
    }
    timerIDRef.current = window.setTimeout(scheduler, schedulerLookahead);
  };

  const toggleAudio = () => {
    if (audioEnabled) {
      if (timerIDRef.current) clearTimeout(timerIDRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
      audioCtxRef.current = null;
      isPlayingRef.current = false;
      setAudioEnabled(false);
    } else {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Compressor to simulate tape saturation/glue
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 30;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;
      compressor.connect(ctx.destination);
      
      // Override destination for functions to use compressor if needed (simplified here to direct dest for individual control, but could route all)
      
      startTapeNoise(ctx);
      
      nextNoteTimeRef.current = ctx.currentTime + 0.1;
      beatCountRef.current = 0;
      isPlayingRef.current = true;
      scheduler();
      setAudioEnabled(true);
    }
  };

  useEffect(() => {
    return () => {
        if (timerIDRef.current) clearTimeout(timerIDRef.current);
        if (audioCtxRef.current) audioCtxRef.current.close();
    }
  }, []);

  if (viewState === 'SPLASH') {
    return <SplashScreen onEnter={handleEnter} />;
  }

  return (
    <div className={`min-h-screen bg-retro-bg font-sans text-retro-black transition-colors ${crtEnabled ? 'flicker' : ''}`}>
        {/* CRT Scanline Overlay */}
        {crtEnabled && <div className="scanline z-50 pointer-events-none fixed inset-0"></div>}
        <div className="noise-overlay"></div>

        <div className="flex h-screen overflow-hidden">
            {/* SIDEBAR (Cassette Spine Style) */}
            <aside className="w-72 bg-[#f0f0f0] border-r-4 border-black flex flex-col justify-between hidden md:flex shrink-0 z-40 relative shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
                <div>
                    {/* Header Block */}
                    <div className="bg-retro-orange p-6 border-b-4 border-black relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-1 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform">
                             <Disc size={64} />
                        </div>
                        <h1 className="font-black text-3xl uppercase leading-none tracking-tighter relative z-10">Web<br/>Design</h1>
                        <p className="font-mono text-xs mt-2 font-bold tracking-widest bg-black text-retro-orange inline-block px-1 relative z-10">CLASSIFIED LOG</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-3">
                         <button 
                            onClick={handleBack}
                            className={`w-full text-left px-4 py-3 border-2 font-bold text-sm flex items-center gap-3 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${viewState === 'DASHBOARD' ? 'bg-black text-white border-black' : 'bg-white text-black border-black hover:bg-retro-green'}`}
                         >
                            <Layers size={16} />
                            <span>主页面</span>
                         </button>
                        
                         <div className="py-2 flex items-center gap-2">
                             <div className="h-px bg-black flex-1"></div>
                             <span className="font-mono text-[10px] font-bold text-gray-400">ARCHIVE_LIST</span>
                             <div className="h-px bg-black flex-1"></div>
                         </div>

                         <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
                             {TOPICS.map((topic, idx) => (
                                 <button
                                    key={topic.id}
                                    onClick={() => handleMenuClick(topic.id)}
                                    className={`group w-full text-left p-2 border border-black font-mono text-xs flex flex-col transition-all relative overflow-hidden ${selectedTopic?.id === topic.id ? 'bg-retro-orange text-black' : 'bg-white hover:bg-zinc-100'}`}
                                 >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${selectedTopic?.id === topic.id ? 'bg-black' : 'bg-retro-orange'} group-hover:w-full transition-all duration-300 opacity-20`}></div>
                                    <div className="flex justify-between items-center relative z-10">
                                        <span className="font-bold">{topic.title}</span>
                                        <span className="opacity-50">0{idx + 1}</span>
                                    </div>
                                 </button>
                             ))}
                         </div>
                    </nav>
                </div>

                {/* System Config Bottom Panel */}
                <div className="p-4 border-t-4 border-black bg-[#e0e0e0]">
                    <h3 className="font-mono text-[10px] font-bold mb-3 uppercase border-b border-black pb-1 text-gray-500">System Configuration</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={toggleAudio}
                            className={`flex items-center justify-center border-2 border-black px-1 py-2 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-colors ${audioEnabled ? 'bg-retro-orange text-black' : 'bg-retro-tape text-white'}`}
                        >
                            {audioEnabled ? <Volume2 size={12} className="mr-1"/> : <VolumeX size={12} className="mr-1"/>} 
                            {audioEnabled ? 'ON' : 'AUDIO'}
                        </button>
                        <button 
                            onClick={() => setCrtEnabled(!crtEnabled)}
                            className={`flex items-center justify-center border-2 border-black px-1 py-2 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] ${crtEnabled ? 'bg-retro-green text-black' : 'bg-gray-300 text-gray-500'}`}
                        >
                            <Monitor size={12} className="mr-1"/> CRT
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto bg-retro-bg bg-grid-pattern bg-[size:32px_32px] relative scroll-smooth">
                {/* Top Header Strip */}
                <header className="sticky top-0 z-30 bg-retro-bg/95 backdrop-blur-sm border-b-2 border-black px-6 md:px-12 py-4 flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                        <span className="font-mono text-xs font-bold tracking-widest">LIVE_CONNECTION</span>
                    </div>
                    <div className="font-mono text-xs text-gray-500 bg-white border border-black px-2 py-1">
                        REC_DATE: 202X-11-25 // SECTOR: A7
                    </div>
                </header>
                
                {/* Content Container */}
                <div className="max-w-6xl mx-auto p-6 md:p-12 pb-24">
                     {/* Dynamic Header */}
                     <div className="mb-12 border-l-8 border-retro-orange pl-6 py-2">
                        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter drop-shadow-sm mb-2">
                             <span className="text-retro-orange stroke-black">AI发展对我们的影响</span>
                        </h1>
                        <p className="font-mono text-sm md:text-base text-gray-600 max-w-2xl">
                            ARCHIVE OF HUMAN-AI COEVOLUTION. // ACCESS LEVEL: UNRESTRICTED
                        </p>
                     </div>

                     {/* View Router */}
                     <div className="min-h-[500px]">
                        {viewState === 'DASHBOARD' && <Dashboard onSelectTopic={handleSelectTopic} />}
                        {viewState === 'DETAIL' && selectedTopic && (
                            <TopicDetail topic={selectedTopic} onBack={handleBack} />
                        )}
                     </div>
                
                    {/* Footer */}
                    <footer className="mt-20 border-t-4 border-black border-dashed pt-8 text-center font-mono text-xs text-gray-500 pb-12">
                        <p className="mb-2">23物联网1班</p>
                        <p className="mb-2">* WEB DESIGN // OBSERVER LOGS *</p>
                        <div className="flex justify-center items-center gap-4">
                            <span className="bg-black text-white px-2 py-0.5">V.1.0.4</span>
                            <span>RENDER_ENGINE: REACT_19</span>
                            <span>API: GEMINI_3.0</span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    </div>
  );
};

export default App;