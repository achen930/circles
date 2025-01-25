"use client"
import { usePathname } from "next/navigation"
import { useHeader } from "./headerContext"
import Link from "next/link"

export default function Header() {
  const { pageName, backAction } = useHeader()

  const pathName = usePathname()

  if (pathName === "/login") return null

  console.log(backAction)

  return (
    <header className="flex items-center justify-between w-full h-[105px] px-4">
      {backAction &&
        (typeof backAction === "string" ? (
          <Link href={backAction} aria-label="Go Back">
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.4203 8.13983H1M1 8.13983L7.38827 1M1 8.13983L7.38827 15.2797"
                stroke="#0E0E0E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <button onClick={backAction} aria-label="Go Back">
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.4203 8.13983H1M1 8.13983L7.38827 1M1 8.13983L7.38827 15.2797"
                stroke="#0E0E0E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      <h1 className="text-lg font-bold">{pageName}</h1>
    </header>
  )
}
