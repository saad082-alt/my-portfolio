import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileCode,
  CheckCircle,
  Copy,
  Sparkles,
  ExternalLink,
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 z-10 my-auto shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 font-mono text-xs text-purple-400 tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>DEVELOPER CONFIGURATION GUIDE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            How to Edit Your Information & Links
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            All your personal details, GitHub/LinkedIn links, projects, and internship records are centralized inside one clean configuration file: <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 font-mono text-xs">src/data/portfolioData.ts</code>.
          </p>

          <div className="space-y-6">
            {/* 1. Internship details */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-semibold mb-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>1. Edit Internship Company & Experience</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Open <span className="text-white font-mono">src/data/portfolioData.ts</span> and look for the <span className="text-purple-300 font-mono">internship: &#123; ... &#125;</span> section. Replace the company name, role, duration, and bullet points with your exact experience:
              </p>
              <pre className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto">
{`internship: {
  company: "Your Exact Company Name",
  role: "Python / Software Intern",
  duration: "June 2024 - August 2024",
  location: "Ahmedabad, India",
  description: "Your specific deliverables...",
  responsibilities: [ ... ]
}`}
              </pre>
            </div>

            {/* 2. Social Links */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-semibold mb-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>2. Edit Social & Project Repository Links</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Update your GitHub, LinkedIn, and project URLs under <span className="text-purple-300 font-mono">personal</span> and <span className="text-purple-300 font-mono">projects</span>:
              </p>
              <pre className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto">
{`personal: {
  email: "ghanchisaad082@gmail.com",
  phone: "+91 88663 65762",
  github: "https://github.com/saad082-alt",
  linkedin: "https://www.linkedin.com/in/saad-ghanchi-0715773ba"
}`}
              </pre>
            </div>

            {/* 3. Hot Reload */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong className="text-emerald-300 block mb-1">Instant Hot-Reload:</strong>
                As soon as you save <code className="text-white font-bold">src/data/portfolioData.ts</code>, Vite will automatically update the browser without needing a full rebuild!
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-mono text-xs font-bold text-white tracking-wider cursor-pointer"
            >
              GOT IT, CLOSE GUIDE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
