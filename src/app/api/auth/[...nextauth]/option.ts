import { checkSiswa } from "@/helper/server";
import { Siswa } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const option: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      // @ts-ignore
      async authorize(
        credentials: Record<"nis" | "password", string | string>,
        req
      ) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // If no error and we have user data, return it

        const admin = {
          nis: "admin",
          password: "admin123",
        };

        if (
          credentials.nis === admin.nis &&
          credentials.password === admin.password
        ) {
          return admin;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        return { ...token };
      }
      return token;
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
