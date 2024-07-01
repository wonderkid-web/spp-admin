"use server"

import { Siswa } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"


export const getDataSiswaServer = async () =>{
    const supabase = createClient()
    const siswa : PostgrestSingleResponse<Siswa[]> = await supabase.from("siswa").select("*")
    return siswa
}


export const checkSiswa = async (seluruhSiswa: Siswa[], selectedSiswa: {nis:string, password:string}) =>
    seluruhSiswa.find((s) => s.nis === selectedSiswa.nis && s.password === selectedSiswa.password) || null