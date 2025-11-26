import React from 'react';
import { TOPICS } from '../constants';
import { Topic } from '../types';
import { Disc } from 'lucide-react';

interface DashboardProps {
  onSelectTopic: (topic: Topic) => void;
}

// Cassette Tape Component
const CassetteTape: React.FC<{
  topic: Topic;
  index: number;
  onClick: () => void;
}> = ({ topic, index, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer perspective-1000 h-48 w-full"
    >
        {/* Tape Body */}
        <div className="relative h-full w-full bg-retro-tape rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_rgba(255,85,0,0.4)] overflow-hidden flex flex-col">
            
            {/* Top Screws */}
            <div className="flex justify-between px-4 py-2">
                <div className="w-3 h-3 rounded-full bg-zinc-600 border border-black flex items-center justify-center"><div className="w-1 h-0.5 bg-black rotate-45"></div></div>
                <div className="w-3 h-3 rounded-full bg-zinc-600 border border-black flex items-center justify-center"><div className="w-1 h-0.5 bg-black -rotate-45"></div></div>
            </div>

            {/* Sticker Label Area */}
            <div className="mx-4 flex-1 bg-retro-paper rounded-sm p-3 relative border-2 border-zinc-400 flex flex-col">
                {/* Stripe Header */}
                <div className="h-4 w-full bg-retro-orange mb-2 flex items-center px-2 overflow-hidden">
                    <span className="text-[10px] font-bold text-black whitespace-nowrap">HIGH FIDELITY // 60 MIN</span>
                </div>
                
                {/* Title (Handwritten look) */}
                <h3 className="font-sans font-black text-xl text-black leading-tight mb-1 group-hover:text-retro-orange transition-colors">
                    {topic.title}
                </h3>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-tighter">
                   VOL.{index + 1} - {topic.enTitle}
                </p>

                {/* Reels Window */}
                <div className="mt-auto h-12 bg-zinc-800 rounded-full border-2 border-black flex justify-center items-center gap-4 px-4 relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-retro-tape animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite] flex items-center justify-center">
                         <div className="w-1 h-1 bg-black"></div>
                    </div>
                    {/* Tape Window Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10"></div>
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-retro-tape animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite] flex items-center justify-center">
                         <div className="w-1 h-1 bg-black"></div>
                    </div>
                </div>
            </div>

             {/* Bottom Edge */}
            <div className="h-6 w-full flex items-center justify-center px-12">
                 <div className="w-full h-full border-t-2 border-l-2 border-r-2 border-zinc-700 bg-zinc-800 transform perspective-500 rotate-x-12"></div>
            </div>
        </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onSelectTopic }) => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="border-b-4 border-black pb-6 mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="w-full">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter flex items-center gap-3">
            <Disc className="text-retro-orange animate-spin-slow" size={32} />
            绪论
            </h2>
            <p className="font-mono text-xs md:text-sm text-gray-600 mt-4 pl-1 leading-relaxed max-w-5xl text-justify">
                未来，真正的竞争不是 “人类与 AI 的竞争”，而是 “掌握了框架化 + 广泛化学习能力的人类，与依赖单一技能、缺乏认知框架的人类的竞争”。因此，我们的学习不应再纠结于 “记住多少知识点”“掌握多少技能”，而应聚焦于 “搭建什么样的认知框架”“拓宽什么样的知识边界”—— 只有这样，才能在 AI 时代始终占据主导地位，让技术成为推动自身成长的强大助力，而非被技术淘汰的 “牺牲品”。
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 px-4">
        {TOPICS.map((topic, idx) => (
          <CassetteTape 
            key={topic.id}
            topic={topic}
            index={idx}
            onClick={() => onSelectTopic(topic)}
          />
        ))}
      </div>

      <div className="mt-20 p-6 border-4 border-black bg-[#e8e8d8] shadow-[8px_8px_0px_0px_#000]">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-retro-black flex items-center justify-center text-retro-green font-mono text-xl font-bold animate-pulse">
                AI
            </div>
            <div>
                <h3 className="font-mono font-bold text-xl mb-1 text-black">SYSTEM READY</h3>
                <p className="font-mono text-sm text-gray-600 leading-relaxed max-w-2xl">
                    All eight knowledge modules are online. The singularity archive is accessible. 
                    Please select a tape to begin playback.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;