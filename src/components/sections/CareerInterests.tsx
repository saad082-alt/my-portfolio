import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Binary,
  Layers,
  Sparkles,
  ArrowRight,
  Cpu,
  Workflow,
  Compass
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard3D } from '../3d/ProjectCard3D';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const CareerInterests: React.FC = () => {
  const { careerInterests } = portfolioData;

  const iconLookup: Record<string, React.ReactNode> = {
    BrainCircuit: <BrainCircuit className="w-8 h-8 text-purple-400" />,
    Binary: <Binary className="w-8 h-8 text-cyan-400" />,
    Layers: <Layers className="w-8 h-8 text-sky-400" />,
  };

  return (
    <section id="interests" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="// 03. FUTURE HORIZONS"
        decorator="@ai_pipeline.domains(specializations=['AI', 'Python', 'FullStack'])"
        title="Career Trajectory & Passions"
        subtitle="Three focused pillars driving my technological ambition: from neural intelligence to high-performance Python backends and fluid full-stack systems."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {careerInterests.map((interest, idx) => (
          <ProjectCard3D
            key={interest.id}
            intensity={14}
            glowColor={interest.glowColor}
            className="h-full"
          >
            <div className="h-full rounded-3xl glass-panel p-8 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              {/* Unique ambient backdrop aura */}
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[70px] pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                style={{ backgroundColor: interest.accentColor }}
              />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border"
                    style={{
                      borderColor: interest.glowColor,
                      color: interest.accentColor,
                      backgroundColor: 'rgba(255,255,255,0.02)'
                    }}
                  >
                    {interest.badge}
                  </span>

                  <span className="font-mono text-xs text-slate-500">
                    0{idx + 1} // 03
                  </span>
                </div>

                {/* Main Icon */}
                <div
                  className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ borderColor: interest.glowColor }}
                >
                  {iconLookup[interest.icon] || <Sparkles className="w-8 h-8 text-cyan-400" />}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-black text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-wide">
                  {interest.title}
                </h3>

                {/* Subtitle */}
                <div className="font-mono text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: interest.accentColor }}
                  />
                  <span>{interest.subtitle}</span>
                </div>

                {/* Core description required by prompt */}
                <p className="text-sm font-medium text-slate-200 mb-4 leading-relaxed">
                  {interest.description}
                </p>

                {/* Detailed vision */}
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {interest.detailedVision}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {interest.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ProjectCard3D>
        ))}
      </div>
    </section>
  );
};
