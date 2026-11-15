import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Briefcase,
  FolderGit2
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface EditGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditGuideModal: React.FC<EditGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8 z-10 my-auto shadow-xl"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="absolute top-6 right-6 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="font-mono text-xs text-indigo-400 tracking-wider mb-2 uppercase">
            DEVELOPER CONFIGURATION GUIDE
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
            How to Edit Your Information & Links
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            All your personal details, GitHub/LinkedIn links, projects, and internship records are centralized inside one configuration file: <code className="text-indigo-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-xs">src/data/portfolioData.ts</code>.
          </p>

          <div className="space-y-4">
            {/* 1. Internship details */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-200 font-semibold mb-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>1. Edit Internship Company & Experience</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                Open <span className="text-white font-mono">src/data/portfolioData.ts</span> and look for the <span className="text-indigo-300 font-mono">internship</span> object:
              </p>
              <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
{`internship: {
  company: "Brainybeam Info-Tech",
  role: "Web Design & MERN Stack Intern",
  duration: "May 2024 - June 2024",
  location: "Ahmedabad, India",
  description: "...",
  responsibilities: [ ... ]
}`}
              </pre>
            </div>

            {/* 2. Social Links */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-200 font-semibold mb-2">
                <FolderGit2 className="w-4 h-4 text-indigo-400" />
                <span>2. Edit Social & Project Repository Links</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                Update your GitHub, LinkedIn, and personal details:
              </p>
              <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
{`personal: {
  email: "ghanchisaad082@gmail.com",
  phone: "+91 88663 65762",
  github: "https://github.com/saad082-alt",
  linkedin: "https://www.linkedin.com/in/saad-ghanchi-0715773ba"
}`}
              </pre>
            </div>

            {/* 3. Hot Reload */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong className="text-emerald-300 block mb-0.5">Instant Hot-Reload:</strong>
                As soon as you edit <code className="text-white">src/data/portfolioData.ts</code>, changes appear instantly.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-mono text-xs font-semibold text-white tracking-wider cursor-pointer transition-colors"
            >
              GOT IT, CLOSE GUIDE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
