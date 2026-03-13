import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user
    },
  },
  session: {
    strategy: "jwt"
  }
}