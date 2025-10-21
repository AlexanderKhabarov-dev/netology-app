import bookRepository from '../../repositories/book/booksRepository.js'

export const getAllBooks = (_req, res) => {
  const books = bookRepository.getAll()

  res.json(books)
}

export const getBookFromId = async (req, res) => {
  const book = await bookRepository.getById('68f5111a6b28085a82518341')

  if (!book) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.json(book)
}

export const createBook = async (req, res) => {
  const book = await bookRepository.create(req.body)

  res.json({ redirectUrl: '/', book })
}

export const updateBook = (req, res) => {
  const updatedBook = bookRepository.update(req.params.id, req.body)

  if (!updatedBook) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.json({ redirectUrl: `/` })
}

export const deleteBook = (req, res) => {
  const isDeleted = bookRepository.delete(req.params.id)

  if (!isDeleted) {
    return res.status(404).send({ errorMessage: 'Книга не найдена' })
  }

  res.send(`Книга с id ${req.params.id} удалена`)
}
