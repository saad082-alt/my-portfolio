import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CreditCard,
  UtensilsCrossed,
  CheckCircle,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { ProjectItem } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Simulator states for each project demo
  // 1. Transaction Risk Simulator
  const [txnAmount, setTxnAmount] = useState<number>(3450);
  const [isForeignLocation, setIsForeignLocation] = useState<boolean>(true);
  const [velocityMinutes, setVelocityMinutes] = useState<number>(2);
  const [riskResult, setRiskResult] = useState<{
    score: number;
    tier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    color: string;
    reason: string;
  } | null>(null);

  const calculateRisk = () => {
    soundFx.playClick();
    let score = 10;
    if (txnAmount > 5000) score += 35;
    else if (txnAmount > 1500) score += 20;

    if (isForeignLocation) score += 35;
    if (velocityMinutes < 5) score += 25;

    score = Math.min(score, 99);

    let tier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    let color = '#10b981';
    let reason = 'Normal routine spending pattern within safe parameters.';

    if (score >= 80) {
      tier = 'CRITICAL';
      color = '#ef4444';
      reason = 'Unusual spike in transaction amount with immediate location mismatch.';
    } else if (score >= 55) {
      tier = 'HIGH';
      color = '#f97316';
      reason = 'Rapid velocity burst detected from unfamiliar regional endpoint.';
    } else if (score >= 30) {
      tier = 'MEDIUM';
      color = '#eab308';
      reason = 'Moderate variance against standard historical baseline.';
    }

    setRiskResult({ score, tier, color, reason });
  };

  // 2. Expense Tracker Simulator
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Cloud Server Hosting', category: 'Tech', amount: 850 },
    { id: 2, name: 'AI & Data Course Books', category: 'Education', amount: 1200 },
    { id: 3, name: 'Cafeteria & Lunch', category: 'Food', amount: 240 },
  ]);
  const [newExpName, setNewExpName] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCategory] = useState('Tech');

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpName || !newExpAmount) return;
    soundFx.playSuccess();
    setExpenses([
      {
        id: Date.now(),
        name: newExpName,
        category: newExpCategory,
        amount: parseFloat(newExpAmount)
      },
      ...expenses
    ]);
    setNewExpName('');
    setNewExpAmount('');
  };

  // 3. Smart Canteen Token Simulator
  const [canteenToken, setCanteenToken] = useState<{
    id: string;
    item: string;
    time: string;
    status: 'Pending' | 'Preparing' | 'Ready';
  } | null>(null);

  const generateToken = (item: string) => {
    soundFx.playSuccess();
    const tokenNumber = Math.floor(100 + Math.random() * 900);
    const tokenObj = {
      id: `TOKEN-#${tokenNumber}`,
      item,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Preparing' as const
    };
    setCanteenToken(tokenObj);

    setTimeout(() => {
      setCanteenToken(prev => prev ? { ...prev, status: 'Ready' } : null);
      soundFx.playSuccess();
    }, 4000);
  };

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8 z-10 my-auto shadow-xl"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="absolute top-6 right-6 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 tracking-wider mb-2">
              <span>{project.category}</span>
              <span>&bull;</span>
              <span className="text-indigo-400">{project.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="font-display font-bold text-base sm:text-lg text-indigo-300">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* INTERACTIVE DEMO SIMULATOR CONTAINER */}
          <div className="mb-6 p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                  Interactive Simulator
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">READY</span>
            </div>

            {/* 1. Transaction Risk Classifier Demo */}
            {project.demoType === 'risk-classifier' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 mb-1">
                      Transaction Amount ($)
                    </label>
                    <input
                      type="number"
                      value={txnAmount}
                      onChange={(e) => setTxnAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 mb-1">
                      Foreign IP Location?
                    </label>
                    <select
                      value={isForeignLocation ? 'yes' : 'no'}
                      onChange={(e) => setIsForeignLocation(e.target.value === 'yes')}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                    >
                      <option value="yes">Yes (Cross-border)</option>
                      <option value="no">No (Domestic IP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 mb-1">
                      Velocity (Mins since last txn)
                    </label>
                    <input
                      type="number"
                      value={velocityMinutes}
                      onChange={(e) => setVelocityMinutes(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateRisk}
                  onMouseEnter={() => soundFx.playHover()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-mono text-xs font-semibold text-white tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  RUN RISK CLASSIFICATION ENGINE
                </button>

                {riskResult && (
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg border"
                        style={{
                          borderColor: riskResult.color,
                          color: riskResult.color,
                          backgroundColor: `${riskResult.color}15`
                        }}
                      >
                        {riskResult.score}
                      </div>
                      <div>
                        <span
                          className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${riskResult.color}25`,
                            color: riskResult.color
                          }}
                        >
                          RISK TIER: {riskResult.tier}
                        </span>
                        <p className="text-xs text-slate-300 mt-1">
                          {riskResult.reason}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 shrink-0">
                      Evaluated in 18ms
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 2. Expense Tracker Demo */}
            {project.demoType === 'expense-tracker' && (
              <div className="space-y-4">
                <form onSubmit={addExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Expense name"
                    value={newExpName}
                    onChange={(e) => setNewExpName(e.target.value)}
                    className="sm:col-span-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-xs outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newExpAmount}
                    onChange={(e) => setNewExpAmount(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-xs outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                  >
                    + Record
                  </button>
                </form>

                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {expenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/80 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-slate-200">{exp.name}</span>
                        <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">
                          {exp.category}
                        </span>
                      </div>
                      <div className="font-bold text-slate-200">
                        ₹{exp.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Smart Canteen Token Demo */}
            {project.demoType === 'canteen-token' && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Masala Dosa Combo', 'Cold Brew Coffee', 'Veg Club Sandwich', 'Thali Special'].map(
                    (dish) => (
                      <button
                        key={dish}
                        onClick={() => generateToken(dish)}
                        onMouseEnter={() => soundFx.playHover()}
                        className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-mono text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Order: {dish}</span>
                      </button>
                    )
                  )}
                </div>

                {canteenToken ? (
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-white">
                          {canteenToken.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            canteenToken.status === 'Ready'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {canteenToken.status === 'Ready' ? 'COLLECTION READY' : 'PREPARING IN KITCHEN'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Item: <span className="font-semibold text-white">{canteenToken.item}</span> &bull; Issued at {canteenToken.time}
                      </div>
                    </div>

                    <div className="text-right font-mono text-[11px] text-slate-400">
                      {canteenToken.status === 'Ready' ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Please collect at Counter #2
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-300">
                          <Clock className="w-3.5 h-3.5 animate-spin" /> Wait time approx 4 mins
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-800 text-center font-mono text-xs text-slate-500">
                    Click any menu item above to issue an instant real-time kitchen queue token.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Technologies Tag List */}
          <div className="mb-6">
            <div className="font-mono text-xs text-slate-400 mb-2 uppercase tracking-wider">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>VIEW SOURCE CODE ON GITHUB</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              CLOSE PREVIEW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
