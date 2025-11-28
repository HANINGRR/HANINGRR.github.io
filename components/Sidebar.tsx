import React from 'react';
import { Layers, Disc, Volume2, VolumeX, Monitor } from 'lucide-react';
import { Topic } from '../types';

interface SidebarProps {
    topics: Topic[];
    currentView: 'dashboard' | 'detail';
    currentTopicId: string | null;
    onNavigate: (view: 'dashboard' | 'detail', topicId?: string) => void;
    isAudioOn: boolean;
    onToggleAudio: () => void;
    onToggleCrt: () => void;
    isCrtOn: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    topics,
    currentView,
    currentTopicId,
    onNavigate,
    isAudioOn,
    onToggleAudio,
    onToggleCrt,
    isCrtOn
}) => {
    return (
        <aside className="w-72 bg-[#f0f0f0] border-r-4 border-black flex flex-col justify-between hidden md:flex shrink-0 z-40 relative shadow-[4px_0_10px_rgba(0,0,0,0.1)] h-full">
            <div>
                {/* Header */}
                <div className="bg-retro-orange p-6 border-b-4 border-black relative overflow-hidden group">
                    <Disc className="absolute top-0 right-0 p-1 opacity-20 transform rotate-12 w-24 h-24" />
                    <h1 className="font-black text-3xl uppercase leading-none tracking-tighter relative z-10">Web<br/>Design</h1>
                    <p className="font-mono text-xs mt-2 font-bold tracking-widest bg-black text-retro-orange inline-block px-1 relative z-10">CLASSIFIED LOG</p>
                </div>

                {/* Nav */}
                <nav className="p-4 space-y-3">
                    <button 
                        onClick={() => onNavigate('dashboard')}
                        className={`w-full text-left px-4 py-3 border-2 border-black font-bold text-sm flex items-center gap-3 transition-all ${currentView === 'dashboard' ? 'bg-retro-green' : 'bg-white hover:bg-retro-green'} text-black box-shadow-hard-sm active:translate-y-1 active:shadow-none`}
                    >
                        <Layers className="w-4 h-4" />
                        <span>主页面</span>
                    </button>
                    
                    <div className="py-2 flex items-center gap-2">
                        <div className="h-px bg-black flex-1"></div>
                        <span className="font-mono text-[10px] font-bold text-gray-400">ARCHIVE_LIST</span>
                        <div className="h-px bg-black flex-1"></div>
                    </div>

                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                        {topics.map((t, i) => (
                            <button 
                                key={t.id}
                                onClick={() => onNavigate('detail', t.id)}
                                className={`group w-full text-left p-2 border border-black font-mono text-xs flex flex-col transition-all relative overflow-hidden ${currentTopicId === t.id ? 'bg-retro-orange text-black' : 'bg-white hover:bg-zinc-100'}`}
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${currentTopicId === t.id ? 'bg-black' : 'bg-retro-orange'} group-hover:w-full transition-all duration-300 opacity-20`}></div>
                                <div className="flex justify-between items-center relative z-10">
                                    <span className="font-bold">{t.title}</span>
                                    <span className="opacity-50">0{i + 1}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Footer Controls */}
            <div className="p-4 border-t-4 border-black bg-[#e0e0e0]">
                <h3 className="font-mono text-[10px] font-bold mb-3 uppercase border-b border-black pb-1 text-gray-500">System Configuration</h3>
                <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={onToggleAudio}
                        className={`flex items-center justify-center border-2 border-black px-1 py-2 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-colors ${isAudioOn ? 'bg-retro-orange text-black' : 'bg-retro-tape text-white'}`}
                    >
                        {isAudioOn ? <Volume2 className="w-3 h-3 mr-1" /> : <VolumeX className="w-3 h-3 mr-1" />}
                        {isAudioOn ? 'ON' : 'AUDIO'}
                    </button>
                    <button 
                        onClick={onToggleCrt}
                        className={`flex items-center justify-center border-2 border-black px-1 py-2 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] ${isCrtOn ? 'bg-retro-green text-black' : 'bg-gray-300 text-black'}`}
                    >
                        <Monitor className="w-3 h-3 mr-1" /> CRT
                    </button>
                </div>
            </div>
        </aside>
    );
};