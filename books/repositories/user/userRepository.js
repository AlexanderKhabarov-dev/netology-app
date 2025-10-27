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

  async getUser(username) {
    const user = await User.findOne({ username }, (err, user) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }

      if (!db.users.verifyPassword(user, password)) {
        return done(null, false)
      }

      return done(null, user)
    })

    return user
  }
}

export default new UserRepository()