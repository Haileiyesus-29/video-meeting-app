import { sql } from 'drizzle-orm'
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core'

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
   created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const meetings = sqliteTable('meetings', {
   id: text('id').notNull().primaryKey().default(generateUUID()),
   groupId: text('groupId')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
   title: text('title').notNull(),
   description: text('description'),
   scheduled_at: text('scheduled_at').notNull(),
   start: text('start'),
   end: text('end'),
   status: text('status', {
      enum: ['pending', 'started', 'ended', 'canceled'],
   }).default('pending'),
   created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const meetingParticipants = sqliteTable('meetingParticipants', {
   meetingId: text('meetingId')
      .notNull()
      .references(() => meetings.id, { onDelete: 'cascade' }),
   userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
   duration: integer('duration').default(0),
   created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})
