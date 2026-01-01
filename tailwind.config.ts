import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: '#0a0a0a',
          dark: '#0d1117',
          gray: '#1a1f26',
          border: '#30363d',
          green: '#00ff41',
          'green-dim': '#00cc33',
          'green-glow': '#00ff41',
          cyan: '#00d4ff',
          amber: '#ffb000',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'typing': 'typing 0.5s steps(1) infinite',
        'boot-line': 'boot-line 0.5s ease-out forwards',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41',
            opacity: '1',
          },
          '50%': {
            textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
            opacity: '0.8',
          },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.98' },
        },
        'typing': {
          '50%': { borderColor: 'transparent' },
        },
        'boot-line': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, inset 0 0 5px rgba(0, 255, 65, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, inset 0 0 10px rgba(0, 255, 65, 0.2)',
          },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'terminal': '0 0 10px rgba(0, 255, 65, 0.3), inset 0 0 60px rgba(0, 255, 65, 0.05)',
        'card': '0 0 20px rgba(0, 255, 65, 0.2), 0 0 40px rgba(0, 255, 65, 0.1)',
        'card-hover': '0 0 30px rgba(0, 255, 65, 0.4), 0 0 60px rgba(0, 255, 65, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
