import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const Journey: React.FC = () => {
  const { journeyMilestones } = portfolioData;

  return (
    <section id="journey" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="06. Chronicles"
        title="Evolution & Academic Journey"
        subtitle="The journey of an aspiring computer scientist: from curious diploma beginnings to real-world engineering and future AI exploration."
      />

      <div className="relative">
        {/* Central subtle vertical timeline beam (hidden on mobile, centered on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-slate-800" />

        <div className="space-y-10 md:space-y-12">
          {journeyMilestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box (Half width on desktop) */}
                <div className="w-full md:w-1/2 p-2 sm:p-4">
                  <div
                    onMouseEnter={() => soundFx.playHover()}
                    className={`p-6 sm:p-7 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-colors ${
                      isEven ? 'md:mr-6' : 'md:ml-6'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <span className="font-mono text-xs text-indigo-400 font-medium">
                        {milestone.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {milestone.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                      {milestone.title}
                    </h3>

                    {/* Narrative Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Takeaway / Mindset */}
                    <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                      <span>{milestone.takeaway}</span>
                    </div>
                  </div>
                </div>

                {/* Central Timeline Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#111726] border border-slate-700 z-10">
                  <span className="font-mono text-xs font-medium text-slate-300">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
