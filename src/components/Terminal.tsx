'use client';

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import { processCommand } from '@/utils/commands';
import { playSound, playTypeSound, playBackspaceSound } from '@/utils/sounds';
import OutputCard from './OutputCard';
import AsciiHeader from './AsciiHeader';
import CommandReference from './CommandReference';

interface HistoryItem {
  id: number;
  type: 'command' | 'output' | 'error' | 'ascii';
  content: string | React.ReactNode;
  command?: string;
}

interface Position {
  x: number;
  y: number;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandRefOpen, setCommandRefOpen] = useState(false);

  // Draggable state
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.terminal-header-drag')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const addToHistory = (item: Omit<HistoryItem, 'id'>) => {
    idCounter.current += 1;
    setHistory((prev) => [...prev, { ...item, id: idCounter.current }]);
  };

  const handleCommandRefClose = useCallback(() => {
    setCommandRefOpen(false);
  }, []);

  const handleSubmit = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    // Handle "?" command specially
    if (trimmedInput === '?') {
      playSound('enter');
      setCommandRefOpen(true);
      setInput('');
      addToHistory({
        type: 'command',
        content: '?',
        command: '?',
      });
      addToHistory({
        type: 'output',
        content: <div className="text-terminal-green-dim">Opening command reference... (press any key to close)</div>,
      });
      return;
    }

    playSound('enter');

    // Add command to history
    addToHistory({
      type: 'command',
      content: trimmedInput,
      command: trimmedInput,
    });

    // Add to command history for up/down navigation
    setCommandHistory((prev) => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Process command
    const result = processCommand(trimmedInput);

    if (result.clear) {
      setHistory([]);
    } else if (result.output) {
      addToHistory({
        type: result.isError ? 'error' : 'output',
        content: result.output,
      });

      playSound(result.isError ? 'error' : 'success');
    }

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion with all commands
      const commands = [
        // Portfolio
        'help', 'about', 'skills', 'projects', 'resume', 'contact', 'social',
        // Filesystem
        'ls', 'cat', 'pwd', 'cd', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'chmod', 'chown',
        // Search
        'grep', 'find', 'head', 'tail', 'wc', 'cut',
        // System
        'whoami', 'uname', 'date', 'uptime', 'ps', 'top', 'kill', 'df', 'du', 'free',
        // Network
        'ifconfig', 'ping', 'curl', 'wget', 'ssh',
        // Shell
        'echo', 'clear', 'history', 'alias', 'export', 'env', 'man', 'exit',
        // Fun
        'sudo', 'apt', 'neofetch', 'matrix', 'hack', 'vim', 'nano', 'sl', 'reboot'
      ];
      const match = commands.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
        playSound('type');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      playSound('success');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > input.length) {
      playTypeSound();
    } else if (newValue.length < input.length) {
      playBackspaceSound();
    }
    setInput(newValue);
  };

  // Reset position
  const handleResetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="min-h-screen bg-terminal-black p-4 md:p-6 lg:p-8 flex flex-col"
      onClick={handleTerminalClick}
    >
      {/* ASCII Header */}
      <AsciiHeader />

      {/* Terminal Container - Draggable */}
      <div
        ref={terminalContainerRef}
        className="terminal-card flex-1 flex flex-col max-w-5xl mx-auto w-full relative"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'auto',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Terminal Header Bar - Draggable Area */}
        <div className="terminal-header-drag flex items-center gap-2 px-4 py-3 border-b border-terminal-border bg-terminal-gray/50 cursor-grab active:cursor-grabbing select-none">
          <div className="flex gap-2">
            <div
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setHistory([]);
              }}
              title="Clear terminal"
            />
            <div
              className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleResetPosition();
              }}
              title="Reset position"
            />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center text-terminal-green-dim text-sm">
            mbilal@portfolio:~ {position.x !== 0 || position.y !== 0 ? '(drag to move)' : ''}
          </div>
          <div className="text-terminal-green-dim text-xs">
            bash
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 p-4 md:p-6 overflow-y-auto min-h-[60vh] max-h-[70vh]"
        >
          {/* Welcome message */}
          {history.length === 0 && (
            <div className="text-terminal-green-dim mb-4">
              <p>Welcome to the Terminal Portfolio!</p>
              <p className="mt-2">
                Type <span className="text-terminal-cyan font-bold">help</span> to see commands, or <span className="text-terminal-cyan font-bold">?</span> for quick reference.
              </p>
            </div>
          )}

          {/* History */}
          {history.map((item) => (
            <div key={item.id} className="mb-4 animate-slide-up">
              {item.type === 'command' && (
                <div className="flex items-center gap-2 text-terminal-green">
                  <span className="text-terminal-cyan">$</span>
                  <span>{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <OutputCard>{item.content}</OutputCard>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 mt-2">
                  {item.content}
                </div>
              )}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center gap-2 text-terminal-green">
            <span className="text-terminal-cyan">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              placeholder="Type a command... (? for help)"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            <span className="cursor" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-terminal-border text-terminal-green-dim text-xs flex justify-between">
          <span>Tab: autocomplete | ↑↓: history | ?: commands</span>
          <span className="hidden md:inline">Drag header to move window</span>
        </div>
      </div>

      {/* Command Reference */}
      <CommandReference isOpen={commandRefOpen} onClose={handleCommandRefClose} />
    </div>
  );
}
