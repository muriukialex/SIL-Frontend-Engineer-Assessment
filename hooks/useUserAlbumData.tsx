import { getUserAlbums } from "@/service/requests"
import useSWR from "swr"

const useUserAlbumData = ({ params }: { params: { userId: string } }) => {
  const { data, error, mutate, isLoading } = useSWR(
    ["/albums", params],
    ([url, params]: [url: string, params: { userId: string }]) =>
      getUserAlbums({ url, params }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default useUserAlbumData
