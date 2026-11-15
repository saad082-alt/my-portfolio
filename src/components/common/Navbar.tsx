import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { portfolioData } from '../../data/portfolioData';

interface NavbarProps {
  onOpenEditGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEditGuide }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', index: '01' },
    { name: 'Skills', href: '#skills', index: '02' },
    { name: 'Interests', href: '#interests', index: '03' },
    { name: 'Projects', href: '#projects', index: '04' },
    { name: 'Experience', href: '#experience', index: '05' },
    { name: 'Journey', href: '#journey', index: '06' },
    { name: 'Contact', href: '#contact', index: '07' },
  ];

  const handleLinkClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="group flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-600/30 to-slate-900 border border-cyan-500/40 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#030014] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  GHANCHI SAAD
                </span>
                <span className="font-mono text-[10px] text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                  JG UNIV
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                B.TECH CSE &bull; AI & PYTHON
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full glass-panel border border-cyan-500/20 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="group relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-slate-300 hover:text-white transition-colors duration-200"
              >
                <span className="text-[10px] text-cyan-400/60 mr-1 font-semibold group-hover:text-cyan-400">
                  {link.index}.
                </span>
                {link.name}
                <span className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={() => soundFx.playHover()}
              title={isMuted ? 'Unmute Futuristic UI Audio' : 'Mute Futuristic UI Audio'}
              className="p-2.5 rounded-xl glass-panel border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              )}
            </button>

            {/* Quick Edit Config Guide Button */}
            {onOpenEditGuide && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenEditGuide();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400/60 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                title="Edit Personal Information, Internship & Projects"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Edit Info</span>
              </button>
            )}

            {/* Connect CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="relative hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-medium text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>LET'S CONNECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2.5 rounded-xl glass-panel border border-cyan-500/30 text-cyan-300 hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-[#030014]/90 lg:hidden flex flex-col justify-center px-8"
          >
            <div className="space-y-4">
              <div className="font-mono text-xs text-cyan-400 tracking-widest mb-4">
                // SYSTEM NAVIGATION
              </div>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="flex items-baseline gap-3 text-2xl font-bold font-display text-slate-200 hover:text-cyan-400 transition-colors py-2 border-b border-slate-800/80"
                  >
                    <span className="font-mono text-sm text-cyan-400">
                      {link.index}
                    </span>
                    <span>{link.name}</span>
                  </a>
                </div>
              ))}

              <div className="pt-6 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#contact');
                  }}
                  className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-mono text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  LET'S CONNECT
                </a>

                {onOpenEditGuide && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEditGuide();
                    }}
                    className="w-full py-2.5 text-center rounded-xl glass-panel border border-slate-700 font-mono text-xs text-slate-300"
                  >
                    Edit Portfolio Data
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
