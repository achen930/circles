"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

type HeaderContextType = {
  pageName?: string | null
  backAction: (() => void) | string | null
  setHeaderProps: (props: {
    pageName?: string | null
    backAction?: (() => void) | string | null
  }) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  console.log("hp")
  const [pageName, setPageName] = useState<string | null>(null)
  const [backAction, setBackAction] = useState<(() => void) | string | null>(
    null
  )

  const setHeaderProps = (props: {
    pageName?: string | null
    backAction?: (() => void) | string | null
  }) => {
    if (props.pageName !== pageName || props.backAction !== backAction) {
      setPageName(props.pageName ?? null)
      setBackAction(props.backAction ?? null)
    }
  }

  return (
    <HeaderContext.Provider value={{ pageName, backAction, setHeaderProps }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider")
  }
  return context
}
