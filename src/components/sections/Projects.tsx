import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  ShieldAlert,
  Wallet,
  Utensils,
  Sparkles,
  Layers
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard3D } from '../3d/ProjectCard3D';
import { ProjectModal } from '../modals/ProjectModal';
import { portfolioData, ProjectItem } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleSelectTab = (idx: number) => {
    soundFx.playClick();
    setCurrentIndex(idx);
  };

  const handleOpenDemo = (project: ProjectItem) => {
    soundFx.playSuccess();
    setSelectedProject(project);
  };

  const projectIconMap: Record<string, React.ReactNode> = {
    'transaction-risk-classifier': <ShieldAlert className="w-6 h-6 text-purple-400" />,
    'expense-tracker': <Wallet className="w-6 h-6 text-cyan-400" />,
    'smart-canteen-token': <Utensils className="w-6 h-6 text-pink-400" />,
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <SectionHeader
        badge="// 04. FEATURED ENGINEERING WORK"
        decorator="@asyncio.gather(risk_classifier, expense_tracker, canteen_token)"
        title="Horizontal Project Showcase"
        subtitle="Explore interactive architectural builds solving real-world challenges in AI risk modeling, financial analytics, and campus automation."
      />

      {/* Top Slider Navigation & Project Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel border border-slate-800">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => handleSelectTab(idx)}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-4 py-2 rounded-xl font-mono text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                currentIndex === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="font-semibold text-[10px] opacity-75">0{idx + 1}.</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-mono text-xs text-slate-400 px-3">
            <span className="text-cyan-400 font-bold">0{currentIndex + 1}</span> / 0{projects.length}
          </div>
          <button
            onClick={handleNext}
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* HORIZONTAL SLIDING SHOWCASE CONTAINER */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard3D intensity={8} glowColor="rgba(0, 240, 255, 0.25)">
              <div className="rounded-3xl glass-panel-glow border border-cyan-500/30 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
                {/* Background holographic accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Project Details (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Category & Badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {currentProject.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {currentProject.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white mb-2 tracking-tight">
                        {currentProject.title}
                      </h3>
                      <p className="font-mono text-sm text-cyan-300 mb-6">
                        {currentProject.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        {currentProject.description}
                      </p>

                      {/* Key Features Bullet List */}
                      <div className="space-y-2 mb-6">
                        {currentProject.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 font-mono">
                            <span className="text-cyan-400 mt-0.5">&gt;</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {currentProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700/80 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons: GitHub & Live Simulator */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
                      <button
                        onClick={() => handleOpenDemo(currentProject)}
                        onMouseEnter={() => soundFx.playHover()}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>TEST INTERACTIVE SIMULATOR</span>
                      </button>

                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => soundFx.playHover()}
                        className="px-6 py-3.5 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4 text-cyan-400" />
                        <span>VIEW REPO (EDITABLE)</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Holographic Interactive Preview Visual (5 Cols) */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl bg-[#070714] border border-cyan-500/25 p-6 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[320px]">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

                      {/* Top preview bar */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs text-slate-400 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-white font-bold">SYSTEM TELEMETRY</span>
                        </div>
                        <span className="text-cyan-400">ENGINE v1.0</span>
                      </div>

                      {/* Center Graphic */}
                      <div className="my-8 flex flex-col items-center justify-center text-center relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                          {projectIconMap[currentProject.id] || <Layers className="w-8 h-8 text-cyan-400" />}
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">
                          {currentProject.title}
                        </h4>
                        <p className="font-mono text-xs text-slate-400 mt-1 max-w-xs">
                          Click below to execute live parameters and observe real-time algorithmic classification.
                        </p>
                      </div>

                      {/* Metrics HUD Preview */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 relative z-10">
                        {currentProject.metrics.map((m, idx) => (
                          <div key={idx} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                            <div className="font-display font-bold text-xs sm:text-sm text-cyan-300 truncate">
                              {m.value}
                            </div>
                            <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ProjectCard3D>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
