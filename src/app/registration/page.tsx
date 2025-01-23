"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Header from "@/components/shared/header"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [emailConfirmation, setEmailConfirmation] = useState("")

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handleEmailConfirmationChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setEmailConfirmation(event.currentTarget.value)
  }

  return (
    <div className="px-7 flex flex-col gap-4 py-7 min-w-[360px] h-full justify-between">
      <div>
        <h1 className="font-medium text-4xl mb-2">Enter your Email</h1>
        <p className="text-17 text-black/75">
          Enter the email where you can be contacted. No one will see this on
          your profile.
        </p>
        <div className="flex flex-col gap-4 mt-[81px]">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="rounded-full"
          ></Input>
          <label htmlFor="emailConfirmation">Confirm Email</label>
          <Input
            id="emailConfirmation"
            name="emailConfirmation"
            type="emailConfirmation"
            value={emailConfirmation}
            onChange={handleEmailConfirmationChange}
            placeholder="Email"
            className="rounded-full"
          ></Input>
        </div>
      </div>
      <Button className="rounded-full w-full h-11 bg-accent-blue mb-2">
        Next
      </Button>
    </div>
  )
}
