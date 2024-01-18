import { getAlbumsPhoto } from "@/service/requests"
import useSWR from "swr"

const useAlbumsPhotoData = ({
  params,
}: {
  params: { albumId: string; _start: number; _limit: number }
}) => {
  const { data, error, mutate, isLoading } = useSWR(
    ["/photos", params],
    ([url, params]: [
      url: string,
      params: { albumId: string; _start: number; _limit: number },
    ]) => getAlbumsPhoto({ url, params }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default useAlbumsPhotoData
