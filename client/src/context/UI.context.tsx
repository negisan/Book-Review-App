import React, { useContext, useState } from 'react'

const UIContext = React.createContext<any | null>(null)

export const UIProvider = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  console.log(isSidebarOpen)

  return (
    <UIContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = () => {
  return useContext(UIContext)
}
