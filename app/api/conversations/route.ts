import getCurrentUser from '@/actions/getCurrentUser'
import prismadb from '@/libs/prismadb'
import { pusherServer } from '@/libs/pusher'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()
    const { userId, isGroup, members, name } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 })
    }

    if (isGroup) {
      const newConversation = await prismadb.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      })

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation)
        }
      })

      return NextResponse.json(newConversation)
    }

    const existingConversations = await prismadb.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    })

    const existingConversation = existingConversations[0]

    if (existingConversation) {
      return NextResponse.json(existingConversation)
    }

    const newConversation = await prismadb.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    })

    newConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation)
      }
    })

    return NextResponse.json(newConversation)
  } catch (error: any) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
