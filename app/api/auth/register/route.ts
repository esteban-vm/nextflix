import { hash } from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      return Response.json({ message: 'El correo electrónico ya está registrado' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const createdUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return Response.json(createdUser, { status: 200 })
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
