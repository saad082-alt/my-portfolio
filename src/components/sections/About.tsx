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
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard3D } from '../3d/ProjectCard3D';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const About: React.FC = () => {
  const { personal, education } = portfolioData;

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-4 h-4 text-cyan-400" />,
    Compass: <Compass className="w-4 h-4 text-purple-400" />,
    Cpu: <Cpu className="w-4 h-4 text-blue-400" />,
    Gamepad2: <Gamepad2 className="w-4 h-4 text-pink-400" />,
    Layers: <Layers className="w-4 h-4 text-emerald-400" />
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="// 01. INTEL & BIOGRAPHY"
        decorator="@dataclass(SaadDeveloper)"
        title="Engineering Mindset & Identity"
        subtitle="Driven by relentless curiosity, algorithmic elegance, and a vision for future-ready intelligent software."
      />

      {/* Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Futuristic Holographic ID Card (5 Cols) */}
        <div className="lg:col-span-5">
          <ProjectCard3D
            intensity={10}
            glowColor="rgba(0, 240, 255, 0.3)"
            className="w-full"
          >
            <div className="rounded-3xl glass-panel-glow p-6 sm:p-8 relative overflow-hidden border border-cyan-500/30">
              {/* Scanline decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              {/* Top HUD bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 font-semibold">GHANCHI SAAD // IDENTITY</span>
                </div>
                <span className="text-purple-400 font-medium">JG UNIVERSITY</span>
              </div>

              {/* Digital Hologram Avatar Core */}
              <div className="my-8 flex flex-col items-center">
                <div className="relative w-36 h-36 rounded-2xl p-1 bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_25px_rgba(99,102,241,0.25)]">
                  <div className="w-full h-full rounded-2xl bg-[#070714] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                    <Terminal className="w-10 h-10 text-cyan-400 mb-2" />
                    <span className="font-display font-bold text-sm text-white">GHANCHI SAAD</span>
                    <span className="font-mono text-[10px] text-indigo-300">JG UNIVERSITY CSE</span>

                    {/* Matrix Grid Lines Inside Avatar */}
                    <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="font-display font-bold text-2xl text-white">
                    {personal.fullName}
                  </h3>
                  <p className="font-mono text-xs text-cyan-300 mt-1">
                    B.Tech CSE at JG University &bull; LJ Polytechnic Alum
                  </p>
                </div>
              </div>

              {/* Telemetry Info Grid */}
              <div className="space-y-3 font-mono text-xs border-t border-slate-800/80 pt-6">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">CURRENT DEGREE:</span>
                  <span className="text-cyan-300 font-semibold">B.Tech CSE (JG University)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">FOUNDATION:</span>
                  <span className="text-slate-200">Diploma (LJ Polytechnic)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">SPECIALIZATION:</span>
                  <span className="text-cyan-300 font-semibold">AI & Python Systems</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">INTERNSHIP:</span>
                  <span className="text-purple-300 font-semibold truncate max-w-[190px]">Brainybeam Info-Tech</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">CONTACT EMAIL:</span>
                  <span className="text-cyan-300 font-semibold truncate max-w-[190px]">{personal.email}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">MOBILE / DIRECT:</span>
                  <span className="text-purple-300 font-semibold">{personal.phone}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">CORE PASSION:</span>
                  <span className="text-emerald-400 font-semibold">Innovative Problem Solving</span>
                </div>
              </div>

              {/* Security watermark footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  AUTHENTICATED PROFILE
                </span>
                <span>SEC-CODE // 4209</span>
              </div>
            </div>
          </ProjectCard3D>
        </div>

        {/* RIGHT COLUMN: Bio Narrative, Education Journey & Personality (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Narrative Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="font-display font-bold text-xl text-white">
                Who I Am & What Drives Me
              </h3>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              {personal.bioLong}
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              When I'm not writing algorithmic Python scripts or architecting full-stack systems, you'll find me immersed in competitive gaming, discussing futuristic breakthrough technologies with friends, or dissecting how the next generation of artificial intelligence can transform everyday human productivity.
            </p>
          </motion.div>

          {/* Education Breakdown: Diploma to B.Tech */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION & ADVANCEMENT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {edu.badge}
                      </span>
                      <span className="font-mono text-xs text-purple-400 font-semibold">
                        {edu.duration}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
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
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-6 rounded-3xl glass-panel border border-slate-800"
          >
            <div className="font-mono text-xs text-purple-400 tracking-wider mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span>PERSONALITY DNA & INTERESTS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personal.personalityTraits.map((trait, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-purple-500/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-slate-800/80 shrink-0">
                    {iconMap[trait.icon] || <Sparkles className="w-4 h-4 text-cyan-400" />}
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
