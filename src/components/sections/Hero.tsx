import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Sparkles,
  ChevronRight,
  Terminal,
  Cpu,
  Brain,
  Code2,
  ExternalLink,
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, PythonIcon } from '../common/Icons';
import { PythonTerminal } from '../common/PythonTerminal';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  // Animated typing/cycling role text
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullText = personal.roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(90);

        if (displayText.length + 1 === fullText.length) {
          // Pause at full word
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        // Deleting characters
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(45);

        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personal.roles.length);
          setTypingSpeed(400);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, personal.roles, typingSpeed]);

  const handleScrollTo = (id: string) => {
    soundFx.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Availability Telemetry Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-slate-700/80 text-emerald-300 font-mono text-xs tracking-wider mb-8 shadow-sm select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold text-slate-200">
            JG University &bull; B.Tech CSE &bull; Available for Opportunities
          </span>
        </motion.div>

        {/* Large Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-4"
        >
          <div className="font-mono text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>SOFTWARE ENGINEER &bull; FUTURE AI ARCHITECT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-tight">
            Hey, I'm{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {personal.name}.
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent rounded-full shadow-[0_0_10px_#6366f1]" />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle: "Building Today, Exploring Tomorrow." */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 mb-8"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-slate-200 tracking-wide">
            "{personal.tagline}"
          </p>
        </motion.div>

        {/* Animated Typing Role Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-3 font-mono text-base sm:text-xl md:text-2xl text-slate-300 min-h-[3rem] px-6 py-2 rounded-2xl glass-panel border border-cyan-500/25 shadow-[0_0_25px_rgba(0,240,255,0.1)] mb-10"
        >
          <Terminal className="w-5 h-5 text-cyan-400 animate-pulse shrink-0" />
          <span className="text-slate-400 font-light">&gt;</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
            {displayText}
          </span>
          <span className="inline-block w-2.5 h-6 bg-cyan-400 animate-pulse ml-0.5 rounded-sm" />
        </motion.div>

        {/* Action Buttons: "Explore My Work" and "Let's Connect" */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mb-12"
        >
          {/* Explore My Work Button */}
          <button
            onClick={() => handleScrollTo('projects')}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-mono text-sm font-semibold tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_45px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">EXPLORE MY WORK</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>

          {/* Let's Connect Button */}
          <button
            onClick={() => handleScrollTo('contact')}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-purple-500/40 text-purple-200 hover:text-white font-mono text-sm font-semibold tracking-wider hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>LET'S CONNECT</span>
          </button>
        </motion.div>

        {/* INTERACTIVE PYTHON 3.12 TERMINAL / REPL WORKSPACE */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="w-full mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3 font-mono text-xs text-cyan-400 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>PYTHON DEVELOPER KERNEL // LIVE INTERACTION</span>
          </div>
          <PythonTerminal />
        </motion.div>

        {/* Quick Engineering HUD Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          {personal.stats.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHover()}
              className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col items-center justify-center text-center group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            >
              <span className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
                {item.value}
              </span>
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 sm:mt-20 flex flex-col items-center gap-2 cursor-pointer select-none"
          onClick={() => handleScrollTo('about')}
        >
          <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-9 rounded-full border-2 border-cyan-500/40 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
