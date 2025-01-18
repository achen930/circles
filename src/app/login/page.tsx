"use client"
import { emailLogin, oAuthLogin } from "@/actions/login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OAuthMethods } from "@/types/auth"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const errOrUndefined = await emailLogin(email)
    if (errOrUndefined) {
      setError(errOrUndefined.error)
    }
  }
  const handleOAuthButton = async (method: OAuthMethods) => {
    setError("")
    const errOrUndefined = await oAuthLogin(method)
    if (errOrUndefined) {
      setError(errOrUndefined.error)
    }
  }
  return (
    <>
      <div className="px-7 flex flex-col gap-4 py-7 min-w-[430px]">
        <div className="rounded-full bg-blue-400 w-[240px] h-[240px] self-center" />
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@outlook.com"
              className="rounded-full"
            />
          </div>
          <Button className="rounded-full w-full" type="submit">
            Login
          </Button>
        </form>
        <p className="self-center">or</p>
        <div className="flex self-center gap-2">
          <Button
            className="rounded-full h-16 w-16"
            onClick={async () => await handleOAuthButton("google")}
          >
            Google
          </Button>
          <Button
            className="rounded-full h-16 w-16"
            onClick={async () => await handleOAuthButton("apple")}
          >
            Apple
          </Button>
          <Button
            className="rounded-full h-16 w-16"
            onClick={async () => await handleOAuthButton("facebook")}
          >
            Facebook
          </Button>
        </div>
      </div>
    </>
  )
}
