import links from "@/lib/links"
import { shimmer, toBase64 } from "@/lib/next-image-config"
import type { AlbumPhoto } from "@/types/Responses"
import Image from "next/image"
import Link from "next/link"

const AlbumPhotoCard = ({ title, url, id }: AlbumPhoto) => {
  return (
    <div className="my-4 w-80 overflow-hidden rounded shadow-lg">
      <Image
        className="object-contain"
        src={url}
        alt={title}
        height="320"
        width="320"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(100, 100))}`}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-base font-light">{title}</div>
      </div>
      <div className="px-6 py-4">
        <Link href={`${links.photo}/${id}`}>
          <button className="mb-2 rounded bg-gray-300 p-2 text-base font-light hover:bg-gray-700 hover:text-white">
            View Image
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AlbumPhotoCard
