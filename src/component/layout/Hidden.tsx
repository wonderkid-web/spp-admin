"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function Hidden({ children, style }: { children: ReactNode, style:string }) {
  const pathname = usePathname();
  const isHidden = pathname.includes('/signin') || pathname.includes('/signup')

  return <div className={`${isHidden ? 'hidden' : ""} ${style}`}>{children}</div>;
}

export default Hidden;
