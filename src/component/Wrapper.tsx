"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { usePathname } from "next/navigation";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isShow = !pathname.includes('/signin' ) && !pathname.includes('/signup' )

  return (
    <SessionProvider>
      <div className={`min-h-full ${isShow && 'grid grid-cols-5 grid-rows-[75px_1fr_1fr] '}`}>
        <Navbar />

        <div className="row-span-4 row-start-2">
          <Sidebar />
        </div>

        <div className="col-span-4 row-span-4 row-start-2 p-4 bg-gray-100 ">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
