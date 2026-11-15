import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('BOOTING SYSTEM CORE...');

  useEffect(() => {
    const steps = [
      { at: 15, text: '$ source venv/bin/activate (saad-env)' },
      { at: 35, text: '>>> import python, ai_engineering, fullstack' },
      { at: 60, text: '>>> from future import artificial_intelligence' },
      { at: 85, text: '>>> saad.initialize_kernel(version="3.12.2")' },
      { at: 100, text: '>>> [200 OK] PYTHON KERNEL READY // WELCOME' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        const matched = steps.find((s) => s.at === next);
        if (matched) {
          setCurrentStep(matched.text);
        }
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 18);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[99999] bg-[#030014] flex flex-col items-center justify-center p-6 select-none"
      >
        {/* Ambient background glows */}
        <div className="absolute w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Central HUD Card */}
        <div className="relative w-full max-w-md p-8 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col items-center shadow-[0_0_50px_rgba(0,240,255,0.15)]">
          {/* Hologram Scanner Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline pointer-events-none" />

          {/* Central Cyber Emblem */}
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 rounded-full border border-purple-500/60 flex items-center justify-center"
              />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-base text-cyan-300">
              GS
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs tracking-widest text-cyan-300 uppercase">
                GHANCHI SAAD // DEV STUDIO
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display">
              Building Today, Exploring Tomorrow
            </h1>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full mb-3">
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-cyan-500/30">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Details & Counter */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-slate-400">
            <span className="truncate max-w-[240px] text-cyan-200/80">
              {currentStep}
            </span>
            <span className="font-bold text-cyan-400">{progress}%</span>
          </div>
        </div>

        {/* Footer HUD telemetry */}
        <div className="mt-8 font-mono text-[11px] text-slate-500 tracking-wider flex items-center gap-4">
          <span>JG UNIVERSITY // B.TECH CSE</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>LJ POLYTECHNIC ALUM</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>PYTHON & AI</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
