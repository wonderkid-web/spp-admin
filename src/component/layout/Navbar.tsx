import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo.png";
import Hidden from "./Hidden";

export default function Navbar() {
  return (
    <Hidden style="col-span-full flex justify-between px-2 items-center">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse relative h-16 w-16"
        >
          <Image src={logo} objectFit="cover" alt="Flowbite Logo" />
          <div className="flex flex-col">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MTs YPI Al - Hidayah
            </span>
            <span className="font-semibold">Lubuk Pakam</span>
          </div>
        </Link>

        <div className="font-medium text-gray-700 justify-end text-left flex flex-col p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50">
          <span className="text-md font-semibold whitespace-nowrap dark:text-white">
            PEMBAYARAN SPP MTS YPI AL-HIDAYAH LUBUK PAKAM
          </span>
          <span className="font-semibold text-sm self-end">Lubuk Pakam</span>
        </div>
    </Hidden>
  );
}
