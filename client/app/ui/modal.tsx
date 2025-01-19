import Link from "next/link";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 duration-300 animate-in fade-in">
      <Link href="/" className="fixed inset-0 -z-10" />
      {children}
    </div>
  );
}
