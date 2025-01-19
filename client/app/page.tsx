'use client';

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "./ui/button";
import { Chat } from "./ui/chat";
import Modal from "./ui/modal";
import CurrentContact from "./ui/current_contact";
import { ContactsContent, SettingsContent } from "./ui/modal_content";

export default function MainPage() {
  const searchParams = useSearchParams();
  const showContacts = searchParams.get('contacts') === 'true';  // For contacts modal
  const showSettings = searchParams.get('settings') === 'true';  // For settings modal

  return (
    <div>
      <div itemID="top-container" className="mt-2 h-16 w-full flex-shrink-0 px-2 py-1">
        <div itemID="top-bar" className="flex h-full w-full items-center rounded-lg bg-[#332F4B] outline outline-2 outline-[#443F64]">
          {/* Contacts Button */}
          <Button className="mx-2 h-10 w-10">
            <Link href="/?contacts=true" className="flex h-full w-full items-center justify-center">
              <Image
                src="/contact_icon.png"
                width={32}
                height={32}
                alt="contacts"
              />
            </Link>
            {showContacts && <Modal><ContactsContent /></Modal>}
          </Button>

          {/* Contact Name */}
          <CurrentContact text="Lukas (coolguy) Pollak some really fing long name" />

          {/* Settings Button */}
          <Button className="mx-2 h-10 w-10 flex-col space-y-1">
            <Link href="/?settings=true" className="flex flex-col space-y-1 h-full w-full items-center justify-center">
              <span className="h-1 w-6 rounded bg-[#443F64]"></span>
              <span className="h-1 w-6 rounded bg-[#443F64]"></span>
              <span className="h-1 w-6 rounded bg-[#443F64]"></span>
            </Link>
            {showSettings && <Modal><SettingsContent /></Modal>}
          </Button>
        </div>
      </div>

      <div id="main-container" className="flex h-screen max-h-[calc(100dvh-4.5rem)] w-full flex-col p-2">
        <Chat />
        <div className="flex flex-row "></div>
      </div>
    </div>
  );
}
