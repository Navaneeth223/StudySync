import { create } from 'zustand';

interface SoundState {
  id: string;
  volume: number;
  audio?: HTMLAudioElement;
}

interface SoundStore {
  activeSounds: SoundState[];
  masterVolume: number;
  isMuted: boolean;

  // Actions
  addSound: (id: string, file: string) => void;
  removeSound: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  toggleMute: () => void;
  cleanup: () => void;
}

export const useSoundStore = create<SoundStore>((set, get) => ({
  activeSounds: [],
  masterVolume: 0.7,
  isMuted: false,

  addSound: (id, file) => {
    const { activeSounds } = get();
    
    // Check if sound already exists
    if (activeSounds.some(s => s.id === id)) return;

    // Create audio element
    const audio = new Audio(file);
    audio.loop = true;
    audio.volume = 0.5 * get().masterVolume;
    audio.play().catch(console.error);

    set({
      activeSounds: [...activeSounds, { id, volume: 0.5, audio }],
    });
  },

  removeSound: (id) => {
    const { activeSounds } = get();
    const sound = activeSounds.find(s => s.id === id);
    
    if (sound?.audio) {
      sound.audio.pause();
      sound.audio.src = '';
    }

    set({
      activeSounds: activeSounds.filter(s => s.id !== id),
    });
  },

  setVolume: (id, volume) => {
    set((state) => ({
      activeSounds: state.activeSounds.map(s => {
        if (s.id === id && s.audio) {
          s.audio.volume = volume * state.masterVolume;
          return { ...s, volume };
        }
        return s;
      }),
    }));
  },

  setMasterVolume: (volume) => {
    set({ masterVolume: volume });
    
    // Update all active sounds
    get().activeSounds.forEach(s => {
      if (s.audio) {
        s.audio.volume = s.volume * volume;
      }
    });
  },

  toggleMute: () => {
    const { isMuted, activeSounds } = get();
    
    activeSounds.forEach(s => {
      if (s.audio) {
        s.audio.muted = !isMuted;
      }
    });

    set({ isMuted: !isMuted });
  },

  cleanup: () => {
    const { activeSounds } = get();
    
    activeSounds.forEach(s => {
      if (s.audio) {
        s.audio.pause();
        s.audio.src = '';
      }
    });

    set({ activeSounds: [] });
  },
}));
