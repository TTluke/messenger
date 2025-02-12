'use client';

import { WS_URL } from '@/constants';
import { useContext } from 'react';
import { WebsocketContext } from '@/app/lib/ws_provider';
import Link from 'next/link';

interface ContactCardProps {
  id: string;
  name: string;
  status: string;
};

export function ContactCard({ id, name, status }: ContactCardProps) {
  const {setConn} = useContext(WebsocketContext)

const joinRoom = (roomId: string) => {
  // Try to retrieve user data from local storage
  const storedUser = localStorage.getItem('user_info');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const ws = new WebSocket(
      `${WS_URL}/ws/join-room/${roomId}?userId=${user.id}&username=${user.username}`
    );
    ws.onopen = () => {
      setConn(ws);
    };
    console.log(ws)
  } else {
    console.warn("User data not available in local storage.");
  }
};
  return (
    <Link
      href={`/?name=${name}`}
      onClick={() => joinRoom(id)}
      className="flex items-center w-full h-auto space-x-2 rounded-lg px-3 py-2 bg-[#443F64] text-gray-400">
      <span>{name}</span>
      <div className="flex flex-1"></div>
      <span className="text-sm opacity-75">{status}</span>
    </Link>
  );
}
