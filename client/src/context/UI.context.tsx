import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

const UIContext = React.createContext<any | null>(null)

export const UIProvider = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const toastSuccess = (message: string) => {
    toast.success(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
    })
  }

  const toastError = (message: string) => {
    toast.error(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
    })
  }

  return (
    <UIContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toastSuccess,
        toastError,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = () => {
  return useContext(UIContext)
}
