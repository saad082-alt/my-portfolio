import React from 'react';
import {
  ArrowUp,
  Terminal,
  Mail,
  Phone
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
    <footer className="relative border-t border-slate-800/80 bg-[#0b0f19] pt-14 pb-10 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#111726] border border-slate-800 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="font-display font-semibold text-base text-white">
              {personal.name}
            </span>
            <span className="font-mono text-xs text-slate-500">&bull; JG UNIVERSITY</span>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-sm">
            {personal.tagline} B.Tech CSE student at JG University.
          </p>
        </div>

        {/* Quick Social Links & Scroll Top */}
        <div className="flex items-center gap-2.5">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={`tel:${personal.phoneRaw || '8866365762'}`}
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Phone"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer ml-2"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-5 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
        <div>
          &copy; {new Date().getFullYear()} Ghanchi Saad. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span>B.Tech CSE &bull; JG University</span>
        </div>
      </div>
    </footer>
  );
};
