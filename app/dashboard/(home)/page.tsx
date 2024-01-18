"use client"

import {
  Albums,
  HamburgerIcon,
  LoadingAlbum,
  LoadingUsers,
  SignOutIcon,
  UsersMenu,
} from "@/components"
import useAllAlbumsData from "@/hooks/useAllAlbumsData"
import useUserAlbumData from "@/hooks/useUserAlbumData"
import useUsersData from "@/hooks/useUsersData"
import defaultParams from "@/lib/default-params"
import type { ButtonStatusType } from "@/types/Common"
import type { Album } from "@/types/Responses"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface SectionType {
  section: "userAlbums" | "allAlbums"
}

const getUserSelection = () => {
  return localStorage.getItem("selectedUser")
}

const HomePage = () => {
  const { data: session } = useSession()
  const [selectedUser, setSelectedUser] = useState<number>(
    Number(getUserSelection()) ? Number(getUserSelection()) : 1,
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const [activeSection, setActiveSection] = useState<SectionType>({
    section: "userAlbums",
  })
  const setUserSelection = (selectedUser: number) => {
    localStorage.setItem("selectedUser", selectedUser.toString())
  }
  const [buttonStatus, setButtonStatus] = useState<ButtonStatusType>({
    status: "idle",
  })

  const {
    isLoading: userDataLoading,
    data: userData,
    error: userDataError,
    mutate: refreshUserData,
  } = useUsersData()

  const {
    isLoading: userAlbumLoading,
    data: userAlbumData,
    error: userAlbumError,
    mutate: refreshUserAlbum,
  } = useUserAlbumData({
    params: {
      userId: selectedUser.toString(),
    },
  })

  const [albumParams, updateAlbumParams] = useState(defaultParams)
  const [albums, updateAlbums] = useState<Array<Album>>([])

  const {
    isLoading: albumsLoading,
    data: albumsData,
    error: albumsError,
    mutate: refreshAlbumsData,
  } = useAllAlbumsData({
    params: albumParams,
  })

  const handleLoadMoreAlbums = () => {
    // all albums are 100, no need to continue updating the params once that's reached
    if (albums.length < 100) {
      updateAlbumParams((prevParams) => ({
        ...prevParams,
        _start: prevParams._start + prevParams._limit,
        _limit: prevParams._limit + 10,
      }))
    }
  }

  const handleSignOut = async () => {
    setButtonStatus({
      status: "submitting",
    })

    try {
      signOut()
    } catch (error) {
      console.error(error)
      setButtonStatus({
        status: "idle",
      })
    }
  }

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId)
    setUserSelection(userId)
    toggleMenu()
  }

  const handleActiveSection = (activeSection: SectionType) => {
    setActiveSection(activeSection)
    toggleMenu()
  }

  const UserMenuContent = () => {
    if (userDataLoading) {
      const loadingUsers = []
      for (let idx = 0; idx < 10; idx++) {
        loadingUsers.push(<LoadingUsers key={idx} />)
      }
      return loadingUsers
    }
    if (userDataError) {
      return (
        <div>
          <button
            className="rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
            onClick={() => refreshUserData()}
          >
            Refresh user data
          </button>
        </div>
      )
    }

    return (
      <UsersMenu
        selectedUser={selectedUser}
        handleUserClick={handleUserClick}
        users={userData?.data}
        handleActiveSection={handleActiveSection}
        activeSection={activeSection}
      />
    )
  }

  const UserAlbumsContent = () => {
    if (userAlbumLoading) {
      const loadingAlbums = []
      for (let idx = 0; idx < 7; idx++) {
        loadingAlbums.push(<LoadingAlbum key={idx} />)
      }
      return loadingAlbums
    }
    if (userAlbumError) {
      return (
        <div>
          <button
            className="rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
            onClick={() => refreshUserAlbum()}
          >
            Refresh user's album data
          </button>
        </div>
      )
    }

    return <Albums albums={userAlbumData?.data} />
  }

  const AllAlbumsContent = () => {
    if (albumsLoading && albums.length === 0) {
      const loadingAlbums = []
      for (let idx = 0; idx < 10; idx++) {
        loadingAlbums.push(<LoadingAlbum key={idx} />)
      }
      return loadingAlbums
    }
    if (albumsError) {
      return (
        <div>
          <button
            className="rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
            onClick={() => refreshAlbumsData()}
          >
            Refresh albums data
          </button>
        </div>
      )
    }

    return <Albums albums={albums} />
  }

  useEffect(() => {
    if (albumsData?.data) {
      updateAlbums((prevAlbums) => {
        const filteredAlbums = albumsData?.data.filter(
          (album: { id: number }) =>
            !prevAlbums.some((prevAlbum) => prevAlbum.id === album.id),
        )
        return [...prevAlbums, ...filteredAlbums]
      })
    }
  }, [albumsData])

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-50 lg:block">
        {/* Content for large screens */}
        <div className="flex max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <h1 className="font-semibold">User Posts</h1>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <UserMenuContent />
            </nav>
          </div>
          <div className="flex h-[60px] items-center border-b px-6">
            <h1 className="font-semibold">Albums</h1>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 ${
                  activeSection.section === "allAlbums" ? "bg-slate-600" : ""
                }`}
                href="#"
                onClick={() => handleActiveSection({ section: "allAlbums" })}
              >
                All albums
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        {/* Content for mobile screens */}
        <div className="flex items-center justify-between bg-gray-50 px-6 py-4">
          <h1 className="font-semibold">SIL- Frontend Engineer Assessment</h1>
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:text-gray-900 focus:outline-none"
          >
            <HamburgerIcon />
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-b bg-gray-50">
            <div className="flex h-[60px] items-center px-6">
              <h1 className="font-semibold">User Posts</h1>
            </div>
            <div className="overflow-auto px-4 py-2">
              <nav className="text-sm font-medium">
                <UserMenuContent />
              </nav>
            </div>
            <div className="flex h-[60px] items-center border-y px-6">
              <h1 className="font-semibold">Albums</h1>
            </div>
            <div className="overflow-auto px-4 py-2">
              <nav className="text-sm font-medium">
                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 ${
                    activeSection.section === "allAlbums" ? "bg-slate-600" : ""
                  }`}
                  href="#"
                  onClick={() => handleActiveSection({ section: "allAlbums" })}
                >
                  All albums
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
      <div className="relative flex flex-col">
        <div className="absolute left-1/2 top-2 text-center">
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              className="mx-auto w-8 rounded-full"
              alt={session?.user?.image + " avatar"}
              width="50"
              height="50"
            />
          )}
          <h5 className="text-xs leading-tight">{session?.user?.name}</h5>
        </div>
        <button
          onClick={() => handleSignOut()}
          disabled={buttonStatus.status === "submitting"}
          className="absolute right-6 top-2 rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SignOutIcon className="mr-2 inline size-5" />
          {buttonStatus.status === "submitting" ? "Signing out..." : "Sign Out"}
        </button>
        {activeSection.section === "userAlbums" ? (
          <main className="mt-12 flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="mb-2 flex justify-between text-gray-600">
              <div>
                User has [
                {userAlbumData?.data ? userAlbumData?.data.length : " _ "}]
                albums
              </div>
              <Link
                className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700 dark:text-white"
                href={`/dashboard/user/${selectedUser}`}
              >
                About this user
              </Link>
            </div>
            <UserAlbumsContent />
          </main>
        ) : (
          <main className="mt-12 flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="mb-2 flex justify-between text-gray-600">
              <div>Albums</div>
            </div>
            <AllAlbumsContent />
            {albums.length < 100 && (
              <button
                className="bg-gray-500 p-2 hover:bg-gray-700 disabled:opacity-50 dark:text-white"
                onClick={() => handleLoadMoreAlbums()}
                disabled={albumsLoading}
              >
                {albumsLoading ? "Loading albums..." : "Load more"}
              </button>
            )}
          </main>
        )}
      </div>
    </div>
  )
}

export default HomePage
