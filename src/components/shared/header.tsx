"use client"
import { usePathname } from "next/navigation"

export default function Header(props: {
  pageName?: string
  leftNavigation?: React.ReactElement
  rightNavigation?: React.ReactElement
}) {
  const pathName = usePathname()
  let backLocation

  console.log(pathName)
  if (pathName === "/login") {
    return null
  }

  return (
    <div className="flex flex-col w-full h-[105px]">
      <div className="flex flex-1"></div>
    </div>
  )
}
