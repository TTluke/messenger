'use client';

import Link from "next/link";
import { useState } from 'react'

export default function MainPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center align-middle">
      <div className="flex h-auto w-96 flex-col justify-center rounded-xl bg-[#332F4B] p-4 align-middle">
        <form className="flex flex-col space-y-4">
          <h1 className="text-gray-400 self-center text-3xl font-bold">welcome!</h1>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-16 w-full rounded-xl bg-[#332F4B] pl-4 text-gray-50 placeholder-gray-400 outline outline-2 outline-[#443F64]" />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-16 w-full rounded-xl bg-[#332F4B] pl-4 text-gray-50 placeholder-gray-400 outline outline-2 outline-[#443F64]" />
          <div className="flex w-full flex-row space-x-4">
            <button
              type="submit"
              onClick={submitHandler}
              className="flex h-auto w-full items-center justify-center rounded-xl bg-blue-600 align-middle">
              <p className="text-base tracking-wide text-white">
                Login
              </p>
            </button>
            <Link
              href='/register'
              className="flex h-16 w-full items-center justify-center rounded-xl bg-blue-600 align-middle">
              <p className="text-base tracking-wide text-white">
                Register
              </p>
            </Link>
          </div>
        </form>
        <div className="animate-in fade-in hidden h-16 w-16 bg-red-600 duration-500 sm:flex"></div>
      </div>
    </div>
  );
}
