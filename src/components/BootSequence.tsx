'use client';

import { useState, useEffect, useRef } from 'react';
import { playSound } from '@/utils/sounds';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'BIOS v2.4.1 - Initializing...', delay: 80 },
  { text: 'Memory: 16384 MB OK', delay: 60 },
  { text: '  > CPU: Neural Processing Unit v4.0', delay: 50 },
  { text: '  > Network: Secure Channel', delay: 50 },
  { text: '', delay: 30 },
  { text: 'Loading modules...', delay: 80 },
  { text: '  [OK] crypto-shield.ko', delay: 40 },
  { text: '  [OK] firewall-enhanced.ko', delay: 40 },
  { text: '  [OK] secure-terminal.ko', delay: 40 },
  { text: '', delay: 30 },
  { text: 'Establishing secure connection...', delay: 120 },
  { text: 'Authentication: VERIFIED', delay: 100 },
  { text: '', delay: 50 },
  { text: '╔════════════════════════════════════════╗', delay: 40 },
  { text: '║     MUHAMMAD BILAL - TERMINAL v1.0     ║', delay: 60 },
  { text: '║      SWE | Cybersecurity Enthusiast    ║', delay: 60 },
  { text: '╚════════════════════════════════════════╝', delay: 40 },
  { text: '', delay: 50 },
  { text: 'System ready. Welcome, visitor.', delay: 100 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= bootMessages.length) {
      // Boot complete
      setTimeout(() => {
        playSound('boot');
        onComplete();
      }, 300);
      return;
    }

    const message = bootMessages[currentIndex];
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, message.text]);
      setCurrentIndex((prev) => prev + 1);
      setProgress(((currentIndex + 1) / bootMessages.length) * 100);

      // Play typing sound for non-empty lines
      if (message.text.trim()) {
        playSound('type');
      }

      // Auto-scroll
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, message.delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, onComplete]);

  return (
    <div className="min-h-screen bg-terminal-black p-4 md:p-8 flex flex-col">
      {/* Header */}
      <div className="text-terminal-green text-sm mb-4 text-glow">
        {'>'} SYSTEM BOOT SEQUENCE
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="progress-bar w-full max-w-md">
          <div
            className="progress-bar-fill transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-terminal-green-dim text-xs mt-1">
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Boot Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto font-mono text-sm md:text-base"
      >
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`boot-line ${
              line.includes('[OK]')
                ? 'text-terminal-green'
                : line.includes('VERIFIED')
                ? 'text-terminal-green text-glow'
                : line.includes('====')
                ? 'text-terminal-cyan'
                : 'text-terminal-green-dim'
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {line || '\u00A0'}
          </div>
        ))}

        {/* Blinking cursor at end */}
        {currentIndex < bootMessages.length && (
          <span className="cursor" />
        )}
      </div>

      {/* Skip hint */}
      <div className="mt-4 text-terminal-green-dim text-xs opacity-50">
        Press any key to skip...
      </div>

      {/* Skip on keypress */}
      <SkipHandler onSkip={onComplete} />
    </div>
  );
}

function SkipHandler({ onSkip }: { onSkip: () => void }) {
  useEffect(() => {
    const handleKeyPress = () => {
      playSound('enter');
      onSkip();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onSkip]);

  return null;
}
