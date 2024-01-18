import { getPhotoDetails } from "@/service/requests"
import useSWR from "swr"

const usePhotoDetailsData = ({ photoId }: { photoId: string }) => {
  const { data, error, mutate, isLoading } = useSWR(
    [`/photos/${photoId}`],
    ([url]: [url: string]) => getPhotoDetails({ url }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default usePhotoDetailsData
