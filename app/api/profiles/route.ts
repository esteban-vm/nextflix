import { auth } from '@/auth'
import { deleteProfile } from '@/lib/auth'

export async function DELETE(request: Request) {
  const session = await auth()

  if (!session?.user) {
    return Response.json('No autorizado', { status: 401 })
  }

  const { userId } = await request.json()
}
