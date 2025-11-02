import User from './userSchema.js'

class UserRepository {
  async createUser({ username, password }) {
    try {
      const user = new User({ username, password })
      const createdUser = await User.register(user, password)

      return createdUser
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error)
    }
  }

  async getUserFromUserName(username) {
    const user = await User.findOne({ username })

    return user
  }
}

export default new UserRepository()