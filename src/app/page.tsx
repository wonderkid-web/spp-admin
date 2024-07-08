// @ts-nocheck // Jangan dihilangkan jika Anda ingin menonaktifkan pengecekan tipe TypeScript

"use client";
import { getDataSiswaClient } from "@/helper/client";
import { Siswa } from "@/types"; // Assuming Siswa interface is defined
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

import foto1 from "@/../../public/foto1.jpg"
import foto2 from "@/../../public/foto2.png"
import foto3 from "@/../../public/foto3.jpg"

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
    <main className="overflow-auto">
      <div className="container">
        <h1 className="text-2xl text-center  font-semibold">Hallo Admin Selamat Datang Website SPP Online </h1>
        <h1 className="text-xl text-center  font-semibold mb-8">di sekolah MTS YPI Al-Hidayah Lubuk Pakam</h1>
        <div className="flex flex-grow justify-center  gap-4 flex-wrap">
          <div className="relative">
            <Image src={foto1} alt="foto1" objectFit="cover" />
          </div>
          <div className="flex gap-4 items-center justify-center place-items-center">
          <div className="relative w-1/2 h-32">
            <Image src={foto2} alt="foto1" objectFit="cover" />
          </div>
          <div className="relative w-1/2 h-32">
            <Image src={foto3} alt="foto1" objectFit="cover" />
          </div>
          </div>
        </div>

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
      <h1 className="text-2xl text-center  font-semibold" style={{marginTop: 300}}> Lokasi MAP Sekolah Kami </h1>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.1248060670837!2d98.8775034740865!3d3.558715450500318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031485ffebef049%3A0x505643fb93338ffe!2sMTS%20YPI%20Al%20Hidayah!5e0!3m2!1sid!2sid!4v1720428652343!5m2!1sid!2sid" height="450" style={{border:"0", marginTop:20, width:"100%"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

    </main>
  );
}
