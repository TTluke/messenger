// app/components/ContactCard.tsx

'use client';

import { WS_URL } from '@/constants';
import { useContext, useState } from 'react';
import { WebsocketContext } from '@/app/lib/ws_provider';
import { RoomContext } from '@/app/lib/room_provider';
import Link from 'next/link';


interface ContactCardProps {
  id: string;
  name: string;
  password: string;
}


export function ContactCard({ id, name, password }: ContactCardProps) {

  const { conn, setConn } = useContext(WebsocketContext);
  const roomContext = useContext(RoomContext);
  const [enteredPassword, setEnteredPassword] = useState<string | null>("")

  const joinRoom = (roomId: string) => {
    const storedUser = localStorage.getItem('user_info');

    let prompValue: string | null = null

    if (storedUser && roomContext) {
      const user = JSON.parse(storedUser);

      if (password !== "") {
        prompValue = prompt(`Room "${name}" requires a password. Please enter it:`)
      }

      setEnteredPassword(prompValue)

      console.log(prompValue)

      // Create a new connection.

      const newWs = new WebSocket(
        `${WS_URL}/ws/join-room/?room_id=${roomId}&user_id=${user.id}&user_name=${user.username}&room_password=${prompValue}`
      );

      newWs.onopen = () => {
        setConn(newWs);
        // Update the current room ID in the context
        roomContext.setCurrentRoomId(roomId);
      };

      console.log(newWs)
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
      {password && <div
        className="w-2.5 h-2.5 bg-red-500 rounded-sm flex-shrink-0"
      ></div>}
    </Link>
  );
} 
