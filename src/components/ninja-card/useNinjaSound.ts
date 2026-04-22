import { useEffect, useCallback, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useSound } from '../SoundProvider';

const levelUpAsset = '/assets/audio/naruto-jutsu-sound.mp3';
const lightningAsset = '/assets/audio/chidori.mp3';
const waterAsset = '/assets/audio/tra.mp3'; 
const handSignsAsset = '/assets/audio/naruto-hand-signs.mp3';
const teleportAsset = '/assets/audio/teleport-sasuke.mp3';
const sasukeAsset = '/assets/audio/saaaske.mp3';
const katonAsset = '/assets/audio/katon.mp3';

export const useNinjaSound = () => {
  const { isMuted } = useSound();
  const levelUpSound = useRef<Howl | null>(null);
  const hoverSound = useRef<Howl | null>(null);
  const sharinganSound = useRef<Howl | null>(null);
  const lightningSound = useRef<Howl | null>(null);
  const waterSound = useRef<Howl | null>(null);
  const handSignsSound = useRef<Howl | null>(null);
  const teleportSound = useRef<Howl | null>(null);
  const sasukeSound = useRef<Howl | null>(null);
  const katonSound = useRef<Howl | null>(null);

  // Synth fallback for reliability
  const playSynthSparks = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      
      const count = 5;
      for (let i = 0; i < count; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(Math.random() * 2000 + 500, ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.02);
      }
    } catch (e) {
      console.error("Synth error:", e);
    }
  }, [isMuted]);

  const playSynthWave = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.error("Synth error:", e);
    }
  }, [isMuted]);

  useEffect(() => {
    const createSound = (src: string, volume: number, loop = false) => {
      return new Howl({
        src: [src],
        volume,
        loop,
        html5: false,
        preload: true,
        onloaderror: () => console.warn(`Sound load failed for ${src}. Will use synth fallback.`),
        onplayerror: (id) => {
          console.warn(`Sound play failed for ${id}.`);
          Howler.unload();
        }
      });
    };

    levelUpSound.current = createSound(levelUpAsset, 0.4);
    hoverSound.current = createSound('https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3', 0.15);
    sharinganSound.current = createSound('https://assets.mixkit.co/sfx/preview/mixkit-deep-ambient-hum-2144.mp3', 0.2, true);
    lightningSound.current = createSound(lightningAsset, 0.7);
    waterSound.current = createSound(waterAsset, 0.6);
    handSignsSound.current = createSound(handSignsAsset, 0.6);
    teleportSound.current = createSound(teleportAsset, 0.6);
    sasukeSound.current = createSound(sasukeAsset, 0.7);
    katonSound.current = createSound(katonAsset, 0.7);

    return () => {
      levelUpSound.current?.unload();
      hoverSound.current?.unload();
      sharinganSound.current?.unload();
      lightningSound.current?.unload();
      waterSound.current?.unload();
      handSignsSound.current?.unload();
      teleportSound.current?.unload();
      sasukeSound.current?.unload();
      katonSound.current?.unload();
    };
  }, []);

  const ensureAudioUnlocked = useCallback(() => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume().catch(e => console.error("Could not resume audio context:", e));
    }
  }, []);

  const playLevelUp = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      levelUpSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  const playHover = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      hoverSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  const playSharingan = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      sharinganSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  const stopSharingan = useCallback(() => {
    sharinganSound.current?.stop();
  }, []);

  const playLightning = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      playSynthSparks(); // Play synth as immediate feedback or fallback
      if (lightningSound.current?.state() === 'loaded') {
        lightningSound.current.play();
      }
    }
  }, [isMuted, ensureAudioUnlocked, playSynthSparks]);

  const playWater = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      playSynthWave(); // Play synth as immediate feedback or fallback
      if (waterSound.current?.state() === 'loaded') {
        waterSound.current.play();
      }
    }
  }, [isMuted, ensureAudioUnlocked, playSynthWave]);

  const playHandSigns = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      handSignsSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  const playTeleport = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      teleportSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  const playSasuke = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      sasukeSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  const playKaton = useCallback(() => {
    if (!isMuted) {
      ensureAudioUnlocked();
      katonSound.current?.play();
    }
  }, [isMuted, ensureAudioUnlocked]);

  return { 
    playLevelUp, 
    playHover, 
    playSharingan, 
    stopSharingan, 
    playLightning, 
    playWater,
    playHandSigns,
    playTeleport,
    playSasuke,
    playKaton
  };
};
