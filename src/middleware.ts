import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getKindeClient, sessionManager } from "./app/kinde"
import { decrypt, updateSession } from "./lib/session"

export async function middleware(req: NextRequest) {
  const manager = sessionManager()
  const isAuthenticated = await getKindeClient().isAuthenticated(manager)
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  const refreshToken = req.cookies.get("refresh_token")?.value
  const refreshTokenDecrypted = refreshToken
    ? await decrypt(refreshToken)
    : null
  if (!refreshTokenDecrypted) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (Math.floor(Date.now() / 1000) <= refreshTokenDecrypted.exp) {
    return await updateSession(req)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
