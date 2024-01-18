import links from "@/lib/links"
import type { Album } from "@/types/Responses"
import Link from "next/link"

interface AlbumsProps {
  albums?: Array<Album>
}

const Albums = ({ albums }: AlbumsProps) => {
  return albums?.map((album) => (
    <Link
      key={album.id}
      className="rounded-lg border shadow-sm hover:cursor-pointer hover:bg-gray-100"
      href={`${links.album}/${album?.id}`}
    >
      <div className="p-4">
        <h2 className="text-lg font-medium md:text-xl">
          Album title: {album?.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Posted by User: {album?.userId}
        </p>
      </div>
    </Link>
  ))
}

export default Albums
