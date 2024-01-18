"use client"

import {
  AlbumPhotoCard,
  LoadingUserData as LoadingAlbumData,
} from "@/components"
import useAlbumDetailsData from "@/hooks/useAlbumDetailsData"
import useAlbumsPhotoData from "@/hooks/useAlbumsPhotoData"
import defaultParams from "@/lib/default-params"
import type { AlbumPhoto } from "@/types/Responses"
import Link from "next/link"
import { useEffect, useState } from "react"

const AlbumPage = ({ params }: { params: { albumId: string } }) => {
  const albumId = params.albumId
  const { data, isLoading, error, mutate } = useAlbumDetailsData({
    albumId,
  })

  const [albumPhotosParams, updateAlbumPhotosParams] = useState(defaultParams)
  const [albumPhotos, updateAlbumPhotos] = useState<Array<AlbumPhoto>>([])

  const {
    isLoading: albumPhotosLoading,
    data: albumPhotosData,
    error: albumPhotosError,
    mutate: refreshAlbumPhotos,
  } = useAlbumsPhotoData({
    params: {
      albumId,
      ...albumPhotosParams,
    },
  })

  const handleLoadMoreAlbumPhotos = () => {
    updateAlbumPhotosParams((prevParams) => ({
      ...prevParams,
      _start: prevParams._start + prevParams._limit,
      _limit: prevParams._limit + 10,
    }))
  }

  const AlbumDetailsContent = () => {
    if (isLoading) {
      return (
        <div className="mt-6">
          <LoadingAlbumData />
        </div>
      )
    }
    if (error) {
      return (
        <button
          className="my-4 rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
          onClick={() => mutate()}
        >
          Refresh album data
        </button>
      )
    }
    return (
      data?.data && (
        <>
          <div className="mt-4 flex items-center justify-center p-4 text-xl font-light">
            <h1>Album Title: {data?.data?.title}</h1>
          </div>
        </>
      )
    )
  }

  const AlbumPhotosContent = () => {
    if (albumPhotosLoading && albumPhotos.length === 0) {
      const loadingAlbums = []
      for (let idx = 0; idx < 7; idx++) {
        loadingAlbums.push(<LoadingAlbumData key={idx} />)
      }
      return loadingAlbums
    }
    if (albumPhotosError) {
      return (
        <div>
          <button
            className="my-4 rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
            onClick={() => refreshAlbumPhotos()}
          >
            Refresh album photos data
          </button>
        </div>
      )
    }

    return (
      <div className="grid justify-center md:grid-cols-2">
        {albumPhotos.map((photo) => (
          <AlbumPhotoCard
            key={photo.id}
            albumId={photo.albumId}
            id={photo.id}
            thumbnailUrl={photo.thumbnailUrl}
            url={photo.url}
            title={photo.title}
          />
        ))}
      </div>
    )
  }

  useEffect(() => {
    if (albumPhotosData?.data) {
      updateAlbumPhotos((prevAlbums) => {
        const filteredAlbums = albumPhotosData?.data.filter(
          (album) => !prevAlbums.some((prevAlbum) => prevAlbum.id === album.id),
        )
        return [...prevAlbums, ...filteredAlbums]
      })
    }
  }, [albumPhotosData])

  return (
    <div className="m-auto flex max-w-screen-md flex-col">
      <div className="ml-4 mt-8 md:ml-0">
        <Link
          className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700 dark:text-white"
          href="/dashboard"
        >
          {"<-"} Back to dashboard
        </Link>
      </div>
      <AlbumDetailsContent />
      <AlbumPhotosContent />
      <div className="mb-6 flex items-center justify-center">
        {albumPhotos.length < 100 && (
          <button
            className="bg-gray-500 p-2 hover:bg-gray-700 disabled:opacity-50 dark:text-white"
            onClick={() => handleLoadMoreAlbumPhotos()}
            disabled={albumPhotosLoading}
          >
            {albumPhotosLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  )
}

export default AlbumPage
