import { Siswa } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import React from "react";


export default async function page() {
  const supabase = createClient();
  const {data:siswa}: PostgrestSingleResponse<Siswa[]> = await supabase.from("siswa").select("*");

  return <div>
    <pre>
      {JSON.stringify(siswa, null, 2)}
    </pre>
  </div>;
}
