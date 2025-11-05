import userRepository from '../../repositories/user/userRepository.js'

export const registerUser = async (req, res) => {
  await userRepository.createUser(req.body)

  res.json({ redirectUrl: '/login' })
}

export const loginUser = (_req, res) => res.json({ redirectUrl: '/' })

export const logoutUser = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)
    res.redirect('/login')
  })
}