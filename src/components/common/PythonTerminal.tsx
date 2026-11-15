import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Check,
  Copy,
  Sparkles,
  FileCode,
  Cpu,
  Braces
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { PythonIcon } from './Icons';

export const PythonTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'risk' | 'repl'>('main');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [replHistory, setReplHistory] = useState<Array<{ cmd: string; res: string }>>([
    {
      cmd: '>>> import saad',
      res: "[System] Module 'saad' loaded successfully (v2.0 - Python 3.12)"
    },
    {
      cmd: '>>> saad.get_profile()',
      res: "{'name': 'Ghanchi Saad', 'degree': 'B.Tech CSE @ JG University', 'internship': 'Brainybeam Info-Tech', 'passion': 'AI & Python'}"
    }
  ]);

  const mainPyCode = `# -------------------------------------------------------------
# GHANCHI SAAD // AI & PYTHON SOFTWARE ENGINEER
# -------------------------------------------------------------
from dataclasses import dataclass, field
from typing import List, Dict, Any
import asyncio

@dataclass
class SaadProfile:
    name: str = "Ghanchi Saad"
    education: str = "B.Tech CSE at JG University (Diploma from LJ Polytechnic)"
    internship: str = "Brainybeam Info-Tech (MERN & Web Dev)"
    stack: List[str] = field(default_factory=lambda: [
        "Python", "SQL", "HTML5/CSS3", "JavaScript", "MERN Stack"
    ])
    interests: List[str] = field(default_factory=lambda: [
        "Artificial Intelligence", "Neural Networks", "Backend Systems"
    ])

    async def execute_mission(self) -> Dict[str, Any]:
        """Building Today, Exploring Tomorrow."""
        await asyncio.sleep(0.05)
        return {
            "status": "READY_FOR_HIGH_IMPACT_ROLES",
            "curiosity_level": "MAXIMUM",
            "code_quality": "CLEAN_IDIOMATIC_PYTHON"
        }

# Initializing developer instance
saad = SaadProfile()
`;

  const riskPyCode = `# -------------------------------------------------------------
# TRANSACTION RISK CLASSIFIER // PREDICTIVE ENGINE
# -------------------------------------------------------------
import numpy as np

def evaluate_transaction_risk(amount: float, foreign_ip: bool, velocity_mins: float) -> dict:
    """Classifies financial risk using multivariate heuristic parameters."""
    score = 10
    if amount > 5000:
        score += 35
    if foreign_ip:
        score += 35
    if velocity_mins < 5:
        score += 25

    risk_tier = "CRITICAL" if score >= 80 else "HIGH" if score >= 55 else "LOW"
    return {
        "score": min(score, 99),
        "tier": risk_tier,
        "action": "FLAG_FOR_REVIEW" if score >= 55 else "APPROVE"
    }
`;

  const handleRun = () => {
    soundFx.playClick();
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      soundFx.playSuccess();
      if (activeTab === 'main') {
        setOutput(`[Python 3.12.2 execution - Process finished with exit code 0]
----------------------------------------------------------------------
> SaadProfile initialized: Ghanchi Saad (B.Tech CSE @ JG University)
> Internship verified: Brainybeam Info-Tech (Fresh Fruit Hub)
> Status: READY_FOR_HIGH_IMPACT_ROLES
> Motto: 'Building Today, Exploring Tomorrow.'
----------------------------------------------------------------------
[✓ Memory: 14.2 MB | Execution Time: 0.018s]`);
      } else if (activeTab === 'risk') {
        setOutput(`[Python 3.12.2 execution - Process finished with exit code 0]
----------------------------------------------------------------------
> Running evaluate_transaction_risk(amount=6450.0, foreign_ip=True, velocity_mins=2.1)...
> Computed Risk Score: 80 / 100
> Risk Tier: CRITICAL (Triggering automated review pipeline)
----------------------------------------------------------------------
[✓ Test passed: 4 assertions verified in 0.009s]`);
      }
    }, 600);
  };

  const handleReplCommand = (cmd: string, res: string) => {
    soundFx.playClick();
    setReplHistory(prev => [...prev, { cmd: `>>> ${cmd}`, res }]);
    setTimeout(() => {
      soundFx.playSuccess();
    }, 150);
  };

  const handleCopy = () => {
    soundFx.playClick();
    const textToCopy = activeTab === 'main' ? mainPyCode : riskPyCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.15)] relative">
      {/* Top Window Titlebar (macOS / Linux Cyber Terminal style) */}
      <div className="px-4 py-3 bg-[#050512] border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-500 text-xs font-mono ml-2 hidden sm:inline">
            venv: (saad-env) Python 3.12.2
          </span>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('main');
              setOutput(null);
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`px-3 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'main'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PythonIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>main.py</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('risk');
              setOutput(null);
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`px-3 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'risk'
                ? 'bg-slate-800 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <span>classifier.py</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('repl');
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`px-3 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'repl'
                ? 'bg-slate-800 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>interactive_repl</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {activeTab !== 'repl' && (
            <button
              onClick={handleCopy}
              onMouseEnter={() => soundFx.playHover()}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          {activeTab !== 'repl' && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              onMouseEnter={() => soundFx.playHover()}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isRunning ? (
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
              )}
              <span>{isRunning ? 'RUNNING...' : 'RUN'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-6 bg-[#040310] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px] max-h-[380px] overflow-y-auto">
        {activeTab !== 'repl' ? (
          <div>
            <pre className="text-slate-300">
              <code>
                {(activeTab === 'main' ? mainPyCode : riskPyCode)
                  .split('\n')
                  .map((line, idx) => (
                    <div key={idx} className="table-row group">
                      <span className="table-cell pr-4 text-slate-600 select-none text-right w-8 text-xs">
                        {idx + 1}
                      </span>
                      <span className="table-cell whitespace-pre">
                        {line.startsWith('#') ? (
                          <span className="text-slate-500 italic">{line}</span>
                        ) : line.startsWith('@') ? (
                          <span className="text-purple-400 font-semibold">{line}</span>
                        ) : line.includes('def ') || line.includes('class ') ? (
                          <span>
                            <span className="text-cyan-400 font-bold">
                              {line.split(/(\bdef\b|\bclass\b)/)[1]}
                            </span>
                            <span className="text-yellow-300">
                              {line.split(/(\bdef\b|\bclass\b)/)[2]}
                            </span>
                          </span>
                        ) : line.includes('import ') || line.includes('from ') ? (
                          <span>
                            <span className="text-pink-400 font-semibold">{line.split(' ')[0]}</span>{' '}
                            <span className="text-cyan-300">{line.substring(line.indexOf(' ') + 1)}</span>
                          </span>
                        ) : line.includes('return ') ? (
                          <span>
                            <span className="text-pink-400 font-semibold">return </span>
                            <span className="text-slate-200">{line.replace(/.*return /, '')}</span>
                          </span>
                        ) : (
                          <span className="text-slate-300">{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
              </code>
            </pre>

            {/* Run Output Terminal Drawer */}
            <AnimatePresence>
              {output && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-xl bg-black/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs overflow-x-auto shadow-inner"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                    <span className="text-emerald-400">● STDOUT // EXECUTION FINISHED</span>
                    <span>PYTHON 3.12 INTERPRETER</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Interactive REPL Tab */
          <div className="space-y-3">
            <div className="text-slate-400 text-xs border-b border-slate-800 pb-2">
              Python 3.12.2 (tags/v3.12.2:6abddd9, Oct 2024, 64 bit) on win32.
              <br />
              Type "help", "copyright", "credits" or click quick Python commands below:
            </div>

            {/* REPL History stream */}
            <div className="space-y-2">
              {replHistory.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-cyan-400 font-semibold">{item.cmd}</div>
                  <div className="text-emerald-300 pl-4">{item.res}</div>
                </div>
              ))}
            </div>

            {/* Quick Python Action Chips */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
                Click to Execute Python Functions:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleReplCommand(
                      'saad.skills',
                      "['Python (Core)', 'SQL', 'MERN Stack', 'AI/ML', 'HTML5/CSS3', 'JavaScript']"
                    )
                  }
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs transition-colors cursor-pointer"
                >
                  &gt;&gt;&gt; saad.skills
                </button>

                <button
                  onClick={() =>
                    handleReplCommand(
                      'saad.internship()',
                      "'Brainybeam Info-Tech (Web Design & MERN Stack Internship, Project: Fresh Fruit Hub)'"
                    )
                  }
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-400 text-purple-300 text-xs transition-colors cursor-pointer"
                >
                  &gt;&gt;&gt; saad.internship()
                </button>

                <button
                  onClick={() =>
                    handleReplCommand(
                      'saad.contact_info()',
                      "{'email': 'ghanchisaad082@gmail.com', 'phone': '+91 88663 65762', 'github': 'https://github.com/saad082-alt', 'linkedin': 'https://www.linkedin.com/in/saad-ghanchi-0715773ba'}"
                    )
                  }
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400 text-emerald-300 text-xs transition-colors cursor-pointer"
                >
                  &gt;&gt;&gt; saad.contact_info()
                </button>

                <button
                  onClick={() =>
                    handleReplCommand(
                      'saad.future_vision()',
                      "'Specializing in AI Engineering, Intelligent Agents, and Scalable Python Architectures.'"
                    )
                  }
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-pink-400 text-pink-300 text-xs transition-colors cursor-pointer"
                >
                  &gt;&gt;&gt; saad.future_vision()
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Status Bar */}
      <div className="px-4 py-2 bg-[#03020c] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cyan-400">
            <PythonIcon className="w-3 h-3" /> Python 3.12
          </span>
          <span>UTF-8</span>
          <span className="hidden sm:inline">Spaces: 4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400">INTERPRETER READY</span>
        </div>
      </div>
    </div>
  );
};
