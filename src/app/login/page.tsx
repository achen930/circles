"use client"
import { emailLogin, oAuthLogin } from "@/actions/login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await emailLogin(email)
  }
  return (
    <>
      <div className="px-7 flex flex-col gap-4 py-7 min-w-[430px]">
        <div className="rounded-full bg-blue-400 w-[240px] h-[240px] self-center" />
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
            onClick={async () => await oAuthLogin("google")}
          >
            Google
          </Button>
          <Button
            className="rounded-full h-16 w-16"
            onClick={async () => await oAuthLogin("apple")}
          >
            Apple
          </Button>
          <Button
            className="rounded-full h-16 w-16"
            onClick={async () => await oAuthLogin("facebook")}
          >
            Facebook
          </Button>
        </div>
      </div>
    </>
  )
}
