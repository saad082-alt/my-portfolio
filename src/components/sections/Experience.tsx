import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Edit3,
  CheckCircle2,
  Calendar,
  MapPin
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface ExperienceProps {
  onOpenEditGuide?: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenEditGuide }) => {
  const { internship } = portfolioData;

  return (
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="05. Track Record"
        title="Experience & Academic Foundations"
        subtitle="Bridging academic rigor with real-world industry problem solving. Genuine credentials with zero fabrication."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Dedicated Internship Experience Card (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8">
            {/* Header with edit hint */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs text-slate-300 font-medium tracking-wide">
                    INDUSTRY INTERNSHIP
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
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                  title="Click to view where to edit these details"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Editable</span>
                </button>
              )}
            </div>

            {/* Role & Company Details */}
            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold text-white mb-1">
                {internship.role}
              </h3>
              <div className="text-base font-display font-medium text-indigo-300 mb-3">
                {internship.company}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {internship.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {internship.location}
                </span>
              </div>
            </div>

            {/* Overview Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {internship.description}
            </p>

            {/* Responsibilities Bullet points */}
            <div className="mb-6 space-y-2">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                Key Responsibilities & Deliverables
              </div>
              {internship.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
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
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Project / Achievement Highlight */}
            {internship.keyAchievement && (
              <div className="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-start sm:items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  <strong className="text-white">Core Deliverable:</strong> {internship.keyAchievement}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Education Progression (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 tracking-wider">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>ACADEMIC MILESTONES</span>
          </div>

          <div className="relative pl-6 border-l border-slate-800 space-y-6">
            {/* 1. B.Tech Ongoing */}
            <div className="relative">
              <div className="absolute -left-[31px] top-2 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-[#0b0f19]" />

              <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-indigo-300 border border-slate-700">
                    CURRENT PURSUIT
                  </span>
                  <span className="font-mono text-xs text-slate-400">Present</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">
                  B.Tech in Computer Science Engineering
                </h4>
                <p className="font-mono text-xs text-slate-400 mb-2">
                  JG University, Ahmedabad
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Currently pursuing B.Tech CSE at JG University. Deepening expertise across artificial intelligence algorithms, distributed systems, predictive modeling, and scalable full-stack web applications.
                </p>
              </div>
            </div>

            {/* 2. Diploma Completed */}
            <div className="relative">
              <div className="absolute -left-[31px] top-2 w-3.5 h-3.5 rounded-full bg-slate-600 border-4 border-[#0b0f19]" />

              <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    FOUNDATIONAL DIPLOMA
                  </span>
                  <span className="font-mono text-xs text-slate-400">Completed</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">
                  Diploma in Computer Engineering
                </h4>
                <p className="font-mono text-xs text-slate-400 mb-2">
                  LJ Polytechnic, Ahmedabad
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Established core technical competence in hardware architecture, programming paradigms, relational database systems, and disciplined logic building.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
