import { useEffect, useCallback, useRef } from 'react';
import { Howl } from 'howler';

export const useNinjaSound = () => {
  const levelUpSound = useRef<Howl | null>(null);
  const hoverSound = useRef<Howl | null>(null);
  const sharinganSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize sounds
    levelUpSound.current = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-magical-surprise-606.mp3'],
      volume: 0.3,
    });

    hoverSound.current = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3'],
      volume: 0.1,
    });

    sharinganSound.current = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-deep-ambient-hum-2144.mp3'],
      volume: 0.2,
      loop: true
    });

    return () => {
      levelUpSound.current?.unload();
      hoverSound.current?.unload();
      sharinganSound.current?.unload();
    };
  }, []);

  const playLevelUp = useCallback(() => {
    const isMuted = localStorage.getItem('portfolio-muted') === 'true';
    if (!isMuted) levelUpSound.current?.play();
  }, []);

  const playHover = useCallback(() => {
    const isMuted = localStorage.getItem('portfolio-muted') === 'true';
    if (!isMuted) hoverSound.current?.play();
  }, []);

  const playSharingan = useCallback(() => {
    const isMuted = localStorage.getItem('portfolio-muted') === 'true';
    if (!isMuted) sharinganSound.current?.play();
  }, []);

  const stopSharingan = useCallback(() => {
    sharinganSound.current?.stop();
  }, []);

  return { playLevelUp, playHover, playSharingan, stopSharingan };
};
