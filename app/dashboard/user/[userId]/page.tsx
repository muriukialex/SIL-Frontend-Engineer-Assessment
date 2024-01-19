"use client"

import { Albums, Card, LoadingAlbum, LoadingUserData } from "@/components"
import useSingleUserData from "@/hooks/useSingleUserData"
import useUserAlbumData from "@/hooks/useUserAlbumData"
import Link from "next/link"

const UserPage = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId
  const { data, isLoading, error, mutate } = useSingleUserData({
    userId,
  })
  const {
    isLoading: userAlbumLoading,
    data: userAlbumData,
    error: userAlbumError,
    mutate: refreshUserAlbum,
  } = useUserAlbumData({
    params: {
      userId,
    },
  })

  const UserContent = () => {
    if (isLoading) {
      return <LoadingUserData />
    }
    if (error) {
      return (
        <button
          className="my-4 rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
          onClick={() => mutate()}
        >
          Refresh user's data
        </button>
      )
    }
    return (
      data?.data && (
        <div className="mb-4">
          <div className="mt-4 flex items-center justify-center">
            <h1 data-testid="name">{data?.data?.name}</h1>
          </div>
          <Card
            username={data?.data.username}
            email={data?.data.email}
            phone={data?.data.phone}
            website={data?.data.website}
          />
        </div>
      )
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

  return (
    <div className="m-auto flex max-w-screen-md flex-col bg-gray-100">
      <div className="ml-4 mt-4">
        <Link
          className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700 dark:text-white"
          href="/dashboard"
        >
          {"<-"} Back to dashboard
        </Link>
      </div>
      <UserContent />
      <UserAlbumsContent />
    </div>
  )
}

export default UserPage
