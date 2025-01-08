"use server"

import { loginOrRegister } from "@/actions/login"
import { getKindeClient, sessionManager } from "@/app/kinde"
import { mightFail } from "might-fail"

export async function GET(request: Request) {
  const cookies = new Map<string, string>(
    request.headers
      .get("cookie")
      ?.split("; ")
      .map((cookie) => cookie.split("=")) as [string, string][]
  )
  const manager = sessionManager()
  const expectedState = await manager.getSessionItem("auth_state")
  const url = new URL(request.url)
  const receivedState = url.searchParams.get("state")

  if (expectedState !== receivedState) {
    return new Response("Bad request: State mismatch", { status: 400 })
  }
  if (!expectedState || !receivedState) {
    return new Response("Bad request: Missing State", { status: 400 })
  }

  await getKindeClient().handleRedirectToApp(manager, url)
  const kindeUser = await getKindeClient().getUser(manager)
  if (!kindeUser.family_name) {
    kindeUser.family_name = ""
  }
  if (!kindeUser.given_name) {
    kindeUser.given_name = ""
  }

  const [loginRegisterError, loginRegisterResult] = await mightFail(
    loginOrRegister(kindeUser)
  )
  if (loginRegisterError) {
    return new Response("Bad Request: failed to login / register", {
      status: 400,
    })
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  })
}
