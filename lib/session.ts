'use server'
import 'server-only'
import { jwtVerify, JWTVerifyResult, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserById } from '@/db'

const ACCESS_KEY = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)

const cookieConfig = {
   name: 'session',
   options: {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
   },
   duration: 60 * 60 * 24 * 7, // 7 days
}

export async function encrypt(payload: any) {
   return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(ACCESS_KEY)
}

export async function decrypt(token: string) {
   try {
      const { payload } = (await jwtVerify(token, ACCESS_KEY, {
         algorithms: ['HS256'],
      })) as JWTVerifyResult<{ userId: string; expires: string }>

      return payload
   } catch (error) {
      return null
   }
}

export async function setSession(userId: string) {
   const expires = new Date(Date.now() + cookieConfig.duration * 1000)

   const session = await encrypt({ userId, expires })

   cookies().set(cookieConfig.name, session, {
      ...cookieConfig.options,
      sameSite: 'lax',
      expires,
   })
   return redirect('/')
}

export async function verifySession() {
   const cookie = cookies().get(cookieConfig?.name)?.value
   if (!cookie) return redirect('/login')

   const session = await decrypt(cookie)
   if (!session?.userId) return redirect('/login')

   const user = await getUserById(session.userId)
   if (!user) return redirect('/login')

   return { name: user.name, email: user.email, id: user.id }
}

export async function clearSession() {
   cookies().delete(cookieConfig.name)
   return redirect('/login')
}
