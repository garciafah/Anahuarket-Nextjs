import NextAuth from "next-auth"
import { authConfig } from "@/server/auth/authConfig"

const { auth } = NextAuth(authConfig)

export default auth

export const config = {
  matcher: ["/((?!api/auth|login|register|_next/static|_next/image|favicon.ico).*)"],
}
