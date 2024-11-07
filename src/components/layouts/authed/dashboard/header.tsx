"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Header({ session }: { session: Session }) {
  const activePath = usePathname();

  return (
    <header className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/dashboard">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>
              {session.user.name?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{session.user.name}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/dashboard/tasks/open"
          className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
            activePath === "/dashboard/tasks/open"
              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
              : "bg-gray-800/50 text-gray-300 hover:bg-green-500/10"
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
          <div className="group flex items-center justify-center p-4">
            <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-900/50 text-green-300 shadow-lg shadow-green-500/50 ring-2 ring-green-500 ring-offset-2 ring-offset-green-900 transition-all duration-300 group-hover:scale-110">
              <span className="text-lg font-bold">1</span>
            </span>
            <span className="relative z-10 text-sm font-medium">Open</span>
          </div>
        </Link>
        <Link
          href="/dashboard/tasks/in-progress"
          className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
            activePath === "/dashboard/tasks/in-progress"
              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
              : "bg-gray-800/50 text-gray-300 hover:bg-yellow-500/10"
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
          <div className="group flex items-center justify-center p-4">
            <span className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-900/50 text-yellow-300 shadow-lg shadow-yellow-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-lg font-bold">2</span>
              <span className="absolute inset-0 animate-ping rounded-full border-2 border-yellow-400"></span>
            </span>
            <span className="relative z-10 text-sm font-medium">
              In Progress
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/tasks/closed"
          className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
            activePath === "/dashboard/tasks/closed"
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-gray-800/50 text-gray-300 hover:bg-red-500/10"
          }`}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
          <div className="group flex items-center justify-center p-4">
            <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-900/50 text-red-300 shadow-lg shadow-red-500/50 ring-2 ring-red-500 ring-offset-2 ring-offset-red-900 transition-all duration-300 group-hover:scale-110">
              <span className="text-lg font-bold">3</span>
            </span>
            <span className="relative z-10 text-sm font-medium">Closed</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
