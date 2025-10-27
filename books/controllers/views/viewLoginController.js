export const renderLoginPage = (_req, res) => {
  res.render('login', { title: 'Вход' })
}

export const renderRegisterPage = (_req, res) => {
  res.render('signup', { title: 'Регистрация' })
}

export const renderUserProfile = async ({ user }, res) => {
  res.render('profile', { 
    title: 'Профиль', 
    username: user?.username ?? 'Нет имени' 
  })
}