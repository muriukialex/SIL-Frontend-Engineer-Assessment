import { getAllAlbums } from "@/service/requests"
import type { RequestParamsType } from "@/types/Common"
import useSWR from "swr"

const useAllAlbumsData = ({ params }: { params: RequestParamsType }) => {
  const { data, error, mutate, isLoading } = useSWR(
    ["/albums", params],
    ([url, params]: [url: string, params: RequestParamsType]) =>
      getAllAlbums({ url, params }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default useAllAlbumsData
