'use client'

import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from './avatar'
import ProfileDrawer from './profile-drawer'
import AvatarGroup from './avatar-group'
import useActiveList from '@/hooks/useActiveList'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
      bg-white
      w-full
      border-b-[1px]
      sm:px-4
      py-3
      px-4
      lg:px-6
      flex
      justify-between
      items-center
      shadow-sm"
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 cursor-pointer transition"
          >
            <HiChevronLeft size={30} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="">{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setDrawerOpen(true)
          }}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
        >
          <HiEllipsisHorizontal size={32} />
        </div>
      </div>
    </>
  )
}

export default Header
