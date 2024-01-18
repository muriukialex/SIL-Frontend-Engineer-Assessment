import type { SectionType } from "@/app/dashboard/(home)/page"
import type { User } from "@/types/Responses"
import Link from "next/link"

interface UsersMenuProps {
  users?: Array<User>
  selectedUser: number | null
  handleUserClick: (userId: number) => void
  handleActiveSection: (activeSection: SectionType) => void
  activeSection: SectionType
}

export const UsersMenu = ({
  users,
  selectedUser,
  handleUserClick,
  handleActiveSection,
  activeSection,
}: UsersMenuProps) => {
  return (
    <div>
      {users?.map((user) => (
        <Link
          key={user.id}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800 ${
            activeSection.section === "userAlbums" && selectedUser === user.id
              ? "bg-slate-600"
              : ""
          }`}
          href="#"
          onClick={() => {
            handleUserClick(user?.id)
            handleActiveSection({
              section: "userAlbums",
            })
          }}
        >
          {user.name}
        </Link>
      ))}
    </div>
  )
}

export const UserMenuMobile = ({ users }: UsersMenuProps) => {
  return (
    <div>
      {users?.map((user) => (
        <Link
          key={user.id}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-800"
          href="#"
        >
          {user.name}
        </Link>
      ))}
    </div>
  )
}
