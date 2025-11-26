import React, { useEffect, useState } from 'react';
import { Topic, GeneratedContent } from '../types';
import { fetchTopicAnalysis } from '../services/geminiService';
import { RetroButton, RetroCard } from './RetroComponents';
import { ArrowLeft, Cpu, AlertTriangle, Layers, Terminal, Sparkles } from 'lucide-react';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [aiContent, setAiContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadContent = async () => {
      setLoading(true);
      // We still use Gemini, but now just for a "future prediction" flavor text
      // to complement the static content
      try {
        const result = await fetchTopicAnalysis(topic.title);
        if (isMounted) {
            setAiContent(result);
        }
      } catch (e) {
          console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadContent();
    return () => { isMounted = false; };
  }, [topic]);

  return (
    <div className="animate-fade-in pb-12">
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-4">
        <RetroButton onClick={onBack} variant="outline" className="px-3 py-2 bg-white hover:bg-black hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </RetroButton>
        <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase text-black leading-none">{topic.title}</h1>
            <span className="font-mono text-retro-orange-dim text-sm font-bold tracking-widest">ID: {topic.enTitle}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column (Static Data) */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Description Box */}
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_#000]">
                <p className="font-sans text-xl font-medium text-black leading-relaxed">
                    {topic.description}
                </p>
            </div>

            {/* Structured Content Sections */}
            {topic.content.map((section, idx) => (
                <div key={idx} className="relative">
                     {section.heading && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 bg-retro-orange"></div>
                            <h3 className="font-mono font-bold text-lg uppercase tracking-wider">{section.heading}</h3>
                        </div>
                     )}

                     {/* Text Type */}
                     {section.type === 'text' && (
                         <div className="bg-[#f4f4ec] p-5 border-l-4 border-black font-sans text-gray-800 leading-7">
                             {section.body}
                         </div>
                     )}

                     {/* List Type */}
                     {section.type === 'list' && (
                         <ul className="space-y-3">
                             {section.list?.map((item, i) => (
                                 <li key={i} className="flex items-start gap-3 bg-white p-3 border border-gray-300 shadow-sm">
                                     <span className="font-mono font-bold text-retro-orange">0{i+1}.</span>
                                     <span className="font-sans text-gray-800">{item}</span>
                                 </li>
                             ))}
                         </ul>
                     )}

                     {/* Key Value Type */}
                     {section.type === 'key-value' && (
                         <div className="grid gap-3">
                             {section.keyValueData?.map((kv, i) => (
                                 <div key={i} className="flex flex-col md:flex-row border border-black bg-white">
                                     <div className="bg-black text-white px-4 py-2 font-mono font-bold text-sm w-full md:w-32 flex-shrink-0 flex items-center">
                                         {kv.label}
                                     </div>
                                     <div className="px-4 py-2 font-sans text-sm md:text-base flex items-center">
                                         {kv.value}
                                     </div>
                                 </div>
                             ))}
                         </div>
                     )}

                    {/* Columns Type */}
                    {section.type === 'columns' && (
                        <div className="grid md:grid-cols-2 gap-4">
                            {section.columns?.map((col, i) => (
                                <RetroCard key={i} title={col.title} className="bg-[#e8e8d8]">
                                    <p className="text-sm font-sans">{col.desc}</p>
                                </RetroCard>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Sidebar Column (Gemini AI Insight) */}
        <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
                <div className="bg-retro-dark-bg text-retro-green p-1 border-2 border-black shadow-[8px_8px_0px_0px_#cc4400]">
                    <div className="border border-retro-green/30 p-4 relative overflow-hidden">
                        {/* Scanlines for terminal */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                        
                        <div className="flex items-center gap-2 mb-4 border-b border-retro-green/50 pb-2">
                            <Terminal size={18} />
                            <h3 className="font-mono font-bold text-sm">AI_PREDICTION_LOG</h3>
                        </div>

                        {loading ? (
                            <div className="h-40 flex flex-col items-center justify-center gap-2 opacity-50">
                                <Cpu className="animate-spin" />
                                <span className="text-xs font-mono animate-pulse">COMPUTING...</span>
                            </div>
                        ) : aiContent ? (
                            <div className="font-mono text-xs md:text-sm leading-relaxed space-y-4">
                                <p className="text-retro-orange font-bold">&gt;&gt; {aiContent.metaphor}</p>
                                <p className="opacity-90">{aiContent.prediction}</p>
                                <div className="mt-4 pt-4 border-t border-retro-green/30 flex justify-between items-center text-[10px] text-gray-500">
                                    <span>CONFIDENCE: 98.4%</span>
                                    <Sparkles size={12} className="text-yellow-400" />
                                </div>
                            </div>
                        ) : (
                             <div className="text-red-500 font-mono text-xs">CONNECTION_LOST</div>
                        )}
                    </div>
                </div>

                <div className="mt-6 bg-[#ffff00] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                    <div className="flex items-center gap-2 font-black text-black mb-2">
                        <AlertTriangle size={20} />
                        WARNING
                    </div>
                    <p className="font-mono text-xs font-bold text-black leading-tight">
                        READING THIS ARCHIVE MAY CAUSE IRREVERSIBLE COGNITIVE EXPANSION. PROCEED WITH CAUTION.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;