import React, { useState } from 'react';
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
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-600/30 selection:text-indigo-200">
      {/* Preloader */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Main Application Layout */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
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

          {/* Journey Timeline */}
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
