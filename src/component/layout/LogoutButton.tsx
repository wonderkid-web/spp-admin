"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut()
  };

  return (
    <span
      onClick={()=>handleLogout()}
      className="flex-1 ms-3 group-hover:text-sky-600 whitespace-nowrap cursor-pointer"
    >
      Sign Out
    </span>
  );
};
