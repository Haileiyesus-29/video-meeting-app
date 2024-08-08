import '@/db/envConfig'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
   schema: './db/schema.ts',
   dialect: 'postgresql',
   dbCredentials: {
      url: process.env.POSTGRES_URL!,
      user: process.env.POSTGRES_USER!,
      password: process.env.POSTGRES_PASSWORD!,
   },
})
