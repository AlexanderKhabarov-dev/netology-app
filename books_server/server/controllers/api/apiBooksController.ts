import { Request, Response } from 'express'

import { container } from '../../container.ts'
import BooksRepository from '../../repositories/book/BooksRepository.ts'
import { BookType } from '../../repositories/book/types.ts'

const bookRepository = container.get(BooksRepository)

export const getAllBooks = (_req: Request, res: Response) => {
  const books = bookRepository.getAll()

  res.json(books)
}

export const getBookFromId = async (req: Request, res: Response) => {
  const book = await bookRepository.getById(req.params.id)

  if (!book) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.json(book)
}

export const createBook = async (req: Request<unknown, unknown, BookType>, res: Response) => {
  const book = await bookRepository.create(req.body)

  res.json({ redirectUrl: '/', book })
}

export const updateBook = async (
  req: Request<{ id: string }, unknown, BookType>,
  res: Response
) => {
  const updatedBook = await bookRepository.update(req.params.id, req.body)

  if (!updatedBook) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.json({ redirectUrl: `/books/${req.params.id}` })
}

export const deleteBook = async (req: Request, res: Response) => {
  const isDeleted = await bookRepository.delete(req.params.id)

  if (!isDeleted) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.send(`Книга с id ${req.params.id} удалена`)
}
