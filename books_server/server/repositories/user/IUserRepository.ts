import { MongooseUserType } from './types.ts'

export interface IUserRepository {
  createUser: ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => Promise<MongooseUserType>
  getUserFromUserName: (username: string) => Promise<MongooseUserType>
}
