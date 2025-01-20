
import { useState } from 'react';
import clsx from 'clsx';
import { ContactCard } from "./contact-card";
import Link from 'next/link';

const AddButton = () => {
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(!showInput); // Toggle input visibility
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={clsx("mx-auto flex shrink-0 h-10 items-center justify-center rounded-lg bg-[#332F4B] text-gray-500 outline outline-2 outline-[#443F64]",
        {
          'w-[80%]': showInput === false,
          'w-10': showInput === true,
        },
      )}
        onClick={handleButtonClick}>

        <div
          id="connectBtn"
          className="flex items-center justify-center"
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
      {
        showInput && (
          <input
            type="text"
            placeholder="Enter something"
            className="h-10 pl-3 w-full rounded-lg bg-[#332F4B] outline outline-2 outline-[#443F64]"
          />
        )
      }
    </div >
  );
};

export default function Contacts({
  contacts,
  children,
}: Readonly<{
  contacts: { id: number; name: string; status: string }[];
  children?: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex h-auto w-full items-center">
        <h2 className="text-gray-400">Contacts</h2>
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
      <div className="flex flex-col w-full h-full grow-0 space-y-2 overflow-auto">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            status={contact.status}
          />
        ))}
      </div>
      {children}
      <hr className="mx-auto my-2 h-1 w-24 rounded border-0 bg-gray-500" />
      <AddButton />
    </div>
  );
}

// <div
//   class="mx-12 flex h-auto w-dvw max-w-screen-md flex-col space-y-4 rounded-lg bg-[#332F4B] p-4 outline outline-2 outline-[#443F64]">
//   <div class="flex h-10 w-full">
//     <h2 class="text-gray-400">Contacts</h2>
//     <div class="flex h-full flex-1"></div>
//     <button class="flex text-gray-400 hover:text-gray-500" hx-delete="/delete" hx-target="#modal" hx-swap="outerHTML">
//       <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
//       </svg>
//     </button>
//   </div>
//   @CurrentContact(1)
//   @CurrentContact(1)
//   @CurrentContact(1)
//   @CurrentContact(1)
//   @CurrentContact(1)
//   <hr class="mx-auto my-1 h-1 w-24 rounded border-0 bg-gray-500">
// <button 
// id="connectBtn"
// class="mx-auto flex h-10 w-[80%] items-center justify-center rounded-lg bg-[#332F4B] text-gray-500 outline outline-2 outline-[#443F64]">
//   <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16M4 12h16" />
//   </svg>
// </button>
// </div>
// }
