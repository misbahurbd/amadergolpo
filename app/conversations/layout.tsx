import getConversations from '@/actions/getConversations'
import getUsers from '@/actions/getUsers'
import ConversationList from '@/components/conversation-list'
import Sidebar from '@/components/sidebar'
import React from 'react'

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const conversations = await getConversations()
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
          users={users}
        />
        {children}
      </div>
    </Sidebar>
  )
}

export default ConversationLayout
