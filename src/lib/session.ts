import { jwtVerify, SignJWT } from "jose"
import { NextRequest, NextResponse } from "next/server"

const key = new TextEncoder().encode(process.env.SECRET_KEY)

export async function encrypt(payload: any, expiry = "1 hour") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function updateSession(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value
  const idToken = request.cookies.get("id_token")?.value
  const SID = request.cookies.get("SID")?.value
  if (!accessToken || !idToken || !SID) {
    return
  }

  const decryptedAT = await decrypt(accessToken)
  const decryptedIT = await decrypt(idToken)
  const decryptedSID = await decrypt(SID)

  const res = NextResponse.next()
  res.cookies.set({
    name: "access_token",
    value: await encrypt(decryptedAT),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 10 * 60 * 1000),
  })
  res.cookies.set({
    name: "id_token",
    value: await encrypt(decryptedIT),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 10 * 60 * 1000),
  })
  res.cookies.set({
    name: "SID",
    value: await encrypt(decryptedSID),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 10 * 60 * 1000),
  })
  return res
}
