import { useState, useRef, useEffect, useCallback } from 'react';
import { useSound } from '../SoundProvider';
import waterDragonAsset from '@/assets/sounds/WATER-dragon-jutsu.mp3';

export interface UseWaterDragonJutsuOptions {
  volume?: number;
  onCastStart?: () => void;
  onCastEnd?: () => void;
}

export interface UseWaterDragonJutsuReturn {
  isCasting: boolean;
  isPlaying: boolean;
  castProgress: number; // 0 to 1
  castId: number; // Increments on each trigger to enforce frame-zero key resets
  playJutsu: (forceRestart?: boolean) => void;
  stopJutsu: () => void;
  duration: number; // Audio duration in seconds
}

export const useWaterDragonJutsu = (
  options: UseWaterDragonJutsuOptions = {}
): UseWaterDragonJutsuReturn => {
  const { volume = 0.85, onCastStart, onCastEnd } = options;
  const { isMuted } = useSound();

  // State flags strictly synchronized with HTML5 Audio lifecycle
  const [isCasting, setIsCasting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [castProgress, setCastProgress] = useState(0);
  const [castId, setCastId] = useState(0);
  const [duration, setDuration] = useState(5.17);

  // Persistent audio and callback references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onCastStartRef = useRef(onCastStart);
  const onCastEndRef = useRef(onCastEnd);
  const isMutedRef = useRef(isMuted);
  const volumeRef = useRef(volume);
  const lastTriggerTimeRef = useRef(0);

  // Keep callback and volume references up-to-date
  useEffect(() => {
    onCastStartRef.current = onCastStart;
    onCastEndRef.current = onCastEnd;
  }, [onCastStart, onCastEnd]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Clean stop function: pauses playback, resets currentTime to 0, and clears casting state immediately
  const stopJutsu = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.onended = null;
        audio.ontimeupdate = null;
        audio.onerror = null;
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        console.warn('[WaterDragonJutsu] Error stopping audio:', e);
      }
    }
    setIsPlaying(false);
    setIsCasting(false);
    setCastProgress(0);
    onCastEndRef.current?.();
  }, []);

  // Main invocation method strictly tied to HTML5 Audio events
  const playJutsu = useCallback(
    (forceRestart = true) => {
      const now = Date.now();
      // Debounce window (100ms) to ignore accidental micro double-clicks
      if (now - lastTriggerTimeRef.current < 100) {
        return;
      }
      lastTriggerTimeRef.current = now;

      // Lazily create or retrieve single HTML5 Audio instance
      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio(waterDragonAsset);
        audio.preload = 'auto';
        audioRef.current = audio;
      }

      // Reset any active playback
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        console.warn('[WaterDragonJutsu] Reset before play error:', e);
      }

      // Sync current volume & mute settings
      audio.muted = isMutedRef.current;
      audio.volume = isMutedRef.current ? 0 : volumeRef.current;

      // Atomic end handler to ensure visuals terminate the instant the sound stops
      const handleEnded = () => {
        setIsPlaying(false);
        setIsCasting(false);
        setCastProgress(0);
        onCastEndRef.current?.();
      };

      // Direct binding to HTML5 Audio lifecycle events
      audio.onended = handleEnded;
      audio.onerror = (e) => {
        console.warn('[WaterDragonJutsu] Audio error encountered:', e);
        handleEnded();
      };

      audio.ontimeupdate = () => {
        if (audio.duration && audio.duration > 0) {
          const progress = Math.min(1, Math.max(0, audio.currentTime / audio.duration));
          setCastProgress(progress);
          // Safeguard: if currentTime reaches or exceeds duration, trigger immediate end
          if (audio.currentTime >= audio.duration - 0.05) {
            handleEnded();
          }
        }
      };

      // Increment castId to reset and remount visual keyframes from frame 0
      setCastId((prev) => prev + 1);

      // Execute playback and handle Promise
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (audio.duration && !isNaN(audio.duration)) {
              setDuration(audio.duration);
            }
            setIsCasting(true);
            setIsPlaying(true);
            onCastStartRef.current?.();
          })
          .catch((error: unknown) => {
            console.warn('[WaterDragonJutsu] Playback prevented by browser policy:', error);
            // In case audio is completely blocked, gracefully fail and ensure state is false
            handleEnded();
          });
      }
    },
    []
  );

  // Component unmount cleanup to avoid memory leaks or orphaned audio playback
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.onended = null;
        audio.ontimeupdate = null;
        audio.onerror = null;
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.src = '';
        } catch {
          // ignore
        }
        audioRef.current = null;
      }
      setIsCasting(false);
      setIsPlaying(false);
    };
  }, []);

  return {
    isCasting,
    isPlaying,
    castProgress,
    castId,
    playJutsu,
    stopJutsu,
    duration,
  };
};
