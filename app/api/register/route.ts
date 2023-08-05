import bcrypt from 'bcrypt'

import prismadb from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return new NextResponse('Missing required field', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.log('[REGISTRATION_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
