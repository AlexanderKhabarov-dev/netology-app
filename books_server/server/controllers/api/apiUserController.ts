import { Request, Response } from 'express'

export const login = (_req: Request, res: Response) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' })
}
