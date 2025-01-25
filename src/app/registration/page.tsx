"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState, useEffect, useRef } from "react"
import { useHeader } from "@/components/shared/headerContext"
import { isUsernameUnique } from "@/actions/login"

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const { setHeaderProps } = useHeader()

  useEffect(() => {
    const stepActions: Record<number, { backAction: string | (() => void) }> = {
      1: { backAction: "/" },
      2: { backAction: () => setCurrentStep(1) },
      3: { backAction: () => setCurrentStep(2) },
      4: { backAction: () => setCurrentStep(3) },
      5: { backAction: () => setCurrentStep(4) },
    }

    if (currentStep in stepActions) {
      setHeaderProps(stepActions[currentStep])
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
      {currentStep === 3 && (
        <Step3
          username={username}
          setUsername={setUsername}
          nextStep={nextStep}
        />
      )}
      {currentStep === 4 && (
        <Step4
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          nextStep={nextStep}
        />
      )}
      {currentStep === 5 && <Step5 profilePicture={profilePicture} />}
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
      <div className="min-h-[256px]">
        <h1 className="font-medium text-4xl mb-2">Enter your Email</h1>
        <p className="text-17 text-black/75 h-[51px]">
          Enter the email where you can be contacted. No one will see this on
          your profile.
        </p>
        <div className="flex flex-col gap-2 mt-[81px]">
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
        className="rounded-full w-full h-11 bg-accent-blue"
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
      <div className="min-h-[256px]">
        <h1 className="font-medium text-4xl mb-2">What's your name?</h1>
        <p className="text-17 text-black/75 h-[51px]">
          Add your name so friends can find you easier.
        </p>
        <div className="flex flex-col gap-2 mt-[81px]">
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
      <div className="flex flex-col justify-between">
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

function Step3({
  username,
  setUsername,
  nextStep,
}: {
  username: string
  setUsername: (value: string) => void
  nextStep: () => void
}) {
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }

  const handleNextStep = async () => {
    setIsLoading(true)
    const isUnique = await isUsernameUnique(username)

    if (!isUnique) {
      setIsUsernameValid(false)
      setErrorMessage("Username is already taken. Please choose another.")
    } else {
      setIsUsernameValid(true)
      setErrorMessage("")
      nextStep()
    }

    setIsLoading(false)
  }

  return (
    <div className="px-2 flex flex-col gap-4 py-2 min-w-[360px] h-full justify-between">
      <div className="min-h-[256px]">
        <h1 className="font-medium text-4xl mb-2">Create a username</h1>
        <p className="text-17 text-black/75 h-[51px]">
          Add a username. You can change this at any time.
        </p>
        <div className="flex flex-col gap-2 mt-[81px]">
          <label htmlFor="username">Username</label>
          {!isUsernameValid && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            className="rounded-full"
          />
        </div>
      </div>

      <Button
        className="rounded-full w-full h-11 bg-accent-blue"
        onClick={handleNextStep}
        disabled={!username || isLoading}
      >
        {isLoading ? "Checking..." : "Next"}
      </Button>
    </div>
  )
}

function Step4({
  profilePicture,
  setProfilePicture,
  nextStep,
}: {
  profilePicture: string
  setProfilePicture: (value: string) => void
  nextStep: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddPictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      // some file upload
    }
  }

  return (
    <div className="px-2 flex flex-col gap-4 py-2 min-w-[360px] h-full justify-between">
      <div className="min-h-[256px]">
        <h1 className="font-medium text-4xl mb-2">Add a profile picture</h1>
        <p className="text-17 text-black/75 h-[51px]">
          Add a profile picture so your friends know it's you. Everyone will be
          able to see your picture.
        </p>
        <div className="flex flex-col items-center gap-2 mt-[81px]">
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePictureChange}
            accept="image/*"
            className="hidden"
          />
          <img
            src={profilePicture || "/images/placeholder-profile.png"}
            alt="Profile Picture Preview"
            className="w-[180px] h-[176px] object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <Button
          className="rounded-full w-full h-11 bg-accent-blue"
          onClick={handleAddPictureClick}
        >
          Add Picture
        </Button>
        <Button
          className="rounded-full w-full h-11 bg-white text-dark-gray border border-dark-gray"
          onClick={nextStep}
        >
          Skip
        </Button>
      </div>
    </div>
  )
}
function Step5({
  profilePicture,
  handleRegistration,
  handleChangePhoto,
}: {
  profilePicture: string
  handleRegistration: () => void
  handleChangePhoto: () => void
}) {
  return (
    <div className="px-2 flex flex-col gap-4 py-2 min-w-[360px] h-full justify-between">
      <div className="min-h-[256px]">
        <h1 className="font-medium text-4xl mb-2">Profile Picture Added</h1>
        <span className="block text-17 text-black/75 h-[51px]">&nbsp;</span>
        <div className="flex flex-col items-center gap-2 mt-[81px]">
          <img
            src={profilePicture || "/images/placeholder-profile.png"}
            alt="Profile Picture Preview"
            className="w-[180px] h-[176px] object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <Button
          className="rounded-full w-full h-11 bg-accent-blue"
          onClick={handleRegistration}
        >
          Done
        </Button>
        <Button
          className="rounded-full w-full h-11 bg-white text-dark-gray border border-dark-gray"
          onClick={handleChangePhoto}
        >
          Change Photo
        </Button>
      </div>
    </div>
  )
}
