'use server'
import 'server-only'

export async function createGroup<T, U extends FormData>(
   _initialState: T,
   formData: U
) {
   console.log(formData)
   return null
}
