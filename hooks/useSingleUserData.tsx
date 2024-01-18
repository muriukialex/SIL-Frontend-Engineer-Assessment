import { getSingleUser } from "@/service/requests"
import useSWR from "swr"

const useSingleUserData = ({ userId }: { userId: string }) => {
  const { data, error, mutate, isLoading } = useSWR(
    [`/users/${userId}`],
    ([url]: [url: string]) => getSingleUser({ url }),
  )

  return {
    isLoading,
    data,
    error,
    mutate,
  }
}

export default useSingleUserData
