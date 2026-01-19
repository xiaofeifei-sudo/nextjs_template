'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useSound 的配置项
 */
export interface UseSoundOptions {
  /** 音量级别（0-1），默认：1 */
  volume?: number;
  /** 是否循环播放，默认：false */
  loop?: boolean;
  /** 播放速率（0.5-4），默认：1 */
  playbackRate?: number;
  /** 是否预加载音频，默认：true */
  preload?: boolean;
  /** 播放结束回调 */
  onEnd?: () => void;
  /** 开始播放回调 */
  onPlay?: () => void;
  /** 异常回调 */
  onError?: (error: Error) => void;
}

/**
 * useSound 的返回类型
 */
export interface UseSoundReturn {
  /** 播放音频 */
  play: () => void;
  /** 停止播放 */
  stop: () => void;
  /** 暂停播放 */
  pause: () => void;
  /** 继续播放已暂停的音频 */
  resume: () => void;
  /** 当前是否正在播放 */
  isPlaying: boolean;
  /** 当前播放时间（秒） */
  currentTime: number;
  /** 总时长（秒） */
  duration: number;
  /** 设置音量（0-1） */
  setVolume: (volume: number) => void;
  /** 设置播放速率（0.5-4） */
  setPlaybackRate: (rate: number) => void;
}

/**
 * 播放音频的 React Hook
 * 
 * @param src - 音频文件路径
 * @param options - 声音配置项
 * @returns 播放控制与状态
 * 
 * @example
 * ```tsx
 * function Button() {
 *   const { play } = useSound('/sounds/click.mp3', { volume: 0.5 });
 *   
 *   return <button onClick={play}>Click me</button>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * function MusicPlayer() {
 *   const { play, pause, isPlaying, duration, currentTime } = useSound('/music.mp3', {
 *     loop: true,
 *     onEnd: () => console.log('歌曲播放结束')
 *   });
 *   
 *   return (
 *     <div>
 *       <button onClick={isPlaying ? pause : play}>
 *         {isPlaying ? '暂停' : '播放'}
 *       </button>
 *       <span>{currentTime} / {duration}</span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSound(src: string, options: UseSoundOptions = {}): UseSoundReturn {
  const {
    volume = 1,
    loop = false,
    playbackRate = 1,
    preload = true,
    onEnd,
    onPlay,
    onError,
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 初始化音频元素
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio(src);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.loop = loop;
    audio.playbackRate = playbackRate;
    audio.preload = preload ? 'auto' : 'none';

    // 事件处理函数
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onEnd?.();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsPlaying(false);
      onError?.(new Error(`Failed to load audio: ${src}`));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current = null;
    };
  }, [src, loop, preload]); // 注意：不包含回调，避免重复创建音频实例

  // 当配置变化时更新音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, [volume]);

  // 当配置变化时更新播放速率
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    
    // 如果已播放到结尾则重置到开头
    if (audioRef.current.ended) {
      audioRef.current.currentTime = 0;
    }
    
    audioRef.current.play().catch((error) => {
      console.warn('音频播放失败:', error);
    });
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const resume = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
  }, []);

  const setPlaybackRateCallback = useCallback((rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = Math.max(0.5, Math.min(4, rate));
  }, []);

  return {
    play,
    stop,
    pause,
    resume,
    isPlaying,
    currentTime,
    duration,
    setVolume,
    setPlaybackRate: setPlaybackRateCallback,
  };
}

/**
 * 简化 Hook，用于快速生成悬停/点击音效
 * 使用 Web Audio API，无需音频文件
 * 
 * @example
 * ```tsx
 * function Button() {
 *   const { playHover, playClick } = useSoundEffects();
 *   
 *   return (
 *     <button 
 *       onMouseEnter={playHover}
 *       onClick={playClick}
 *     >
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
export function useSoundEffects(volume: number = 0.3) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(true);

  const getContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playHover = useCallback(() => {
    if (!enabled) return;
    
    const ctx = getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);

    gainNode.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  }, [enabled, getContext, volume]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    
    const ctx = getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }, [enabled, getContext, volume]);

  const playSuccess = useCallback(() => {
    if (!enabled) return;
    
    const ctx = getContext();
    if (!ctx) return;

    [0, 0.1].forEach((delay, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const freq = i === 0 ? 523.25 : 659.25;
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gainNode.gain.setValueAtTime(volume, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.15);

      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.15);
    });
  }, [enabled, getContext, volume]);

  return {
    playHover,
    playClick,
    playSuccess,
    enabled,
    setEnabled,
  };
}

export default useSound;
