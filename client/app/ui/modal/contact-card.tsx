import { WS_URL } from '@/constants';
import { useContext } from 'react';
import { AuthContext } from '@/app/lib/auth_provider';
import { WebsocketContext } from '@/app/lib/ws_provider';
import Link from 'next/link';

interface ContactCardProps {
  id: string;
  name: string;
  status: string;
};

export function ContactCard({ id, name, status }: ContactCardProps) {
  const {user} = useContext(AuthContext)
  const {setConn} = useContext(WebsocketContext)

  const joinRoom = (roomId: string) => {
    const ws = new WebSocket( `${WS_URL}/ws/join-room/${roomId}?userId=${user.id}&username=${user.username}` ) 
    console.log(ws)
    if (ws.OPEN) {
      setConn(ws)
    }
  }
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
