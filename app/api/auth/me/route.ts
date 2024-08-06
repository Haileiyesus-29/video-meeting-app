// identify use using the session token and return the user

import { verifySession } from '@/lib/session'

export async function GET() {
   const data = await verifySession()

   return Response.json(data)
}
