import { Config, defineConfig } from 'drizzle-kit'

export default defineConfig({
   dialect: 'sqlite',
   out: 'drizzle',
   schema: './db/schema.ts',
   dbCredentials: {
      url: 'sqlite.db',
   },
}) satisfies Config
