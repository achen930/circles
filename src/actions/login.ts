"use server"
import { AuthUrlParams, type OAuthMethods } from "@/types/auth"

export const emailLogin = async (email: string) => {
  if (!email) {
    return { error: "Missing email" }
  }
  const authUrlParams: AuthUrlParams = {
    connection_id: process.env.KINDE_EMAIL_CONNECTION_ID!,
    login_hint: email,
  }
}

export const oAuthLogin = async (method: OAuthMethods) => {
  let connection_id: string
  switch (method) {
    case "google": {
      connection_id = process.env.KINDE_GOOGLE_CONNECTION_ID!
      break
    }
    case "facebook": {
      connection_id = process.env.KINDE_FACEBOOK_CONNECTION_ID!
      break
    }
    case "apple": {
      connection_id = process.env.KINDE_APPLE_CONNECTION_ID!
      break
    }
    default: {
      connection_id = ""
    }
  }
  if (!connection_id) {
    return { error: "Failed to set OAuth method." }
  }
  const authUrlParams = {
    connection_id,
  }
}
