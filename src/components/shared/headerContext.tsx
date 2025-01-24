"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
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
  const [state, setState] = useState({
    pageName: null as string | null,
    backAction: null as (() => void) | string | null,
  })

  const setHeaderProps = useCallback(
    (props: {
      pageName?: string | null
      backAction?: (() => void) | string | null
    }) => {
      setState((prevState) => ({
        pageName: props.pageName ?? prevState.pageName,
        backAction: props.backAction ?? prevState.backAction,
      }))
    },
    []
  )

  return (
    <HeaderContext.Provider
      value={{
        pageName: state.pageName,
        backAction: state.backAction,
        setHeaderProps,
      }}
    >
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
