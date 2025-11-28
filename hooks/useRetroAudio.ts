import { useState, useRef, useCallback } from 'react';

export function useRetroAudio() {
    const [isAudioOn, setIsAudioOn] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const intervalRef = useRef<number | null>(null);

    const initAudio = useCallback(() => {
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContextClass();
        }
    }, []);

    const playTone = useCallback((freq: number, type: OscillatorType, time: number, dur: number, vol: number = 0.5) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        osc.type = type;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
    }, []);

    const playNoise = useCallback((time: number) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        noise.connect(gain).connect(ctx.destination);
        noise.start(time);
    }, []);

    const playBeat = useCallback((beat: number) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const t = ctx.currentTime;
        
        // Kick (Beat 0, 4, 8, 12)
        if (beat % 4 === 0) playTone(150, 'sine', t, 0.1);
        // Snare (Beat 4, 12)
        if (beat % 8 === 4) playNoise(t);
        // HiHat (Every 2)
        if (beat % 2 === 0) playTone(8000, 'triangle', t, 0.05, 0.1);
        // Bass
        if (beat % 4 === 0) playTone(55, 'sawtooth', t, 0.2);
        // Melody (Arpeggio)
        if (beat % 2 === 0) playTone(220 + (beat * 10), 'square', t, 0.1, 0.05);
    }, [playTone, playNoise]);

    const startMusic = useCallback(() => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        let beat = 0;
        const bpm = 105;
        const interval = (60 / bpm) * 1000;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            playBeat(beat);
            beat = (beat + 1) % 16;
        }, interval / 4);
    }, [playBeat]);

    const stopMusic = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const toggleAudio = useCallback(() => {
        initAudio();
        setIsAudioOn(prev => {
            const newState = !prev;
            if (newState) {
                startMusic();
            } else {
                stopMusic();
            }
            return newState;
        });
    }, [initAudio, startMusic, stopMusic]);

    return { isAudioOn, toggleAudio };
}