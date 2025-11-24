import { Document, PassportLocalModel } from 'mongoose'

export type UserType = {
  username: string
}

export type CreateUserType = UserType & { password: string }

export type MongooseUserType = UserType & Document
export type ModelUserType = PassportLocalModel<MongooseUserType>
