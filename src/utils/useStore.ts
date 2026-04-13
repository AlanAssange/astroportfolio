import { create } from 'zustand';

interface AppState {
  openWindows: string[];
  focusedWindow: string | null;
  isAudioStarted: boolean;
  isMuted: boolean;

  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  setFocusedWindow: (id: string) => void;
  toggleAudio: () => void;
  startAudio: () => void;
}

export const useStore = create<AppState>((set) => ({
  openWindows: [],
  focusedWindow: null,
  isAudioStarted: false,
  isMuted: false,

  openWindow: (id) => set((state) => ({
    openWindows: state.openWindows.includes(id) ? state.openWindows : [...state.openWindows, id],
    focusedWindow: id
  })),

  closeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.filter((w) => w !== id),
    focusedWindow: state.focusedWindow === id ? null : state.focusedWindow
  })),

  setFocusedWindow: (id) => set({ focusedWindow: id }),

  startAudio: () => set({ isAudioStarted: true, isMuted: false }),
  
  toggleAudio: () => set((state) => ({ isMuted: !state.isMuted })),
}));