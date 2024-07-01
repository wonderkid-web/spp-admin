// @ts-nocheck // Jangan dihilangkan jika Anda ingin menonaktifkan pengecekan tipe TypeScript

"use client";
import { getDataSiswaClient } from "@/helper/client";
import { Siswa } from "@/types"; // Assuming Siswa interface is defined
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [siswa, setSiswa] = useState<Siswa[] | null>(null); // Initial state with null
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDataSiswaClient();
        setSiswa(data); // Set siswa state with fetched data
      } catch (error) {
        console.error("Error fetching siswa data:", error);
        setSiswa(null); // Set siswa to null to indicate an error
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once on component mount

  if (status === "loading") return <h1>Loading...</h1>;

  return (
    <main>
      <div className="container">
        <h1 className="text-2xl text-center  font-semibold">Hallo Admin Selamat Datang Website SPP Online </h1>
        {/* {siswa ? (
          <div>
            <p>Berikut daftar siswa yang terdaftar:</p>
            <ul>
              {siswa.map((siswa) => (
                <li key={siswa.id}>{siswa.nama}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Tidak ada data siswa yang dapat ditampilkan saat ini.</p>
        )} */}
      </div>
    </main>
  );
}
