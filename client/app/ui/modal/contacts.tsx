'use client';

import { useState, useEffect, useContext } from 'react';
import { WebsocketContext } from '@/app/lib/ws_provider';
import clsx from 'clsx';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid'
import { API_URL } from '@/constants';
import { ContactCard } from "./contact-card";

type AddButtonProps = {
  name: string;
  setName: (value: string) => void;
  submitHandler: (e: React.SyntheticEvent) => Promise<void>;
}

const AddButton = ({ name, setName, submitHandler }: AddButtonProps) => {
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = (e: React.SyntheticEvent) => {
    if (showInput) {
      submitHandler(e);
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div
        className={clsx(
          "mx-auto flex shrink-0 h-10 items-center justify-center rounded-lg bg-[#332F4B] text-gray-500 outline outline-2 outline-[#443F64]",
          {
            'w-[80%]': !showInput,
            'w-10': showInput,
          }
        )}
        onClick={(e) => handleButtonClick(e)}
      >
        <div id="connectBtn" className="flex items-center justify-center">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16M4 12h16"
            />
          </svg>
        </div>
      </div>
      {showInput && (
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(e);
            setShowInput(false);
          }}
        >
          <input
            type="text"
            placeholder="Enter something"
            className="h-10 pl-3 w-full rounded-lg bg-[#332F4B] outline outline-2 outline-[#443F64]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // This handler works on both desktop and mobile when pressing the Enter/Done button.
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submitHandler(e);
                setShowInput(false);
              }
            }}
          />
        </form>
      )}
    </div>
  );
};

export default function Contacts({ children }: Readonly<{ children?: React.ReactNode; }>) {
  const [contacts, setContacts] = useState<{ id: string, name: string, password: string }[]>([]);
  const [name, setName] = useState('')
  const { conn, setConn } = useContext(WebsocketContext);

  const getRooms = async () => {
    try {
      const res = await fetch(`${API_URL}/ws/get-rooms`, {
        method: 'GET',
      });
      const data = await res.json();
      if (res.ok) {
        setContacts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    // If there is an active connection, close it.
    if (conn) {
      conn.close();
    }
    getRooms();
  }, []);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setName('');
      const res = await fetch(`${API_URL}/ws/create-room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id: uuidv4(),
          name: name
        }),
      });
      if (res.ok) {
        getRooms();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-auto w-full flex flex-col">
      <div className="flex h-auto w-full items-center">
        <h2 className="text-gray-400">Rooms</h2>
        <div className="flex h-full flex-1"></div>
        <Link href='/'>
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </div>
      <hr className="mx-auto my-2 h-px w-full rounded border-0 bg-gray-400" />
      <div className="flex flex-col w-full h-auto max-h-32 grow-0 space-y-2 overflow-auto">
        {contacts
          .slice() // 1. Create a shallow copy of the contacts array
          .sort((a, b) => a.id.localeCompare(b.id)) // 2. Sort the copy based on the 'id' property (string comparison)
          .map((contact) => ( // 3. Map over the *sorted* array
            <ContactCard
              key={contact.id} // Key should still be unique, id is good here
              id={contact.id}
              name={contact.name}
              password={contact.password}
            />
          ))
        }
      </div>
      {children}
      <hr className="mx-auto my-2 h-1 w-24 rounded border-0 bg-gray-500" />
      <AddButton name={name} setName={setName} submitHandler={submitHandler} />
    </div>
  );
}
