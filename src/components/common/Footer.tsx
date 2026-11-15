import React from 'react';
import {
  ArrowUp,
  Terminal,
  Mail,
  Phone,
  Heart,
  Cpu
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-900 bg-[#02000c] pt-16 pb-12 px-4 sm:px-8 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              {personal.name}
            </span>
            <span className="font-mono text-xs text-cyan-400">// JG UNIVERSITY</span>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-sm">
            {personal.tagline} B.Tech CSE student at JG University. Focused on Python, AI Engineering, and full stack solutions.
          </p>
        </div>

        {/* Quick Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-purple-400 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={`tel:${personal.phoneRaw || '8866365762'}`}
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-purple-400 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Call Phone"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="p-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer ml-3"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} Ghanchi Saad. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span>Engineered with React & Tailwind</span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="text-cyan-400">Future Ready</span>
        </div>
      </div>
    </footer>
  );
};
