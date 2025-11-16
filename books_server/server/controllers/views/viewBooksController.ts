import { Request, Response } from 'express'

import { container } from '../../container.ts'
import BooksRepository from '../../repositories/book/BooksRepository.ts'
import commentsRepository from '../../repositories/comments/commentsRepository.js'

const bookRepository = container.get(BooksRepository)

export const renderHomePage = async (_req: Request, res: Response) => {
  const books = (await bookRepository.getAll()) ?? []

  const data = { title: 'Книги', books: books }
  res.render('index', data)
}

export const renderViewBookPage = async (req: Request<{ id: string }>, res: Response) => {
  const book = await bookRepository.getById(req.params.id)

  const url = `${process.env.COUNTER_API}/counter/${book._id.toString()}`

  let viewCounter = 0

  try {
    const result = await fetch(url, { method: 'GET' })
    const { counter } = await result.json()
    viewCounter = counter
  } catch (e) {
    console.log(e)
  }

  const comments = await commentsRepository.getAllCommentsFromBookId(book._id)
  const commentsWithDeletePermission = comments.map(item => ({
    ...item,
    canDelete: req.user.id === item.userId,
  }))

  const data = {
    title: book.title,
    book,
    viewCounter,
    comments: commentsWithDeletePermission,
  }

  res.render('view', data)
}

export const renderEditBookPage = async (req: Request, res: Response) => {
  const book = await bookRepository.getById(req.params.id)

  const data = { title: 'Редактирование книги', book }
  res.render('update', data)
}

export const renderCreateBookPage = (_req: Request, res: Response) => {
  res.render('create', { title: 'Создание книги ' })
}
