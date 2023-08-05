import getCurrentUser from '@/actions/getCurrentUser'
import prismadb from '@/libs/prismadb'
import { pusherServer } from '@/libs/pusher'
import { NextResponse } from 'next/server'

interface IParams {
  conversationId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    const deletedConversation = await prismadb.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    })

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          'conversation:remove',
          existingConversation
        )
      }
    })

    return NextResponse.json(deletedConversation)
  } catch (error: any) {
    console.log(error, 'ERROR_CONVERSATION_DELETE')
    return new NextResponse('Internal error', { status: 500 })
  }
}
