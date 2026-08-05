import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { connectDB } from "@/lib/mongodb";
import { comparePassword } from "@/lib/password";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.firstName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        if ("role" in user) {
          token.role = user.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
