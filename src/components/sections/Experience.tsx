import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Edit3,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard3D } from '../3d/ProjectCard3D';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface ExperienceProps {
  onOpenEditGuide?: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenEditGuide }) => {
  const { internship, education } = portfolioData;

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="// 05. TRACK RECORD"
        decorator="@experience.validate(company='Brainybeam Info-Tech', project='Fresh Fruit Hub')"
        title="Experience & Academic Foundations"
        subtitle="Bridging academic rigor with real-world industry problem solving. Fully editable experience records with zero fabricated credentials."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Dedicated Internship Experience Card (7 Cols) */}
        <div className="lg:col-span-7">
          <ProjectCard3D intensity={8} glowColor="rgba(168, 85, 247, 0.35)">
            <div className="rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 relative overflow-hidden">
              {/* Header with edit hint */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-purple-300 font-semibold tracking-wider">
                      PROFESSIONAL INDUSTRY INTERNSHIP
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{internship.status}</span>
                    </div>
                  </div>
                </div>

                {onOpenEditGuide && (
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onOpenEditGuide();
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-mono text-purple-300 hover:text-white transition-all cursor-pointer"
                    title="Click to view where to edit these details"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Editable Section</span>
                  </button>
                )}
              </div>

              {/* Role & Company Details */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                  {internship.role}
                </h3>
                <div className="text-lg font-display font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <span>{internship.company}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {internship.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {internship.location}
                  </span>
                </div>
              </div>

              {/* Overview Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {internship.description}
              </p>

              {/* Responsibilities Bullet points */}
              <div className="mb-6 space-y-2.5">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Key Responsibilities & Deliverables
                </div>
                {internship.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Applied */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-mono text-[11px] text-slate-400 mb-2 uppercase tracking-wider">
                  Technologies Utilized
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {internship.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-purple-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Project / Achievement Highlight */}
              {internship.keyAchievement && (
                <div className="mt-5 p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono text-purple-200 flex items-start sm:items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span>
                    <strong className="text-cyan-300">Core Deliverable:</strong> {internship.keyAchievement}
                  </span>
                </div>
              )}

              {/* Editable Notification Callout */}
              <div className="mt-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="text-slate-400">
                  💡 Note: Company name, duration, and role can be customized in <code className="text-cyan-300">portfolioData.ts</code>
                </span>
                <span className="text-emerald-400 shrink-0 font-semibold">100% Configurable</span>
              </div>
            </div>
          </ProjectCard3D>
        </div>

        {/* RIGHT COLUMN: Education Progression (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-wider">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span>ACADEMIC MILESTONES</span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-800 space-y-8">
            {/* 1. B.Tech Ongoing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#030014] shadow-[0_0_12px_#00f0ff]" />

              <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    CURRENT PURSUIT
                  </span>
                  <span className="font-mono text-xs text-cyan-400 font-bold">Present</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  B.Tech in Computer Science Engineering
                </h4>
                <p className="font-mono text-xs text-cyan-400 font-semibold mb-2">
                  JG University, Ahmedabad
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Currently pursuing B.Tech CSE at JG University. Deepening expertise across artificial intelligence algorithms, distributed systems, predictive modeling, and scalable full-stack web applications.
                </p>
              </div>
            </motion.div>

            {/* 2. Diploma Completed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#030014] shadow-[0_0_12px_#a855f7]" />

              <div className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    FOUNDATIONAL DIPLOMA
                  </span>
                  <span className="font-mono text-xs text-purple-400 font-bold">Completed</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Diploma in Computer Engineering
                </h4>
                <p className="font-mono text-xs text-slate-400 mb-2">
                  LJ Polytechnic, Ahmedabad
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Established core technical competence in hardware architecture, programming paradigms, relational database systems, and disciplined logic building.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
