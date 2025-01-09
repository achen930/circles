"use server"
import { getKindeClient, sessionManager } from "@/app/kinde"
import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { AuthUrlParams, type OAuthMethods } from "@/types/auth"
import { type UserType } from "@kinde-oss/kinde-typescript-sdk"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export const emailLogin = async (email: string) => {
  if (!email) {
    return { error: "Missing email" }
  }
  const authUrlParams: AuthUrlParams = {
    connection_id: process.env.KINDE_EMAIL_CONNECTION_ID!,
    login_hint: email,
  }
  return await handleLogin(authUrlParams)
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

  return await handleLogin(authUrlParams)
}

const handleLogin = async (authUrlParams: AuthUrlParams) => {
  const manager = sessionManager()
  const state = crypto.randomUUID().toString()
  await manager.setSessionItem("auth_state", state)

  const loginUrl = await getKindeClient().login(manager, {
    state,
    authUrlParams,
  })
  return redirect(loginUrl.toString())
}

const login = async (kindeUser: UserType) => {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.kindeId, kindeUser.id))
    .get()
}
const register = async (kindeUser: UserType) => {
  const newUser = await db
    .insert(usersTable)
    .values({
      kindeId: kindeUser.id,
      displayName: `${kindeUser.given_name} ${kindeUser.family_name}`.trim(),
      firstName: kindeUser.given_name,
      lastName: kindeUser.family_name,
    })
    .returning()
    .get()
  return newUser
}

export const loginOrRegister = async (kindeUser: UserType) => {
  let user = await login(kindeUser)
  if (!user) {
    user = await register(kindeUser)
  }
  await sessionManager().setSessionItem("SID", user.id)
}

export const getUser = async () => {
  const userId = (await sessionManager().getSessionItem("SID")) as number
  const userData = db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .get()
  return userData
}

export const logout = async () => {
  await sessionManager().destroySession()
  return redirect("/login")
}
