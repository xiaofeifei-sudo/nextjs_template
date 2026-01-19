/**
 * 声音工具
 * 
 * 在浏览器中播放声音的核心工具函数。
 * 支持使用 Web Audio API 合成音效，以及使用 HTMLAudioElement 播放音频文件。
 * 
 * @example
 * ```ts
 * // 播放声音文件
 * playSound('/sounds/click.mp3', 0.5);
 * 
 * // 创建并复用声音
 * const hoverSound = createSound('/sounds/hover.mp3');
 * hoverSound.play();
 * 
 * // 使用 SoundManager 进行集中管理
 * SoundManager.play('click');
 * ```
 */

// 检查是否处于浏览器环境
const isBrowser = typeof window !== 'undefined';

/**
 * 为音频文件创建 HTMLAudioElement
 * @param src - 音频文件路径
 * @param volume - 音量等级（0-1）
 * @returns HTMLAudioElement；非浏览器环境返回 null
 */
export function createSound(src: string, volume: number = 1): HTMLAudioElement | null {
  if (!isBrowser) return null;
  
  const audio = new Audio(src);
  audio.volume = Math.max(0, Math.min(1, volume));
  audio.preload = 'auto';
  
  return audio;
}

/**
 * 播放一次声音（每次创建新的 Audio 元素）
 * 适用于一次性音效，不推荐用于快速连续播放
 * @param src - 音频文件路径
 * @param volume - 音量等级（0-1）
 */
export function playSound(src: string, volume: number = 1): void {
  if (!isBrowser) return;
  
  try {
    const audio = new Audio(src);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.play().catch(() => {
      // 若自动播放被阻止则静默失败
    });
  } catch {
    // 静默失败
  }
}

/**
 * 预加载多个音频文件以加快播放
 * @param sources - 音频文件路径数组
 * @returns 源到 HTMLAudioElement 的映射
 */
export function preloadSounds(sources: string[]): Map<string, HTMLAudioElement> {
  const sounds = new Map<string, HTMLAudioElement>();
  
  if (!isBrowser) return sounds;
  
  sources.forEach(src => {
    const audio = createSound(src);
    if (audio) {
      sounds.set(src, audio);
    }
  });
  
  return sounds;
}

/**
 * 使用 Web Audio API 生成合成音效
 * 适用于无需音频文件的 UI 反馈音效
 */
export class SynthSound {
  private audioContext: AudioContext | null = null;
  
  private getContext(): AudioContext | null {
    if (!isBrowser) return null;
    
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }
  
  /**
   * 播放点击/轻触音效
   * 用于按钮点击的短促清脆音效
   */
  playClick(volume: number = 0.3): void {
    const ctx = this.getContext();
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
  }
  
  /**
   * 播放悬停音效
   * 用于悬停反馈的轻柔音效
   */
  playHover(volume: number = 0.15): void {
    const ctx = this.getContext();
    if (!ctx) return;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  }
  
  /**
   * 播放成功音效
   * 用于成功反馈的悦耳上行音调
   */
  playSuccess(volume: number = 0.3): void {
    const ctx = this.getContext();
    if (!ctx) return;
    
    // 两个快速上行音符
    [0, 0.1].forEach((delay, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const freq = i === 0 ? 523.25 : 659.25; // C5 与 E5
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.15);
      
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.15);
    });
  }
  
  /**
   * 播放错误音效
   * 用于错误反馈的低沉嗡鸣
   */
  playError(volume: number = 0.3): void {
    const ctx = this.getContext();
    if (!ctx) return;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }
}

// 单例实例，便于访问
export const synth = new SynthSound();

/**
 * SoundManager - 集中式声音管理
 * 
 * @example
 * ```ts
 * // 使用声音文件进行初始化
 * SoundManager.init({
 *   click: '/sounds/click.mp3',
 *   hover: '/sounds/hover.mp3'
 * });
 * 
 * // 播放命名声音
 * SoundManager.play('click');
 * 
 * // 使用合成音效（无需音频文件）
 * SoundManager.synth.playClick();
 * ```
 */
class SoundManagerClass {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private globalVolume: number = 1;
  
  /** 合成音效生成器 */
  public synth = synth;
  
  /**
   * 使用声音文件初始化管理器
   * @param soundMap - 名称到文件路径的映射对象
   */
  init(soundMap: Record<string, string>): void {
    if (!isBrowser) return;
    
    Object.entries(soundMap).forEach(([name, src]) => {
      const audio = createSound(src, this.globalVolume);
      if (audio) {
        this.sounds.set(name, audio);
      }
    });
  }
  
  /**
   * 播放命名声音
   * @param name - 声音名称（来自 init）
   * @param volume - 可选的音量覆盖（0-1）
   */
  play(name: string, volume?: number): void {
    if (!this.enabled || !isBrowser) return;
    
    const audio = this.sounds.get(name);
    if (audio) {
      // 克隆音频以允许重叠播放
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = volume ?? audio.volume;
      clone.play().catch(() => {});
    }
  }
  
  /**
   * 启用或禁用所有声音
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  
  /**
   * 检查声音是否启用
   */
  isEnabled(): boolean {
    return this.enabled;
  }
  
  /**
   * 设置全局音量
   * @param volume - 音量等级（0-1）
   */
  setVolume(volume: number): void {
    this.globalVolume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(audio => {
      audio.volume = this.globalVolume;
    });
  }
  
  /**
   * 获取当前全局音量
   */
  getVolume(): number {
    return this.globalVolume;
  }
}

export const SoundManager = new SoundManagerClass();
