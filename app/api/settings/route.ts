import getCurrentUser from '@/actions/getCurrentUser'
import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()

    const { name, image } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
