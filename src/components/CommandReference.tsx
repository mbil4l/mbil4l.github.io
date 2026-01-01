"use client";

import { useEffect, useState } from "react";

interface CommandReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

const commandCategories = [
  {
    name: "Portfolio",
    commands: [
      { cmd: "about", desc: "Learn about me" },
      { cmd: "skills", desc: "Technical skills" },
      { cmd: "projects", desc: "My projects" },
      { cmd: "resume", desc: "Experience & education" },
      { cmd: "contact", desc: "Contact info" },
      { cmd: "social", desc: "Social links" },
    ],
  },
  {
    name: "Files",
    commands: [
      { cmd: "ls", desc: "List files" },
      { cmd: "cat", desc: "Read file" },
      { cmd: "pwd", desc: "Current directory" },
      { cmd: "cd", desc: "Change directory" },
      { cmd: "mkdir", desc: "Create directory" },
      { cmd: "touch", desc: "Create file" },
      { cmd: "rm", desc: "Remove file" },
      { cmd: "cp", desc: "Copy file" },
      { cmd: "mv", desc: "Move file" },
    ],
  },
  {
    name: "Search",
    commands: [
      { cmd: "grep", desc: "Search pattern" },
      { cmd: "find", desc: "Find files" },
      { cmd: "head", desc: "File start" },
      { cmd: "tail", desc: "File end" },
      { cmd: "wc", desc: "Word count" },
    ],
  },
  {
    name: "System",
    commands: [
      { cmd: "whoami", desc: "Current user" },
      { cmd: "uname", desc: "System info" },
      { cmd: "date", desc: "Current date" },
      { cmd: "uptime", desc: "System uptime" },
      { cmd: "ps", desc: "Processes" },
      { cmd: "top", desc: "System monitor" },
      { cmd: "df", desc: "Disk space" },
      { cmd: "free", desc: "Memory usage" },
    ],
  },
  {
    name: "Network",
    commands: [
      { cmd: "ifconfig", desc: "Network config" },
      { cmd: "ping", desc: "Ping host" },
      { cmd: "curl", desc: "Fetch URL" },
      { cmd: "wget", desc: "Download file" },
    ],
  },
  {
    name: "Shell",
    commands: [
      { cmd: "echo", desc: "Print text" },
      { cmd: "clear", desc: "Clear screen" },
      { cmd: "history", desc: "Command history" },
      { cmd: "env", desc: "Environment vars" },
      { cmd: "man", desc: "Manual page" },
      { cmd: "exit", desc: "Exit terminal" },
    ],
  },
  {
    name: "Easter Eggs",
    commands: [
      { cmd: "neofetch", desc: "System info art" },
      { cmd: "matrix", desc: "Matrix quote" },
      { cmd: "hack", desc: "Hack animation" },
      { cmd: "sudo", desc: "Try sudo" },
      { cmd: "sl", desc: "Steam locomotive" },
    ],
  },
];

export default function CommandReference({ isOpen, onClose }: CommandReferenceProps) {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (isOpen) {
      setCountdown(15);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Close on any key press (with delay to ignore the Enter that opened it)
      const handleKeyDown = () => {
        clearInterval(timer);
        onClose();
      };
      const keyTimeout = setTimeout(() => {
        window.addEventListener('keydown', handleKeyDown);
      }, 100);

      return () => {
        clearInterval(timer);
        clearTimeout(keyTimeout);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-terminal-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

      {/* Content */}
      <div
        className="relative w-full max-w-6xl max-h-[90vh] m-4 p-6 md:p-8 overflow-y-auto
                   bg-terminal-dark/90 border border-terminal-green/50 rounded-lg
                   shadow-[0_0_50px_rgba(0,255,65,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-terminal-green text-2xl font-bold text-glow">
              [?] COMMAND REFERENCE
            </h2>
            <span className="text-terminal-cyan text-sm font-mono">
              v1.0.0
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-amber-400 text-sm font-mono">
              Press any key to close ({countdown}s)
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1 text-terminal-green border border-terminal-green/50 rounded
                       hover:bg-terminal-green/10 hover:border-terminal-green transition-all"
            >
              [ESC] Close
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-terminal-gray rounded mb-6 overflow-hidden">
          <div
            className="h-full bg-terminal-green transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 15) * 100}%` }}
          />
        </div>

        {/* Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {commandCategories.map((category) => (
            <div
              key={category.name}
              className="p-4 bg-terminal-black/50 border border-terminal-green/20 rounded-lg
                       hover:border-terminal-green/40 transition-all"
            >
              <h3 className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-terminal-green">&gt;</span>
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.commands.map((item) => (
                  <div
                    key={item.cmd}
                    className="flex items-center justify-between text-sm group"
                  >
                    <span className="text-terminal-cyan font-mono group-hover:text-glow transition-all">
                      {item.cmd}
                    </span>
                    <span className="text-terminal-green-dim text-xs">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tips */}
        <div className="mt-6 pt-4 border-t border-terminal-green/20 flex flex-wrap gap-4 text-xs text-terminal-green-dim">
          <span>
            <span className="text-amber-400">Tab</span> Autocomplete
          </span>
          <span>
            <span className="text-amber-400">↑↓</span> History
          </span>
          <span>
            <span className="text-amber-400">Ctrl+L</span> Clear
          </span>
          <span>
            <span className="text-amber-400">?</span> This panel
          </span>
          <span>
            <span className="text-amber-400">Click anywhere</span> to close
          </span>
        </div>
      </div>
    </div>
  );
}
