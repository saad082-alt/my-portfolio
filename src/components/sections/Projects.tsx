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
  Layers
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SectionHeader } from '../common/SectionHeader';
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
    'transaction-risk-classifier': <ShieldAlert className="w-6 h-6 text-indigo-400" />,
    'expense-tracker': <Wallet className="w-6 h-6 text-indigo-400" />,
    'smart-canteen-token': <Utensils className="w-6 h-6 text-indigo-400" />,
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <SectionHeader
        badge="04. Featured Engineering Work"
        title="Project Showcase"
        subtitle="Explore interactive architectural builds solving real-world challenges in AI risk modeling, financial analytics, and campus automation."
      />

      {/* Top Slider Navigation & Project Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-[#111726] border border-slate-800">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => handleSelectTab(idx)}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                currentIndex === idx
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-[10px] opacity-75">0{idx + 1}.</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-mono text-xs text-slate-400 px-2">
            <span className="text-white font-medium">0{currentIndex + 1}</span> / 0{projects.length}
          </div>
          <button
            onClick={handleNext}
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PROJECT DETAILS CONTAINER */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Project Details (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {currentProject.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wider uppercase bg-slate-800 text-indigo-300 border border-slate-700">
                      {currentProject.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white mb-2 tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-slate-400 mb-5">
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
                        <span className="text-indigo-400 mt-0.5">&gt;</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Simulator & GitHub */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenDemo(currentProject)}
                    onMouseEnter={() => soundFx.playHover()}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>TEST INTERACTIVE SIMULATOR</span>
                  </button>

                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                    <span>VIEW REPO</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

              {/* Right Column: Preview Box (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between min-h-[300px]">
                  {/* Top preview bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-white font-medium">SYSTEM TELEMETRY</span>
                    </div>
                    <span className="text-slate-400">v1.0</span>
                  </div>

                  {/* Center Graphic */}
                  <div className="my-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-[#111726] border border-slate-800 flex items-center justify-center mb-3">
                      {projectIconMap[currentProject.id] || <Layers className="w-7 h-7 text-indigo-400" />}
                    </div>
                    <h4 className="font-display font-semibold text-base text-white">
                      {currentProject.title}
                    </h4>
                    <p className="font-mono text-xs text-slate-400 mt-1 max-w-xs">
                      Run live simulated parameters and observe real-time classification.
                    </p>
                  </div>

                  {/* Metrics HUD Preview */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800">
                    {currentProject.metrics.map((m, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-[#111726] border border-slate-800/80 text-center">
                        <div className="font-display font-bold text-xs sm:text-sm text-indigo-300 truncate">
                          {m.value}
                        </div>
                        <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
