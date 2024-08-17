import { Siswa, Transaksi } from "@/types";
import { supabase } from "@/utils/supabase/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale/id";
import * as XLSX from "xlsx";

export const getDataSiswaClient = async () => {
  const siswa: PostgrestSingleResponse<Siswa[]> = await supabase
    .from("siswa")
    .select("*");
  return siswa;
};

export const getBulanName = (kode: string): string => {
  const bulanMap: { [key: string]: string } = {
    "01": "Januari",
    "02": "Februari",
    "03": "Maret",
    "04": "April",
    "05": "Mei",
    "06": "Juni",
    "07": "Juli",
    "08": "Agustus",
    "09": "September",
    "10": "Oktober",
    "11": "November",
    "12": "Desember",
  };
  return bulanMap[kode] || "Invalid code";
};

export const showTanggal = (tanggal: string|number|null) => {
  if(tanggal !== null){
    const date = parseISO(tanggal as string);

    const formattedDate = format(date, "EEEE, yyyy-MM-dd HH:mm", {
      locale: id,
    });
  
    return formattedDate;
  }else{
    return "-"
  }
};

export const exportToExcel = (data: Transaksi[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const countLunasTrue = (transaksi: Transaksi[]): number => {
  return transaksi.filter((transaction) => transaction.tanggal_lunas !== null)
    .length;
};

export const formatterCurrency = (number: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(number);
};
