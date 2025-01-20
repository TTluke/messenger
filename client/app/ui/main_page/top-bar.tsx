'use client';

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "./button";
import Modal from "../modal/modal";
import CurrentContact from "./current_contact";
import Contacts from "../modal/contacts";

export function TopBar() {
  const searchParams = useSearchParams();
  const showContacts = searchParams.get('contacts') === 'true';
  const showSettings = searchParams.get('settings') === 'true';

  const contactData = [
      { id: 1, name: "Alice", status: "away" },
      { id: 2, name: "Bob", status: "offline" },
      { id: 3, name: "Charlie", status: "away" },
      { id: 4, name: "David", status: "away" },
      { id: 5, name: "Eve", status: "online" },
      { id: 6, name: "Frank", status: "offline" },
      { id: 7, name: "Grace", status: "offline" },
      { id: 8, name: "Hannah", status: "away" },
      { id: 9, name: "Isaac", status: "away" },
      { id: 10, name: "Jack", status: "offline" }
  ];

  return (
    <div className="flex h-full w-full items-center rounded-lg bg-[#332F4B] outline outline-2 outline-[#443F64]">
      <Button className="mx-2 h-10 w-10">
        <Link href="/?contacts=true" className="flex h-full w-full items-center justify-center">
          <Image
            src="/contact_icon.png"
            width={32}
            height={32}
            alt="contacts"
          />
        </Link>
        {showContacts && <Modal><Contacts contacts={contactData}></Contacts></Modal>}
      </Button>

      <CurrentContact text="Lukas (coolguy) Pollak some really fing long name" />

      <Button className="mx-2 h-10 w-10 flex-col space-y-1">
        <Link href="/?settings=true" className="flex flex-col space-y-1 h-full w-full items-center justify-center">
          <span className="h-1 w-6 rounded bg-[#443F64]"></span>
          <span className="h-1 w-6 rounded bg-[#443F64]"></span>
          <span className="h-1 w-6 rounded bg-[#443F64]"></span>
        </Link>
        {showSettings && <Modal><div></div></Modal>}
      </Button>
    </div>
  );
}
