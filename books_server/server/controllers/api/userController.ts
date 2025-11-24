import { Request, Response, NextFunction } from 'express'
import { container } from '../../container.ts'
import UserRepository from '../../repositories/user/UserRepository.ts'
import { CreateUserType } from '../../repositories/user/types.ts'

const userRepository = container.get(UserRepository)

export const registerUser = async (
  req: Request<unknown, unknown, CreateUserType>,
  res: Response
) => {
  await userRepository.createUser(req.body)

  res.json({ redirectUrl: '/login' })
}

export const loginUser = (_req: Request, res: Response) => res.json({ redirectUrl: '/' })

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout(err => {
    if (err) return next(err)
    res.redirect('/login')
  })
}
