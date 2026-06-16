import { create } from 'zustand';
import { Room, RoomParticipant } from '@/types/room.types';

interface RoomStore {
  currentRoom: Room | null;
  participants: RoomParticipant[];
  isConnected: boolean;
  isFocusLock: boolean;
  
  // Actions
  setRoom: (room: Room) => void;
  setParticipants: (participants: RoomParticipant[]) => void;
  addParticipant: (participant: RoomParticipant) => void;
  removeParticipant: (userId: string) => void;
  updateParticipant: (userId: string, data: Partial<RoomParticipant>) => void;
  setConnected: (connected: boolean) => void;
  setFocusLock: (enabled: boolean) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  currentRoom: null,
  participants: [],
  isConnected: false,
  isFocusLock: false,

  setRoom: (room) => set({ currentRoom: room }),

  setParticipants: (participants) => set({ participants }),

  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),

  removeParticipant: (userId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.userId !== userId),
    })),

  updateParticipant: (userId, data) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.userId === userId ? { ...p, ...data } : p
      ),
    })),

  setConnected: (connected) => set({ isConnected: connected }),

  setFocusLock: (enabled) => set({ isFocusLock: enabled }),

  clearRoom: () =>
    set({
      currentRoom: null,
      participants: [],
      isConnected: false,
      isFocusLock: false,
    }),
}));
