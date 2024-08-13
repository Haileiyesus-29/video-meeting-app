// identify use using the session token and return the user

import { searchUserAccount } from '@/db'
import { verifySession } from '@/lib/session'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   await verifySession()

   const query = request.nextUrl.searchParams.get('q')
   if (!query) return Response.json({ error: 'Missing query' }, { status: 400 })

   const result = await searchUserAccount(query)

   return Response.json(result)
}
