import React, { useState } from 'react';
import { CyberBackground } from './components/3d/CyberBackground';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { TechStack } from './components/sections/TechStack';
import { CareerInterests } from './components/sections/CareerInterests';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Journey } from './components/sections/Journey';
import { Contact } from './components/sections/Contact';
import { EditGuideModal } from './components/modals/EditGuideModal';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isEditGuideOpen, setIsEditGuideOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#06060c] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. Animated Preloader / System Initialization */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* 2. Mature Neural Constellation Background */}
      <CyberBackground />

      {/* 3. Refined Atmospheric Deep Studio Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-b from-indigo-600/8 via-purple-900/5 to-transparent rounded-full blur-[150px] pointer-events-none z-[1]" />
      <div className="fixed bottom-10 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-cyan-600/8 via-blue-900/5 to-transparent rounded-full blur-[140px] pointer-events-none z-[1]" />

      {/* 4. Global Subtle Architectural Grid Overlay */}
      <div className="fixed inset-0 bg-cyber-grid opacity-8 pointer-events-none z-[2]" />

      {/* 5. Main Application Layout */}
      <div className="relative z-10 flex flex-col">
        {/* Floating Futuristic HUD Navbar */}
        <Navbar onOpenEditGuide={() => setIsEditGuideOpen(true)} />

        {/* Core Portfolio Sections */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />

          {/* About Me */}
          <About />

          {/* Tech Stack */}
          <TechStack />

          {/* Career Interests */}
          <CareerInterests />

          {/* Projects Showcase */}
          <Projects />

          {/* Professional Experience & Education */}
          <Experience onOpenEditGuide={() => setIsEditGuideOpen(true)} />

          {/* Futuristic Journey Timeline */}
          <Journey />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Configuration & Edit Guide Modal */}
      <EditGuideModal
        isOpen={isEditGuideOpen}
        onClose={() => setIsEditGuideOpen(false)}
      />
    </div>
  );
};

export default App;
