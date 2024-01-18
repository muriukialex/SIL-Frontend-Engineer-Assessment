"use client"

import { GoogleIcon } from "@/components"
import { shimmer, toBase64 } from "@/lib/next-image-config"
import type { ButtonStatusType } from "@/types/Common"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

const SignInPage = () => {
  const [buttonStatus, setButtonStatus] = useState<ButtonStatusType>({
    status: "idle",
  })
  const handleSignIn = async () => {
    setButtonStatus({
      status: "submitting",
    })

    try {
      signIn("google")
    } catch (error) {
      console.error(error)
      setButtonStatus({
        status: "idle",
      })
    }
  }

  return (
    <div className="lg:flex">
      <div className="flex h-screen items-center justify-center bg-gray-100 p-8 lg:min-h-screen lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              This application provides a user-friendly interface for
              interacting with user data, albums, and photos.
            </p>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <button
                onClick={() => handleSignIn()}
                disabled={buttonStatus.status === "submitting"}
                className="w-full rounded-md border-2 bg-white p-4 text-center text-sm text-gray-500 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <GoogleIcon className="mr-2 inline size-5" />
                {buttonStatus.status === "submitting"
                  ? "Signing in..."
                  : "Sign in with Google"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-screen w-1/2 bg-gray-50 lg:block">
        <Image
          alt="SIL Frontend Engineer Assessment - Login Image"
          className="absolute inset-0 size-full object-contain"
          height="500"
          width="500"
          src="/sign_in_illustration.png"
          style={{
            aspectRatio: "500/500",
          }}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(100, 100),
          )}`}
        />
      </div>
    </div>
  )
}

export default SignInPage
