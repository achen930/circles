import { decrypt, encrypt } from "@/lib/session"
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
    let valueDecrypted
    if (value) {
      valueDecrypted = await decrypt(value)
    }
    return valueDecrypted
      ? decodeURIComponent(valueDecrypted.cookieValue)
      : null
  },
  async setSessionItem(
    key: string,
    value: unknown,
    expiration = new Date(Date.now() + 60 * 60 * 1000)
  ) {
    const cookieValue = encodeURIComponent(
      typeof value === "string" ? value : JSON.stringify(value)
    )
    const cookieValueEncrypted = await encrypt({
      cookieValue,
      expires: expiration,
    })
    const cookieStore = await cookies()
    cookieStore.set(key, cookieValueEncrypted, {
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
