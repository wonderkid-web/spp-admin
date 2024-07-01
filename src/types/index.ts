import { UUID } from "crypto";
import { EmailConfig } from "next-auth/providers/email";

export type Siswa = {
    
        "id": number,
        "created_at": Date,
        "nama": string,
        "nis": string,
        "kelas": string,
        "kode": KodeBayar,
        "password": string;
}

export type KodeBayar = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

export type SixDigitString = `${number}` & {length: 6}

export type SessionUser = {
        nama: string;
        nis: string;
        email: EmailConfig
}

export type Semester = {
        kode: string;
        bulan: string;
}

export type Transaksi = {
        no: number;
        semester: "01" | "02";
        kode: Kode;
        jumlah: number;
        created_at: string;
        status: true | false;
        nama:string;
        kelas: string;
        nis:SixDigitString;
        tahun:number;
        id: UUID;
        tanggal_lunas: string;
}

export type Tahun = 
| "2023"
| "2024"
| "2025"
| "2026"


export type Bulan = 
  | "januari"
  | "februari"
  | "maret"
  | "april"
  | "mei"
  | "juni"
  | "juli"
  | "agustus"
  | "september"
  | "oktober"
  | "november"
  | "desember";

export type Kode = | "01"| "02"| "03"| "04"| "05"| "06"| "07"| "08"| "09"| "10"| "11"| "12"

export type FormLogin = {
        nis: string;
        password: string;
}

export type FormRegister = {
        nis: string;
        password: string;
        kelas: string;
        nama: string;
}