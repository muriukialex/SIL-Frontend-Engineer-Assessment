"use client"

import { FullPageLoading } from "@/components"
import links from "@/lib/links"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const AuthGuardProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      push(links.sign_in)
    },
  })

  if (status === "loading") {
    return <FullPageLoading />
  }

  return children
}

export default AuthGuardProvider
