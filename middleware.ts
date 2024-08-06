import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, JWTVerifyResult } from 'jose'

const ACCESS_KEY = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)

async function decrypt(token: string) {
   try {
      const { payload } = (await jwtVerify(token, ACCESS_KEY, {
         algorithms: ['HS256'],
      })) as JWTVerifyResult<{ userId: string; expires: string }>

      return payload
   } catch (error) {
      console.log(error)
      return null
   }
}

export async function middleware(request: NextRequest) {
   const session = request.cookies.get('session')?.value

   if (!session)
      return NextResponse.redirect(new URL('/login', request.nextUrl))

   const payload = await decrypt(session)

   if (!payload)
      return NextResponse.redirect(new URL('/login', request.nextUrl))

   return NextResponse.next()
}

export const config = {
   matcher: [
      '/((?!api|login|register|verify|_next/static|_next/image|.*\\.png$).*)',
   ],
}
