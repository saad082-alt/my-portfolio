import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  ArrowRight,
  Terminal
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface NavbarProps {
  onOpenEditGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEditGuide }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Interests', href: '#interests' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'py-3.5 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
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
            <div className="w-9 h-9 rounded-lg bg-[#111726] border border-slate-800 flex items-center justify-center transition-colors group-hover:border-slate-700">
              <Terminal className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-semibold text-sm sm:text-base text-white tracking-tight">
                  GHANCHI SAAD
                </span>
                <span className="font-mono text-[9px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/60">
                  JG UNIV
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                B.TECH CSE &bull; PYTHON & AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#111726]/80 border border-slate-800/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-3.5 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={() => soundFx.playHover()}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-lg bg-[#111726] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-300" />
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
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111726] border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Edit Personal Information, Internship & Projects"
              >
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
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs font-mono tracking-wider transition-all"
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
              className="lg:hidden p-2 rounded-lg bg-[#111726] border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0b0f19]/95 lg:hidden flex flex-col justify-center px-8"
          >
            <div className="space-y-4">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
                NAVIGATION
              </div>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="flex items-baseline justify-between text-xl font-bold font-display text-slate-200 hover:text-indigo-400 transition-colors py-2 border-b border-slate-800/80"
                  >
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
                  className="w-full py-3 text-center rounded-xl bg-indigo-600 font-mono text-sm font-semibold text-white"
                >
                  LET'S CONNECT
                </a>

                {onOpenEditGuide && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEditGuide();
                    }}
                    className="w-full py-2.5 text-center rounded-xl bg-[#111726] border border-slate-800 font-mono text-xs text-slate-300"
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
