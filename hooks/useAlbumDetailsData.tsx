import { getAlbumDetails } from "@/service/requests"
import useSWR from "swr"

const useAlbumDetailsData = ({ albumId }: { albumId: string }) => {
  const { data, error, mutate, isLoading } = useSWR(
    [`/albums/${albumId}`],
    ([url]: [url: string]) => getAlbumDetails({ url }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default useAlbumDetailsData
