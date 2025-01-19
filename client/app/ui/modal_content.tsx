'use client';

import Link from "next/link";
import React from "react";

interface CurrentContactProps {
  id: number;
}

const CurrentContact: React.FC<CurrentContactProps> = ({ id }) => (
  <div className="flex items-center space-x-4 rounded-lg bg-[#443F64] p-4 text-gray-400">
    <span>Contact {id}</span>
  </div>
);

const ContactsContent: React.FC = () => {
  const handleDelete = (): void => {
    console.log("Delete button clicked");
  };

  const handleConnect = (): void => {
    console.log("Connect button clicked");
  };

  return (
    <div className="flex h-auto w-screen max-w-xl mx-10 flex-col space-y-4 rounded-lg bg-[#332F4B] p-4 outline outline-2 outline-[#443F64]">
      <div className="flex h-10 w-full">
        <h2 className="text-gray-400">Contacts</h2>
        <div className="flex flex-1"></div>
        <Link
          href='/'
          className="flex text-gray-400 hover:text-gray-500"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </div>
      {[1, 2, 3, 4, 5].map((id) => (
        <CurrentContact key={id} id={id} />
      ))}
      <hr className="mx-auto my-1 h-1 w-24 rounded border-0 bg-gray-500" />
      <div className="mx-auto flex h-10 w-[80%] items-center justify-center rounded-lg bg-[#332F4B] text-gray-500 outline outline-2 outline-[#443F64]">
        <div
          id="connectBtn"
          className="flex items-center justify-center"
          onClick={handleConnect}
        >
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
    </div>
  );
};

const SettingsContent: React.FC = () => {
  return (
  <div
    className="mx-12 flex h-auto w-dvw max-w-screen-md flex-col space-y-4 rounded-lg bg-[#332F4B] p-4 outline outline-2 outline-[#443F64]">
    <div className="flex h-10 w-full">
      <h2 className="text-gray-400">Settings</h2>
      <div className="flex flex-1"></div>
      <Link
        href='/'
        className="flex text-gray-400 hover:text-gray-500"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
    </div>

    <div
      className="flex h-10 w-full items-center justify-center rounded-lg bg-[#332F4B] outline outline-4 outline-[#443F64]">
      <p className="text-white">
        Change nickname
      </p>
    </div>

    <div
      className="flex h-10 w-full items-center justify-center rounded-lg bg-[#332F4B] outline outline-4 outline-[#443F64]">
      <p className="text-white">
        Theme
      </p>
    </div>

    <div
      className="flex h-10 w-full items-center justify-center rounded-lg bg-red-600 outline outline-4 outline-red-700">
      <p className="text-white">
        Logout
      </p>
    </div>
  </div>
  );
}

export { ContactsContent };
export { SettingsContent };
