interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface GetUsersResponse<T> {
  data: Array<T>
}

export interface GetSingleUserResponse {
  data: User
}

export interface Album {
  userId: number
  id: number
  title: string
}

export interface GetAlbumDetailsResponse {
  data: Album
}

export interface GetAlbumsResponse<T> {
  data: Array<T>
}

export interface AlbumPhoto {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface AlbumsPhotoResponse<T> {
  data: Array<T>
}

export interface GetPhotoDetailsResponse {
  data: AlbumPhoto
}
