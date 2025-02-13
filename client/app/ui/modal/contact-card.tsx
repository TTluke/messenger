// app/components/ContactCard.tsx
'use client';

import { WS_URL } from '@/constants';
import { useContext } from 'react';
import { WebsocketContext } from '@/app/lib/ws_provider';
import { RoomContext } from '@/app/lib/room_provider';
import Link from 'next/link';

interface ContactCardProps {
  id: string;
  name: string;
  status: string;
}

export function ContactCard({ id, name, status }: ContactCardProps) {
  const { conn, setConn } = useContext(WebsocketContext);
  const roomContext = useContext(RoomContext);

  const joinRoom = (roomId: string) => {
    const storedUser = localStorage.getItem('user_info');
    if (storedUser && roomContext) {
      const user = JSON.parse(storedUser);

      // If there is an active connection, close it.
      if (conn) {
        conn.close();
      }

      // Create a new connection.
      const newWs = new WebSocket(
        `${WS_URL}/ws/join-room/${roomId}?userId=${user.id}&username=${user.username}`
      );
      newWs.onopen = () => {
        setConn(newWs);
        // Update the current room ID in the context
        roomContext.setCurrentRoomId(roomId);
      };
      console.log(newWs);
    } else {
      console.warn('User data not available in local storage.');
    }
  };

  return (
    <Link
      href={`/?name=${name}`}
      onClick={() => joinRoom(id)}
      className="flex items-center w-full h-auto space-x-2 rounded-lg px-3 py-2 bg-[#443F64] text-gray-400"
    >
      <span>{name}</span>
      <div className="flex flex-1"></div>
      <span className="text-sm opacity-75">{status}</span>
    </Link>
  );
}
