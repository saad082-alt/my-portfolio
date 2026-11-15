import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Database,
  Code2,
  Palette,
  FileCode,
  Sparkles,
  Cpu,
  Boxes,
  Server,
  BrainCircuit
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { PythonIcon } from '../common/Icons';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const TechStack: React.FC = () => {
  const { skills, currentlyLearning } = portfolioData;

  const iconLookup: Record<string, React.ReactNode> = {
    Terminal: <PythonIcon className="w-5 h-5 text-indigo-400" />,
    Database: <Database className="w-5 h-5 text-indigo-400" />,
    Code2: <Code2 className="w-5 h-5 text-indigo-400" />,
    Palette: <Palette className="w-5 h-5 text-indigo-400" />,
    FileCode: <FileCode className="w-5 h-5 text-indigo-400" />,
  };

  const learningIconLookup: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-4 h-4 text-indigo-400" />,
    Boxes: <Boxes className="w-4 h-4 text-indigo-400" />,
    Server: <Server className="w-4 h-4 text-indigo-400" />,
    BrainCircuit: <BrainCircuit className="w-4 h-4 text-indigo-400" />,
  };

  return (
    <section id="skills" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="02. Technical Arsenal"
        title="Core Technologies & Capabilities"
        subtitle="Focused, pragmatic software stack backed by genuine problem-solving curiosity. Strictly real-world competencies."
      />

      {/* 1. Core Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {skills.map((skill) => (
          <div
            key={skill.name}
            onMouseEnter={() => soundFx.playHover()}
            className="h-full rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-colors p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header: Icon & Category Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  {iconLookup[skill.iconName] || <Terminal className="w-5 h-5 text-indigo-400" />}
                </div>

                <div className="flex flex-col items-end">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    {skill.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400 mt-1">
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center justify-between">
                <span>{skill.name}</span>
                {skill.name === 'Python' && (
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Core Focus
                  </span>
                )}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                {skill.description}
              </p>
            </div>

            {/* Competency Badges */}
            <div>
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                Key Focus Areas
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.highlights.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Currently Learning Section */}
      <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-1">
              Active Exploration
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Currently Learning & Expanding Horizons
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            CONTINUOUS EVOLUTION
          </span>
        </div>

        {/* Grid of 4 Learning Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentlyLearning.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHover()}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                    {learningIconLookup[item.icon] || <Sparkles className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/80">
                    {item.tag}
                  </span>
                </div>

                <h4 className="font-display font-semibold text-sm text-white mb-1.5">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.focus}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>IN PROGRESS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
