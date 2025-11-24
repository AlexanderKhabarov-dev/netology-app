import { injectable, inject } from 'inversify'
import { PassportLocalModel } from 'mongoose'
import { IUserRepository } from './IUserRepository.ts'
import { MongooseUserType } from './types.ts'
import User from './UserSchema.ts'

@injectable()
class UserRepository implements IUserRepository {
  private userModel: PassportLocalModel<MongooseUserType>

  constructor(@inject('UserModel') userModel: PassportLocalModel<MongooseUserType>) {
    this.userModel = userModel
  }

  async createUser({ username, password }: { username: string; password: string }) {
    try {
      const user = new User({ username, password })
      const createdUser = await this.userModel.register(user, password)

      return createdUser
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error)
    }
  }

  async getUserFromUserName(username: string) {
    const user = await this.userModel.findOne({ username })

    return user
  }
}

export default UserRepository
