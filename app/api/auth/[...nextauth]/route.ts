import links from "@/lib/links"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: links.sign_in,
  },
  callbacks: {
    async redirect() {
      return links.dashboard
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
