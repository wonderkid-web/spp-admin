// @ts-nocheck
"use client";
import { semester1, semester2 } from "@/static";
import { KodeBayar, Semester, Siswa, Transaksi } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [semester, setSemester] = useState<Semester[]>([]);
  const [kode, setKode] = useState<KodeBayar | []>([]);
  const { status, data: session } = useSession();
  const [transaksi, setTransaksi] = useState();
  const [nis, setNis] = useState<Transaksi["nis"]>();

  const handleTransaction = async (kodeBaru: Semester["kode"]) => {
    const { data: siswa } = await supabase
      .from("siswa")
      .select("*")
      .eq("nis", nis);

    // @ts-ignore
    delete siswa[0]?.password;
    // @ts-ignore
    delete siswa[0]?.created_at;

    const tahun = new Date().getFullYear();

    const waktuSekarang = new Date()
    

    const newTransaksi : Transaksi = {
      ...siswa[0],
      kode: kodeBaru,
      tahun,
      status: true,
      tanggal_lunas: waktuSekarang,
      id: uuid(),
    };

    await supabase.from("transaksi").insert([newTransaksi]);

    // // @ts-ignore
    // const { data: siswa } = await supabase
    //   .from("siswa")
    //   .select("*")
    //   .eq("nis", session?.user?.nis);

    if (siswa?.length) {
      const updateKode = [...siswa[0].kode, kodeBaru];

      // @ts-ignore
      await supabase
        .from("siswa")
        .update({ kode: updateKode })
        // @ts-ignore
        .eq("nis", nis)
        .select();

      getKode();
    }
  };

  const cariSiswa = async () => {
    let filtered;
    const { data }: PostgrestSingleResponse<Transaksi[]> = await supabase
      .from("transaksi")
      .select("*")
      .eq("nis", nis)
      .order("created_at", { ascending: true });

    // @ts-ignore

    setTransaksi(data);
    console.log(data);
    if (data?.length) {
      // console.log(data)
      // if (selectedPeriod) {
      //   filtered = data.filter((t) =>
      //     selectedPeriod === undefined
      //       ? t // Now, all transactions pass the filter when undefined
      //       : getBulanName(t.kode as string).toLowerCase() === selectedPeriod
      //   );
      //   setTransaksi(filtered);
      //   if (user) {
      //     const blob = await pdf(
      //       <PaymentReceipt data={filtered} user={user} />
      //     ).toBlob();
      //     setPdfUrl(URL.createObjectURL(blob));
      //   }
      // } else {
      //   setTransaksi(data);
      //   if (user) {
      //     const blob = await pdf(
      //       <PaymentReceipt data={data} user={user} />
      //     ).toBlob();
      //     setPdfUrl(URL.createObjectURL(blob));
      //   }
      // }
    } else {
      setTransaksi([]);
    }
  };

  const getKode = async () => {
    // @ts-ignore
    const { data: transaction } = await supabase
      .from("transaksi")
      .select("kode, status")
      .eq("nis", nis);
    // @ts-ignore
    setTransaksi(transaction);

    // const { data }: PostgrestSingleResponse<Siswa[]> = await supabase
    //   .from("siswa")
    //   .select("*")
    //   // @ts-ignore
    //   .eq("nis", session?.user.nis);
    // if (data?.length) {
    //   setKode(data[0].kode);
    // }
  };

  const checkStatus = (s: Semester) => {
    if (transaksi) {
      const filtered: Transaksi = transaksi.find((tr) => tr.kode == s.kode);
      console.log(filtered);
      if (filtered?.status) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkProgres = (s: Semester) => {
    if (transaksi) {
      const filtered = transaksi.find((tr) => tr.kode == s.kode);
      if (filtered) {
        if (filtered.status) {
          return "Lunas";
        } else {
          return "Sedang Diproses Admin";
        }
      } else {
        return "Konfirmasi Pelunasan";
      }
    }
  };

  // useEffect(
  //   () => {
  //     if (selectedPeriod == 1) {
  //       const filtered =
  //         kode.length <= 5
  //           ? [
  //               ...semester1.filter((k) => kode.includes(k.kode)),
  //               semester1[kode.length],
  //             ]
  //           : [...semester1.filter((k) => kode.includes(k.kode))];
  //       setSemester(filtered);
  //     } else {
  //       const filtered =
  //         kode.length <= 5
  //           ? [
  //               ...semester2.filter((k) => kode.includes(k.kode)),
  //               semester2[kode.length],
  //             ]
  //           : [...semester2.filter((k) => kode.includes(k.kode))];
  //       setSemester(filtered);
  //     }
  //   },
  //   [selectedPeriod, session?.user],
  //   semester
  // );

  useEffect(() => {
    if (selectedPeriod == 1) {
      setSemester(semester1);
    } else {
      setSemester(semester2);
    }
  }, [selectedPeriod]);


  if (status == "loading" && kode)
    return <h1 className="text-center mt-48 text-2xl">Loading...</h1>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="main-content">
        <h2 className="text-2xl font-bold mb-4">DAFTAR PEMBAYARAN SPP</h2>
        <div className="select mb-4">
          <label htmlFor="periode" className="block mb-2">
            Masukan NIS Siswa:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Masukan NIS Siswa yang ingin di cetak menjadi PDF"
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

        <div className="select mb-4">
          <label htmlFor="periode" className="block mb-2">
            Pilih Periode Pembayaran:
          </label>
          <select
            name="periode"
            id="periode"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(+e.target.value)}
          >
            <option value="">-- Pilih Periode --</option>
            <option value="1">Periode 1 (Januari - Juni)</option>
            <option value="2">Periode 2 (Juli - Desember)</option>
          </select>
        </div>

        {/* Payment List Section */}
        {selectedPeriod == 0 ? (
          <h1>Belum Memilih</h1>
        ) : (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {["Kode", "Uraian", "Jumlah"].map((text) => (
                  <th
                    key={text}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    {text}
                  </th>
                ))}

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800  text-xs font-semibold text-white uppercase tracking-wider text-center">
                  Pilih
                </th>
              </tr>
            </thead>
            <tbody>
              {semester.map((s) => (
                <tr key={s.bulan} className="bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {s.kode}
                  </td>
                  <td className="px-5 py-5 capitalize border-b border-gray-200 text-sm">
                    {s.bulan}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    Rp. 80.000
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {checkStatus(s) ? (
                      <p className="px-2 py-1 rounded-md bg-green-500 font-bold text-white w-fit mx-auto">
                        lunas
                      </p>
                    ) : (
                      <button
                        disabled={checkProgres(s) === "Lunas"}
                        onClick={() =>
                          checkProgres(s) === "Konfirmasi Pelunasan" &&
                          handleTransaction(s.kode)
                        }
                        className={`${
                          checkProgres(s) === "Sedang Diproses Admin"
                            ? "bg-gray-400 text-white"
                            : "bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                        } px-4 py-2 mx-auto  rounded flex flex-col items-center `}
                      >
                        {/* <span>bayar/</span>
                        <span>sedang di proses</span> */}
                        {checkProgres(s)}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
