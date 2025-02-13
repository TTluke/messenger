'use client';

import { createContext, useState, ReactNode } from 'react';

interface RoomContextType {
  currentRoomId: string | null;
  setCurrentRoomId: (id: string) => void;
}

export const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: ReactNode }) {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

  return (
    <RoomContext.Provider value={{ currentRoomId, setCurrentRoomId }}>
      {children}
    </RoomContext.Provider>
  );
}
