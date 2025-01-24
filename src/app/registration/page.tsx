"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from "react"
import { useHeader } from "@/components/shared/headerContext"

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const { setHeaderProps } = useHeader()

  useEffect(() => {
    if (currentStep === 1) {
      setHeaderProps({ backAction: "/" })
    } else if (currentStep === 2) {
      setHeaderProps({ backAction: () => setCurrentStep(1) })
    }
  }, [currentStep, setHeaderProps])

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  return (
    <div className="px-2 flex flex-col gap-4 py-2 min-w-[360px] h-full justify-between">
      {currentStep === 1 && (
        <Step1 email={email} setEmail={setEmail} nextStep={nextStep} />
      )}
      {currentStep === 2 && (
        <Step2
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          nextStep={nextStep}
        />
      )}
    </div>
  )
}

function Step1({
  email,
  setEmail,
  nextStep,
}: {
  email: string
  setEmail: (value: string) => void
  nextStep: () => void
}) {
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  return (
    <div className="px-2 flex flex-col gap-4 py-2 min-w-[360px] h-full justify-between">
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
        </div>
      </div>
      <Button
        className="rounded-full w-full h-11 bg-accent-blue mb-2"
        onClick={nextStep}
        disabled={!email}
      >
        Next
      </Button>
    </div>
  )
}

function Step2({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  nextStep,
}: {
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  nextStep: () => void
}) {
  const handleFirstNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value)
  }

  const handleLastNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value)
  }

  return (
    <div className="px-2 flex flex-col gap-4 py-2 min-w-[360px] h-full justify-between">
      <div>
        <h1 className="font-medium text-4xl mb-2">What's your name?</h1>
        <p className="text-17 text-black/75">
          Add your name so friends can find you easier.
        </p>
        <div className="flex flex-col gap-4 mt-[81px]">
          <label htmlFor="firstName">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            className="rounded-full"
          ></Input>
          <label htmlFor="lastName">Last Name</label>
          <Input
            id="lastName"
            name="firstName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            className="rounded-full"
          ></Input>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <Button
          className="rounded-full w-full h-11 bg-accent-blue"
          onClick={nextStep}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
