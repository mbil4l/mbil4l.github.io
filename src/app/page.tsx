'use client';

import { useState } from 'react';
import Terminal from '@/components/Terminal';
import BootSequence from '@/components/BootSequence';

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
    setTimeout(() => setShowTerminal(true), 300);
  };

  return (
    <div className="min-h-screen bg-terminal-black">
      {!isBooted ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div
          className={`transition-opacity duration-500 ${
            showTerminal ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Terminal />
        </div>
      )}
    </div>
  );
}
