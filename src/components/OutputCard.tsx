'use client';

import { ReactNode } from 'react';

interface OutputCardProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export default function OutputCard({ children, variant = 'default' }: OutputCardProps) {
  const variantStyles = {
    default: 'border-terminal-green/30',
    success: 'border-green-500/50',
    warning: 'border-amber-500/50',
    info: 'border-cyan-500/50',
  };

  return (
    <div
      className={`
        mt-3 p-4 md:p-5
        bg-gradient-to-br from-terminal-dark/90 to-terminal-gray/80
        border ${variantStyles[variant]}
        rounded-lg
        shadow-card
        hover:shadow-card-hover
        transition-all duration-300
        backdrop-blur-sm
        relative
        overflow-hidden
        animate-slide-up
      `}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terminal-green/50 to-transparent" />

      {/* Left accent line */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-terminal-green/50 via-terminal-green/20 to-transparent" />

      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-4 h-4">
        <div className="absolute top-0 left-0 w-full h-px bg-terminal-green/50" />
        <div className="absolute top-0 left-0 h-full w-px bg-terminal-green/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-terminal-green font-mono text-sm md:text-base leading-relaxed">
        {children}
      </div>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-full h-px bg-terminal-green/30" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-terminal-green/30" />
      </div>
    </div>
  );
}
