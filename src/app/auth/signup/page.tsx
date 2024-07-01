"use client";

import Link from "next/link";
import logo from "@/../../public/logo.png";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormRegister } from "@/types";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

function RegisterPage() {
  const { handleSubmit, register } = useForm<FormRegister>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormRegister> = async (form) => {
    // Your registration logic here

    const { error } = await supabase.from("siswa").insert([
      {
        ...form,
        kode: [],
      },
    ]);

    // If registration is successful, redirect to login or home page
    if (!error) {
      router.push('/');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-12 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <div className="w-32 h-6 relative">
            <Image src={logo} alt="logo" objectFit="cover" />
          </div>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Daftar Ke Portal Pembayaran
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  {...register("nama")}
                  type="text"
                  name="nama"
                  id="nama"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nama Kamu"
                />
              </div>
              <div>
                <label
                  htmlFor="nis"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  NIS
                </label>
                <input
                  {...register("nis")}
                  type="text"
                  name="nis"
                  id="nis"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="NIS Kamu"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="kelas"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kelas
                </label>
                <input
                  {...register("kelas")}
                  type="text"
                  name="kelas"
                  id="kelas"
                  placeholder="Kelas Kamu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sudah punya akun? login disini {"->  "}
                <Link
                  href="/login"
                  className="font-medium text-sky-600 hover:underline dark:text-sky-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
