export const isLoggedInApi = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.status(401).json({ error: 'Not authorized' })
}

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
   res.redirect('/login')
}

export const redirectFromLoginToHome = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/books/homePage')
  }

  next()
}