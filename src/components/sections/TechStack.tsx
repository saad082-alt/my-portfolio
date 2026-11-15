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
  BrainCircuit,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard3D } from '../3d/ProjectCard3D';
import { PythonIcon } from '../common/Icons';
import { portfolioData, SkillItem } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const TechStack: React.FC = () => {
  const { skills, currentlyLearning } = portfolioData;

  const iconLookup: Record<string, React.ReactNode> = {
    Terminal: <PythonIcon className="w-6 h-6 text-cyan-400" />,
    Database: <Database className="w-6 h-6 text-purple-400" />,
    Code2: <Code2 className="w-6 h-6 text-orange-400" />,
    Palette: <Palette className="w-6 h-6 text-sky-400" />,
    FileCode: <FileCode className="w-6 h-6 text-yellow-400" />,
  };

  const learningIconLookup: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
    Boxes: <Boxes className="w-5 h-5 text-yellow-400" />,
    Server: <Server className="w-5 h-5 text-purple-400" />,
    BrainCircuit: <BrainCircuit className="w-5 h-5 text-pink-400" />,
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="// 02. TECHNICAL ARSENAL"
        decorator="@system.skills(core='python_3.12', typing=True)"
        title="Core Technologies & Capabilities"
        subtitle="Focused, pragmatic software stack backed by genuine problem-solving curiosity. Strictly real-world competencies—no arbitrary percentage gimmicks."
      />

      {/* 1. Core Interactive 3D Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {skills.map((skill, idx) => (
          <ProjectCard3D
            key={skill.name}
            intensity={12}
            glowColor={skill.borderGlow}
            className="h-full"
          >
            <div className="h-full rounded-2xl glass-panel p-6 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
              <div>
                {/* Header: Icon & Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:scale-110 transition-transform shadow-md"
                    style={{ borderColor: skill.borderGlow }}
                  >
                    {iconLookup[skill.iconName] || <Terminal className="w-6 h-6 text-cyan-400" />}
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {skill.category}
                    </span>
                    <span className="font-mono text-[11px] text-cyan-400 mt-1 font-semibold">
                      {skill.level}
                    </span>
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{skill.name}</span>
                  {skill.name === 'Python' && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                      ★ CORE SPECIALTY
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
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2.5">
                  Key Focus Areas
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.highlights.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-900/80 text-slate-300 border border-slate-800/80 group-hover:border-slate-700 transition-colors"
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

      {/* 2. Currently Learning / Expanding Horizons Section */}
      <div className="rounded-3xl glass-panel-glow p-8 sm:p-10 border border-purple-500/30 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section title inside card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-purple-400 tracking-widest uppercase mb-1">
              <Flame className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>ACTIVE RESEARCH & SKILL ACCELERATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Currently Learning & Expanding Horizons
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            CONTINUOUS EVOLUTION
          </span>
        </div>

        {/* Grid of 4 Learning Focus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentlyLearning.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundFx.playHover()}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/40 group-hover:scale-110 transition-transform">
                    {learningIconLookup[item.icon] || <Sparkles className="w-5 h-5 text-purple-400" />}
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                    {item.tag}
                  </span>
                </div>

                <h4 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.focus}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>IN PROGRESS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
