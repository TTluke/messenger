'use client';

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "./button";
import Modal from "../modal/modal";
import Contacts from "../modal/contacts";
import BouncingText from "./current_contact";

export function TopBar() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name')
  const showContacts = searchParams.get('contacts') === 'true';
  const showSettings = searchParams.get('settings') === 'true';

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
        {showContacts && <Modal><Contacts></Contacts></Modal>}
      </Button>

      <BouncingText text={ name }></BouncingText>

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
