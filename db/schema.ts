import { sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

const generateUUID = () => crypto.randomUUID()

export const users = sqliteTable('users', {
   id: text('id').notNull().primaryKey().default(generateUUID()),
   name: text('name').notNull(),
   email: text('email').notNull().unique(),
   password: text('password').notNull(),
   created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const groups = sqliteTable('groups', {
   id: text('id').notNull().primaryKey().default(generateUUID()),
   name: text('name').notNull(),
   description: text('description'),
   adminId: text('adminId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
   created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const groupMembers = sqliteTable('groupMembers', {
   groupId: text('groupId')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
   userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
})

export const meetings = sqliteTable('meetings', {
   id: text('id').notNull().primaryKey().default(generateUUID()),
   groupId: text('groupId')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
   title: text('title').notNull(),
   description: text('description'),
   admin: text('admin')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
   date: text('date').notNull(),
   time: text('time').notNull(),
   created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
   updated_at: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const meetingAttendees = sqliteTable('meetingAttendees', {
   meetingId: text('meetingId')
      .notNull()
      .references(() => meetings.id, { onDelete: 'cascade' }),
   userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
})
