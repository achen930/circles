import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getKindeClient, sessionManager } from "./app/kinde"

export async function middleware(req: NextRequest) {
  const manager = sessionManager()
  const isAuthenticated = await getKindeClient().isAuthenticated(manager)
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
