import type { RequestParamsType } from "@/types/Common"
import type {
  Album,
  AlbumPhoto,
  GetAlbumDetailsResponse,
  GetAlbumsResponse,
  GetPhotoDetailsResponse,
  GetSingleUserResponse,
  GetUsersResponse,
  User,
} from "@/types/Responses"
import Request from "./request-config"

export const getUsers = ({
  url,
}: {
  url: string
}): Promise<GetUsersResponse<User>> => {
  return Request.get({
    url,
  })
}

export const getSingleUser = ({
  url,
}: {
  url: string
}): Promise<GetSingleUserResponse> => {
  return Request.get({
    url,
  })
}

export const getUserAlbums = ({
  url,
  params,
}: {
  url: string
  params: { userId: string }
}): Promise<GetAlbumsResponse<Album>> => {
  return Request.get({
    url,
    params,
  })
}

export const getAllAlbums = ({
  url,
  params,
}: {
  url: string
  params: RequestParamsType
}): Promise<GetAlbumsResponse<Album>> => {
  return Request.get({
    url,
    params,
  })
}

export const getAlbumDetails = ({
  url,
}: {
  url: string
}): Promise<GetAlbumDetailsResponse> => {
  return Request.get({
    url,
  })
}

export const getAlbumsPhoto = ({
  url,
  params,
}: {
  url: string
  params: { albumId: string; _start: number; _limit: number }
}): Promise<GetAlbumsResponse<AlbumPhoto>> => {
  return Request.get({
    url,
    params,
  })
}

export const getPhotoDetails = ({
  url,
}: {
  url: string
}): Promise<GetPhotoDetailsResponse> => {
  return Request.get({
    url,
  })
}

export const updatePhotoTitle = ({
  photoId,
  data,
}: {
  photoId: number
  data: { title: string }
}) => {
  return Request.put<
    Promise<{
      title: string
      id: number
    }>
  >({
    url: `/photos/${photoId}`,
    data,
  })
}
