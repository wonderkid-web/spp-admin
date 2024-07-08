"use client";
import Receipt from "@/component/PDF/Letter";
import PaymentReceipt from "@/component/PDF/Letter";
import Letter from "@/component/PDF/Letter";
import { exportToExcel, getBulanName, showTanggal } from "@/helper/client";
import { KodeBayar, Siswa, SixDigitString, Transaksi } from "@/types";
import { supabase } from "@/utils/supabase/client";
import {
  PDFDownloadLink,
  PDFRenderer,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import uuid from "react-uuid";

export default function Home() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [kode, setKode] = useState<KodeBayar | []>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [nis, setNis] = useState<SixDigitString | null>(null);
  const { status, data: session } = useSession();
  const [user, setUser] = useState<Siswa | null>(null);

  const data = {
    noTrans: "KL101600001",
    nis: "16258",
    namaSiswa: "TRI BUDI HARYANTO",
    kelas: "10 - TPMI",
    tanggal: "10/01/2016",
    jamCetak: "10:48:03",
    pembayaran: [
      {
        keterangan: "Biaya Penyelenggaraan Pendidikan - AGS 2016/2017",
        jumlah: "50,000.00",
      },
      {
        keterangan: "Biaya Penyelenggaraan Pendidikan - SEP 2016/2017",
        jumlah: "50,000.00",
      },
      {
        keterangan: "Biaya Penyelenggaraan Pendidikan - OKT 2016/2017",
        jumlah: "50,000.00",
      },
      {
        keterangan: "Biaya Penyelenggaraan Pendidikan - NOV 2016/2017",
        jumlah: "50,000.00",
      },
      { keterangan: "Daftar Ulang", jumlah: "975,000.00" },
    ],
    total: "1,175,000.00",
    terbilang: "Satu Juta Seratus Tujuh Puluh Lima Ribu Rupiah",
    tanggalDiterima: "18 Oktober 2016",
    signatoryName: "Widiya Nanda Gardhea Putri, S.Pd",
    signatoryTitle: "Yang Menerima",
  };

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
      .eq("nis", nis)
      .order("created_at", {ascending: true})
    
    // @ts-ignore

    if (data?.length) {
      setTransaksi(data);

      if (user) {
        const blob = await pdf(
          <PaymentReceipt data={data} user={user} />
        ).toBlob();
        setPdfUrl(URL.createObjectURL(blob));
      }
    } else {
      setTransaksi([]);
    }
  };

  const getTransaksi = async () => {
    const { data }: PostgrestSingleResponse<Transaksi[]> = await supabase
      .from("transaksi")
      .select("*")
      .order("created_at", {ascending: true})

    // @ts-ignore

    if (data?.length) {
      setTransaksi(data);

      // @ts-ignore
      const dataUser: Siswa = {
        nis: data[0].nis,
        nama: data[0].nama,
        kelas: data[0].kelas,
      };

      setUser(dataUser);

      const blob = await pdf(
        <PaymentReceipt data={data} user={dataUser} />
      ).toBlob();
      setPdfUrl(URL.createObjectURL(blob));
    } else {
      setTransaksi([]);
    }
  };

  const handleExport = () => {
    const formattedData = transaksi.map((t, i) => ({
      No: i + 1,
      Nama: t.nama,
      NIS: t.nis,
      Semester: +t.kode < 7 ? "1" : "2",
      Bulan: getBulanName(t.kode),
      Jumlah: "Rp. 80.000",
      Tanggal: showTanggal(t.created_at),
      "Status Pembayaran": t.status ? "Lunas" : "Menunggu",
      "Tanggal Pelunasan": t.tanggal_lunas ? showTanggal(t.tanggal_lunas) : "-",
    }));

    // @ts-ignore
    exportToExcel(formattedData, "Laporan_Transaksi");
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
        <button
          onClick={handleExport}
          disabled={transaksi.length == 0}
          className={`px-2 pl-3 py-3 w-full  my-3 text-white font-bold rounded-md 
                          ${
                            !transaksi.length ? "bg-gray-300" : "bg-emerald-500"
                          }
            `}
        >
          Cetak Laporan Transaksi
        </button>

        {/* Payment List Section */}

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
      </div>

      <div>
        <h1>Payment Receipt</h1>
        {pdfUrl ? (
          <iframe src={pdfUrl} width="100%" height="800px" />
        ) : (
          "Generating document..."
        )}
        {/* <h1>Payment Receipt</h1>
    <PDFViewer>
      <PaymentReceipt data={data} />
    </PDFViewer> */}
        {/* <PDFDownloadLink document={<Letter />} fileName="payment_receipt.pdf">
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink> */}
        {/* <Receipt /> */}
      </div>
    </div>
  );
}
