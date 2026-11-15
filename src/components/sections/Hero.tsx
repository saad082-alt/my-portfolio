import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ChevronRight,
  Mail,
  Terminal
} from 'lucide-react';
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
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(85);

        if (displayText.length + 1 === fullText.length) {
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(40);

        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personal.roles.length);
          setTypingSpeed(350);
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
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-8"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Availability Telemetry Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111726] border border-slate-800 text-slate-300 font-mono text-xs tracking-wide mb-6 select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-medium text-slate-300">
            JG University &bull; B.Tech CSE &bull; Available for Opportunities
          </span>
        </motion.div>

        {/* Clean Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-3"
        >
          <div className="font-mono text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-2">
            SOFTWARE ENGINEER &bull; FUTURE AI ARCHITECT
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-white leading-tight">
            Hey, I'm <span className="text-white">{personal.name}</span>.
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-2 mb-4"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-slate-300">
            "{personal.tagline}"
          </p>
        </motion.div>

        {/* Typing Role Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-2 font-mono text-sm sm:text-base text-slate-400 min-h-[2rem] mb-8"
        >
          <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-slate-500">&gt;</span>
          <span className="font-semibold text-slate-200">
            {displayText}
          </span>
          <span className="inline-block w-2 h-4 bg-indigo-400 ml-0.5 rounded-sm" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-12"
        >
          {/* Explore My Work Button */}
          <button
            onClick={() => handleScrollTo('projects')}
            onMouseEnter={() => soundFx.playHover()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5"
          >
            <span>EXPLORE MY WORK</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Let's Connect Button */}
          <button
            onClick={() => handleScrollTo('contact')}
            onMouseEnter={() => soundFx.playHover()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#111726] hover:bg-[#161d30] border border-slate-800 hover:border-slate-700 text-slate-200 font-mono text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>LET'S CONNECT</span>
          </button>
        </motion.div>

        {/* Stats Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {personal.stats.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHover()}
              className="p-4 rounded-xl bg-[#111726] border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col items-center justify-center text-center"
            >
              <span className="font-display font-bold text-base sm:text-lg text-white">
                {item.value}
              </span>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-1.5 cursor-pointer select-none text-slate-500 hover:text-slate-300 transition-colors"
          onClick={() => handleScrollTo('about')}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
