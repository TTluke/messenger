import Link from "next/link";

export default function MainPage() {
  return (
    <div id="container" className="flex h-dvh w-screen flex-col items-center justify-center align-middle">
      <div id="register-container"
        className="flex h-auto w-96 flex-col justify-center space-y-4 rounded-xl bg-[#332F4B] p-4 align-middle">
        <div id="user-input" className="flex flex-col space-y-4">
          <input placeholder="Username" type="text" id="element"
            className="flex h-16 w-full rounded-xl bg-[#332F4B] pl-4 text-gray-50 placeholder-gray-400 outline outline-2 outline-[#443F64]" />
          <input placeholder="Email" type="email" id="element"
            className="flex h-16 w-full rounded-xl bg-[#332F4B] pl-4 text-gray-50 placeholder-gray-400 outline outline-2 outline-[#443F64]" />
          <input placeholder="Password" type="password" id="element"
            className="flex h-16 w-full rounded-xl bg-[#332F4B] pl-4 text-gray-50 placeholder-gray-400 outline outline-2 outline-[#443F64]" />
        </div>
        <Link href='/login'>
          <p className="cursor-pointer self-start text-sm text-blue-400 hover:underline">Back to Login</p>
        </Link>
        <button type="button" className="flex h-16 w-full items-center justify-center rounded-xl bg-blue-600 align-middle">
          <p className="text-base font-semibold tracking-wide text-white">
            Register
          </p>
        </button>
      </div>
    </div >
  );
}
