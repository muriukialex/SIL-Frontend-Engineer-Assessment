"use client"

import { LoadingUserData as LoadingAlbumData } from "@/components"
import usePhotoDetailsData from "@/hooks/usePhotoDetailsData"
import { updatePhotoTitle } from "@/service/requests"
import type { ButtonStatusType } from "@/types/Common"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const AlbumPage = ({ params }: { params: { photoId: string } }) => {
  const photoId = params.photoId
  const { data, isLoading, error, mutate } = usePhotoDetailsData({
    photoId,
  })
  const [buttonStatus, setButtonStatus] = useState<ButtonStatusType>({
    status: "idle",
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<{ title: string }>({
    defaultValues: {
      title: data?.data.title,
    },
  })

  const handleFormSubmit = async (data: { title: string }) => {
    setButtonStatus({
      status: "submitting",
    })

    try {
      const response = await updatePhotoTitle({
        data: data,
        photoId: Number(photoId),
      })
      const responseData = await response.data
      if (responseData.id) {
        // title is not updated since the JSON placeholder service only acts as a mockserver
        toast.success(
          "Successfully updated photo title, but the title isn't really updated",
        )
        mutate()
        setButtonStatus({
          status: "idle",
        })
      }
    } catch (error) {
      throw new Error("Something went wrong updating this photo's title")
    }
  }

  const AlbumPhotosContent = () => {
    if (isLoading) {
      return <LoadingAlbumData />
    }
    if (error) {
      return (
        <div>
          <button
            className="my-4 rounded-md border-2 bg-white p-2 text-center text-sm text-gray-500 hover:bg-gray-100"
            onClick={() => mutate()}
          >
            Refetch photo
          </button>
        </div>
      )
    }

    return (
      <div className="mt-6">
        {data?.data && (
          <div>
            <h1 className="my-4 text-lg font-medium md:text-xl">
              {data?.data.title}
            </h1>
            <Image
              alt={data?.data.title}
              src={data?.data.url}
              width="320"
              height="320"
            />
            <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4">
              <div>
                <label htmlFor="title">Edit image title</label>
                <input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Image title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:placeholder:text-gray-400"
                  type="text"
                />

                {errors.title && (
                  <span className="text-sm text-red-500" role="alert">
                    This field is required
                  </span>
                )}
              </div>
              <button
                onClick={handleSubmit(handleFormSubmit)}
                disabled={buttonStatus.status === "submitting" || !isDirty}
                className="my-4 rounded-md border-none bg-blue-500 p-2 text-center text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {buttonStatus.status === "submitting"
                  ? "Updating image title..."
                  : "Update image title"}
              </button>
            </form>
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (data?.data.title) {
      setValue("title", data?.data.title)
    }
  }, [data?.data])

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
      <AlbumPhotosContent />
    </div>
  )
}

export default AlbumPage
