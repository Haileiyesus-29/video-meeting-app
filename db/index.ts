import './envConfig'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { Client } from 'pg'
import { eq, ilike, InferInsertModel, or } from 'drizzle-orm'

class DBConnection {
   private static _instance: DBConnection
   private client: Client

   private constructor() {
      this.client = new Client({
         connectionString: process.env.DATABASE_URL,
         user: process.env.POSTGRES_USER,
         password: process.env.POSTGRES_PASSWORD,
      })

      this.connect()
   }
   private async connect() {
      try {
         await this.client.connect()
         console.log('Connected to database')
      } catch (error) {
         console.error('Failed to connect to the database:', error)
         process.exit(1)
      }
   }

   public static get instance() {
      if (!DBConnection._instance) {
         DBConnection._instance = new DBConnection()
      }
      return DBConnection._instance.client
   }
}

const instance = DBConnection.instance
const db = drizzle(instance, { schema })

type UserInput = Omit<
   InferInsertModel<typeof schema.Users>,
   'id' | 'created_at'
>

type ScheduleInput = Omit<
   InferInsertModel<typeof schema.Schedule>,
   'id' | 'created_at'
>

export function getUserById(id: string) {
   return db.query.Users.findFirst({
      where: eq(schema.Users.id, id),
      columns: { password: false },
   })
}

export function getUserByEmail(email: string) {
   return db.query.Users.findFirst({ where: eq(schema.Users.email, email) })
}

export function createUser(user: UserInput) {
   return db.insert(schema.Users).values(user).returning({
      id: schema.Users.id,
      name: schema.Users.name,
      email: schema.Users.email,
      image: schema.Users.image,
      created_at: schema.Users.created_at,
   })
}

export function getUsers() {
   return db.query.Users.findMany({
      columns: { password: false },
   })
}

export function searchUserAccount(query: string) {
   return db.query.Users.findMany({
      where: or(
         ilike(schema.Users.name, `%${query}%`),
         ilike(schema.Users.email, `%${query}%`)
      ),
      columns: {
         password: false,
      },
   })
}

export function createSchedule(schedule: ScheduleInput) {
   return db.insert(schema.Schedule).values(schedule).returning({
      id: schema.Schedule.id,
      user_id: schema.Schedule.user_id,
      title: schema.Schedule.title,
      description: schema.Schedule.description,
      start_time: schema.Schedule.start_time,
      end_time: schema.Schedule.end_time,
      created_at: schema.Schedule.created_at,
   })
}

export function getScheduleById(id: string) {
   return db.query.Schedule.findFirst({ where: eq(schema.Schedule.id, id) })
}

export function getSchedules(userId: string) {
   return db.query.Schedule.findMany({
      where: eq(schema.Schedule.user_id, userId),
   })
}

export default db
