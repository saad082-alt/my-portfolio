import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  gradient?: string;
  decorator?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  gradient = 'from-cyan-400 via-blue-400 to-purple-500',
  decorator
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-14 sm:mb-20 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {/* Badge / Index */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)] ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>{badge}</span>
      </motion.div>

      {/* Pythonic Function Decorator */}
      {decorator && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className={`font-mono text-xs mb-2 flex items-center gap-1.5 ${isCenter ? 'justify-center' : 'justify-start'}`}
        >
          <span className="text-purple-400 font-bold">{decorator.split('(')[0]}</span>
          {decorator.includes('(') && (
            <span className="text-cyan-300">({decorator.split('(')[1]}</span>
          )}
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4`}
      >
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {title}
        </span>
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative cyber bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6 ${
          isCenter ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
