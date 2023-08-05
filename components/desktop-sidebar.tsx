'use client'

import useRouters from '@/hooks/useRoutes'
import { useState } from 'react'
import { DesktopItem } from './desktop-item'
import { User } from '@prisma/client'
import Avatar from './avatar'
import { SettingsModal } from './setting-modal'

interface DesktopSidebarProps {
  currentUser: User | null
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRouters()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SettingsModal
        currentUser={currentUser!}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <aside
        className="
      hidden
      lg:fixed
      lg:inset-y-0
      lg:left-0
      lg:z-40
      lg:w-20
      xl:px-6
      lg:overflow-auto
      lg:bg-white
      lg:border-r-[1px]
      lg:pb-4
      lg:flex
      lg:flex-col
      justify-between
      "
      >
        <nav
          className="
          mt-4
          flex
          flex-col
          justify-between
        "
        >
          <ul
            role="list"
            className="flex flex-col items-center space-y-1"
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                href={item.href}
                active={item.active}
                onClick={item.onClick}
                icon={item.icon}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </aside>
    </>
  )
}

export default DesktopSidebar
