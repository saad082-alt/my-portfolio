import React, { useRef, useState } from 'react';
import { soundFx } from '../../utils/audio';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  onClick?: () => void;
}

export const ProjectCard3D: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 240, 255, 0.4)',
  intensity = 15,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      className={`relative transform-gpu will-change-transform ${className}`}
    >
      {/* Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18), transparent 60%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* Dynamic Glow Aura */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300 z-[-1] blur-md"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 70%)`,
          opacity: glarePos.opacity ? 1 : 0,
        }}
      />

      {children}
    </div>
  );
};
