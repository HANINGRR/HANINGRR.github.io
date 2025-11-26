import React from 'react';
import { Topic } from '../types';
import { RetroButton, RetroCard } from './RetroComponents';
import { ArrowLeft } from 'lucide-react';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
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

      <div className="w-full">
        {/* Main Content Column (Static Data) - Now Full Width */}
        <div className="space-y-8">
            
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
      </div>
    </div>
  );
};

export default TopicDetail;