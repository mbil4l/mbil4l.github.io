"use client";

import { useState, useEffect, useCallback } from "react";
import { portfolioData } from "@/data/portfolio";

const phrases = [
  "SOFTWARE ENGINEER",
  "CYBER SECURITY ENTHUSIAST",
  "FULL STACK DEV",
  "PROBLEM SOLVER",
  "ARTIFICIAL INTELLIGENCE",
  "VIBECODING",
  "ASK ME ANYTHING",
  "OPEN SOURCE",
  "FAVORITE DISTRO: KALI",
  "CURRENTLY @ AULTMAN",
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function AsciiHeader() {
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrambleText = useCallback((targetText: string) => {
    setIsScrambling(true);
    let iterations = 0;
    const maxIterations = targetText.length * 3;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations / 3) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      if (!isScrambling) {
        const nextIndex = (phraseIndex + 1) % phrases.length;
        setPhraseIndex(nextIndex);
        scrambleText(phrases[nextIndex]);
      }
    }, 3000);

    return () => clearInterval(cycleInterval);
  }, [phraseIndex, isScrambling, scrambleText]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const asciiArt = [
    "██████╗ ██╗██╗       █████╗ ██╗     ",
    "██╔══██╗██║██║      ██╔══██╗██║     ",
    "██████╔╝██║██║      ███████║██║     ",
    "██╔══██╗██║██║      ██╔══██║██║     ",
    "██████╔╝██║███████╗ ██║  ██║███████╗",
    "╚═════╝ ╚═╝╚══════╝ ╚═╝  ╚═╝╚══════╝",
  ].join("\n");

  return (
    <div className="mb-6 md:mb-8 overflow-hidden">
      {/* Social Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleCopyEmail}
          className="group relative px-4 py-2 bg-terminal-dark border border-terminal-green/50 rounded
                     hover:border-terminal-green hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]
                     transition-all duration-300 flex items-center gap-2"
          onMouseEnter={() => setShowEmail(true)}
          onMouseLeave={() => setShowEmail(false)}
        >
          <span className="text-terminal-green text-sm font-mono group-hover:text-glow">
            {copied
              ? "[✓] COPIED!"
              : showEmail
              ? portfolioData.contact.email
              : "[>] EMAIL"}
          </span>
          <div className="absolute inset-0 bg-terminal-green/5 rounded opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <a
          href={
            portfolioData.social.find((s) => s.name === "LinkedIn")?.url || "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-4 py-2 bg-terminal-dark border border-terminal-green/50 rounded
                     hover:border-terminal-green hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]
                     transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-terminal-green text-sm font-mono group-hover:text-glow">
            [&gt;] LINKEDIN
          </span>
          <div className="absolute inset-0 bg-terminal-green/5 rounded opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* ASCII Art */}
      <pre className="ascii-art text-center text-terminal-green animate-pulse-glow select-none">
        {asciiArt}
      </pre>

      {/* Scramble Text */}
      <div className="text-center mt-4">
        <div
          className="text-terminal-cyan text-xl md:text-2xl font-bold tracking-widest text-glow-intense"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {">"} {displayText}_
        </div>
        <div className="text-terminal-green-dim text-sm mt-2">
          <span className="text-glow">[ Interactive CLI Portfolio ]</span>
        </div>
      </div>
    </div>
  );
}
