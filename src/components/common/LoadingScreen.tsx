import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 250);
          return 100;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-[99999] bg-[#0b0f19] flex flex-col items-center justify-center p-6 select-none"
      >
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          {/* Minimal Monogram */}
          <div className="w-12 h-12 rounded-xl bg-[#111726] border border-slate-800 flex items-center justify-center mb-6 shadow-sm">
            <span className="font-mono text-sm font-bold text-white tracking-wider">GS</span>
          </div>

          <h2 className="text-xl font-display font-semibold text-white tracking-tight mb-1">
            Ghanchi Saad
          </h2>
          <p className="font-mono text-xs text-slate-400 mb-8">
            Software Engineer &bull; B.Tech CSE
          </p>

          {/* Minimal Progress Bar */}
          <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between font-mono text-[11px] text-slate-500">
            <span>Loading portfolio</span>
            <span className="text-slate-400 font-medium">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
