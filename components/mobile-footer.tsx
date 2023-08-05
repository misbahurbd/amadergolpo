'use client'

import useConversation from '@/hooks/useConversation'
import useRouters from '@/hooks/useRoutes'
import MobileItem from './mobile-item'

const MobileFooter = () => {
  const routes = useRouters()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div className="fixed flex justify-between w-full bottom-0 z-40 items-center border-t-[1px] lg:hidden bg-white">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          label={item.label}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

export default MobileFooter
