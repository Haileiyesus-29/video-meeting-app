import {
   integer,
   pgTable,
   text,
   timestamp,
   uniqueIndex,
   uuid,
} from 'drizzle-orm/pg-core'

export const Users = pgTable(
   'users',
   {
      id: uuid('id').primaryKey().notNull().defaultRandom(),
      name: text('name').notNull(),
      email: text('email').notNull().unique(),
      password: text('password').notNull(),
      image: text('image'),
      created_at: timestamp('created_at').defaultNow().notNull(),
   },
   users => ({ uniqueIdx: uniqueIndex('unique_idx').on(users.email) })
)

export const Schedule = pgTable('schedule', {
   id: uuid('id').primaryKey().notNull().defaultRandom(),
   user_id: uuid('user_id').notNull(),
   title: text('title').notNull(),
   description: text('description'),
   start_time: timestamp('start_time').notNull(),
   end_time: timestamp('end_time').notNull(),
   created_at: timestamp('created_at').defaultNow().notNull(),
})

export const ScheduleInvitees = pgTable('schedule_invitees', {
   id: uuid('id').primaryKey().notNull().defaultRandom(),
   schedule_id: uuid('schedule_id').notNull(),
   user_id: uuid('user_id').notNull(),
   status: text('status').notNull(),
   created_at: timestamp('created_at').defaultNow().notNull(),
})

export const CallSession = pgTable('call_session', {
   id: uuid('id').primaryKey().notNull().defaultRandom(),
   schedule_id: uuid('schedule_id').notNull(),
   user_id: uuid('user_id').notNull(),
   uptime: integer('uptime').notNull().default(0),
   created_at: timestamp('created_at').defaultNow().notNull(),
})
