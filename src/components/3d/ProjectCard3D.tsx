import React from 'react';
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
  onClick
}) => {
  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`relative transition-all duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </div>
  );
};
