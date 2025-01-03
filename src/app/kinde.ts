import {
  createKindeServerClient,
  GrantType,
  SessionManager,
} from "@kinde-oss/kinde-typescript-sdk"
import { cookies, headers } from "next/headers"

const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_REDIRECT_URL!,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL!,
})

export const getKindeClient = () => {
  return kindeClient
}

export const sessionManager = (): SessionManager => ({
  async getSessionItem(key: string) {
    const cookieStore = await cookies()
    const value = cookieStore.get(key)?.value
    return value ? decodeURIComponent(value) : null
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieValue = encodeURIComponent(
      typeof value === "string" ? value : JSON.stringify(value)
    )
    const cookieStore = await cookies()
    cookieStore.set(key, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
  },
  async removeSessionItem(key: string) {
    const cookieStore = await cookies()
    cookieStore.set(key, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
  },
  async destroySession() {
    const reqHeaders = await headers()
    const allCookies = reqHeaders.get("cookie") || ""
    allCookies.split("; ").forEach(async (cookie) => {
      const key = cookie.split("=")[0]
      await this.removeSessionItem(key)
    })
  },
})
