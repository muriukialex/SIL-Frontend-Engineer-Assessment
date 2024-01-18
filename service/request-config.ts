import type { AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"

const endpoint = process.env.NEXT_PUBLIC_API_URL

const request = async function <T>(
  req: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    const response = await axios(req)
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      const {
        status,
        data: { error_message, ...rest },
      } = e.response
      const err = {
        status,
        errorMessage:
          error_message || "Failed to perform request, please try again.",
        ...rest,
      }
      throw err
    } else {
      const errObject = e.toJSON()
      const err = {
        status: errObject.code,
        errorMessage: errObject.message,
        isNetworkError: true,
      }
      throw err
    }
  }
}

type RequestParameters = {
  url: string
  params?: object
  data?: object
}

/* eslint-disable @typescript-eslint/no-extraneous-class */
class Request {
  static async get<T>({
    params = {},
    url,
  }: RequestParameters): Promise<AxiosResponse<T>> {
    return request({
      method: "GET",
      url: endpoint + url,
      params,
    })
  }

  static async put<T>({
    data = {},
    url,
  }: RequestParameters): Promise<AxiosResponse<T>> {
    return request({
      method: "PUT",
      url: endpoint + url,
      data,
    })
  }
}

export default Request
