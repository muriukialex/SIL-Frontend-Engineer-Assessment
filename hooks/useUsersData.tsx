import { getUsers } from "@/service/requests"
import useSWR from "swr"

const useUsersData = () => {
  const { data, error, mutate, isLoading } = useSWR(
    ["/users"],
    ([url]: [url: string]) => getUsers({ url }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default useUsersData
