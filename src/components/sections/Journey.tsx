import React from 'react';
import { motion } from 'framer-motion';
import {
  Milestone,
  Sparkles,
  Rocket,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const Journey: React.FC = () => {
  const { journeyMilestones } = portfolioData;

  return (
    <section id="journey" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="// 06. CHRONICLES"
        decorator="@pipeline.evolution(from_polytechnic='LJ', to_btech='CSE')"
        title="Evolution & Future Horizon"
        subtitle="The journey of an aspiring computer scientist: from curious diploma beginnings to real-world engineering and future AI exploration."
      />

      <div className="relative">
        {/* Central glowing vertical timeline beam (hidden on mobile, centered on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent shadow-[0_0_15px_#00f0ff]" />

        <div className="space-y-12 md:space-y-16">
          {journeyMilestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box (Half width on desktop) */}
                <div className="w-full md:w-1/2 p-2 sm:p-4">
                  <div
                    onMouseEnter={() => soundFx.playHover()}
                    className={`p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono text-xs text-cyan-400 tracking-wider">
                        {milestone.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {milestone.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {milestone.title}
                    </h3>

                    {/* Narrative Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Takeaway / Mindset */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs font-mono text-slate-400">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{milestone.takeaway}</span>
                    </div>
                  </div>
                </div>

                {/* Central Futuristic Timeline Node Icon */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#030014] border-2 border-cyan-400 shadow-[0_0_20px_#00f0ff] z-10">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
