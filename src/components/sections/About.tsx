import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Gamepad2,
  Cpu,
  Compass,
  Layers,
  CheckCircle2,
  Terminal,
  UserCheck
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const About: React.FC = () => {
  const { personal, education } = portfolioData;

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-4 h-4 text-indigo-400" />,
    Compass: <Compass className="w-4 h-4 text-indigo-400" />,
    Cpu: <Cpu className="w-4 h-4 text-indigo-400" />,
    Gamepad2: <Gamepad2 className="w-4 h-4 text-indigo-400" />,
    Layers: <Layers className="w-4 h-4 text-indigo-400" />
  };

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="01. Intel & Biography"
        title="Engineering Mindset & Identity"
        subtitle="Driven by relentless curiosity, algorithmic elegance, and a vision for future-ready intelligent software."
      />

      {/* Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: Clean Developer Profile Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 font-mono text-xs text-slate-400">
              <span className="font-semibold text-slate-200">DEVELOPER PROFILE</span>
              <span className="text-indigo-400">JG UNIVERSITY</span>
            </div>

            {/* Profile Avatar & Identity */}
            <div className="my-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-4 shadow-sm">
                <Terminal className="w-9 h-9 text-indigo-400" />
              </div>

              <h3 className="font-display font-bold text-2xl text-white">
                {personal.fullName}
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-1">
                B.Tech CSE at JG University &bull; LJ Polytechnic Alum
              </p>
            </div>

            {/* Clean Metadata Info List */}
            <div className="space-y-3 font-mono text-xs border-t border-slate-800/80 pt-5">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">CURRENT DEGREE:</span>
                <span className="text-white font-medium">B.Tech CSE (JG University)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">FOUNDATION:</span>
                <span className="text-slate-300">Diploma (LJ Polytechnic)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">SPECIALIZATION:</span>
                <span className="text-indigo-300 font-medium">AI & Python Systems</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">INTERNSHIP:</span>
                <span className="text-slate-300 truncate max-w-[200px]">Brainybeam Info-Tech</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">CONTACT EMAIL:</span>
                <span className="text-indigo-300 truncate max-w-[200px]">{personal.email}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">MOBILE / DIRECT:</span>
                <span className="text-slate-300">{personal.phone}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-slate-300">{personal.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Bio Narrative, Education Journey & Personality (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Narrative Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111726] border border-slate-800"
          >
            <h3 className="font-display font-bold text-xl text-white mb-3">
              Who I Am & What Drives Me
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              {personal.bioLong}
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              When I'm not writing algorithmic Python scripts or architecting full-stack systems, you'll find me immersed in competitive gaming, discussing breakthrough technologies with friends, or dissecting how the next generation of artificial intelligence can transform everyday human productivity.
            </p>
          </motion.div>

          {/* Education Breakdown: Diploma to B.Tech */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>ACADEMIC FOUNDATION & ADVANCEMENT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-5 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                        {edu.badge}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {edu.duration}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-slate-400 mb-3 font-mono">
                      {edu.institution}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {edu.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-3 border-t border-slate-800/80">
                    {edu.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personality Traits & Core Attributes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 rounded-2xl bg-[#111726] border border-slate-800"
          >
            <div className="font-mono text-xs text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>CORE ATTRIBUTES & INTERESTS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personal.personalityTraits.map((trait, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-slate-800 shrink-0">
                    {iconMap[trait.icon] || <Sparkles className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-xs text-white">
                      {trait.label}
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      {trait.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
