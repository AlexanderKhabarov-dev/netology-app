import { Request, Response } from 'express'

export const renderLoginPage = (_req: Request, res: Response) => {
  res.render('login', { title: 'Вход' })
}

export const renderRegisterPage = (_req: Request, res: Response) => {
  res.render('signup', { title: 'Регистрация' })
}

export const renderUserProfile = ({ user }: Request, res: Response) => {
  res.render('profile', {
    title: 'Профиль',
    username: user?.username ?? 'Нет имени',
  })
}
