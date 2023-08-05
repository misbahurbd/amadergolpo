'use client'

import { EmptyState } from '@/components/empty-state'
import useConversation from '@/hooks/useConversation'
import clsx from 'clsx'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx('lg:block lg:pl-80 h-full', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  )
}

export default Home
