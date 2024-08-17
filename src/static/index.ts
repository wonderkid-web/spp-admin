import { Pembayaran, Semester } from "@/types";

export const semester1: Semester[] = [
  {
    kode: "01",
    bulan: "januari",
  },
  {
    kode: "02",
    bulan: "februari",
  },
  {
    kode: "03",
    bulan: "maret",
  },
  {
    kode: "04",
    bulan: "april",
  },
  {
    kode: "05",
    bulan: "mei",
  },
  {
    kode: "06",
    bulan: "juni",
  },
];

export const semester2: Semester[] = [
  {
    kode: "07",
    bulan: "juli",
  },
  {
    kode: "08",
    bulan: "agustus",
  },
  {
    kode: "09",
    bulan: "september",
  },
  {
    kode: "10",
    bulan: "oktober",
  },
  {
    kode: "11",
    bulan: "november",
  },
  {
    kode: "12",
    bulan: "desember",
  },
];

export const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export let pembayaran: Pembayaran[] = [
  { kode: "01", created_at: null, tanggal_lunas: null },
  { kode: "02", created_at: null, tanggal_lunas: null },
  { kode: "03", created_at: null, tanggal_lunas: null }, // Assuming valid date format
  { kode: "04", created_at: null, tanggal_lunas: null },
  { kode: "05", created_at: null, tanggal_lunas: null },
  { kode: "06", created_at: null, tanggal_lunas: null },
  { kode: "07", created_at: null, tanggal_lunas: null },
  { kode: "08", created_at: null, tanggal_lunas: null },
  { kode: "09", created_at: null, tanggal_lunas: null },
  { kode: "10", created_at: null, tanggal_lunas: null },
  { kode: "11", created_at: null, tanggal_lunas: null },
  { kode: "12", created_at: null, tanggal_lunas: null },
];
