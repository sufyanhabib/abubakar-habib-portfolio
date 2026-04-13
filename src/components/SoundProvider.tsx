import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playThemeSound: (targetTheme: "light" | "dark") => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Base64 encoded subtle UI sounds to avoid external asset loading issues
// Click: A soft, high-frequency "tink"
const CLICK_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="; // Placeholder, will use a real short synth tick
// Hover: A very soft, low-pass filtered "pop"
const HOVER_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="; 

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-muted') === 'true';
    }
    return false;
  });

  const audioContext = useRef<AudioContext | null>(null);
  const clickBuffer = useRef<AudioBuffer | null>(null);
  const hoverBuffer = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // Initialize AudioContext lazily
    const initAudio = async () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Preload/Decode sounds
      // For production, these would be small .mp3 or .wav files in /public/sounds/
      // Using a generated synth sound for this implementation to ensure it works immediately
      clickBuffer.current = createSynthBuffer(audioContext.current, 800, 0.1);
      hoverBuffer.current = createSynthBuffer(audioContext.current, 400, 0.05);
    };

    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  const createSynthBuffer = (ctx: AudioContext, freq: number, duration: number) => {
    const sampleRate = ctx.sampleRate;
    const frameCount = sampleRate * duration;
    const buffer = ctx.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i++) {
      // Simple sine wave with exponential decay
      const t = i / sampleRate;
      const decay = Math.exp(-t * 50);
      data[i] = Math.sin(2 * Math.PI * freq * t) * decay * 0.2;
    }
    return buffer;
  };

  const playSound = (buffer: AudioBuffer | null, volume = 0.5) => {
    if (isMuted || !audioContext.current || !buffer) return;

    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }

    const source = audioContext.current.createBufferSource();
    const gainNode = audioContext.current.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = volume;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    source.start();
  };

  const playClick = () => playSound(clickBuffer.current, 0.15);
  const playHover = () => playSound(hoverBuffer.current, 0.05);

  const playThemeSound = (targetTheme: "light" | "dark") => {
    if (isMuted || !audioContext.current) return;

    try {
      const ctx = audioContext.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      
      // Brighter (higher) for light mode, deeper (lower) for dark mode
      const startFreq = targetTheme === "light" ? 1200 : 800;
      const endFreq = targetTheme === "light" ? 400 : 200;

      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const newState = !prev;
      localStorage.setItem('portfolio-muted', String(newState));
      
      // If we just unmuted, play a confirmation sound (using the theme-like ramp for "sync")
      if (!newState && audioContext.current) {
        // Play a "power up" sound when unmuting
        const ctx = audioContext.current;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
      
      return newState;
    });
  };

  return (
    <SoundContext.Provider value={{ playClick, playHover, playThemeSound, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
