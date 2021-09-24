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

  type ToastType = 'success' | 'error'

  const emitToast = (type: ToastType, message: string) => {
    if (type === 'success' && message !== '') {
      toast.success(`${message}`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
      })
    }
    if (type === 'error' && message !== '') {
      toast.error(`${message}`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
      })
    }
  }

  return (
    <UIContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar, emitToast }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = () => {
  return useContext(UIContext)
}
