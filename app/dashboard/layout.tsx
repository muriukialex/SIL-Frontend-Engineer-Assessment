"use client"

import AuthGuardProvider from "@/providers/AuthGuardProvider"
import AuthSessionProvider from "@/providers/AuthSessionProvider"
import { Toaster } from "react-hot-toast"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthSessionProvider>
      <AuthGuardProvider>
        <Toaster />
        {children}
      </AuthGuardProvider>
    </AuthSessionProvider>
  )
}

export default RootLayout
