import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Binary,
  Layers,
  Sparkles
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const CareerInterests: React.FC = () => {
  const { careerInterests } = portfolioData;

  const iconLookup: Record<string, React.ReactNode> = {
    BrainCircuit: <BrainCircuit className="w-7 h-7 text-indigo-400" />,
    Binary: <Binary className="w-7 h-7 text-indigo-400" />,
    Layers: <Layers className="w-7 h-7 text-indigo-400" />,
  };

  return (
    <section id="interests" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="03. Future Horizons"
        title="Career Trajectory & Passions"
        subtitle="Three focused pillars driving my technological ambition: from neural intelligence to high-performance Python backends and full-stack systems."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careerInterests.map((interest, idx) => (
          <div
            key={interest.id}
            onMouseEnter={() => soundFx.playHover()}
            className="h-full rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-colors p-7 flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  {interest.badge}
                </span>

                <span className="font-mono text-xs text-slate-500">
                  0{idx + 1} / 03
                </span>
              </div>

              {/* Main Icon */}
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                {iconLookup[interest.icon] || <Sparkles className="w-7 h-7 text-indigo-400" />}
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-bold text-white mb-1.5">
                {interest.title}
              </h3>

              {/* Subtitle */}
              <div className="font-mono text-xs text-indigo-300 mb-4">
                {interest.subtitle}
              </div>

              {/* Core description */}
              <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                {interest.description}
              </p>

              {/* Detailed vision */}
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {interest.detailedVision}
              </p>
            </div>

            {/* Tags */}
            <div className="pt-5 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {interest.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
