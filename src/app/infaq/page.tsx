"use client";
import { getBulanName, showTanggal } from "@/helper/client";
import { semester1, semester2 } from "@/static";
import { KodeBayar, Semester, Siswa, SixDigitString, Transaksi } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import uuid from "react-uuid";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [semester, setSemester] = useState<Semester[]>([]);
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [kode, setKode] = useState<KodeBayar | []>([]);
  const [nis, setNis] = useState<SixDigitString | null>(null);
  const { status, data: session } = useSession();

  const handleTransaction = async (id: Transaksi["id"]) => {
    const waktuSekarang = new Date().toISOString();
    await supabase
      .from("transaksi")
      .update([
        {
          status: true,
          tanggal_lunas: waktuSekarang,
        },
      ])
      .eq("id", id);

    cariSiswa();
  };

  const cariSiswa = async () => {
    const { data }: PostgrestSingleResponse<Transaksi[]> = await supabase
      .from("transaksi")
      .select("*")
      .eq("nis", nis);
    // @ts-ignore

    if (data?.length) {
      setTransaksi(data);
    } else {
      setTransaksi([]);
    }
  };

  const getTransaksi = async () => {
    const { data }: PostgrestSingleResponse<Transaksi[]> = await supabase
      .from("transaksi")
      .select("*");
    // @ts-ignore

    if (data?.length) {
      setTransaksi(data);
    } else {
      setTransaksi([]);
    }
  };

  useEffect(() => {
    getTransaksi();
  }, []);

  if (status == "loading" && kode)
    return <h1 className="text-center mt-48 text-2xl">Loading...</h1>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sidebar Section - assuming it's imported or implemented */}
      {/* <div className="style/sidebar.php"></div> */}

      {/* Main Content */}
      <div className="main-content">
        <h2 className="text-2xl font-bold mb-4">KELOLA PEMBAYARAN SPP</h2>

        {/* Select Periode Section */}
        <div className="select mb-4">
          <label htmlFor="periode" className="block mb-2">
            Masukan NIS Siswa:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="NIS"
              className="px-2 pl-3 py-1 w-4/5 rounded-md"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNis(e.currentTarget.value as SixDigitString)
              }
            />
            <button
              onClick={cariSiswa}
              className="px-2 pl-3 py-1 w-1/5 text-white font-bold rounded-md bg-sky-500"
            >
              Cari Siswa
            </button>
          </div>
        </div>

        {/* Payment List Section */}
        {selectedPeriod && (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    NIS
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Bulan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-xs font-semibold text-white uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status Pembayaran
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Tanggal Pelunasan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {transaksi.length ? (
                  transaksi.map((t, i) => (
                    <tr key={uuid()} className="bg-gray-100">
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        {i + 1}
                      </td>
                      <td className="capitalize px-5 py-5 border-b border-gray-200 text-sm">
                        {t.nama}
                      </td>
                      <td className="capitalize px-5 py-5 border-b border-gray-200 text-sm">
                        {t.nis}
                      </td>
                      <td className="capitalize text-center px-5 py-5 border-b border-gray-200 text-sm">
                        {+t.kode < 7 ? "1" : "2"}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        {getBulanName(t.kode)}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        Rp. 80.000
                      </td>
                      <td className="px-5 py-5 capitalize border-b text-center border-gray-200 text-sm">
                        {showTanggal(t.created_at)}
                      </td>
                      <td className="text-center px-5 py-5 capitalize border-b border-gray-200 text-sm">
                        {t.status ? "Lunas" : "Menunggu"}
                      </td>
                      <td className="text-center px-5 py-5 capitalize border-b border-gray-200 text-sm">
                        {t.tanggal_lunas ? showTanggal(t.tanggal_lunas) : "-"}
                      </td>
                      <td className="text-center px-5 py-5 capitalize border-b border-gray-200 text-sm">
                        <button
                          disabled={t.status}
                          onClick={() => handleTransaction(t.id)}
                          className={`text-white font-semibold px-2 py-1 rounded-sm ${t.status ? 'bg-gray-300' : 'bg-emerald-500'}`}
                        >
                          {t.status ? 'selesai' : 'lunas'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-gray-100">
                    <td
                      colSpan={10}
                      className="text-gray-600 text-2xl text-center px-5 py-5 border-b border-gray-200"
                    >
                      Data Kosong
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
