// Sound effects using Web Audio API
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      console.warn('Web Audio API not supported');
      return null;
    }
  }
  return audioContext;
};

type SoundType = 'type' | 'enter' | 'error' | 'success' | 'boot';

const soundConfigs: Record<SoundType, { frequency: number; duration: number; type: OscillatorType; volume: number }> = {
  type: { frequency: 800, duration: 0.03, type: 'square', volume: 0.05 },
  enter: { frequency: 600, duration: 0.08, type: 'sine', volume: 0.1 },
  error: { frequency: 200, duration: 0.15, type: 'sawtooth', volume: 0.1 },
  success: { frequency: 1000, duration: 0.1, type: 'sine', volume: 0.08 },
  boot: { frequency: 440, duration: 0.2, type: 'sine', volume: 0.1 },
};

export const playSound = (type: SoundType): void => {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const config = soundConfigs[type];
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.frequency, ctx.currentTime);

  // Envelope for smoother sound
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(config.volume, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + config.duration);
};

// Play a sequence of beeps for boot sound
export const playBootSound = (): void => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [440, 554, 659, 880];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    }, i * 100);
  });
};

// Backspace sound - subtle lower pitch
export const playBackspaceSound = (): void => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(300, ctx.currentTime);

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.005);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.02);
};

// Typing sound with slight variation for natural feel
export const playTypeSound = (): void => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Slight frequency variation for natural typing feel
  const baseFreq = 600 + Math.random() * 400;
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.005);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.025);
};
