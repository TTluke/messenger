interface ContactCardProps {
  id: number;
  name: string;
  status: string;
}

export function ContactCard({ name, status }: ContactCardProps) {
  return (
    <div className="flex items-center w-full h-auto space-x-2 rounded-lg px-3 py-2 bg-[#443F64] text-gray-400">
        <span>{name}</span>
        <div className="flex flex-1"></div>
        <span className="text-sm opacity-75">{status}</span>
    </div>
  );
}
