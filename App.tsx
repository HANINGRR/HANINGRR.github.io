import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Detail } from './components/Detail';
import { TOPICS } from './data';
import { useRetroAudio } from './hooks/useRetroAudio';

type View = 'splash' | 'dashboard' | 'detail';

const App: React.FC = () => {
    const [view, setView] = useState<View>('splash');
    const [topicId, setTopicId] = useState<string | null>(null);
    const [isCrtOn, setIsCrtOn] = useState(true);
    const { isAudioOn, toggleAudio } = useRetroAudio();

    const handleNavigate = (newView: 'dashboard' | 'detail', id?: string) => {
        setView(newView);
        if (id) {
            setTopicId(id);
        }
        window.scrollTo(0, 0);
    };

    const handleEnter = () => {
        toggleAudio(); // Init audio context on user interaction
        setView('dashboard');
    };

    return (
        <div className="h-screen flex overflow-hidden bg-retro-bg">
            {/* Visual Effects */}
            {isCrtOn && <div className="scanline z-[9999]" />}
            <div className="noise-overlay z-[9998]" />

            {/* View Switching */}
            {view === 'splash' ? (
                <SplashScreen onEnter={handleEnter} />
            ) : (
                <>
                    <Sidebar 
                        topics={TOPICS}
                        currentView={view}
                        currentTopicId={topicId}
                        onNavigate={handleNavigate}
                        isAudioOn={isAudioOn}
                        onToggleAudio={toggleAudio}
                        isCrtOn={isCrtOn}
                        onToggleCrt={() => setIsCrtOn(!isCrtOn)}
                    />

                    <main className="flex-1 overflow-y-auto bg-retro-bg bg-grid-pattern bg-[size:32px_32px] relative scroll-smooth">
                        <header className="sticky top-0 z-30 bg-retro-bg/95 backdrop-blur-sm border-b-2 border-black px-6 md:px-12 py-4 flex justify-between items-center shadow-md">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                                <span className="font-mono text-xs font-bold tracking-widest">LIVE_CONNECTION</span>
                            </div>
                            <div className="font-mono text-xs text-gray-500 bg-white border border-black px-2 py-1">
                                REC_DATE: 2024-11-25 // SECTOR: A7
                            </div>
                        </header>

                        <div className="max-w-6xl mx-auto p-6 md:p-12 pb-24">
                            {/* Page Header */}
                            <div className="mb-12 border-l-8 border-retro-orange pl-6 py-2">
                                <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter drop-shadow-sm mb-2">
                                    <span className="text-retro-orange stroke-black">AI发展对我们的影响</span>
                                </h1>
                                <p className="font-mono text-sm md:text-base text-gray-600 max-w-2xl">
                                    ARCHIVE OF HUMAN-AI COEVOLUTION. // ACCESS LEVEL: UNRESTRICTED
                                </p>
                            </div>

                            {/* Main Content Area */}
                            {view === 'dashboard' && (
                                <Dashboard 
                                    topics={TOPICS} 
                                    onTopicClick={(id) => handleNavigate('detail', id)} 
                                />
                            )}
                            
                            {view === 'detail' && topicId && (
                                <Detail 
                                    topic={TOPICS.find(t => t.id === topicId)!} 
                                    onBack={() => handleNavigate('dashboard')} 
                                />
                            )}

                            {/* Footer */}
                            <footer className="mt-20 border-t-4 border-black border-dashed pt-8 text-center font-mono text-xs text-gray-500 pb-12">
                                <p className="mb-2">23物联网1班</p>
                                <p className="mb-2">* WEB DESIGN // OBSERVER LOGS *</p>
                                <div className="flex justify-center items-center gap-4">
                                    <span className="bg-black text-white px-2 py-0.5">V.1.0.4</span>
                                    <span>RENDER_ENGINE: React 18</span>
                                    <span>API: GEMINI_3.0</span>
                                </div>
                            </footer>
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default App;